"""Generate Phase 9B-3 reference evidence. No database or HTTP access."""
from collections import Counter, defaultdict
import csv
from functools import lru_cache
import hashlib
import json
from pathlib import Path
import re
import subprocess
import sys

SNAPSHOT = "508fd7c3a7d54ac175e00afe420b11a5af983bd6"
TREE = "cf32c6147e9c1da51bc91d13616259b19e8d50b9"
PREFIX = "data/api/v2"
BASE = "f5afc5af9f3b5414620425506a45e365b1a2d4a2"


def require(condition, message):
    if not condition:
        raise ValueError(message)


def json_read(path):
    return json.loads(path.read_bytes())


def inventory(root, name):
    return root / "pokedex-backend/audit/reports/phase9b-coverage" / name


def resource_path(url):
    return f'data/api/{url.split("/api/", 1)[1].strip("/")}/index.json'


def finding(source, expected, actual, status, action):
    return dict(snapshot=SNAPSHOT, source_revision=BASE, source_record=source,
                database_evidence=None, verification_status=status,
                expected_value=expected, actual_value=actual, recommended_action=action)


def main(root, upstream, out):
    require(not out.exists(), "Output directory already exists")
    git = lambda *args: subprocess.check_output(["git", "-C", upstream, *args])
    require(git("rev-parse", f"{SNAPSHOT}^{{tree}}").decode().strip() == TREE, "Unexpected snapshot tree")
    blobs = {}
    for row in git("ls-tree", "-rz", SNAPSHOT, PREFIX).split(b"\0"):
        if row:
            meta, path = row.decode().split("\t")
            blobs[path] = meta.split()[-1]

    @lru_cache(maxsize=256)
    def raw(path):
        data = (upstream / path).read_bytes()
        require(hashlib.sha1(f"blob {len(data)}\0".encode() + data).hexdigest() == blobs[path], path)
        return json.loads(data)

    def source(endpoint, identifier):
        return f"{PREFIX}/{endpoint}/{identifier}/index.json"

    def detail(endpoint, identifier):
        return raw(source(endpoint, identifier))

    def catalog(endpoint):
        return raw(f"{PREFIX}/{endpoint}/index.json")["results"]

    def resource(link):
        return raw(resource_path(link["url"]))

    def dump(name, value):
        (out / f"{name}.json").write_text(json.dumps(value, ensure_ascii=False, separators=(",", ":")) + "\n")

    def table(name, rows):
        with (out / f"{name}.csv").open("w", newline="", encoding="utf-8") as stream:
            writer = csv.DictWriter(stream, fieldnames=list(rows[0]), lineterminator="\n")
            writer.writeheader()
            for row in rows:
                writer.writerow({k: json.dumps(v, ensure_ascii=False, separators=(",", ":"))
                                 if isinstance(v, (list, dict)) else v for k, v in row.items()})

    forms = json_read(inventory(root, "varieties.json"))
    species = json_read(inventory(root, "species.json"))
    chains = json_read(inventory(root, "evolution-chains.json"))
    versions = {item["name"]: resource(item) for item in catalog("version")}
    groups = {item["name"]: resource(item) for item in catalog("version-group")}
    group_gen = {name: int(g["generation"]["url"].strip("/").split("/")[-1]) for name, g in groups.items()}
    supported_games = {g["slug"]: g["version_group"]
                       for g in json_read(inventory(root, "game-membership.json"))}
    supported_groups = set(supported_games.values())
    require(len(forms) == 1351 and len(species) == 1025 and len(chains) == 540 and len(supported_games) == 38,
            "Unexpected Phase 9B-2 input")

    unresolved = [f for f in forms if not f["is_default"] and not f["direct_game_indices"]
                  and not f["encounter_methods_by_game"]]
    require(len(unresolved) == 245, "Expected the exact Phase 9B-2 cohort")
    species_by_id = {s["national_id"]: s for s in species}
    default_by_species = {f["base_species_id"]: f for f in forms if f["is_default"]}
    dispositions = []
    for form in unresolved:
        pid, sid = form["pokemon_id"], form["base_species_id"]
        pokemon = detail("pokemon", pid)
        require(not pokemon["game_indices"] and not detail("pokemon", pid)["is_default"], f"Form {pid}")
        require(not raw(source("pokemon", pid).replace("index.json", "encounters/index.json")), f"Encounter {pid}")
        held_by_game = sorted({v["version"]["name"] for item in pokemon["held_items"]
                               for v in item["version_details"] if v["rarity"] > 0})
        require(all(name in versions for name in held_by_game), f"Form version {pid}")
        learnset_groups = sorted(form["learnset_slots_by_group"])
        metadata = [detail("pokemon-form", fid) for fid in form["pokemon_form_ids"]]
        mechanics = [{"pokemon_form_id": m["id"], "is_mega": m["is_mega"], "battle_only": m["is_battle_only"],
                      "conditions": m["trigger_conditions"], "version_group": m["version_group"]}
                     for m in metadata if m["is_battle_only"] or m["is_mega"] or m["trigger_conditions"]]
        types = []
        if held_by_game:
            types.append("VERSION_SPECIFIC_RECORD")
        if learnset_groups:
            types.append("VERSION_GROUP_LEARNSET")
        if mechanics:
            types.append("GAME_SPECIFIC_MECHANIC")
        if not types:
            types.append("NO_VERIFIABLE_EVIDENCE")
        types.append("INHERITED_BASE_SPECIES_REFERENCE")
        dispositions.append(dict(form_id=pid, form_name=form["name"], base_species_id=sid,
                                 base_species=form["base_species"], base_generation=form["base_generation"],
                                 classification=form["classification"], evidence_types=types,
                                 games_supported_by_form_specific_record=held_by_game,
                                 introduction_groups=form["introduction_version_groups"],
                                 learnset_groups=learnset_groups, mechanic_records=mechanics,
                                 base_game_index_context=default_by_species[sid]["direct_game_indices"],
                                 base_evolution_chain=species_by_id[sid]["evolution_chain_id"],
                                 confidence="HIGH_SOURCE_RECORD_LIMITED_AVAILABILITY_SCOPE" if held_by_game
                                 else "GROUP_OR_CONTEXT_ONLY",
                                 remaining_uncertainty="Native availability, wild catchability and event/transfer require explicit evidence",
                                 **finding(form["source_file"], "Direct form-specific game evidence where available",
                                           {"game_indices": [], "encounters": [], "held_item_versions": held_by_game},
                                           "PARTIALLY_VERIFIED" if held_by_game else "UNVERIFIED",
                                           "Review version-specific mechanics and primary game evidence; never copy the base species games")))

    move_by_id = {}
    move_gen = {}
    machine_pairs = set()
    for item in catalog("move"):
        move = resource(item)
        mid = move["id"]
        move_by_id[mid] = move["name"]
        move_gen[mid] = int(move["generation"]["url"].strip("/").split("/")[-1])
        for entry in move["machines"]:
            machine = resource(entry["machine"])
            require(machine["move"]["name"] == move["name"] and machine["version_group"] == entry["version_group"],
                    f"Machine relationship {mid}/{machine['id']}")
            machine_pairs.add((mid, entry["version_group"]["name"]))

    method_names = {m["name"] for m in catalog("move-learn-method")}
    group_methods = {name: {m["name"] for m in group["move_learn_methods"]} for name, group in groups.items()}
    learnset_issues = []
    learnset_totals = defaultdict(Counter)

    def learn_issue(pid, mid, group, method, level, code, expected, actual, status="FIELD_MISMATCH"):
        learnset_issues.append(dict(pokemon_id=pid, move_id=mid, version_group=group, method=method,
                                   level=level, issue=code, **finding(source("pokemon", pid), expected, actual, status,
                                   "Review the pinned Pokémon/move and version-group records before proposing changes")))

    for form in forms:
        pid = form["pokemon_id"]
        p = detail("pokemon", pid)
        seen = set()
        counted_groups = set()
        for entry in p["moves"]:
            mid = int(entry["move"]["url"].strip("/").split("/")[-1])
            for d in entry["version_group_details"]:
                group = d["version_group"]["name"]
                method = d["move_learn_method"]["name"]
                level = d["level_learned_at"]
                key = (mid, group, method, level, d.get("enhancement_level"))
                learnset_totals[group]["rows"] += 1
                learnset_totals[group][f"method:{method}"] += 1
                counted_groups.add(group)
                if key in seen:
                    learn_issue(pid, mid, group, method, level, "REPEATED_SEMANTIC_KEY", 1, 2)
                seen.add(key)
                if mid not in move_by_id or entry["move"]["name"] != move_by_id.get(mid):
                    learn_issue(pid, mid, group, method, level, "INVALID_MOVE_REFERENCE", move_by_id.get(mid), entry["move"])
                if group not in groups or method not in method_names:
                    learn_issue(pid, mid, group, method, level, "UNKNOWN_GROUP_OR_METHOD", "Pinned references", [group, method])
                elif method not in group_methods[group]:
                    learn_issue(pid, mid, group, method, level, "METHOD_NOT_LISTED_FOR_GROUP", sorted(group_methods[group]),
                                method, "UNVERIFIED")
                if not isinstance(level, int) or not 0 <= level <= 100:
                    learn_issue(pid, mid, group, method, level, "INVALID_LEVEL_RANGE", "0–100", level)
                if mid in move_gen and group in group_gen and move_gen[mid] > group_gen[group]:
                    learn_issue(pid, mid, group, method, level, "MOVE_INTRODUCED_LATER", group_gen[group], move_gen[mid],
                                "UNVERIFIED")
                if method == "machine" and (mid, group) not in machine_pairs:
                    learn_issue(pid, mid, group, method, level, "MACHINE_MAPPING_NOT_PRESENT",
                                "Move + version-group machine relationship", None, "SOURCE_NOT_PROVIDED")
        for group in counted_groups:
            learnset_totals[group]["pokemon_with_rows"] += 1
        exact_games = set(form["direct_game_indices"]) | set(form["encounter_methods_by_game"])
        for group in sorted({supported_games[g] for g in exact_games if g in supported_games} - counted_groups):
            learn_issue(pid, None, group, None, None, "GAME_RECORD_WITHOUT_GROUP_LEARNSET",
                        "Check whether a learnset is supplied for this group",
                        sorted(g for g in exact_games if supported_games.get(g) == group), "SOURCE_NOT_PROVIDED")
    learn_groups = [dict(version_group=name, generation=group_gen[name],
                         supported_games=sorted(g for g, group in supported_games.items() if group == name),
                         slots=learnset_totals[name]["rows"], pokemon_with_rows=learnset_totals[name]["pokemon_with_rows"],
                         methods={k.split(":", 1)[1]: v for k, v in sorted(learnset_totals[name].items()) if k.startswith("method:")},
                         **finding(source("version-group", groups[name]["id"]), "Form-level rows independent by version group",
                                   learnset_totals[name]["rows"], "VERIFIED_REFERENCE_ONLY", "Compare stored rows only after DB approval"))
                    for name in sorted(groups)]

    evolution_edges = []
    evolution_issues = []
    condition_keys = Counter()
    optional_refs = ("trigger", "item", "held_item", "location", "known_move", "known_move_type", "party_species",
                     "party_type", "trade_species", "version_group", "region", "required_pokemon_form",
                     "evolved_pokemon_form", "used_move")
    branch_nodes = 0
    conditional_methods = 0

    def visit(chain_id, node, parent=None, path=()):
        nonlocal branch_nodes, conditional_methods
        child = int(node["species"]["url"].strip("/").split("/")[-1])
        require(child not in path and species_by_id[child]["canonical_name"] == node["species"]["name"], f"Evolution {chain_id}")
        branch_nodes += int(len(node["evolves_to"]) > 1)
        if parent is not None:
            details = node["evolution_details"]
            conditional_methods += len(details)
            record = source("evolution-chain", chain_id)
            if not details:
                evolution_issues.append(dict(chain_id=chain_id, to_species_id=child, issue="CONDITIONS_NOT_PROVIDED",
                                             **finding(record, "Conditions if documented", [], "SOURCE_NOT_PROVIDED",
                                                       "Keep edge and investigate the missing condition source")))
            for d in details:
                condition_keys.update(k for k, v in d.items() if v is not None and v != "" and v is not False)
                for field in optional_refs:
                    linked = d.get(field)
                    if not isinstance(linked, dict) or not linked.get("url"):
                        continue
                    linked_path = resource_path(linked["url"])
                    if linked_path not in blobs:
                        evolution_issues.append(dict(chain_id=chain_id, to_species_id=child, issue="CONDITION_REFERENCE_NOT_PROVIDED",
                                                     **finding(record, linked, None, "SOURCE_NOT_PROVIDED", "Retain the original condition")))
                    else:
                        target = raw(linked_path)
                        if target.get("name") != linked.get("name"):
                            evolution_issues.append(dict(chain_id=chain_id, to_species_id=child, issue="CONDITION_REFERENCE_NAME",
                                                         **finding(record, linked, target.get("name"), "FIELD_MISMATCH",
                                                                   "Reconcile source reference before interpreting the condition")))
                if d.get("min_level") is not None and not 1 <= d["min_level"] <= 100:
                    evolution_issues.append(dict(chain_id=chain_id, to_species_id=child, issue="INVALID_MIN_LEVEL",
                                                 **finding(record, "1–100", d["min_level"], "FIELD_MISMATCH", "Verify upstream condition")))
            evolution_edges.append(dict(chain_id=chain_id, from_species_id=parent, to_species_id=child, depth=len(path),
                                        conditions=details,
                                        **finding(record, "One edge with all version/form-specific conditions",
                                                  len(details), "VERIFIED_REFERENCE_ONLY" if details else "SOURCE_NOT_PROVIDED",
                                                  "Preserve branches, nulls, absent fields and alternative condition records")))
        for evolved in node["evolves_to"]:
            visit(chain_id, evolved, child, (*path, child))

    for chain in chains:
        cid = chain["chain_id"]
        visit(cid, detail("evolution-chain", cid)["chain"])

    assets = list(csv.DictReader(inventory(root, "assets.csv").open()))
    missing_assets = []
    identical = defaultdict(list)
    for row in assets:
        asset = root / row["source_file"]
        ids = json.loads(row["pokemon_ids"])
        if row["verification_status"] == "MISSING":
            require(not asset.exists(), f"Unexpected asset drift {asset}")
            fallbacks = [{"pokemon_id": pid, "pinned_url": form["artwork"]["front_default" if row["mode"] == "normal" else "front_shiny"]}
                         for pid in ids for form in forms if form["pokemon_id"] == pid]
            missing_assets.append(dict(mode=row["mode"], name=row["expected_name"], pokemon_ids=ids, reference_fallbacks=fallbacks,
                                       **finding(row["source_file"], "Local WebP at expected path", None, "MISSING_LOCAL_FILE",
                                                 "Review pinned artwork candidate and serving policy; obtain owner approval before adding a file")))
        elif row["sha256"]:
            data = asset.read_bytes()
            require(hashlib.sha256(data).hexdigest() == row["sha256"] and len(data) == int(row["bytes"]), str(asset))
            identical[row["sha256"]].append(dict(path=row["source_file"], mode=row["mode"], pokemon_ids=ids,
                                                 bytes=int(row["bytes"]), width=int(row["width"]), height=int(row["height"])))
    duplicate_assets = []
    suspect_assets = []
    for digest, objects in sorted(identical.items()):
        if len(objects) < 2:
            continue
        modes = {obj["mode"] for obj in objects}
        shared_ids = set(objects[0]["pokemon_ids"]).intersection(*(obj["pokemon_ids"] for obj in objects))
        cross_mode = len(modes) > 1
        category = ("CROSS_NORMAL_SHINY_REVIEW" if cross_mode else
                    "SAME_POKEMON_ALIAS" if shared_ids else "DISTINCT_POKEMON_REVIEW")
        candidate = dict(sha256=digest, category=category, files=objects,
                         **finding([obj["path"] for obj in objects], "Verify intended artwork for each slot",
                                   len(objects), "VERIFIED_BYTES_VISUAL_UNVERIFIED",
                                   "Review artwork visually and confirm mapping before any change"))
        duplicate_assets.append(candidate)
        if cross_mode or not shared_ids:
            suspect_assets.append(candidate)
    require(Counter(a["mode"] for a in missing_assets) == {"normal": 47, "shiny": 49}
            and len(duplicate_assets) == 39, "Asset baseline drift")

    dex_rows = list(csv.DictReader(inventory(root, "regional-entries.csv").open()))
    cases = {
        "victini": [r for r in dex_rows if r["national_id"] == "494" and r["dex_slug"] in ("original-unova", "updated-unova")],
        "oras": [r for r in dex_rows if r["dex_slug"] in ("hoenn", "updated-hoenn")],
        "legends-za": [r for r in dex_rows if r["dex_slug"] in ("lumiose-city", "hyperspace")],
    }
    require([len(rows) for rows in cases.values()] == [2, 413, 364], "Special regional cases")

    def unverified_db(scope, identifier, ref, expected):
        return dict(scope=scope, identifier=identifier, **finding(
            ref, expected, None, "UNVERIFIED", "Run approved SELECT against staging or restored backup and compare by key"))

    db_rows = [unverified_db("species", s["national_id"], s["source_file"], s["canonical_name"]) for s in species]
    db_rows += [unverified_db("regional_entry", f'{r["dex_slug"]}/{r["national_id"]}', r["source_file"],
                              int(r["entry_number"])) for r in dex_rows]
    db_rows += [unverified_db("variety", f["pokemon_id"], f["source_file"], f["base_species_id"]) for f in forms]
    db_rows += [unverified_db("game", game, source("version", versions[game]["id"]), group)
                for game, group in supported_games.items()]

    out.mkdir(parents=True, exist_ok=False)
    for name, rows in cases.items():
        table(name, [unverified_db(name, f'{r["dex_slug"]}/{r["national_id"]}', r["source_file"],
                                  {"number": int(r["entry_number"]), "species": r["species"]}) for r in rows])
    for name, rows in (("database-row-status", db_rows), ("alternate-form-evidence", dispositions),
                       ("learnset-groups", learn_groups), ("learnset-discrepancies", learnset_issues),
                       ("evolution-discrepancies", evolution_issues), ("missing-assets", missing_assets)):
        if rows:
            table(name, rows)
        else:
            dump(name, rows)
    dump("evolution-conditions", evolution_edges)
    dump("duplicate-assets", duplicate_assets)
    dump("suspected-wrong-artwork", suspect_assets)
    summary = dict(snapshot=SNAPSHOT, tree=TREE, source_revision=BASE,
                   database=dict(status="UNVERIFIED", target=None, queried_rows=0, discrepancy_counts=None,
                                 expected_keys_listed=len(db_rows)),
                   forms=dict(cohort=len(dispositions), with_version_specific_record=sum(bool(r["games_supported_by_form_specific_record"]) for r in dispositions),
                              with_group_learnset=sum(bool(r["learnset_groups"]) for r in dispositions),
                              with_mechanics_metadata=sum(bool(r["mechanic_records"]) for r in dispositions),
                              disposition_counts=Counter(r["verification_status"] for r in dispositions)),
                   learnsets=dict(groups=len(learn_groups), supported_groups=len(supported_groups),
                                  supported_slots=sum(r["slots"] for r in learn_groups if r["supported_games"]),
                                  slots=sum(r["slots"] for r in learn_groups),
                                  issues=Counter(row["issue"] for row in learnset_issues)),
                   evolutions=dict(trees=len(chains), edges=len(evolution_edges), branching_nodes=branch_nodes,
                                   condition_records=conditional_methods, condition_fields=dict(sorted(condition_keys.items())),
                                   issues=Counter(row["issue"] for row in evolution_issues)),
                   assets=dict(missing=Counter(a["mode"] for a in missing_assets),
                               duplicate_groups=len(duplicate_assets), suspects=len(suspect_assets),
                               duplicate_categories=Counter(a["category"] for a in duplicate_assets)))
    dump("summary", summary)
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main(*(Path(arg).resolve() for arg in sys.argv[1:]))
