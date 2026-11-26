import { gql } from '@apollo/client';

export const REFERENCE_LIST = gql`
  query BrowseReferencePokemon($filters: ReferencePokemonFilters) {
    referencePokemonList(filters: $filters) {
      results { id name types image shinyImage category regionalNumber speciesId }
      totalCount
    }
  }
`;

export const REFERENCE_CATALOG = gql`
  query BrowseReferenceCatalog {
    referenceCatalog {
      games { slug displayName referenceDexes }
      dexes { slug region }
    }
  }
`;

export const REFERENCE_DETAIL = gql`
  query BrowseReferenceDetail($id: Int!, $game: String, $generation: Int) {
    referencePokemon(id: $id, game: $game) {
      id name speciesId category types image shinyImage height weight description cry
      stats { name value }
      abilities
      abilitySlots { name hidden }
      matchups(generation: $generation) { type multiplier }
      availability { facet state }
      learnset { state entries { moveId name method level enhancementLevel versionGroup } }
      evolution { fromSpeciesId toSpeciesId trigger versionGroup conditionsJson }
      forms { id name category image }
    }
  }
`;
