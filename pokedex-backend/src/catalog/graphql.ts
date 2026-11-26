import { defensiveMatchups } from '../lib/typeMatchups.js';
import { loadReferenceCatalog, type Filters } from './reference.js';

export const referenceTypeDefs = `#graphql
  enum ReferenceFormCategory { DEFAULT ALTERNATE REGIONAL MEGA GIGANTAMAX BATTLE COSMETIC OTHER UNKNOWN }
  enum AvailabilityFacet { REGIONAL_DEX_MEMBER GAME_PRESENCE_EVIDENCE OBTAINABLE WILD_CATCHABLE TRANSFER_AVAILABLE EVENT_AVAILABLE }
  enum ReferenceEvidenceState { CONFIRMED UNKNOWN }
  input ReferencePokemonFilters {
    limit: Int
    offset: Int
    gen: Int
    broadRegion: String
    dex: String
    game: String
    availability: AvailabilityFacet
    availabilityState: ReferenceEvidenceState
    nationalNumber: Int
    regionalNumber: Int
    speciesId: Int
    formId: Int
    category: ReferenceFormCategory
    search: String
    type: String
    ids: [Int!]
  }
  type ReferenceGame {
    slug: String!
    displayName: String!
    generation: Int!
    versionGroup: String!
    referenceDexes: [String!]!
    legacyDexes: [String!]!
  }
  type ReferenceDex { id: Int!, slug: String!, region: String, entryCount: Int! }
  type ReferenceCatalog {
    snapshot: String!
    schemaVersion: Int!
    speciesCount: Int!
    formCount: Int!
    games: [ReferenceGame!]!
    dexes: [ReferenceDex!]!
    versionGroups: [String!]!
  }
  type ReferenceArtwork { path: String, status: String! }
  type ReferenceAbilitySlot { name: String!, hidden: Boolean! }
  type ReferenceAvailability {
    facet: AvailabilityFacet!
    state: ReferenceEvidenceState!
    sources: [String!]!
    methods: [String!]!
  }
  type ReferenceMoveSlot {
    formId: Int!
    moveId: Int!
    name: String!
    method: String!
    level: Int!
    enhancementLevel: Int
    versionGroup: String!
    source: String!
  }
  type ReferenceLearnset {
    reviewReason: String
    state: ReferenceEvidenceState!
    source: String!
    entries: [ReferenceMoveSlot!]!
  }
  type ReferenceEvolutionCondition {
    fromSpeciesId: Int!
    toSpeciesId: Int!
    versionGroup: String
    trigger: String
    conditionsJson: String!
    source: String!
  }
  type ReferencePokemon {
    id: Int!
    name: String!
    speciesId: Int!
    nationalNumber: Int!
    generation: Int!
    category: ReferenceFormCategory!
    types: [String!]!
    image: String!
    shinyImage: String
    regionalNumber: Int
    normalArtwork: ReferenceArtwork!
    shinyArtwork: ReferenceArtwork!
    disposition: String
    matchups(generation: Int): [TypeMatchup!]
    height: Int
    weight: Int
    description: String
    cry: String
    stats: [Stat!]
    abilities: [String!]
    abilitySlots: [ReferenceAbilitySlot!]
    learnset: ReferenceLearnset
    evolution: [ReferenceEvolutionCondition!]
    availability: [ReferenceAvailability!]
    forms: [ReferencePokemon!]
  }
  type ReferencePokemonPage { totalCount: Int!, results: [ReferencePokemon!]! }
  extend type Query {
    referenceCatalog: ReferenceCatalog!
    referencePokemonList(filters: ReferencePokemonFilters): ReferencePokemonPage!
    referencePokemon(id: Int!, game: String, versionGroup: String): ReferencePokemon
  }
`;

let reference: ReturnType<typeof loadReferenceCatalog> | undefined;
export function getReferenceCatalog() {
  return reference ??= loadReferenceCatalog();
}

export const referenceQueries = {
  referenceCatalog: () => getReferenceCatalog().metadata,
  referencePokemonList: (_: unknown, { filters }: { filters?: Filters | null }) =>
    getReferenceCatalog().list(filters ?? undefined),
  referencePokemon: (_: unknown, args: { id: number; game?: string; versionGroup?: string }) =>
    getReferenceCatalog().detail(args.id, args.game, args.versionGroup),
};

export const referencePokemonFields = {
  matchups: (parent: { types: string[] }, { generation }: { generation?: number | null }) =>
    defensiveMatchups(parent.types, generation ?? undefined),
};
