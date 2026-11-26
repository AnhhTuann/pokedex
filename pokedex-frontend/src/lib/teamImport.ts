import type { TeamMember } from './teamStore';

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isName(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isMove(value: unknown): boolean {
  return isObject(value) && isName(value.name);
}

export function parseTeamImport(text: string): TeamMember[] {
  const value: unknown = JSON.parse(text);
  if (!Array.isArray(value) || value.length > 6) throw new Error('Select a JSON team with at most six members.');
  const ids = new Set<number>();
  for (const member of value) {
    if (!isObject(member) || typeof member.id !== 'number' || !Number.isSafeInteger(member.id) ||
        member.id <= 0 || ids.has(member.id) || !isName(member.name) || typeof member.image !== 'string' ||
        (member.shinyImage != null && typeof member.shinyImage !== 'string') ||
        !Array.isArray(member.types) || member.types.length === 0 || !member.types.every(isName) ||
        !Array.isArray(member.moves) || member.moves.length > 4 || !member.moves.every(isMove) ||
        ['selectedAbility', 'selectedItem', 'selectedNature'].some(key => member[key] != null && !isName(member[key])) ||
        (member.allAbilities != null && (!Array.isArray(member.allAbilities) || !member.allAbilities.every(isName))) ||
        (member.allMoves != null && (!Array.isArray(member.allMoves) || !member.allMoves.every(isMove)))) {
      throw new Error('Invalid or duplicate Pokémon in the team file.');
    }
    ids.add(member.id);
  }
  return value as TeamMember[];
}
