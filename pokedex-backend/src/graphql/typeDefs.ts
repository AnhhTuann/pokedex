export const typeDefs = `#graphql
  type PokemonListItem {
    id: Int!
    name: String!
    types: [String!]!
    image: String!
    shinyImage: String
    minLevel: Int
    trigger: String
    category: String
    regionalNumber: Int
    speciesId: Int
  }

  type PokemonListResponse {
    results: [PokemonListItem!]!
    totalCount: Int!
  }

  type Stat {
    name: String!
    value: Int!
  }

  type TypeMatchup {
    type: String!
    multiplier: Float!
  }

  type Move {
    name: String!
    type: String!
    power: Int
    accuracy: Int
    pp: Int
    generation: Int
    description: String
    effect: String
    damageClass: String
    learnMethod: String
    levelLearnedAt: Int
  }

  type MoveListResponse {
    results: [Move!]!
    totalCount: Int!
  }

  type FlavorText {
    version: String!
    text: String!
  }

  type PokemonVariety {
    id: Int!
    name: String!
    types: [String!]!
    image: String!
    shinyImage: String
    isMega: Boolean!
    isAlternative: Boolean!
    speciesId: Int
  }

  type PokemonDetail {
    id: Int!
    name: String!
    types: [String!]!
    image: String!
    shinyImage: String
    category: String
    height: Int
    weight: Int
    stats: [Stat!]
    abilities: [String!]
    description: String
    flavorTexts: [FlavorText!]
    gameVersions: [String!]
    evolutions: [PokemonListItem!]
    matchups: [TypeMatchup!]
    cry: String
    moves: [Move!]
    megaEvolutions: [PokemonVariety!]
    alternativeForms: [PokemonVariety!]
    locations(version: String): [String!]
    speciesId: Int
  }

  type Ability {
    id: Int!
    name: String!
    generation: Int
    flavorText: String
    shortEffect: String
    effect: String
    pokemons: [PokemonListItem!]!
  }

  type AbilityListResponse {
    results: [Ability!]!
    totalCount: Int!
  }

  type Item {
    id: Int!
    name: String!
    cost: Int
    flingPower: Int
    flingEffect: String
    category: String
    pocket: String
    flavorText: String
    effect: String
    spriteUrl: String
  }

  type ItemListResponse {
    results: [Item!]!
    totalCount: Int!
  }

  type EncounterListItem {
    id: Int!
    pokemonId: Int!
    locationName: String!
    versionName: String!
    method: String
    minLevel: Int
    maxLevel: Int
    chance: Int
    pokemon: PokemonListItem
  }

  type Walkthrough {
    id: Int!
    gameVersion: String!
    chapterTitle: String!
    content: String!
    order: Int!
    language: String!
  }

  type Query {
    ping: String
    pokemonList(limit: Int, offset: Int, search: String, type: String, gen: Int, ids: [Int!], region: String, game: String): PokemonListResponse
    pokemon(id: Int!): PokemonDetail
    myFavorites: [Int!]!
    myTeam: [PokemonListItem!]!
    getAllMoves(gen: Int, type: String, damageClass: String, limit: Int, offset: Int, search: String): MoveListResponse!
    getAllAbilities(gen: Int, limit: Int, offset: Int, search: String): AbilityListResponse!
    getAllItems(search: String, limit: Int, offset: Int): ItemListResponse!
    getLocations(version: String!): [String!]!
    getLocationEncounters(locationName: String!, version: String!): [EncounterListItem!]!
    getWalkthroughs(gameVersion: String!, language: String!): [Walkthrough!]!
  }

  type Mutation {
    toggleFavorite(pokemonId: Int!): Boolean!
    saveTeam(pokemonIds: [Int!]!): Boolean!
    upsertWalkthrough(id: Int, gameVersion: String!, chapterTitle: String!, content: String!, order: Int!, language: String): Walkthrough!
    deleteWalkthrough(id: Int!): Boolean!
  }
`;
