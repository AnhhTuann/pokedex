import { readFileSync } from 'node:fs';
import type { Finding } from './types.js';

export interface SchemaField {
  name: string;
  type: string;
  list: boolean;
  optional: boolean;
  line: number;
  relation?: {
    name?: string;
    fields: string[];
    references: string[];
  };
}

export interface SchemaModel {
  name: string;
  fields: SchemaField[];
  line: number;
}

export interface SchemaMap {
  models: Map<string, SchemaModel>;
  relations: Array<{
    model: string;
    field: string;
    target: string;
    fields: string[];
    references: string[];
    name?: string;
    line: number;
  }>;
}

const clean = (line: string) => line.replace(/\/\/.*$/, '').trim();

export function parsePrismaSchema(source: string): SchemaMap {
  const models = new Map<string, SchemaModel>();
  const relations: SchemaMap['relations'] = [];
  const modelRe = /model\s+(\w+)\s*\{([\s\S]*?)\n\}/g;
  let match: RegExpExecArray | null;

  while ((match = modelRe.exec(source)) !== null) {
    const name = match[1];
    const bodyStartLine = source.slice(0, match.index).split('\n').length;
    const fields: SchemaField[] = [];
    let localIndex = 0;
    for (const raw of match[2].split('\n')) {
      localIndex += 1;
      const line = clean(raw);
      if (!line || line.startsWith('@@')) continue;
      const fieldMatch = line.match(/^(\w+)\s+(\w+)(\[\])?(\?)?/);
      if (!fieldMatch) continue;
      const [, fieldName, rawType, list, optional] = fieldMatch;
      const field: SchemaField = {
        name: fieldName,
        type: rawType,
        list: Boolean(list),
        optional: Boolean(optional),
        line: bodyStartLine + localIndex,
      };
      const relMatch = line.match(/@relation\(([^)]*)\)/);
      if (relMatch) {
        const attrs = relMatch[1];
        const nameMatch = attrs.match(/"([^"]+)"/);
        const fieldsMatch = attrs.match(/fields:\s*\[([^\]]*)\]/);
        const refsMatch = attrs.match(/references:\s*\[([^\]]*)\]/);
        field.relation = {
          name: nameMatch?.[1],
          fields: fieldsMatch
            ? fieldsMatch[1].split(',').map((s) => s.trim()).filter(Boolean)
            : [],
          references: refsMatch
            ? refsMatch[1].split(',').map((s) => s.trim()).filter(Boolean)
            : [],
        };
        relations.push({
          model: name,
          field: fieldName,
          target: rawType,
          fields: field.relation.fields,
          references: field.relation.references,
          name: field.relation.name,
          line: field.line,
        });
      }
      fields.push(field);
    }
    models.set(name, { name, fields, line: bodyStartLine });
  }
  return { models, relations };
}

export function auditSchema(schemaPath: string): { findings: Finding[]; map: SchemaMap } {
  const source = readFileSync(schemaPath, 'utf8');
  const displayPath = schemaPath.includes('pokedex-backend/')
    ? `pokedex-backend/${schemaPath.split('pokedex-backend/')[1]}`
    : schemaPath;
  const map = parsePrismaSchema(source);
  const findings: Finding[] = [];
  const push = (f: Omit<Finding, 'id' | 'phase'> & { id: string }) =>
    findings.push({ phase: 'INVENTORY', ...f });

  const pokemonRelations = map.relations.filter((r) => r.target === 'Pokemon');
  const byReference = new Map<string, string[]>();
  for (const r of pokemonRelations) {
    const ref = r.references.join(',') || '(none)';
    byReference.set(ref, [...(byReference.get(ref) ?? []), `${r.model}.${r.field}`]);
  }
  if (byReference.size > 1) {
    push({
      id: 'SCHEMA-FK-INCONSISTENT',
      area: 'relations',
      entity: 'Pokemon foreign keys',
      classification: 'INCORRECT',
      severity: 'high',
      message:
        'Relations to Pokemon reference different target fields. Mixing Pokemon.id and Pokemon.pokedexNumber is an ID-contract hazard for writes and joins.',
      evidence: [...byReference.entries()].map(
        ([ref, fields]) => `references ${ref}: ${fields.join(', ')}`,
      ),
      sources: [displayPath],
      runtimeRequired: true,
      recommendation:
        'Choose one stable target (prefer Pokemon.id surrogate key) and migrate all references with a verified mapping; keep pokedexNumber unique for public API identity.',
    });
  }

  const requiredModels = [
    { name: 'Nature', why: 'NatureDex is requested but no model exists.' },
    { name: 'GameVersion', why: 'Game-specific rules and walkthroughs use free-text version slugs.' },
    { name: 'Region', why: 'Regional dex membership is stored as string arrays.' },
    {
      name: 'TypeEffectiveness',
      why: 'Type chart is code-only; no per-generation rules can be stored or audited in DB.',
    },
  ];
  for (const { name, why } of requiredModels) {
    if (!map.models.has(name)) {
      push({
        id: `SCHEMA-MODEL-MISSING-${name.toUpperCase()}`,
        area: 'models',
        entity: name,
        classification: 'MISSING',
        severity: name === 'Nature' || name === 'GameVersion' ? 'medium' : 'low',
        message: `No ${name} model. ${why}`,
        evidence: [`models present: ${[...map.models.keys()].join(', ')}`],
        sources: [displayPath],
      });
    }
  }

  const pokemonMove = map.models.get('PokemonMove');
  if (pokemonMove && !pokemonMove.fields.some((f) => /version/i.test(f.name))) {
    push({
      id: 'SCHEMA-LEARNSET-NO-VERSION',
      area: 'game-specific',
      entity: 'PokemonMove',
      classification: 'MISSING',
      severity: 'high',
      message:
        'Learnsets have no version/version-group dimension; the same move cannot be distinguished between games where it is or is not learnable.',
      evidence: [`PokemonMove fields: ${pokemonMove.fields.map((f) => f.name).join(', ')}`],
      sources: [displayPath],
      recommendation: 'Add versionGroup (and ideally learnMethod detail) with a stable FK.',
    });
  }

  const evolution = map.models.get('Evolution');
  if (evolution && !evolution.fields.some((f) => /trigger|level|item|condition/i.test(f.name))) {
    push({
      id: 'SCHEMA-EVOLUTION-NO-CONDITION',
      area: 'evolution',
      entity: 'Evolution',
      classification: 'MISSING',
      severity: 'medium',
      message:
        'Evolution stores only from/to IDs; triggers, levels, held items, friendship, time and version-specific conditions cannot be represented.',
      evidence: [`Evolution fields: ${evolution.fields.map((f) => f.name).join(', ')}`],
      sources: [displayPath],
    });
  }

  const variety = map.models.get('PokemonVariety');
  if (variety && !variety.fields.some((f) => /gigantamax/i.test(f.name))) {
    push({
      id: 'SCHEMA-VARIETY-NO-GIGANTAMAX',
      area: 'forms',
      entity: 'PokemonVariety',
      classification: 'MISSING',
      severity: 'medium',
      message:
        'Forms model has isMega/isAlternative but no Gigantamax flag or form-specific stats; form identity is incomplete.',
      evidence: [`PokemonVariety fields: ${variety.fields.map((f) => f.name).join(', ')}`],
      sources: [displayPath],
    });
  }

  const encounter = map.models.get('Encounter');
  if (encounter) {
    const stringFks = encounter.fields
      .filter((f) => /locationName|versionName/.test(f.name) && f.type === 'String')
      .map((f) => f.name);
    if (stringFks.length) {
      push({
        id: 'SCHEMA-ENCOUNTER-STRING-FK',
        area: 'encounters',
        entity: 'Encounter',
        classification: 'INCORRECT',
        severity: 'medium',
        message: 'Encounters reference locations and versions by free text instead of stable FKs.',
        evidence: [`string fields: ${stringFks.join(', ')}`],
        sources: [displayPath],
      });
    }
  }

  const walkthrough = map.models.get('Walkthrough');
  if (walkthrough?.fields.some((f) => f.name === 'gameVersion' && f.type === 'String')) {
    push({
      id: 'SCHEMA-WALKTHROUGH-UNVALIDATED-VERSION',
      area: 'walkthrough',
      entity: 'Walkthrough.gameVersion',
      classification: 'INCORRECT',
      severity: 'low',
      message:
        'Walkthrough gameVersion is free text; unsupported or misspelled slugs cannot be rejected by DB constraints.',
      evidence: ['gameVersion String (no FK / enum)'],
      sources: [displayPath],
    });
  }

  const item = map.models.get('Item');
  if (item && !map.relations.some((r) => r.target === 'Item')) {
    push({
      id: 'SCHEMA-ITEM-ISOLATED',
      area: 'items',
      entity: 'Item',
      classification: 'UNVERIFIED',
      severity: 'low',
      message:
        'Item has no relations to Pokemon, moves, encounters or game versions; item usage/availability cannot be modeled.',
      evidence: ['no @relation referencing Item'],
      sources: [displayPath],
      runtimeRequired: false,
    });
  }

  return { findings, map };
}
