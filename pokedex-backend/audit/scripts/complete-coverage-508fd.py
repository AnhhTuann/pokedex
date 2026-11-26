"""Read-only Phase 9B-2 verification against the pinned cache and Git tree."""
from collections import Counter, defaultdict
from functools import lru_cache
import csv
import hashlib
import json
from pathlib import Path
import re
import subprocess
import sys

from PIL import Image

SNAPSHOT = "508fd7c3a7d54ac175e00afe420b11a5af983bd6"
TREE = "cf32c6147e9c1da51bc91d13616259b19e8d50b9"
BASE = "f2d151cc12c866e2daee0ed7113e22b025a1c049"
PREFIX = "data/api/v2/"
# Count only explicitly wild methods. Static encounters and raids remain separate evidence.
WILD_METHODS = frozenset("""
    walk surf old-rod good-rod super-rod dark-grass grass-spots cave-spots
    bubbling-spots super-rod-spots surf-spots bridge-spots headbutt headbutt-low
    headbutt-normal headbutt-high honey-tree rock-smash overworld overworld-water
    overworld-flying overworld-dirt wanderer wanderer-water sos horde hidden-grotto
    rough-terrain yellow-flowers purple-flowers red-flowers seaweed roaming-grass
    roaming-water feebas-tile-fishing
""".split())
ACQUISITION_METHODS = frozenset({"gift", "gift-egg", "npc-trade"})


def verify(value, message):
    if not value:
        raise ValueError(message)


def sha256(data):
    return hashlib.sha256(data).hexdigest()


def rid(url):
    return int(url.rstrip("/").rsplit("/", 1)[1])


def slug(item):
    return item["name"]


def main(root, upstream, cache, game_map, out):
    games = json.loads(game_map.read_bytes())
    manifest = json.loads((cache / "manifest.json").read_bytes())
    verify(manifest["commit"] == SNAPSHOT and manifest["tree"] == TREE, "Wrong cache revision")
    tree = subprocess.check_output(["git", "-C", upstream, "ls-tree", "-rz", SNAPSHOT, "data/api/v2"])
    blobs = {}
    for row in tree.split(b"\0"):
        if row:
            meta, path = row.decode().split("\t")
            blobs[path] = meta.split()[-1]
    entries = {row["request"]: row for row in manifest["entries"]}
    for request, entry in entries.items():
        key = hashlib.sha1(request.encode()).hexdigest()
        verify(key == entry["cacheKey"] and blobs[entry["sourcePath"]] == entry["gitBlobSha"], request)
        verify(sha256((cache / "pokeapi" / (key + ".json")).read_bytes()) == entry["sha256"], request)
    verify(len(entries) == 7704, "Incomplete cache")

    @lru_cache
    def raw(path):
        data = (upstream / path).read_bytes()
        verify(hashlib.sha1(f"blob {len(data)}\0".encode() + data).hexdigest() == blobs[path], path)
        return json.loads(data)

    def detail(endpoint, identifier):
        return raw(f"{PREFIX}{endpoint}/{identifier}/index.json")

    def catalog(endpoint):
        return raw(f"{PREFIX}{endpoint}/index.json")["results"]

    def resource(item):
        return raw("data/api/" + item["url"].split("/api/", 1)[1].strip("/") + "/index.json")

    def source(endpoint, identifier):
        return f"{PREFIX}{endpoint}/{identifier}/index.json"

    def display(record):
        return next((n["name"] for n in record["names"] if slug(n["language"]) == "en"), record["name"])

    def measures(expected, actual, missing=0, unverified=0, duplicate=0, invalid=0):
        return dict(expected_count=expected, actual_count=actual, missing_count=missing,
                    unverified_count=unverified, duplicate_count=duplicate, invalid_count=invalid)

    def evidence(kind, status, files):
        return dict(snapshot_commit=SNAPSHOT, source_revision=BASE, evidence_type=kind,
                    verification_status=status, source_file=files)

    verify(not out.exists(), "Report directory already exists")

    def dump(name, data):
        (out / f"{name}.json").write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")) + "\n")

    def table(name, rows):
        columns = list(rows[0])
        with (out / f"{name}.csv").open("w", newline="", encoding="utf-8") as stream:
            writer = csv.DictWriter(stream, fieldnames=columns, lineterminator="\n")
            writer.writeheader()
            for row in rows:
                writer.writerow({key: json.dumps(value, ensure_ascii=False, separators=(",", ":"))
                                 if isinstance(value, (list, dict)) else value for key, value in row.items()})

    all_species = {rid(row["url"]): resource(row) for row in catalog("pokemon-species")}
    pokemon_ids = {rid(row["url"]) for row in catalog("pokemon")}
    verify(set(all_species) == set(range(1, 1026)) and len(pokemon_ids) == 1351, "National catalog")
    verify(len({s["name"] for s in all_species.values()}) == 1025, "Duplicate canonical names")
    species_rows = []
    form_rows = []
    form_seen = set()
    generation_ids = defaultdict(set)
    membership = defaultdict(list)
    dex_rows, dex_entries = [], []
    dex_by_slug = {}
    groups = {row["name"]: resource(row) for row in catalog("version-group")}
    versions = {row["name"]: resource(row) for row in catalog("version")}
    verify(len(games) == len({g["slug"] for g in games}) == 38, "Expected 38 unique game slugs")

    historical_path = root / "pokedex-backend/audit/reports/full-data/audit.json"
    historical = json.loads(historical_path.read_bytes())["reference"]
    historical_dexes = {row["name"]: row for row in historical["pokedexes"]}
    for item in catalog("pokedex"):
        dex = resource(item)
        name, dex_id = dex["name"], dex["id"]
        relevant_groups = [slug(group) for group in dex["version_groups"]]
        related_games = sorted(v["name"] for group in relevant_groups for v in groups[group]["versions"])
        numbers = [row["entry_number"] for row in dex["pokemon_entries"]]
        members = [rid(row["pokemon_species"]["url"]) for row in dex["pokemon_entries"]]
        duplicate = len(numbers) - len(set(numbers)) + len(members) - len(set(members))
        invalid = sum(number < 0 or all_species.get(species_id, {}).get("name") != row["pokemon_species"]["name"]
                      or (name == "national" and number != species_id)
                      for number, species_id, row in zip(numbers, members, dex["pokemon_entries"]))
        verify(duplicate == invalid == 0, name)
        verify(len(numbers) == historical_dexes[name]["entryCount"]
               and {all_species[sid]["name"] for sid in members} == set(historical_dexes[name]["speciesNames"]),
               f"Historical Dex comparison: {name}")
        dex_by_slug[name] = (dex, set(members))
        for number, species_id in zip(numbers, members):
            membership[species_id].append(dict(dex=name, number=number))
            dex_entries.append(dict(dex_id=dex_id, dex_slug=name, entry_number=number, national_id=species_id,
                                    species=all_species[species_id]["name"], **measures(1, 1),
                                    **evidence("REFERENCE_DEX_ENTRY", "VERIFIED", source("pokedex", dex_id))))
        dex_rows.append(dict(dex_id=dex_id, slug=name, display_name=display(dex),
                             broad_region=slug(dex["region"]) if dex["region"] else None,
                             games=related_games, version_groups=relevant_groups,
                             numbering_gaps=len(set(range(1, max(numbers, default=0) + 1)) - set(numbers)),
                             **measures(len(numbers), len(members), duplicate=duplicate, invalid=invalid),
                             **evidence("RECONSTRUCTED_DEX", "VERIFIED", source("pokedex", dex_id))))
    verify(len(dex_rows) == 35 and dex_by_slug["national"][1] == set(all_species), "Dex completeness")
    verify(all(any(row["dex"] == dex and row["number"] == 0 for row in membership[494])
               for dex in ("original-unova", "updated-unova")), "Victini must be #0 in both Unova Dexes")

    def evolution(node):
        item = node["species"]
        verify(all_species[rid(item["url"])]["name"] == item["name"], item)
        return dict(species_id=rid(item["url"]), conditions=node["evolution_details"],
                    evolves_to=[evolution(child) for child in node["evolves_to"]])

    for species_id, species in all_species.items():
        gen = rid(species["generation"]["url"])
        generation_ids[gen].add(species_id)
        defaults = [v for v in species["varieties"] if v["is_default"]]
        verify(len(defaults) == 1 and rid(defaults[0]["pokemon"]["url"]) == species_id, f"Default {species_id}")
        default = resource(defaults[0]["pokemon"])
        chain_id = rid(species["evolution_chain"]["url"]) if species["evolution_chain"] else None
        species_rows.append(dict(national_id=species_id, canonical_name=species["name"], generation=gen,
                                 types=[slug(t["type"]) for t in default["types"]],
                                 stats={slug(s["stat"]): s["base_stat"] for s in default["stats"]},
                                 abilities=[dict(name=slug(a["ability"]), hidden=a["is_hidden"]) for a in default["abilities"]],
                                 evolution_chain_id=chain_id,
                                 regional_dexes=membership[species_id],
                                 variety_ids=[rid(v["pokemon"]["url"]) for v in species["varieties"]],
                                 **measures(1, 1), **evidence("SPECIES_AND_DEFAULT_POKEMON", "VERIFIED",
                                  [source("pokemon-species", species_id), source("pokemon", species_id)])))
        for variety in species["varieties"]:
            p = resource(variety["pokemon"])
            pid = p["id"]
            verify(pid not in form_seen and p["is_default"] == variety["is_default"]
                   and rid(p["species"]["url"]) == species_id and p["species"]["name"] == species["name"]
                   and p["name"] == variety["pokemon"]["name"], f"Invalid variety {pid}")
            form_seen.add(pid)
            metadata = [resource(form) for form in p["forms"]]
            verify(all(rid(f["pokemon"]["url"]) == pid for f in metadata), f"Form metadata owner {pid}")
            if variety["is_default"]:
                classification = "DEFAULT_FORM"
            elif p["name"].endswith("-gmax"):
                classification = "GIGANTAMAX_FORM"
            elif any(f["is_mega"] for f in metadata):
                classification = "MEGA_FORM"
            elif re.search(r"-(alola|galar|hisui|paldea)(?:-|$)", p["name"]):
                classification = "REGIONAL_FORM"
            elif metadata and all(f["is_battle_only"] for f in metadata):
                classification = "BATTLE_FORM"
            elif metadata:
                classification = "OTHER_ALTERNATE_FORM"
            else:
                classification = "UNKNOWN_CLASSIFICATION"
            # Equal stats or a cosmetic-looking name cannot establish that mechanics are identical.
            encounter_path = f"{PREFIX}pokemon/{pid}/encounters/index.json"
            encounters = raw(encounter_path) if encounter_path in blobs else None
            methods = defaultdict(set)
            for location in encounters or []:
                for version in location["version_details"]:
                    methods[slug(version["version"])].update(
                        slug(e["method"]) for e in version["encounter_details"]
                    )
            wild = sorted(game for game, names in methods.items() if names & WILD_METHODS)
            acquisition = sorted(game for game, names in methods.items() if names & ACQUISITION_METHODS)
            direct = sorted({slug(g["version"]) for g in p["game_indices"]})
            learnsets = Counter(slug(v["version_group"]) for move in p["moves"] for v in move["version_group_details"])
            introductions = sorted({slug(f["version_group"]) for f in metadata if f["version_group"]})
            official = p["sprites"].get("other", {}).get("official-artwork", {})
            artwork = {key: official.get(key) or p["sprites"].get(key) for key in ("front_default", "front_shiny")}
            form_rows.append(dict(pokemon_id=pid, name=p["name"], base_species_id=species_id,
                                  base_species=species["name"], base_generation=gen,
                                  is_default=variety["is_default"], classification=classification,
                                  pokemon_form_ids=[f["id"] for f in metadata], introduction_version_groups=introductions,
                                  types=[slug(t["type"]) for t in p["types"]],
                                  stats={slug(s["stat"]): s["base_stat"] for s in p["stats"]},
                                  abilities=[dict(name=slug(a["ability"]), hidden=a["is_hidden"]) for a in p["abilities"]],
                                  artwork=artwork, direct_game_indices=direct, wild_encounter_versions=wild,
                                  encounter_methods_by_game={game: sorted(names) for game, names in methods.items() if names},
                                  documented_gift_or_trade_versions=acquisition,
                                  encounter_payload_present=encounters is not None, learnset_slots_by_group=learnsets,
                                  **measures(1, 1, unverified=int(not (direct or any(methods.values())))),
                                  **evidence("POKEMON_VARIETY_AND_FORM_METADATA",
                                    "VERIFIED" if direct or any(methods.values()) else "GAME_AVAILABILITY_UNVERIFIED",
                                    [source("pokemon", pid), source("pokemon-species", species_id),
                                     *[source("pokemon-form", f["id"]) for f in metadata],
                                     *([encounter_path] if encounters is not None else [])])))
    verify(form_seen == pokemon_ids, "Form catalog is not an exact partition of species")
    verify(sum(not row["direct_game_indices"] for row in form_rows if not row["is_default"]) == 326, "Alternate index count")
    chain_ids = {row["evolution_chain_id"] for row in species_rows if row["evolution_chain_id"] is not None}
    evolution_rows = [dict(chain_id=chain_id, relationship=evolution(detail("evolution-chain", chain_id)["chain"]),
                           **measures(1, 1), **evidence("EVOLUTION_CHAIN", "VERIFIED", source("evolution-chain", chain_id)))
                      for chain_id in sorted(chain_ids)]

    def chain_members(node):
        return {node["species_id"]}.union(*(chain_members(child) for child in node["evolves_to"]))

    members_by_chain = {row["chain_id"]: chain_members(row["relationship"]) for row in evolution_rows}
    for row in species_rows:
        verify(row["national_id"] in members_by_chain.get(row["evolution_chain_id"], set()),
               f'Invalid evolution chain owner: {row["national_id"]}')

    generation_rows = []
    for gen in range(1, 10):
        members = [rid(item["url"]) for item in detail("generation", gen)["pokemon_species"]]
        actual = generation_ids[gen]
        verify(set(members) == actual and len(members) == len(actual), f"Generation {gen}")
        generation_rows.append(dict(generation=gen, **measures(len(members), len(actual)),
                                    **evidence("GENERATION_MEMBERSHIP", "VERIFIED",
                                               [source("generation", gen), "data/api/v2/pokemon-species/*/index.json"])))

    game_rows = []
    game_members = []
    walkthroughs = json.loads((root / "pokedex-backend/prisma/seeds/walkthroughs.json").read_bytes())
    walkthrough_games = Counter(row["gameVersion"] for row in walkthroughs)
    for game in games:
        name = game["slug"]
        version = versions[name]
        group_name = slug(version["version_group"])
        group = groups[group_name]
        gen = rid(group["generation"]["url"])
        verify(gen == game["generation"] and name in [slug(v) for v in group["versions"]], name)
        official_dexes = [dex for dex, (data, _) in dex_by_slug.items()
                          if group_name in [slug(v) for v in data["version_groups"]]]
        effective = game["effectiveDexes"]
        verified = set().union(*(dex_by_slug[dex][1] for dex in official_dexes))
        runtime = set().union(*(dex_by_slug[dex][1] for dex in effective))
        present = [f for f in form_rows if name in f["direct_game_indices"] or name in f["encounter_methods_by_game"]]
        wild = [f for f in form_rows if name in f["wild_encounter_versions"]]
        gifts_trades = [f for f in form_rows if name in f["documented_gift_or_trade_versions"]]
        learnset = [f for f in form_rows if group_name in f["learnset_slots_by_group"]]
        game_rows.append(dict(slug=name, display_name=game["label"], generation=gen, version_group=group_name,
                              reference_dexes=official_dexes, app_query_dexes=effective,
                              regional_membership=len(verified), effective_membership=len(runtime),
                              species_game_presence=len({f["base_species_id"] for f in present}),
                              varieties_game_presence=len(present),
                              alternate_forms_game_presence=sum(not f["is_default"] for f in present),
                              wild_species=len({f["base_species_id"] for f in wild}), wild_varieties=len(wild), documented_gift_or_trade_varieties=len(gifts_trades),
                              version_group_learnset_forms=len(learnset),
                              version_group_move_slots=sum(f["learnset_slots_by_group"][group_name] for f in learnset),
                              obtainability_status="UNVERIFIED", transfer_event_trade_status="UNVERIFIED",
                              walkthrough_records=walkthrough_games[name],
                              walkthrough_status="PRESENT_IN_SEED" if walkthrough_games[name] else "MISSING_IN_SEED",
                              **measures(len(form_rows), len(present), unverified=len(form_rows)-len(present)),
                              **evidence("SEPARATE_GAME_INDEX_ENCOUNTER_AND_GROUP_EVIDENCE", "PARTIALLY_VERIFIED",
                               [source("version", version["id"]), source("version-group", group["id"]),
                                "pokedex-frontend/src/lib/gameVersions.ts",
                                "pokedex-backend/prisma/seeds/walkthroughs.json"])))
        game_members.append(dict(slug=name, version_group=group_name, regional_species_ids=sorted(verified),
                                 effective_regional_species_ids=sorted(runtime),
                                 game_presence_species_ids=sorted({f["base_species_id"] for f in present}),
                                 game_presence_pokemon_ids=sorted(f["pokemon_id"] for f in present),
                                 wild_pokemon_ids=sorted(f["pokemon_id"] for f in wild),
                                 gift_or_trade_pokemon_ids=sorted(f["pokemon_id"] for f in gifts_trades),
                                 version_group_learnset_pokemon_ids=sorted(f["pokemon_id"] for f in learnset),
                                 **measures(len(form_rows), len(present), unverified=len(form_rows)-len(present)),
                                 **evidence("DEX_MEMBERSHIP_AND_GAME_EVIDENCE", "PARTIALLY_VERIFIED",
                                            [source("version", version["id"]), source("version-group", group["id"]),
                                             "data/api/v2/pokedex/*/index.json", "data/api/v2/pokemon/*/index.json",
                                             "data/api/v2/pokemon/*/encounters/index.json"])))
    by_game = {g["slug"]: g for g in game_rows}
    verify(all(by_game[g]["app_query_dexes"] == ["hoenn"] and by_game[g]["reference_dexes"] == ["updated-hoenn"]
               for g in ("omega-ruby", "alpha-sapphire")), "ORAS compatibility")
    verify(set(by_game["legends-za"]["app_query_dexes"]) == {"lumiose-city", "hyperspace"}
           and by_game["legends-za"]["effective_membership"] == 364, "Legends Z-A runtime Dexes")

    names = defaultdict(set)
    for f in form_rows:
        names[f["name"]].add(f["pokemon_id"])
        if f["is_default"]:
            names[f["base_species"]].add(f["pokemon_id"])
    assets = []
    hashes = defaultdict(list)
    for mode in ("normal", "shiny"):
        directory = root / "pokedex-backend/public/images/pokemon" / mode
        verify(directory.is_dir(), f"Missing inventory directory {mode}")
        for name in sorted(names):
            path = directory / f"{name}.webp"
            size = width = height = checksum = None
            status = "MISSING"
            if path.is_file():
                data = path.read_bytes()
                size, checksum = len(data), sha256(data)
                try:
                    with Image.open(path) as image:
                        verify(image.format == "WEBP", "Expected WebP")
                        width, height = image.size
                        image.load()
                    status = "DECODED_ASSOCIATION_BY_NAME"
                    hashes[checksum].append(f"{mode}/{name}")
                except (OSError, ValueError):
                    status = "INVALID_WEBP"
            assets.append(dict(mode=mode, expected_name=name, pokemon_ids=sorted(names[name]), bytes=size,
                               width=width, height=height, sha256=checksum, duplicate_paths=[],
                               association_status="FILENAME_MATCH_VISUAL_UNVERIFIED" if size is not None else "MISSING",
                               **measures(1, int(size is not None), int(size is None), int(size is not None),
                                          invalid=int(status == "INVALID_WEBP")),
                               **evidence("LOCAL_ASSET_DECODE", status, str(path.relative_to(root)))))
    for asset in assets:
        peers = hashes.get(asset["sha256"], [])
        asset["duplicate_paths"] = [peer for peer in peers if peer != f'{asset["mode"]}/{asset["expected_name"]}']
        asset["duplicate_count"] = int(bool(asset["duplicate_paths"]))
    missing = {mode: sum(r["missing_count"] for r in assets if r["mode"] == mode) for mode in ("normal", "shiny")}
    verify(missing == {"normal": 47, "shiny": 49}, "Unexpected asset coverage drift")

    out.mkdir(parents=True, exist_ok=False)
    for filename, rows in (("generations", generation_rows), ("regional-dexes", dex_rows), ("regional-entries", dex_entries),
                           ("game-coverage", game_rows), ("assets", assets)):
        table(filename, rows)
    for filename, rows in (("species", species_rows), ("varieties", form_rows),
                           ("evolution-chains", evolution_rows), ("game-membership", game_members)):
        dump(filename, rows)
    summary = dict(**evidence("PINNED_SNAPSHOT_AND_LOCAL_SOURCE", "VERIFIED_REFERENCE_DB_UNVERIFIED",
                              ["data/api/v2", "pokedex-backend/public/images/pokemon"]),
                   **measures(1025, len(species_rows)), cache_keys=len(entries),
                   generations=len(generation_rows), dexes=len(dex_rows), dex_entries=len(dex_entries),
                   games=len(game_rows), varieties=len(form_rows), evolution_chains=len(evolution_rows),
                   form_classifications=Counter(f["classification"] for f in form_rows),
                   alternate_without_game_indices=sum(not f["direct_game_indices"] and not f["is_default"] for f in form_rows),
                   alternate_with_any_encounter=sum(bool(f["encounter_methods_by_game"]) and not f["is_default"] for f in form_rows),
                   alternate_with_wild_evidence=sum(bool(f["wild_encounter_versions"]) and not f["is_default"] for f in form_rows),
                   alternate_with_group_learnset=sum(bool(f["learnset_slots_by_group"]) and not f["is_default"] for f in form_rows),
                   alternate_with_introduction=sum(bool(f["introduction_version_groups"]) and not f["is_default"] for f in form_rows),
                   encounter_payloads_missing=sum(not f["encounter_payload_present"] for f in form_rows),
                   missing_assets=missing, identical_asset_groups=sum(len(paths) > 1 for paths in hashes.values()),
                   identical_asset_paths=sum(len(paths) for paths in hashes.values() if len(paths) > 1),
                   invalid_assets=sum(a["invalid_count"] for a in assets), database="UNVERIFIED")
    dump("summary", summary)
    print(json.dumps(summary, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main(*(Path(arg).resolve() for arg in sys.argv[1:]))
