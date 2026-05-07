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
  speciesId?: number;
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
  speciesId?: number;
}

export interface PokemonListItem {
  id: number;
  name: string;
  types: string[];
  image: string;
  shinyImage?: string;
  category?: string;
  regionalNumber?: number | null;
  speciesId?: number;
}
