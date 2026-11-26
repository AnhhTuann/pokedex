"""Reconstruct the Phase 9B audit inputs from the pinned api-data checkout."""
from collections import Counter
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import re
import subprocess
import sys
from urllib.parse import urlsplit

COMMIT = "508fd7c3a7d54ac175e00afe420b11a5af983bd6"
TREE = "cf32c6147e9c1da51bc91d13616259b19e8d50b9"
TIMESTAMP = "2026-11-20T20:56:12Z"
REPOSITORY = "https://github.com/PokeAPI/api-data"
LABEL = "RECONSTRUCTED_FROM_IMMUTABLE_SNAPSHOT"
PREFIX = "data/api/v2"
COUNTS = dict(zip(
    "pokemon-species pokemon move ability item location nature type version version-group pokedex generation".split(),
    (1025, 1351, 938, 374, 2223, 1104, 25, 21, 53, 32, 35, 9),
))


def require(condition, message):
    if not condition:
        raise ValueError(message)


def digest(algorithm, data):
    return hashlib.new(algorithm, data).hexdigest()


def resource_id(url, endpoint):
    parts = urlsplit(url)
    require(parts.netloc in ("", "pokeapi.co"), f"Unexpected resource host: {url}")
    match = re.fullmatch(rf"/api/v2/{endpoint}/([1-9][0-9]*)/?", parts.path)
    require(match is not None and not parts.query and not parts.fragment, f"Invalid {endpoint} URL: {url}")
    return int(match[1])


def main(snapshot, output):
    def git(*args):
        return subprocess.check_output(["git", "-C", snapshot, *args])

    require(git("rev-parse", "HEAD").decode().strip() == COMMIT, "Wrong source commit")
    require(git("rev-parse", "HEAD^{tree}").decode().strip() == TREE, "Wrong source tree")
    epoch = int(git("show", "-s", "--format=%ct", COMMIT))
    require(datetime.fromtimestamp(epoch, timezone.utc).isoformat().replace("+00:00", "Z") == TIMESTAMP,
            "Wrong commit timestamp")

    blobs = {}
    for record in git("ls-tree", "-r", "-z", COMMIT, PREFIX).split(b"\0"):
        if record:
            metadata, path = record.decode().split("\t")
            mode, kind, sha = metadata.split()
            if kind == "blob" and mode == "100644":
                blobs[path] = sha

    output.mkdir(parents=True, exist_ok=False)
    cache = output / "pokeapi"
    cache.mkdir()
    entries = {}
    sources = {}

    def load(path):
        if path not in sources:
            data = (snapshot / path).read_bytes()
            header = f"blob {len(data)}\0".encode()
            require(digest("sha1", header + data) == blobs.get(path), f"Blob mismatch: {path}")
            sources[path] = json.loads(data)
        return sources[path]

    def emit(request, path, endpoint, record_id, data):
        key = digest("sha1", request.encode())
        payload = json.dumps(data, ensure_ascii=False, separators=(",", ":")).encode()
        row = dict(request=request, cacheKey=key, sourcePath=path, gitBlobSha=blobs[path],
                   sha256=digest("sha256", payload), endpoint=endpoint, recordId=record_id)
        if key in entries:
            require(entries[key] == row, f"Cache key collision: {request}")
            return
        (cache / f"{key}.json").write_bytes(payload)
        entries[key] = row

    catalogs = {}
    duplicate_names = {}
    for endpoint, expected in COUNTS.items():
        path = f"{PREFIX}/{endpoint}/index.json"
        data = load(path)
        results = data["results"]
        require(data["count"] == len(results) == expected, f"Catalog count mismatch: {endpoint}")
        ids = {resource_id(row["url"], endpoint): row["name"] for row in results}
        require(len(ids) == expected, f"Duplicate catalog IDs: {endpoint}")
        duplicates = {name: count for name, count in Counter(ids.values()).items() if count > 1}
        if duplicates:
            require(endpoint not in ("version", "pokedex"), f"Ambiguous slug lookup: {endpoint}")
            duplicate_names[endpoint] = duplicates
        catalogs[endpoint] = ids
        emit(f"/{endpoint}?limit=3000", path, endpoint, None, data)

    def detail(endpoint, record_id, request=None):
        path = f"{PREFIX}/{endpoint}/{record_id}/index.json"
        data = load(path)
        require(data["id"] == record_id, f"Detail ID mismatch: {path}")
        if endpoint in catalogs:
            require(data["name"] == catalogs[endpoint][record_id], f"Detail name mismatch: {path}")
        emit(request or f"/{endpoint}/{record_id}", path, endpoint, record_id, data)
        return data

    for endpoint in ("generation", "version-group", "ability", "item", "version", "pokedex"):
        for record_id, name in catalogs[endpoint].items():
            detail(endpoint, record_id, f"/{endpoint}/{name}" if endpoint in ("version", "pokedex") else None)

    species_ids = sorted(catalogs["pokemon-species"])
    require(species_ids == list(range(1, 1026)), "Species IDs differ from historical audit")
    catalog_key = digest("sha256", ",".join(map(str, species_ids)).encode())[:16]
    require(catalog_key == "96eefac660020c90", "Historical catalog key mismatch")
    forms = set()

    for species_id in species_ids:
        species = detail("pokemon-species", species_id)
        detail("pokemon", species_id)
        for variety in species["varieties"]:
            url = variety["pokemon"]["url"]
            form_id = resource_id(url, "pokemon")
            form = detail("pokemon", form_id, url)
            require(form["name"] == variety["pokemon"]["name"] and
                    resource_id(form["species"]["url"], "pokemon-species") == species_id,
                    f"Incorrect form relationship: {species_id}/{form_id}")
            require(form_id not in forms, f"Repeated form: {form_id}")
            forms.add(form_id)

        chain = species.get("evolution_chain")
        if chain:
            url = chain["url"]
            detail("evolution-chain", resource_id(url, "evolution-chain"), url)
        path = f"{PREFIX}/pokemon/{species_id}/encounters/index.json"
        encounters = load(path)
        require(isinstance(encounters, list), f"Expected encounter array: {path}")
        emit(f"/pokemon/{species_id}/encounters", path, "pokemon/encounters", species_id, encounters)

    require(forms == set(catalogs["pokemon"]), "Varieties do not cover the Pokémon catalog")
    actual_files = {path.stem for path in cache.glob("*.json")}
    require(actual_files == set(entries), "Cache files differ from manifest")
    for row in entries.values():
        payload = (cache / f'{row["cacheKey"]}.json').read_bytes()
        require(digest("sha256", payload) == row["sha256"], f'Cache checksum mismatch: {row["request"]}')

    manifest = dict(provenance=LABEL, upstreamRepository=REPOSITORY, commit=COMMIT, tree=TREE,
                    commitTimestamp=TIMESTAMP, catalogKey=catalog_key, catalogs=COUNTS,
                    uniqueSourceFiles=len(sources), duplicateCatalogNames=duplicate_names, entries=sorted(entries.values(), key=lambda row: row["request"]))
    (output / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
    print(f"{LABEL}: {len(entries)} verified cache keys from {len(sources)} source files")


if __name__ == "__main__":
    main(*(Path(argument).resolve() for argument in sys.argv[1:]))
