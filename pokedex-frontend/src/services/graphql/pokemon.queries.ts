import { gql } from '@apollo/client';

export const GET_POKEMON_LIST = gql`
  query GetPokemonList($limit: Int, $offset: Int, $search: String, $type: String, $gen: Int, $ids: [Int!], $region: String, $game: String) {
    pokemonList(limit: $limit, offset: $offset, search: $search, type: $type, gen: $gen, ids: $ids, region: $region, game: $game) {
      results {
        id
        name
        types
        image
        shinyImage
        category
        regionalNumber
        speciesId
      }
      totalCount
    }
  }
`;

export const GET_POKEMON_DETAIL = gql`
  query GetPokemonDetail($id: Int!, $version: String) {
    pokemon(id: $id) {
      id
      name
      types
      image
      shinyImage
      category
      height
      weight
      stats {
        name
        value
      }
      abilities
      description
      evolutions {
        id
        name
        types
        image
        shinyImage
        minLevel
        trigger
      }
      matchups {
        type
        multiplier
      }
      cry
      gameVersions
      moves {
        name
        type
        power
        accuracy
        pp
        generation
        description
        damageClass
        learnMethod
        levelLearnedAt
      }
      megaEvolutions {
        id
        name
        types
        image
        shinyImage
        isMega
        isAlternative
        speciesId
      }
      alternativeForms {
        id
        name
        types
        image
        shinyImage
        isMega
        isAlternative
        speciesId
      }
      locations(version: $version)
      speciesId
    }
  }
`;
