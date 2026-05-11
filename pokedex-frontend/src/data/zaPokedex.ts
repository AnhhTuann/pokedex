export interface ZAPokemon {
  id: number;
  regionalId: string;
  name: string;
  types: string[];
  isMega: boolean;
  sprite: string;
  shinySprite?: string;
  category?: string;
  description?: string;
  stats?: { name: string; value: number }[];
  abilities?: string[];
}

export const lumioseDex: ZAPokemon[] = [
  {
    id: 152,
    regionalId: "#001",
    name: "Chikorita",
    types: ["Grass"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/152.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/152.png",
    category: "Leaf Pokémon",
    description: "It uses the leaf on its head to determine the temperature and humidity. It loves to sunbathe.",
    stats: [
      { name: "hp", value: 45 },
      { name: "attack", value: 49 },
      { name: "defense", value: 65 },
      { name: "special-attack", value: 49 },
      { name: "special-defense", value: 65 },
      { name: "speed", value: 45 }
    ],
    abilities: ["Overgrow", "Leaf Guard"]
  },
  {
    id: 153,
    regionalId: "#002",
    name: "Bayleef",
    types: ["Grass"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/153.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/153.png",
    category: "Leaf Pokémon",
    description: "A spicy aroma emanates from around its neck. The scent acts as a stimulant to restore energy.",
    stats: [
      { name: "hp", value: 60 },
      { name: "attack", value: 62 },
      { name: "defense", value: 80 },
      { name: "special-attack", value: 63 },
      { name: "special-defense", value: 80 },
      { name: "speed", value: 60 }
    ],
    abilities: ["Overgrow", "Leaf Guard"]
  },
  {
    id: 154,
    regionalId: "#003",
    name: "Meganium",
    types: ["Grass"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/154.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/154.png",
    category: "Herb Pokémon",
    description: "The aroma that rises from its petals has a calming effect. In battle, it releases more of this aroma.",
    stats: [
      { name: "hp", value: 80 },
      { name: "attack", value: 82 },
      { name: "defense", value: 100 },
      { name: "special-attack", value: 83 },
      { name: "special-defense", value: 100 },
      { name: "speed", value: 80 }
    ],
    abilities: ["Overgrow", "Leaf Guard"]
  },
  {
    id: 15400,
    regionalId: "#003",
    name: "Mega Meganium",
    types: ["Grass", "Fairy"],
    isMega: true,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/154.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/154.png",
    category: "Mega Herb Pokémon",
    description: "Mega Evolution enwreathes Meganium in ancient fae power, making its scent strong enough to heal any physical or spiritual ailments instantly.",
    stats: [
      { name: "hp", value: 80 },
      { name: "attack", value: 102 },
      { name: "defense", value: 120 },
      { name: "special-attack", value: 123 },
      { name: "special-defense", value: 120 },
      { name: "speed", value: 80 }
    ],
    abilities: ["Triage"]
  },
  {
    id: 498,
    regionalId: "#004",
    name: "Tepig",
    types: ["Fire"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/498.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/498.png",
    category: "Fire Pig Pokémon",
    description: "It blows fire from its snout, but when it catches cold, the fire turns into pitch-black smoke.",
    stats: [
      { name: "hp", value: 65 },
      { name: "attack", value: 63 },
      { name: "defense", value: 45 },
      { name: "special-attack", value: 45 },
      { name: "special-defense", value: 45 },
      { name: "speed", value: 45 }
    ],
    abilities: ["Blaze", "Thick Fat"]
  },
  {
    id: 499,
    regionalId: "#005",
    name: "Pignite",
    types: ["Fire", "Fighting"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/499.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/499.png",
    category: "Fire Pig Pokémon",
    description: "The hotter the fire inside its body, the faster it moves. It can crush boulders with heavy strikes.",
    stats: [
      { name: "hp", value: 90 },
      { name: "attack", value: 93 },
      { name: "defense", value: 55 },
      { name: "special-attack", value: 70 },
      { name: "special-defense", value: 55 },
      { name: "speed", value: 55 }
    ],
    abilities: ["Blaze", "Thick Fat"]
  },
  {
    id: 500,
    regionalId: "#006",
    name: "Emboar",
    types: ["Fire", "Fighting"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/500.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/500.png",
    category: "Mega Fire Pig Pokémon",
    description: "It has mastered fast and powerful fighting moves. Its chin burns with a fierce beard of flames.",
    stats: [
      { name: "hp", value: 110 },
      { name: "attack", value: 123 },
      { name: "defense", value: 65 },
      { name: "special-attack", value: 100 },
      { name: "special-defense", value: 65 },
      { name: "speed", value: 65 }
    ],
    abilities: ["Blaze", "Reckless"]
  },
  {
    id: 50000,
    regionalId: "#006",
    name: "Mega Emboar",
    types: ["Fire", "Fighting"],
    isMega: true,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/500.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/500.png",
    category: "Mega Fire Pig Pokémon",
    description: "Under the effect of Mega Evolution, its body turns into a living furnace of martial combat.",
    stats: [
      { name: "hp", value: 110 },
      { name: "attack", value: 158 },
      { name: "defense", value: 75 },
      { name: "special-attack", value: 135 },
      { name: "special-defense", value: 75 },
      { name: "speed", value: 75 }
    ],
    abilities: ["Drought"]
  },
  {
    id: 158,
    regionalId: "#007",
    name: "Totodile",
    types: ["Water"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/158.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/158.png",
    category: "Big Jaw Pokémon",
    description: "It is small but rough and tough. It will bite at anything that moves within its sight.",
    stats: [
      { name: "hp", value: 50 },
      { name: "attack", value: 65 },
      { name: "defense", value: 64 },
      { name: "special-attack", value: 44 },
      { name: "special-defense", value: 48 },
      { name: "speed", value: 43 }
    ],
    abilities: ["Torrent", "Sheer Force"]
  },
  {
    id: 159,
    regionalId: "#008",
    name: "Croconaw",
    types: ["Water"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/159.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/159.png",
    category: "Big Jaw Pokémon",
    description: "Once it bites down, it won't let go until its teeth fall out. Its teeth grow back quickly.",
    stats: [
      { name: "hp", value: 65 },
      { name: "attack", value: 80 },
      { name: "defense", value: 80 },
      { name: "special-attack", value: 59 },
      { name: "special-defense", value: 63 },
      { name: "speed", value: 58 }
    ],
    abilities: ["Torrent", "Sheer Force"]
  },
  {
    id: 160,
    regionalId: "#009",
    name: "Feraligatr",
    types: ["Water"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/160.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/160.png",
    category: "Big Jaw Pokémon",
    description: "It opens its huge mouth to intimidate enemies. It is quick on land despite its massive bulk.",
    stats: [
      { name: "hp", value: 85 },
      { name: "attack", value: 105 },
      { name: "defense", value: 100 },
      { name: "special-attack", value: 79 },
      { name: "special-defense", value: 83 },
      { name: "speed", value: 78 }
    ],
    abilities: ["Torrent", "Sheer Force"]
  },
  {
    id: 16000,
    regionalId: "#009",
    name: "Mega Feraligatr",
    types: ["Water", "Dark"],
    isMega: true,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/160.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/160.png",
    category: "Big Jaw Pokémon",
    description: "Mega Evolution transforms Feraligatr into a dark apex predator, crashing down with hyper-aggressive biting attacks.",
    stats: [
      { name: "hp", value: 85 },
      { name: "attack", value: 145 },
      { name: "defense", value: 120 },
      { name: "special-attack", value: 99 },
      { name: "special-defense", value: 103 },
      { name: "speed", value: 98 }
    ],
    abilities: ["Strong Jaw"]
  },
  {
    id: 718,
    regionalId: "#230",
    name: "Zygarde",
    types: ["Dragon", "Ground"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/718.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/718.png",
    category: "Order Pokémon",
    description: "It monitors the ecosystem to ensure balance is maintained throughout the region.",
    stats: [
      { name: "hp", value: 108 },
      { name: "attack", value: 100 },
      { name: "defense", value: 121 },
      { name: "special-attack", value: 81 },
      { name: "special-defense", value: 95 },
      { name: "speed", value: 95 }
    ],
    abilities: ["Aura Break"]
  },
  {
    id: 71800,
    regionalId: "#230",
    name: "Mega Zygarde",
    types: ["Dragon", "Ground"],
    isMega: true,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10115.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/10115.png",
    category: "Complete Form",
    description: "The complete, perfect order form of Zygarde, unlocked through mega energy. Truly an unstoppable force.",
    stats: [
      { name: "hp", value: 216 },
      { name: "attack", value: 140 },
      { name: "defense", value: 151 },
      { name: "special-attack", value: 121 },
      { name: "special-defense", value: 125 },
      { name: "speed", value: 85 }
    ],
    abilities: ["Power Construct"]
  }
];

export const hyperspaceDex: ZAPokemon[] = [
  {
    id: 1,
    regionalId: "#010",
    name: "Bulbasaur",
    types: ["Grass", "Poison"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/1.png",
    category: "Seed Pokémon",
    description: "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.",
    stats: [
      { name: "hp", value: 45 },
      { name: "attack", value: 49 },
      { name: "defense", value: 49 },
      { name: "special-attack", value: 65 },
      { name: "special-defense", value: 65 },
      { name: "speed", value: 45 }
    ],
    abilities: ["Overgrow", "Chlorophyll"]
  },
  {
    id: 3,
    regionalId: "#012",
    name: "Venusaur-Mega",
    types: ["Grass", "Poison"],
    isMega: true,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10033.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/10033.png",
    category: "Mega Form",
    description: "Mega Evolution expands its strength. Its leaves grow as thick as a jungle.",
    stats: [
      { name: "hp", value: 80 },
      { name: "attack", value: 100 },
      { name: "defense", value: 123 },
      { name: "special-attack", value: 122 },
      { name: "special-defense", value: 120 },
      { name: "speed", value: 80 }
    ],
    abilities: ["Thick Fat"]
  },
  {
    id: 4,
    regionalId: "#013",
    name: "Charmander",
    types: ["Fire"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/4.png",
    category: "Lizard Pokémon",
    description: "The flame on its tail indicates its health and emotion. It burns brightly when it is healthy.",
    stats: [
      { name: "hp", value: 39 },
      { name: "attack", value: 52 },
      { name: "defense", value: 43 },
      { name: "special-attack", value: 60 },
      { name: "special-defense", value: 50 },
      { name: "speed", value: 65 }
    ],
    abilities: ["Blaze", "Solar Power"]
  },
  {
    id: 600,
    regionalId: "#015",
    name: "Charizard-Mega-X",
    types: ["Fire", "Dragon"],
    isMega: true,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10034.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/10034.png",
    category: "Mega Form X",
    description: "Its black color is proof of its extreme raw physical power, wrapped in intense blue flame.",
    stats: [
      { name: "hp", value: 78 },
      { name: "attack", value: 130 },
      { name: "defense", value: 111 },
      { name: "special-attack", value: 130 },
      { name: "special-defense", value: 85 },
      { name: "speed", value: 100 }
    ],
    abilities: ["Tough Claws"]
  },
  {
    id: 383,
    regionalId: "#080",
    name: "Groudon",
    types: ["Ground"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/383.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/383.png",
    category: "Continent Pokémon",
    description: "It has expanded lands through extreme volcanic activity. Legendary rival of Kyogre.",
    stats: [
      { name: "hp", value: 100 },
      { name: "attack", value: 150 },
      { name: "defense", value: 140 },
      { name: "special-attack", value: 100 },
      { name: "special-defense", value: 90 },
      { name: "speed", value: 90 }
    ],
    abilities: ["Drought"]
  },
  {
    id: 10078,
    regionalId: "#080",
    name: "Primal Groudon",
    types: ["Ground", "Fire"],
    isMega: true,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10078.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/10078.png",
    category: "Primal Reversion",
    description: "Its magma body radiates volcanic temperatures, instantly turning oceans to vapor.",
    stats: [
      { name: "hp", value: 100 },
      { name: "attack", value: 180 },
      { name: "defense", value: 160 },
      { name: "special-attack", value: 150 },
      { name: "special-defense", value: 90 },
      { name: "speed", value: 90 }
    ],
    abilities: ["Desolate Land"]
  },
  {
    id: 807,
    regionalId: "#120",
    name: "Zeraora",
    types: ["Electric"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/807.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/807.png",
    category: "Thunderclap Pokémon",
    description: "It runs at speed matching lightning, electrocuting anything that steps within range.",
    stats: [
      { name: "hp", value: 88 },
      { name: "attack", value: 112 },
      { name: "defense", value: 75 },
      { name: "special-attack", value: 102 },
      { name: "special-defense", value: 80 },
      { name: "speed", value: 143 }
    ],
    abilities: ["Volt Absorb"]
  },
  {
    id: 80700,
    regionalId: "#120",
    name: "Mega Zeraora",
    types: ["Electric", "Fighting"],
    isMega: true,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/807.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/807.png",
    category: "Plasma Storm Pokémon",
    description: "Its overflow of aura enables instantaneous travel and devastating strikes.",
    stats: [
      { name: "hp", value: 88 },
      { name: "attack", value: 142 },
      { name: "defense", value: 95 },
      { name: "special-attack", value: 122 },
      { name: "special-defense", value: 95 },
      { name: "speed", value: 158 }
    ],
    abilities: ["Plasma Fists"]
  }
];
