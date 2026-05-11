import { PokemonListItem } from "../types";

export interface ZAPokemon extends PokemonListItem {
  regionalNumber: number; // For clean display as number
  isMega: boolean;
  abilities?: string[];
  description?: string;
  stats?: { name: string; value: number }[];
}

export const lumioseDex: ZAPokemon[] = [
  {
    id: 495,
    name: "Snivy",
    types: ["grass"],
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/495.png",
    shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/495.png",
    category: "Starter Pokémon",
    regionalNumber: 1,
    isMega: false,
    abilities: ["Overgrow", "Contrary"],
    description: "It is very intelligent and calm. Being exposed to sunlight makes its movements much faster.",
    stats: [
      { name: "hp", value: 45 },
      { name: "attack", value: 45 },
      { name: "defense", value: 55 },
      { name: "special-attack", value: 45 },
      { name: "special-defense", value: 55 },
      { name: "speed", value: 63 }
    ]
  },
  {
    id: 496,
    name: "Servine",
    types: ["grass"],
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/496.png",
    shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/496.png",
    category: "Starter Pokémon",
    regionalNumber: 2,
    isMega: false,
    abilities: ["Overgrow", "Contrary"],
    description: "It runs along the ground to light-footed-ly dodge attacks. It smartly retaliates with its whipping vines.",
    stats: [
      { name: "hp", value: 60 },
      { name: "attack", value: 60 },
      { name: "defense", value: 75 },
      { name: "special-attack", value: 60 },
      { name: "special-defense", value: 75 },
      { name: "speed", value: 83 }
    ]
  },
  {
    id: 497,
    name: "Serperior",
    types: ["grass"],
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/497.png",
    shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/497.png",
    category: "Starter Pokémon",
    regionalNumber: 3,
    isMega: false,
    abilities: ["Overgrow", "Contrary"],
    description: "It only gives its all against strong opponents who are not intimidated by the glare of its noble eyes.",
    stats: [
      { name: "hp", value: 75 },
      { name: "attack", value: 75 },
      { name: "defense", value: 95 },
      { name: "special-attack", value: 75 },
      { name: "special-defense", value: 95 },
      { name: "speed", value: 113 }
    ]
  },
  {
    id: 49700,
    name: "Serperior-Mega",
    types: ["grass", "dragon"],
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/497.png",
    shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/497.png",
    category: "Mega Form",
    regionalNumber: 3,
    isMega: true,
    abilities: ["Contrary"],
    description: "Mega Evolution unleashes Serperior's hidden draconic lineage. Its scales harden like diamonds, and its glare can paralyze even legendary foes.",
    stats: [
      { name: "hp", value: 75 },
      { name: "attack", value: 95 },
      { name: "defense", value: 115 },
      { name: "special-attack", value: 115 },
      { name: "special-defense", value: 115 },
      { name: "speed", value: 133 }
    ]
  },
  {
    id: 498,
    name: "Tepig",
    types: ["fire"],
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/498.png",
    shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/498.png",
    category: "Starter Pokémon",
    regionalNumber: 4,
    isMega: false,
    abilities: ["Blaze", "Thick Fat"],
    description: "It can deftly dodge foe's attacks while shooting fireballs from its snout. It roasts berries with this fire before eating them.",
    stats: [
      { name: "hp", value: 65 },
      { name: "attack", value: 63 },
      { name: "defense", value: 45 },
      { name: "special-attack", value: 45 },
      { name: "special-defense", value: 45 },
      { name: "speed", value: 45 }
    ]
  },
  {
    id: 499,
    name: "Pignite",
    types: ["fire", "fighting"],
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/499.png",
    shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/499.png",
    category: "Starter Pokémon",
    regionalNumber: 5,
    isMega: false,
    abilities: ["Blaze", "Thick Fat"],
    description: "The more food it eats, the hotter the fire inside its stomach burns. When its internal fire flares, its speed increases.",
    stats: [
      { name: "hp", value: 90 },
      { name: "attack", value: 93 },
      { name: "defense", value: 55 },
      { name: "special-attack", value: 70 },
      { name: "special-defense", value: 55 },
      { name: "speed", value: 55 }
    ]
  },
  {
    id: 500,
    name: "Emboar",
    types: ["fire", "fighting"],
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/500.png",
    shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/500.png",
    category: "Starter Pokémon",
    regionalNumber: 6,
    isMega: false,
    abilities: ["Blaze", "Reckless"],
    description: "It can grow a beard of fire. It cares deeply about its friends and utilizes rapid, heavy punches to protect them.",
    stats: [
      { name: "hp", value: 110 },
      { name: "attack", value: 123 },
      { name: "defense", value: 65 },
      { name: "special-attack", value: 100 },
      { name: "special-defense", value: 65 },
      { name: "speed", value: 65 }
    ]
  },
  {
    id: 10500,
    name: "Emboar-Mega",
    types: ["fire", "fighting"],
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/500.png",
    shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/500.png",
    category: "Mega Form",
    regionalNumber: 6,
    isMega: true,
    abilities: ["Drought"],
    description: "Enwrapped in explosive columns of pure flame, Mega Emboar utilizes unmatched physical strength to deliver devastating blazes to any challenger.",
    stats: [
      { name: "hp", value: 110 },
      { name: "attack", value: 158 },
      { name: "defense", value: 75 },
      { name: "special-attack", value: 135 },
      { name: "special-defense", value: 75 },
      { name: "speed", value: 75 }
    ]
  },
  {
    id: 150,
    name: "Mewtwo",
    types: ["psychic"],
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png",
    shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/150.png",
    category: "Genetic Pokémon",
    regionalNumber: 150,
    isMega: false,
    abilities: ["Pressure", "Unnerve"],
    description: "A Pokémon created by recombining Mew's genes. It's said to have the most savage heart among Pokémon.",
    stats: [
      { name: "hp", value: 106 },
      { name: "attack", value: 110 },
      { name: "defense", value: 90 },
      { name: "special-attack", value: 154 },
      { name: "special-defense", value: 90 },
      { name: "speed", value: 130 }
    ]
  },
  {
    id: 10043,
    name: "Mewtwo-Mega-X",
    types: ["psychic", "fighting"],
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10043.png",
    shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/10043.png",
    category: "Mega Form X",
    regionalNumber: 150,
    isMega: true,
    abilities: ["Steadfast"],
    description: "Mega Mewtwo X boasts unparalleled psychokinetic and physical power. Its tensed muscles give it physical limits far beyond any normal creature.",
    stats: [
      { name: "hp", value: 106 },
      { name: "attack", value: 190 },
      { name: "defense", value: 100 },
      { name: "special-attack", value: 154 },
      { name: "special-defense", value: 100 },
      { name: "speed", value: 130 }
    ]
  },
  {
    id: 718,
    name: "Zygarde-50%",
    types: ["dragon", "ground"],
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/718.png",
    shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/718.png",
    category: "Order Pokémon",
    regionalNumber: 230,
    isMega: false,
    abilities: ["Aura Break", "Power Construct"],
    description: "It monitors the ecosystem from deep inside caverns. When the ecosystem falls into chaos, it appears and unleashes its power.",
    stats: [
      { name: "hp", value: 108 },
      { name: "attack", value: 100 },
      { name: "defense", value: 121 },
      { name: "special-attack", value: 81 },
      { name: "special-defense", value: 95 },
      { name: "speed", value: 95 }
    ]
  },
  {
    id: 71800,
    name: "Zygarde-Mega",
    types: ["dragon", "ground"],
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10115.png",
    shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/10115.png",
    category: "Mega Form",
    regionalNumber: 230,
    isMega: true,
    abilities: ["Power Construct"],
    description: "Born from the perfect synthesis of 100% of Zygarde's core cells, Mega Zygarde dominates hyperspace and Lumiose city to protect the world's ecosystem.",
    stats: [
      { name: "hp", value: 216 },
      { name: "attack", value: 140 },
      { name: "defense", value: 151 },
      { name: "special-attack", value: 121 },
      { name: "special-defense", value: 125 },
      { name: "speed", value: 85 }
    ]
  }
];

export const hyperspaceDex: ZAPokemon[] = [
  {
    id: 1,
    name: "Bulbasaur",
    types: ["grass", "poison"],
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/1.png",
    category: "Seed Pokémon",
    regionalNumber: 10,
    isMega: false,
    abilities: ["Overgrow", "Chlorophyll"],
    description: "There is a plant seed on its back from the day this Pokémon is born. The seed slowly grows larger.",
    stats: [
      { name: "hp", value: 45 },
      { name: "attack", value: 49 },
      { name: "defense", value: 49 },
      { name: "special-attack", value: 65 },
      { name: "special-defense", value: 65 },
      { name: "speed", value: 45 }
    ]
  },
  {
    id: 3,
    name: "Venusaur-Mega",
    types: ["grass", "poison"],
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10033.png",
    shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/10033.png",
    category: "Mega Form",
    regionalNumber: 12,
    isMega: true,
    abilities: ["Thick Fat"],
    description: "Mega Evolution strengthens Venusaur's trunk and foliage. The flower on its back blooms magnificently, spreading calming scents.",
    stats: [
      { name: "hp", value: 80 },
      { name: "attack", value: 100 },
      { name: "defense", value: 123 },
      { name: "special-attack", value: 122 },
      { name: "special-defense", value: 120 },
      { name: "speed", value: 80 }
    ]
  },
  {
    id: 4,
    name: "Charmander",
    types: ["fire"],
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/4.png",
    category: "Lizard Pokémon",
    regionalNumber: 13,
    isMega: false,
    abilities: ["Blaze", "Solar Power"],
    description: "The flame that burns at the tip of its tail is an indication of its emotions. The flame wavers when Charmander is happy.",
    stats: [
      { name: "hp", value: 39 },
      { name: "attack", value: 52 },
      { name: "defense", value: 43 },
      { name: "special-attack", value: 60 },
      { name: "special-defense", value: 50 },
      { name: "speed", value: 65 }
    ]
  },
  {
    id: 600,
    name: "Charizard-Mega-X",
    types: ["fire", "dragon"],
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10034.png",
    shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/10034.png",
    category: "Mega Form X",
    regionalNumber: 15,
    isMega: true,
    abilities: ["Tough Claws"],
    description: "Its body turns coal-black, engulfed in blazing blue fires. Its sharp claws can shred any solid matter into ashes.",
    stats: [
      { name: "hp", value: 78 },
      { name: "attack", value: 130 },
      { name: "defense", value: 111 },
      { name: "special-attack", value: 130 },
      { name: "special-defense", value: 85 },
      { name: "speed", value: 100 }
    ]
  },
  {
    id: 383,
    name: "Groudon",
    types: ["ground"],
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/383.png",
    shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/383.png",
    category: "Continent Pokémon",
    regionalNumber: 80,
    isMega: false,
    abilities: ["Drought"],
    description: "Said to have expanded the continents by evaporating water with intense heat and light.",
    stats: [
      { name: "hp", value: 100 },
      { name: "attack", value: 150 },
      { name: "defense", value: 140 },
      { name: "special-attack", value: 100 },
      { name: "special-defense", value: 90 },
      { name: "speed", value: 90 }
    ]
  },
  {
    id: 10078,
    name: "Primal-Groudon",
    types: ["ground", "fire"],
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10078.png",
    shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/10078.png",
    category: "Primal Reversion",
    regionalNumber: 80,
    isMega: true,
    abilities: ["Desolate Land"],
    description: "Through Primal Reversion, Groudon absorbs the planet's baseline energy to resume its true prime form. Its heat can vaporize entire oceans instantly.",
    stats: [
      { name: "hp", value: 100 },
      { name: "attack", value: 180 },
      { name: "defense", value: 160 },
      { name: "special-attack", value: 150 },
      { name: "special-defense", value: 90 },
      { name: "speed", value: 90 }
    ]
  },
  {
    id: 807,
    name: "Zeraora",
    types: ["electric"],
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/807.png",
    shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/807.png",
    category: "Thunderclap Pokémon",
    regionalNumber: 120,
    isMega: false,
    abilities: ["Volt Absorb"],
    description: "It electrifies its claws and tears its opponents apart. Even if they dodge, they are electrocuted by the sparks.",
    stats: [
      { name: "hp", value: 88 },
      { name: "attack", value: 112 },
      { name: "defense", value: 75 },
      { name: "special-attack", value: 102 },
      { name: "special-defense", value: 80 },
      { name: "speed", value: 143 }
    ]
  },
  {
    id: 80700,
    name: "Zeraora-Mega",
    types: ["electric", "fighting"],
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/807.png",
    shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/807.png",
    category: "Mega Form",
    regionalNumber: 120,
    isMega: true,
    abilities: ["Plasma Fists"],
    description: "Mega Zeraora's body overflows with intense plasma, giving it speed matching a lightning strike and striking power that can crack mountains.",
    stats: [
      { name: "hp", value: 88 },
      { name: "attack", value: 142 },
      { name: "defense", value: 95 },
      { name: "special-attack", value: 122 },
      { name: "special-defense", value: 95 },
      { name: "speed", value: 158 }
    ]
  }
];
