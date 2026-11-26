"""Generate Phase 9B reference coverage from a verified cache and offline audit."""
from collections import Counter
import csv
import hashlib
import json
from pathlib import Path
import re
import sys

from PIL import Image


def load(path):
    return json.loads(path.read_bytes())


def table(headers, rows):
    lines = ["| " + " | ".join(headers) + " |", "|" + "---|" * len(headers)]
    lines.extend("| " + " | ".join(str(cell).replace("|", " / ") for cell in row) + " |" for row in rows)
    return "\n".join(lines) + "\n"


def main(cache, report, docs, assets):
    manifest = load(cache / "manifest.json")
    audit = load(report / "audit.json")
    ref = audit["reference"]
    revision = manifest["commit"]
    checkpoint = load(cache / "pokeapi/checkpoints" / f'{manifest["catalogKey"]}.json')
    records = list(checkpoint["records"].values())
    if (manifest["provenance"] != "RECONSTRUCTED_FROM_IMMUTABLE_SNAPSHOT"
            or sorted(checkpoint["completedIds"]) != list(range(1, 1026))
            or checkpoint["failed"] or ref["apiErrors"] or audit["db"]["connected"]):
        raise ValueError("Expected a complete, reconstructed offline audit")

    entries = {row["request"]: row for row in manifest["entries"]}

    def payload(request):
        entry = entries[request]
        raw = (cache / "pokeapi" / f'{entry["cacheKey"]}.json').read_bytes()
        if hashlib.sha256(raw).hexdigest() != entry["sha256"]:
            raise ValueError(f"Cache checksum mismatch: {request}")
        return json.loads(raw)

    def write_doc(name, title, context, headers, rows):
        (docs / f"{name}.md").write_text(
            f"# {title}\n\nRevision PokéAPI: `{revision}`. DB row-level: **UNVERIFIED**.\n\n"
            + context + "\n\n" + table(headers, rows), encoding="utf-8",
        )

    def write_csv(name, headers, rows):
        with (report / name).open("w", encoding="utf-8", newline="") as stream:
            writer = csv.writer(stream)
            writer.writerow(headers)
            writer.writerows(rows)

    counts = ["Kỳ vọng", "Tham chiếu", "Thiếu", "Trùng", "Không hợp lệ", "Chưa xác minh"]
    by_id = {row["id"]: row for row in records}
    generation_rows = []
    for gen in ref["generations"]:
        number = gen["generation"]
        expected = gen["speciesIds"]
        actual = {row["id"] for row in records if row["generation"] == number}
        generation_rows.append((number, len(expected), len(actual), len(set(expected) - actual),
                                len(expected) - len(set(expected)), len(actual - set(expected)), 0))
    write_doc("generation-coverage", "Độ phủ Generation I–IX",
              "Đối chiếu danh sách species từ endpoint generation với generation trên từng species.", ["Gen", *counts], generation_rows)

    dex_rows = []
    dex_entries = []
    members_by_dex = {}
    snapshot_dexes = {}
    for dex in ref["pokedexes"]:
        slug = dex["name"]
        detail = payload(f"/pokedex/{slug}")
        pairs = [(entry["entry_number"], int(entry["pokemon_species"]["url"].strip("/").split("/")[-1]),
                  entry["pokemon_species"]["name"]) for entry in detail["pokemon_entries"]]
        numbers = Counter(number for number, _, _ in pairs)
        species = Counter(species_id for _, species_id, _ in pairs)
        invalid = sum(
            number < 0 or by_id.get(species_id, {}).get("name") != name
            or (slug == "national" and number != species_id)
            for number, species_id, name in pairs
        )
        duplicate = sum(numbers[number] > 1 or species[species_id] > 1 for number, species_id, _ in pairs)
        gaps = len(set(range(1, max(numbers, default=0) + 1)) - set(numbers))
        dex_rows.append((slug, dex["entryCount"], len(pairs), max(0, dex["entryCount"] - len(pairs)),
                         duplicate, invalid, 0, gaps))
        dex_entries.extend((revision, slug, number, species_id, name) for number, species_id, name in pairs)
        members_by_dex[slug] = set(species)
        snapshot_dexes[slug] = detail
    write_doc("regional-dex-coverage", "Độ phủ 35 Pokédex",
              "Kỳ vọng lấy từ số entry lịch sử đã đối chiếu. Trùng đếm số dòng có số thứ tự hoặc species lặp trong cùng dex. "
              "Cột gián đoạn đo số entry number vắng trong khoảng 1–max, giữ nguyên numbering gốc. "
              "Số 0 hợp lệ cho Victini trong hai dex Unova. Entry numbers trong CSV `reconstructed-regional-entries.csv` được dựng từ snapshot. Báo cáo cũ chỉ lưu membership.",
              ["Pokédex", *counts, "Gián đoạn số"], dex_rows)
    write_csv("reconstructed-regional-entries.csv", ["revision", "pokedex", "entry_number", "species_id", "species"], dex_entries)

    form_rows = []
    form_groups = Counter()
    for row in records:
        species = payload(f'/pokemon-species/{row["id"]}')
        for variety in species["varieties"]:
            detail = payload(variety["pokemon"]["url"])
            name = detail["name"]
            if variety["is_default"]:
                category = "Default"
            elif re.search(r"-mega(?:-|$)", name):
                category = "Mega"
            elif name.endswith("-gmax"):
                category = "Gigantamax"
            elif re.search(r"-(alola|galar|hisui|paldea)(?:-|$)", name):
                category = "Regional"
            else:
                category = "Other alternate"
            form_groups[category] += 1
            games = sorted({entry["version"]["name"] for entry in detail["game_indices"]})
            learnsets = sorted({v["version_group"]["name"] for move in detail["moves"]
                               for v in move["version_group_details"]})
            form_rows.append((revision, row["id"], detail["id"], name, category, "|".join(games), "|".join(learnsets)))
    write_csv("reconstructed-forms.csv", ["revision", "species_id", "pokemon_id", "pokemon", "category",
                                        "game_indices", "learnset_version_groups"], form_rows)
    no_game_index = Counter(row[4] for row in form_rows if not row[5])
    write_doc("forms-coverage", "Độ phủ species và Pokemon varieties",
              "Mỗi variety đã được kiểm tra ID, slug và liên kết ngược tới species. Các nhãn phân loại ngoài default dựa trên slug. "
              "Một dòng Pokémon có thể chứa các biến thể mỹ thuật ngoài phạm vi catalog Pokémon varieties. "
              "Cột Chưa xác minh của các dòng form đếm form không có game index, kể cả khi có learnset theo version group.",
              ["Nhóm", *counts],
              [("Species", 1025, len(records), 0, 0, 0, 0),
               ("Pokémon varieties", 1351, len(form_rows), 0, 0, 0, sum(no_game_index.values())),
               *((label, "—", number, "—", 0, 0, no_game_index[label]) for label, number in sorted(form_groups.items()))])

    games = audit["source"]["supportedVersions"]
    versions = {row["name"]: row for row in ref["versions"]}
    indexed_forms = Counter(game for row in form_rows for game in row[5].split("|") if game)
    game_rows = []
    for row in ref["gameAudit"]:
        game = row["game"]
        version_group = row["versionGroup"]
        learnset_forms = sum(version_group in form[6].split("|") for form in form_rows)
        official = sorted(name for name, detail in snapshot_dexes.items()
                          if any(group["name"] == version_group for group in detail["version_groups"]))
        official_species = set().union(*(members_by_dex[name] for name in official))
        game_rows.append((game, 1, int(game in versions), int(game not in versions), games.count(game)-1,
                          int(not row["generation"] or not version_group), int(row["status"] == "UNVERIFIED"),
                          row["generation"], version_group, ", ".join(official), len(official_species),
                          row["regionalDex"], row["dexSpeciesChecked"], indexed_forms[game], learnset_forms,
                          row["learnsetMoveSlots"], row["encounterSpecies"]))
    write_doc("game-version-coverage", "Độ phủ 38 game hỗ trợ",
              "Kỳ vọng là một version reference cho mỗi slug cấu hình. Chưa xác minh ghi các game audit còn trạng thái UNVERIFIED. "
              "Dex tham chiếu liên kết theo version group, còn Dex app là mapping truy vấn. Hợp membership dex không đồng nghĩa khả năng bắt. "
              "Form game index theo version riêng, learnset theo version group. Số slot là thống kê species mặc định từ pipeline.",
              ["Game", *counts, "Gen", "Version group", "Dex tham chiếu", "Species Dex", "Dex app", "Species Dex app",
               "Forms game index", "Forms learnset VG", "Move slot", "Species encounter"], game_rows)

    expected_names = {name for row in records for name in [row["name"], *row["varieties"]]}
    asset_rows = []
    asset_summary = []
    for mode in ("normal", "shiny"):
        directory = assets / mode
        actual = missing = invalid = 0
        for name in sorted(expected_names):
            path = directory / f"{name}.webp"
            status = "VALID"
            if not path.is_file():
                missing += 1
                status = "MISSING"
            else:
                actual += 1
                try:
                    with Image.open(path) as image:
                        if image.format != "WEBP":
                            raise ValueError("Expected WebP")
                        image.load()
                except (OSError, ValueError):
                    invalid += 1
                    status = "INVALID"
            asset_rows.append((revision, mode, name, status))
        extras = len({path.stem for path in directory.glob("*.webp")} - expected_names)
        asset_summary.append((mode, len(expected_names), actual, missing, 0, invalid, 0, extras))
    write_csv("reconstructed-asset-validation.csv", ["revision", "mode", "name", "status"], asset_rows)
    write_doc("asset-coverage", "Độ phủ WebP Normal và Shiny",
              "Kỳ vọng lấy hợp tên species và variety theo quy tắc đặt tên file hiện tại. Đã giải mã từng file khớp bằng Pillow. "
              "File ngoài tập tên kỳ vọng có thể là asset riêng của ứng dụng. Trạng thái HTTP của remote URL và URL lưu trong DB chưa xác minh.",
              ["Asset", *counts, "WebP ngoài tập"], asset_summary)


if __name__ == "__main__":
    main(*(Path(arg).resolve() for arg in sys.argv[1:]))
