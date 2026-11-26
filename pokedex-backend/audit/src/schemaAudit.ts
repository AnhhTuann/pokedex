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
  uniqueKeys: string[][];
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
    const uniqueKeys: string[][] = [];
    let localIndex = 0;
    for (const raw of match[2].split('\n')) {
      localIndex += 1;
      const line = clean(raw);
      const compoundKey = line.match(/^@@(?:id|unique)\(\s*\[([^\]]+)\]/);
      if (compoundKey) {
        uniqueKeys.push(compoundKey[1].split(',').map((field) => field.trim().split('(')[0]));
      }
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
      if (/(?:^|\s)@(?:id|unique)\b/.test(line.slice(fieldMatch[0].length))) {
        uniqueKeys.push([fieldName]);
      }
      fields.push(field);
    }
    models.set(name, { name, fields, line: bodyStartLine, uniqueKeys });
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

  const pokemon = map.models.get('Pokemon');
  const pokemonRelations = map.relations.filter((r) => r.target === 'Pokemon' && (r.references.length || r.fields.length));
  const invalidRelations = pokemonRelations.filter((relation) => {
    const local = map.models.get(relation.model);
    const key = pokemon?.uniqueKeys.some((fields) =>
      fields.length === relation.references.length &&
      fields.every((field) => relation.references.includes(field)),
    );
    return !key || relation.fields.length !== relation.references.length ||
      relation.references.some((reference, index) => {
        const target = pokemon?.fields.find((field) => field.name === reference);
        const field = local?.fields.find((field) => field.name === relation.fields[index]);
        return !target || !field || target.type !== field.type || target.list || field.list;
      });
  });
  if (invalidRelations.length) {
    push({
      id: 'SCHEMA-FK-INVALID-TARGET',
      area: 'relations',
      entity: 'Pokemon foreign keys',
      classification: 'INCORRECT',
      severity: 'high',
      message: 'Pokemon foreign keys must reference an existing unique key with matching field types.',
      evidence: invalidRelations.map((r) => `${r.model}.${r.field} references Pokemon(${r.references.join(', ')})`),
      sources: [displayPath],
    });
  }

  const optionalModels = [
    { name: 'Nature', why: 'NatureDex serves its fixed catalog from frontend code.' },
    { name: 'GameVersion', why: 'Game-specific rules and walkthroughs use free-text version slugs.' },
    { name: 'Region', why: 'Regional dex membership is stored as string arrays.' },
    {
      name: 'TypeEffectiveness',
      why: 'Type charts are maintained in application code.',
    },
  ];
  for (const { name, why } of optionalModels) {
    if (!map.models.has(name)) {
      push({
        id: `SCHEMA-MODEL-MISSING-${name.toUpperCase()}`,
        area: 'models',
        entity: name,
        classification: 'ACCEPTABLE_DESIGN',
        severity: 'info',
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
      classification: 'DESIGN_GAP',
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
      classification: 'DESIGN_GAP',
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
      classification: 'ACCEPTABLE_DESIGN',
      severity: 'info',
      message: 'PokemonVariety represents alternate forms without a dedicated Gigantamax flag.',
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
        classification: 'ACCEPTABLE_DESIGN',
        severity: 'medium',
        message: 'Encounter locations and versions use string slugs.',
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
      classification: 'ACCEPTABLE_DESIGN',
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
      classification: 'ACCEPTABLE_DESIGN',
      severity: 'low',
      message:
        'ItemDex uses a standalone item catalog. Version-specific item mapping requires separate review.',
      evidence: ['no @relation referencing Item'],
      sources: [displayPath],
      runtimeRequired: false,
    });
  }

  return { findings, map };
}
