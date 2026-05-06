export interface PokemonType {
  name: string;
}

export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  image: string;
  stats?: {
    name: string;
    value: number;
  }[];
  abilities?: string[];
  description?: string;
}

export interface PokemonListItem {
  id: number;
  name: string;
  types: string[];
  image: string;
}
