"""Build the offline catalog from committed, pinned audit projections.

Optionally pass a directory of pinned Pokémon JSON payloads to build move shards.
"""
import csv
import gzip
import io
import hashlib
import json
import subprocess
import sys
from collections import Counter, defaultdict
from pathlib import Path

backend = Path(__file__).resolve().parents[1]
coverage = backend / 'audit/reports/phase9b-coverage'
review = backend / 'audit/reports/phase9b3'
contract = backend.parent / 'docs/data-readiness/phase9b4'
output = backend / 'data/reference'
output.mkdir(parents=True, exist_ok=True)
snapshot = '508fd7c3a7d54ac175e00afe420b11a5af983bd6'
inputs = {}

def read(path, as_csv=False):
    data = path.read_bytes()
    inputs[str(path.relative_to(backend.parent))] = hashlib.sha256(data).hexdigest()
    return list(csv.DictReader(io.StringIO(data.decode()))) if as_csv else json.loads(data)

def encode(data):
    return json.dumps(data, ensure_ascii=False, separators=(',', ':'), sort_keys=True).encode()

catalog = read(contract / 'catalog-contract.json')
assert catalog['snapshot'] == snapshot
assets = {}
remediation = []
def queue(mode, path, ids, reason, sha=None):
    remediation.append(dict(mode=mode, path=path, pokemonIds=ids, reason=reason, sha256=sha))
    for pid in ids:
        assets[pid, mode] = dict(path=None, status=reason)

for asset in read(coverage / 'assets.csv', True):
    ids = json.loads(asset['pokemon_ids'])
    if asset['actual_count'] == '1' and len(ids) == 1:
        assets[ids[0], asset['mode']] = dict(
            path='/'+asset['source_file'].split('/public/', 1)[1], status='LOCAL_UNREVIEWED')
for asset in read(review / 'missing-assets.csv', True):
    queue(asset['mode'], asset['source_record'], json.loads(asset['pokemon_ids']), 'MISSING')
for group in read(review / 'duplicate-assets.json'):
    for asset in group['files']:
        queue(asset['mode'], asset['path'], asset['pokemon_ids'], 'SHARED_UNVERIFIED', group['sha256'])
pending = {int(row['form_id']): row['verification_status']
           for row in read(review / 'alternate-form-evidence.csv', True)}
categories = dict(DEFAULT_FORM='DEFAULT', REGIONAL_FORM='REGIONAL', MEGA_FORM='MEGA',
                  GIGANTAMAX_FORM='GIGANTAMAX', BATTLE_FORM='BATTLE',
                  OTHER_ALTERNATE_FORM='OTHER', UNKNOWN_CLASSIFICATION='UNKNOWN')
source_forms = read(coverage / 'varieties.json')
species_by_form = {row['pokemon_id']:row['base_species_id'] for row in source_forms}
for item in remediation:
    item['subjects'] = [{'formId':pid, 'speciesId':species_by_form[pid]} for pid in item['pokemonIds']]
backlog = defaultdict(dict)
for row in read(contract / 'learnset-backlog.csv', True):
    backlog[int(row['pokemon_id'])][row['version_group']] = row['review_queue']
forms = []
for f in source_forms:
    assert f['snapshot_commit'] == snapshot
    pid = f['pokemon_id']
    forms.append(dict(id=pid, speciesId=f['base_species_id'], name=f['name'],
        speciesName=f['base_species'], generation=f['base_generation'],
        category=categories[f['classification']], types=f['types'], stats=f['stats'],
        abilities=f['abilities'], disposition=pending.get(pid),
        normal=assets.get((pid,'normal'),dict(path=None,status='MISSING')),
        shiny=assets.get((pid,'shiny'),dict(path=None,status='MISSING')),
        index=f['direct_game_indices'], encounter=f['encounter_methods_by_game'],
        wild=f['wild_encounter_versions'], giftOrTrade=f['documented_gift_or_trade_versions'],
        learnsetCounts=f['learnset_slots_by_group'], learnsetReview=backlog[pid]))
dex_entries = defaultdict(dict)
for row in read(coverage / 'regional-entries.csv', True):
    dex_entries[row['dex_slug']][int(row['national_id'])] = int(row['entry_number'])
species = {row['national_id']:row['evolution_chain_id'] for row in read(coverage / 'species.json')}
trees = {row['chain_id']:row['relationship'] for row in read(coverage / 'evolution-chains.json')}
groups = [row['version_group'] for row in read(review / 'learnset-groups.csv', True)]
assert len(forms) == 1351 and len(species) == 1025 and len(trees) == 540
assert Counter(pending.values()) == {'PARTIALLY_VERIFIED':52, 'UNVERIFIED':193}
detail_path = output / 'detail.json'
if len(sys.argv) > 2:
    detail_source = Path(sys.argv[2])
    detail = {}
    for form in forms:
        pid = form['id']
        row = json.loads((detail_source / f'pokemon-{pid}.json').read_text())
        assert row['id'] == pid
        detail[pid] = {key:row[key] for key in ('height','weight','cries') if key in row}
    descriptions = {}
    for pid in species:
        row = json.loads((detail_source / f'pokemon-species-{pid}.json').read_text())
        assert row['id'] == pid
        descriptions[pid] = row['description']
    detail_path.write_bytes(encode(dict(forms=detail, descriptions=descriptions)))
(output / 'catalog.json').write_bytes(encode(dict(snapshot=snapshot, schemaVersion=1, forms=forms,
    games=catalog['games'], dexes=catalog['dexes'], dexEntries=dex_entries, species=species,
    trees=trees, versionGroups=groups)))
(output / 'asset-remediation.json').write_bytes(encode(dict(snapshot=snapshot, entries=remediation)))

if len(sys.argv) > 1:
    source = Path(sys.argv[1]).resolve()
    is_checkout = (source / '.git').exists()
    if is_checkout:
        tree = subprocess.check_output(['git', '-C', source, 'rev-parse', f'{snapshot}^{{tree}}'], text=True).strip()
        assert tree == 'cf32c6147e9c1da51bc91d13616259b19e8d50b9'
    checkout_details = {}
    shards = defaultdict(dict)
    move_source_hash = hashlib.sha256()
    for form in forms:
        pid = form['id']
        raw = subprocess.check_output(['git', '-C', source, 'show',
            f'{snapshot}:data/api/v2/pokemon/{pid}/index.json']) if is_checkout else (source / f'{pid}.json').read_bytes()
        payload = json.loads(raw)
        assert payload['id'] == pid
        if is_checkout:
            checkout_details[pid] = {key:payload[key] for key in ('height','weight','cries') if key in payload}
        move_source_hash.update(encode([pid, payload['moves']]))
        slots = defaultdict(list)
        for move in payload['moves']:
            move_id = int(move['move']['url'].rstrip('/').rsplit('/', 1)[1])
            for detail in move['version_group_details']:
                group = detail['version_group']['name']
                slots[group].append([move_id, move['move']['name'], detail['move_learn_method']['name'],
                                     detail['level_learned_at'], detail.get('enhancement_level')])
        assert {group:len(rows) for group,rows in slots.items()} == form['learnsetCounts'], pid
        for group, rows in slots.items():
            shards[group][pid] = rows
    for group, shard in shards.items():
        assert group in groups
        (output / f'learnsets-{group}.json.gz').write_bytes(gzip.compress(encode(shard), mtime=0))

    if is_checkout and len(sys.argv) == 2:
        descriptions = {}
        for pid in species:
            payload = json.loads(subprocess.check_output(['git', '-C', source, 'show',
                f'{snapshot}:data/api/v2/pokemon-species/{pid}/index.json']))
            descriptions[pid] = next((item['flavor_text'].replace('\f', ' ').replace('\n', ' ')
                for item in payload['flavor_text_entries'] if item['language']['name'] == 'en'), None)
        detail_path.write_bytes(encode(dict(forms=checkout_details, descriptions=descriptions)))
    inputs['pinned-pokemon-moves'] = move_source_hash.hexdigest()
else:
    old_manifest = output / 'manifest.json'
    if old_manifest.exists():
        move_checksum = json.loads(old_manifest.read_text())['inputs'].get('pinned-pokemon-moves')
        if move_checksum:
            inputs["pinned-pokemon-moves"] = move_checksum

manifest = dict(snapshot=snapshot, sourceRevision='2cdfabc00894a05f0ce99071464e620898b986d3',
    inputs=inputs, files={p.name: hashlib.sha256(p.read_bytes()).hexdigest()
        for p in sorted(output.glob('*')) if p.name != 'manifest.json'})
(output / 'manifest.json').write_bytes(encode(manifest))
