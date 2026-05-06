export interface PokemonType {
  name: string;
}

export interface PokemonVariety {
  id: number;
  name: string;
  types: string[];
  image: string;
  shinyImage?: string;
  isMega: boolean;
  isAlternative: boolean;
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
  category?: string;
  megaEvolutions?: PokemonVariety[];
  alternativeForms?: PokemonVariety[];
}

export interface PokemonListItem {
  id: number;
  name: string;
  types: string[];
  image: string;
  shinyImage?: string;
  category?: string;
}
