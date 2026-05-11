export interface PokemonZA {
  id: number;
  regionalId: string;
  name: string;
  types: string[];
  isMega: boolean;
  sprite: string;
  shinySprite: string;
  category: string;
  description: string;
  stats: { name: string; value: number }[];
  abilities: string[];
  spriteUrl?: string;
}

export type ZAPokemon = PokemonZA;

export const lumioseDex: ZAPokemon[] = [
  // --- CHUỒI CHIKORITA ---
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
    description: "A spicy aroma escapes from around its neck. The aroma acts as a stimulant to restore energy.",
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
    description: "Meganium's breath has the power to revive dead grass and plants. It can make them healthy again.",
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
    id: 10154,
    regionalId: "#003",
    name: "Meganium-Mega",
    types: ["Grass", "Fairy"],
    isMega: true,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/154-mega.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/154.png",
    category: "Herb Pokémon",
    description: "Mega Evolution gives it a majestic floral collar, radiating pure fairy energy that heals allies.",
    stats: [
      { name: "hp", value: 80 },
      { name: "attack", value: 102 },
      { name: "defense", value: 140 },
      { name: "special-attack", value: 123 },
      { name: "special-defense", value: 120 },
      { name: "speed", value: 60 }
    ],
    abilities: ["Pixilate"]
  },

  // --- CHUỒI TEPIG ---
  {
    id: 498,
    regionalId: "#004",
    name: "Tepig",
    types: ["Fire"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/498.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/498.png",
    category: "Fire Pig Pokémon",
    description: "It can deftly dodge its foe's attacks while shooting fireballs from its nose. It roasts berries before eating.",
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
    description: "The more it eats, the more fuel it has to make the fire flare up in its stomach, boosting its power.",
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
    description: "It has mastered fast and powerful fighting moves. It grows a beard of fire around its neck.",
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
    id: 10500,
    regionalId: "#006",
    name: "Emboar-Mega",
    types: ["Fire", "Fighting"],
    isMega: true,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/500-mega.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/500.png",
    category: "Mega Fire Pig Pokémon",
    description: "With unmatched power, its blazing armor becomes impenetrable, unleashing unstoppable fiery punches.",
    stats: [
      { name: "hp", value: 110 },
      { name: "attack", value: 153 },
      { name: "defense", value: 95 },
      { name: "special-attack", value: 130 },
      { name: "special-defense", value: 95 },
      { name: "speed", value: 45 }
    ],
    abilities: ["No Guard"]
  },

  // --- CHUỒI TOTODILE ---
  {
    id: 158,
    regionalId: "#007",
    name: "Totodile",
    types: ["Water"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/158.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/158.png",
    category: "Big Jaw Pokémon",
    description: "It has the habit of biting anything it sees. It is highly energetic and always moves around.",
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
    description: "Once it bites, it will not let go. Its fangs are curved backward like fishhooks to secure prey.",
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
    description: "It opens its huge mouth to intimidate enemies. In battle, it runs using its powerful hind legs.",
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
    id: 10160,
    regionalId: "#009",
    name: "Feraligatr-Mega",
    types: ["Water", "Dragon"],
    isMega: true,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/160-mega.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/160.png",
    category: "Big Jaw Pokémon",
    description: "Its jaw muscles swell with ancient dragon power, letting it crush solid steel with a single bite.",
    stats: [
      { name: "hp", value: 85 },
      { name: "attack", value: 135 },
      { name: "defense", value: 120 },
      { name: "special-attack", value: 109 },
      { name: "special-defense", value: 103 },
      { name: "speed", value: 88 }
    ],
    abilities: ["Strong Jaw"]
  },

  // --- CHUỒI FLETCHLING ---
  {
    id: 661,
    regionalId: "#010",
    name: "Fletchling",
    types: ["Normal", "Flying"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/661.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/661.png",
    category: "Tiny Robin Pokémon",
    description: "Friendly and loud, it signals allies with beautiful chirps, but it is fierce and unyielding in battle.",
    stats: [
      { name: "hp", value: 45 },
      { name: "attack", value: 50 },
      { name: "defense", value: 43 },
      { name: "special-attack", value: 40 },
      { name: "special-defense", value: 38 },
      { name: "speed", value: 62 }
    ],
    abilities: ["Big Pecks", "Gale Wings"]
  },
  {
    id: 662,
    regionalId: "#011",
    name: "Fletchinder",
    types: ["Fire", "Flying"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/662.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/662.png",
    category: "Ember Pokémon",
    description: "It ignites tall grass to flush out insect prey, utilizing its fiery tail to spark embers.",
    stats: [
      { name: "hp", value: 62 },
      { name: "attack", value: 73 },
      { name: "defense", value: 55 },
      { name: "special-attack", value: 56 },
      { name: "special-defense", value: 52 },
      { name: "speed", value: 84 }
    ],
    abilities: ["Flame Body", "Gale Wings"]
  },
  {
    id: 663,
    regionalId: "#012",
    name: "Talonflame",
    types: ["Fire", "Flying"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/663.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/663.png",
    category: "Scorching Pokémon",
    description: "It dives at speeds of over 190 mph, striking prey with devastating kicks that emit intense heat.",
    stats: [
      { name: "hp", value: 78 },
      { name: "attack", value: 81 },
      { name: "defense", value: 71 },
      { name: "special-attack", value: 74 },
      { name: "special-defense", value: 69 },
      { name: "speed", value: 126 }
    ],
    abilities: ["Flame Body", "Gale Wings"]
  },

  // --- CHUỒI BUNNELBY ---
  {
    id: 659,
    regionalId: "#013",
    name: "Bunnelby",
    types: ["Normal"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/659.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/659.png",
    category: "Digging Pokémon",
    description: "Its ears are strong enough to shovel soil and chop thick tree roots, allowing it to dig burrows all day.",
    stats: [
      { name: "hp", value: 38 },
      { name: "attack", value: 36 },
      { name: "defense", value: 38 },
      { name: "special-attack", value: 32 },
      { name: "special-defense", value: 36 },
      { name: "speed", value: 57 }
    ],
    abilities: ["Pickup", "Huge Power"]
  },
  {
    id: 660,
    regionalId: "#014",
    name: "Diggersby",
    types: ["Normal", "Ground"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/660.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/660.png",
    category: "Digging Pokémon",
    description: "It can lift heavy rocks with its muscular ears. After digging, it loves to rest in soft mud.",
    stats: [
      { name: "hp", value: 85 },
      { name: "attack", value: 56 },
      { name: "defense", value: 77 },
      { name: "special-attack", value: 50 },
      { name: "special-defense", value: 77 },
      { name: "speed", value: 78 }
    ],
    abilities: ["Cheek Pouch", "Huge Power"]
  },

  // --- CHUỒI SCATTERBUG ---
  {
    id: 664,
    regionalId: "#015",
    name: "Scatterbug",
    types: ["Bug"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/664.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/664.png",
    category: "Scatterdust Pokémon",
    description: "It covers its body in protective powder to ward off bird Pokémon, thriving in temperate forests.",
    stats: [
      { name: "hp", value: 38 },
      { name: "attack", value: 35 },
      { name: "defense", value: 40 },
      { name: "special-attack", value: 27 },
      { name: "special-defense", value: 25 },
      { name: "speed", value: 35 }
    ],
    abilities: ["Shield Dust", "Compound Eyes"]
  },
  {
    id: 665,
    regionalId: "#016",
    name: "Spewpa",
    types: ["Bug"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/665.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/665.png",
    category: "Scatterdust Pokémon",
    description: "It lives hidden in bushes, protected by a hard, fibrous shell that deflects predators' attacks.",
    stats: [
      { name: "hp", value: 45 },
      { name: "attack", value: 30 },
      { name: "defense", value: 60 },
      { name: "special-attack", value: 27 },
      { name: "special-defense", value: 30 },
      { name: "speed", value: 29 }
    ],
    abilities: ["Shed Skin", "Friend Guard"]
  },
  {
    id: 666,
    regionalId: "#017",
    name: "Vivillon",
    types: ["Bug", "Flying"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/666.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/666.png",
    category: "Scale Dust Pokémon",
    description: "Its wings feature beautiful, diverse patterns that vary depending on the climate and region of birth.",
    stats: [
      { name: "hp", value: 80 },
      { name: "attack", value: 52 },
      { name: "defense", value: 50 },
      { name: "special-attack", value: 90 },
      { name: "special-defense", value: 50 },
      { name: "speed", value: 89 }
    ],
    abilities: ["Shield Dust", "Compound Eyes"]
  },

  // --- CHUỒI WEEDLE ---
  {
    id: 13,
    regionalId: "#018",
    name: "Weedle",
    types: ["Bug", "Poison"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/13.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/13.png",
    category: "Hairy Pokémon",
    description: "Its sharp, toxic stinger on its head delivers powerful venom to defend itself from attackers.",
    stats: [
      { name: "hp", value: 40 },
      { name: "attack", value: 35 },
      { name: "defense", value: 30 },
      { name: "special-attack", value: 20 },
      { name: "special-defense", value: 20 },
      { name: "speed", value: 50 }
    ],
    abilities: ["Shield Dust", "Run Away"]
  },
  {
    id: 14,
    regionalId: "#019",
    name: "Kakuna",
    types: ["Bug", "Poison"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/14.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/14.png",
    category: "Cocoon Pokémon",
    description: "While awaiting evolution, it remains nearly immobile, clinging to branches to avoid detection.",
    stats: [
      { name: "hp", value: 45 },
      { name: "attack", value: 25 },
      { name: "defense", value: 50 },
      { name: "special-attack", value: 25 },
      { name: "special-defense", value: 25 },
      { name: "speed", value: 35 }
    ],
    abilities: ["Shed Skin"]
  },
  {
    id: 15,
    regionalId: "#020",
    name: "Beedrill",
    types: ["Bug", "Poison"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/15.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/15.png",
    category: "Poison Bee Pokémon",
    description: "It flies at high speeds and attacks with three toxic stingers, defending its territory aggressively.",
    stats: [
      { name: "hp", value: 65 },
      { name: "attack", value: 90 },
      { name: "defense", value: 40 },
      { name: "special-attack", value: 45 },
      { name: "special-defense", value: 80 },
      { name: "speed", value: 75 }
    ],
    abilities: ["Swarm", "Sniper"]
  },
  {
    id: 10015,
    regionalId: "#020",
    name: "Beedrill-Mega",
    types: ["Bug", "Poison"],
    isMega: true,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10090.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/10090.png",
    category: "Poison Bee Pokémon",
    description: "The stinger on its tail grows massive, delivering highly lethal toxins with astonishing speed.",
    stats: [
      { name: "hp", value: 65 },
      { name: "attack", value: 150 },
      { name: "defense", value: 40 },
      { name: "special-attack", value: 15 },
      { name: "special-defense", value: 80 },
      { name: "speed", value: 145 }
    ],
    abilities: ["Adaptability"]
  },

  // --- CHUỒI PIDGEY ---
  {
    id: 16,
    regionalId: "#021",
    name: "Pidgey",
    types: ["Normal", "Flying"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/16.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/16.png",
    category: "Tiny Bird Pokémon",
    description: "Extremely common in temperate grassy areas, it whips up sandstorms to blind opponents.",
    stats: [
      { name: "hp", value: 40 },
      { name: "attack", value: 45 },
      { name: "defense", value: 40 },
      { name: "special-attack", value: 35 },
      { name: "special-defense", value: 35 },
      { name: "speed", value: 56 }
    ],
    abilities: ["Keen Eye", "Tangled Feet"]
  },
  {
    id: 17,
    regionalId: "#022",
    name: "Pidgeotto",
    types: ["Normal", "Flying"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/17.png",
    category: "Bird Pokémon",
    description: "It possesses outstanding vision, soaring high to search for prey and claiming a large nesting territory.",
    stats: [
      { name: "hp", value: 63 },
      { name: "attack", value: 60 },
      { name: "defense", value: 55 },
      { name: "special-attack", value: 50 },
      { name: "special-defense", value: 50 },
      { name: "speed", value: 71 }
    ],
    abilities: ["Keen Eye", "Tangled Feet"]
  },
  {
    id: 18,
    regionalId: "#023",
    name: "Pidgeot",
    types: ["Normal", "Flying"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/18.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/18.png",
    category: "Bird Pokémon",
    description: "By flapping its wings with all its might, it can generate gusts powerful enough to bend tall trees.",
    stats: [
      { name: "hp", value: 83 },
      { name: "attack", value: 80 },
      { name: "defense", value: 75 },
      { name: "special-attack", value: 70 },
      { name: "special-defense", value: 70 },
      { name: "speed", value: 101 }
    ],
    abilities: ["Keen Eye", "Tangled Feet"]
  },
  {
    id: 10018,
    regionalId: "#023",
    name: "Pidgeot-Mega",
    types: ["Normal", "Flying"],
    isMega: true,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10091.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/10091.png",
    category: "Bird Pokémon",
    description: "Mega Evolution greatly expands its muscular wings, letting it fly continuously at Mach 2 speeds.",
    stats: [
      { name: "hp", value: 83 },
      { name: "attack", value: 80 },
      { name: "defense", value: 80 },
      { name: "special-attack", value: 135 },
      { name: "special-defense", value: 80 },
      { name: "speed", value: 121 }
    ],
    abilities: ["No Guard"]
  },

  // --- CHUỒI MAREEP ---
  {
    id: 179,
    regionalId: "#024",
    name: "Mareep",
    types: ["Electric"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/179.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/179.png",
    category: "Wool Pokémon",
    description: "Its fleece stores static electricity. Touching it when fully charged can result in a powerful shock.",
    stats: [
      { name: "hp", value: 55 },
      { name: "attack", value: 40 },
      { name: "defense", value: 40 },
      { name: "special-attack", value: 65 },
      { name: "special-defense", value: 45 },
      { name: "speed", value: 35 }
    ],
    abilities: ["Static", "Plus"]
  },
  {
    id: 180,
    regionalId: "#025",
    name: "Flaaffy",
    types: ["Electric"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/180.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/180.png",
    category: "Wool Pokémon",
    description: "Its rubbery skin protects it from its own high-voltage fleece, which stores electrical currents.",
    stats: [
      { name: "hp", value: 70 },
      { name: "attack", value: 55 },
      { name: "defense", value: 55 },
      { name: "special-attack", value: 80 },
      { name: "special-defense", value: 60 },
      { name: "speed", value: 45 }
    ],
    abilities: ["Static", "Plus"]
  },
  {
    id: 181,
    regionalId: "#026",
    name: "Ampharos",
    types: ["Electric"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/181.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/181.png",
    category: "Light Pokémon",
    description: "The bright tip of its tail shines so intensely that it has been used as a beacon for lost sailors.",
    stats: [
      { name: "hp", value: 90 },
      { name: "attack", value: 75 },
      { name: "defense", value: 85 },
      { name: "special-attack", value: 115 },
      { name: "special-defense", value: 90 },
      { name: "speed", value: 55 }
    ],
    abilities: ["Static", "Plus"]
  },
  {
    id: 10181,
    regionalId: "#026",
    name: "Ampharos-Mega",
    types: ["Electric", "Dragon"],
    isMega: true,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10045.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/10045.png",
    category: "Light Pokémon",
    description: "Its flowing locks of white fleece are filled with electrical aura and dragon power.",
    stats: [
      { name: "hp", value: 90 },
      { name: "attack", value: 95 },
      { name: "defense", value: 105 },
      { name: "special-attack", value: 165 },
      { name: "special-defense", value: 110 },
      { name: "speed", value: 45 }
    ],
    abilities: ["Mold Breaker"]
  },

  // --- CHUỒI PATRAT ---
  {
    id: 504,
    regionalId: "#027",
    name: "Patrat",
    types: ["Normal"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/504.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/504.png",
    category: "Scout Pokémon",
    description: "Extremely cautious, it keeps a sharp lookout in all directions to protect its burrow from predators.",
    stats: [
      { name: "hp", value: 45 },
      { name: "attack", value: 55 },
      { name: "defense", value: 39 },
      { name: "special-attack", value: 35 },
      { name: "special-defense", value: 39 },
      { name: "speed", value: 42 }
    ],
    abilities: ["Run Away", "Keen Eye"]
  },
  {
    id: 505,
    regionalId: "#028",
    name: "Watchog",
    types: ["Normal"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/505.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/505.png",
    category: "Lookout Pokémon",
    description: "It stores seeds in its cheek pouches and spits them out to attack trespassers with high velocity.",
    stats: [
      { name: "hp", value: 60 },
      { name: "attack", value: 85 },
      { name: "defense", value: 69 },
      { name: "special-attack", value: 60 },
      { name: "special-defense", value: 69 },
      { name: "speed", value: 77 }
    ],
    abilities: ["Illuminate", "Keen Eye"]
  },

  // --- CHUỒI BUDEW ---
  {
    id: 406,
    regionalId: "#029",
    name: "Budew",
    types: ["Grass", "Poison"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/406.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/406.png",
    category: "Bud Pokémon",
    description: "During winter, it closes its bud to endure cold winds, opening it beautifully as spring arrives.",
    stats: [
      { name: "hp", value: 40 },
      { name: "attack", value: 30 },
      { name: "defense", value: 35 },
      { name: "special-attack", value: 50 },
      { name: "special-defense", value: 70 },
      { name: "speed", value: 55 }
    ],
    abilities: ["Natural Cure", "Poison Point"]
  },
  {
    id: 315,
    regionalId: "#030",
    name: "Roselia",
    types: ["Grass", "Poison"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/315.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/315.png",
    category: "Thorn Pokémon",
    description: "The roses on its hands secrete a highly lethal poison. It blooms more beautifully in clean water.",
    stats: [
      { name: "hp", value: 50 },
      { name: "attack", value: 60 },
      { name: "defense", value: 45 },
      { name: "special-attack", value: 100 },
      { name: "special-defense", value: 80 },
      { name: "speed", value: 65 }
    ],
    abilities: ["Natural Cure", "Poison Point"]
  },
  {
    id: 407,
    regionalId: "#031",
    name: "Roserade",
    types: ["Grass", "Poison"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/407.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/407.png",
    category: "Bouquet Pokémon",
    description: "With elegant movements, it lures foes close before whipping them with toxic vine-roses.",
    stats: [
      { name: "hp", value: 60 },
      { name: "attack", value: 70 },
      { name: "defense", value: 65 },
      { name: "special-attack", value: 125 },
      { name: "special-defense", value: 105 },
      { name: "speed", value: 90 }
    ],
    abilities: ["Natural Cure", "Poison Point"]
  },

  // --- CHUỒI MAGIKARP ---
  {
    id: 129,
    regionalId: "#032",
    name: "Magikarp",
    types: ["Water"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/129.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/129.png",
    category: "Fish Pokémon",
    description: "Famously weak and pathetic, it splashes aimlessly, but is capable of surviving in any water.",
    stats: [
      { name: "hp", value: 20 },
      { name: "attack", value: 10 },
      { name: "defense", value: 55 },
      { name: "special-attack", value: 15 },
      { name: "special-defense", value: 20 },
      { name: "speed", value: 80 }
    ],
    abilities: ["Swift Swim", "Rattled"]
  },
  {
    id: 130,
    regionalId: "#033",
    name: "Gyarados",
    types: ["Water", "Flying"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/130.png",
    category: "Atrocious Pokémon",
    description: "Known for its violent temper, it once destroyed an entire city when whipped into a blind rage.",
    stats: [
      { name: "hp", value: 95 },
      { name: "attack", value: 125 },
      { name: "defense", value: 79 },
      { name: "special-attack", value: 60 },
      { name: "special-defense", value: 100 },
      { name: "speed", value: 81 }
    ],
    abilities: ["Intimidate", "Moxie"]
  },
  {
    id: 10130,
    regionalId: "#033",
    name: "Gyarados-Mega",
    types: ["Water", "Dark"],
    isMega: true,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10041.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/10041.png",
    category: "Atrocious Pokémon",
    description: "Its brain is filled with destructive impulses, leaving only the desire to crush everything in its path.",
    stats: [
      { name: "hp", value: 95 },
      { name: "attack", value: 155 },
      { name: "defense", value: 109 },
      { name: "special-attack", value: 70 },
      { name: "special-defense", value: 130 },
      { name: "speed", value: 81 }
    ],
    abilities: ["Mold Breaker"]
  },

  // --- CHUỒI BINACLE ---
  {
    id: 688,
    regionalId: "#034",
    name: "Binacle",
    types: ["Rock", "Water"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/688.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/688.png",
    category: "Two-Handed Pokémon",
    description: "Two Binacle live together on a single rock. They work in tandem to capture food in tides.",
    stats: [
      { name: "hp", value: 42 },
      { name: "attack", value: 52 },
      { name: "defense", value: 67 },
      { name: "special-attack", value: 39 },
      { name: "special-defense", value: 56 },
      { name: "speed", value: 50 }
    ],
    abilities: ["Tough Claws", "Sniper"]
  },
  {
    id: 689,
    regionalId: "#035",
    name: "Barbaracle",
    types: ["Rock", "Water"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/689.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/689.png",
    category: "Collective Pokémon",
    description: "It is made of seven Binacle that combined. Each limb has a mind of its own, acting independently.",
    stats: [
      { name: "hp", value: 72 },
      { name: "attack", value: 105 },
      { name: "defense", value: 115 },
      { name: "special-attack", value: 54 },
      { name: "special-defense", value: 86 },
      { name: "speed", value: 68 }
    ],
    abilities: ["Tough Claws", "Sniper"]
  },
  {
    id: 10689,
    regionalId: "#035",
    name: "Barbaracle-Mega",
    types: ["Rock", "Fighting"],
    isMega: true,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/689-mega.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/689.png",
    category: "Collective Pokémon",
    description: "Mega Evolution binds its limbs in perfect synchronization, transforming it into a martial arts master.",
    stats: [
      { name: "hp", value: 72 },
      { name: "attack", value: 135 },
      { name: "defense", value: 135 },
      { name: "special-attack", value: 64 },
      { name: "special-defense", value: 106 },
      { name: "speed", value: 88 }
    ],
    abilities: ["Tough Claws"]
  },

  // --- CHUỒI STARYU ---
  {
    id: 120,
    regionalId: "#036",
    name: "Staryu",
    types: ["Water"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/120.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/120.png",
    category: "Starshape Pokémon",
    description: "Its core glows red at night, communicating with the stars. It can regenerate lost limbs quickly.",
    stats: [
      { name: "hp", value: 30 },
      { name: "attack", value: 45 },
      { name: "defense", value: 55 },
      { name: "special-attack", value: 70 },
      { name: "special-defense", value: 55 },
      { name: "speed", value: 85 }
    ],
    abilities: ["Natural Cure", "Illuminate"]
  },
  {
    id: 121,
    regionalId: "#037",
    name: "Starmie",
    types: ["Water", "Psychic"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/121.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/121.png",
    category: "Mysterious Pokémon",
    description: "Its central core glows in seven colors, sending radio waves into space to contact unknown realms.",
    stats: [
      { name: "hp", value: 60 },
      { name: "attack", value: 75 },
      { name: "defense", value: 85 },
      { name: "special-attack", value: 100 },
      { name: "special-defense", value: 85 },
      { name: "speed", value: 115 }
    ],
    abilities: ["Natural Cure", "Illuminate"]
  },
  {
    id: 10121,
    regionalId: "#037",
    name: "Starmie-Mega",
    types: ["Water", "Psychic"],
    isMega: true,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/121-mega.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/121.png",
    category: "Mysterious Pokémon",
    description: "Its central core expands, focusing cosmic psychic energy to manipulate gravity around itself.",
    stats: [
      { name: "hp", value: 60 },
      { name: "attack", value: 95 },
      { name: "defense", value: 105 },
      { name: "special-attack", value: 130 },
      { name: "special-defense", value: 115 },
      { name: "speed", value: 115 }
    ],
    abilities: ["Analytic"]
  },

  // --- CHUỒI FLABÉBÉ ---
  {
    id: 669,
    regionalId: "#038",
    name: "Flabébé",
    types: ["Fairy"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/669.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/669.png",
    category: "Single Bloom Pokémon",
    description: "It forms a symbiotic bond with a flower from birth, caring for it and drawing power from its petals.",
    stats: [
      { name: "hp", value: 44 },
      { name: "attack", value: 38 },
      { name: "defense", value: 39 },
      { name: "special-attack", value: 61 },
      { name: "special-defense", value: 79 },
      { name: "speed", value: 42 }
    ],
    abilities: ["Flower Veil", "Symbiosis"]
  },
  {
    id: 670,
    regionalId: "#039",
    name: "Floette",
    types: ["Fairy"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/670.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/670.png",
    category: "Single Bloom Pokémon",
    description: "It flutters around keeping flowers healthy. It fights by throwing flower petals like blades.",
    stats: [
      { name: "hp", value: 54 },
      { name: "attack", value: 45 },
      { name: "defense", value: 47 },
      { name: "special-attack", value: 75 },
      { name: "special-defense", value: 98 },
      { name: "speed", value: 52 }
    ],
    abilities: ["Flower Veil", "Symbiosis"]
  },
  {
    id: 20670,
    regionalId: "#039",
    name: "Eternal Floette",
    types: ["Fairy"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/670-eternal.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/670.png",
    category: "Single Bloom Pokémon",
    description: "A legendary Floette from ancient times that holds a dark, powerful flower containing infinite energy.",
    stats: [
      { name: "hp", value: 74 },
      { name: "attack", value: 65 },
      { name: "defense", value: 67 },
      { name: "special-attack", value: 125 },
      { name: "special-defense", value: 128 },
      { name: "speed", value: 92 }
    ],
    abilities: ["Flower Veil"]
  },
  {
    id: 10670,
    regionalId: "#039",
    name: "Floette-Mega",
    types: ["Fairy"],
    isMega: true,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/670-mega.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/670.png",
    category: "Single Bloom Pokémon",
    description: "Mega Evolution covers it in a beautiful protective flora aura, radiating pure fairy light.",
    stats: [
      { name: "hp", value: 54 },
      { name: "attack", value: 65 },
      { name: "defense", value: 77 },
      { name: "special-attack", value: 115 },
      { name: "special-defense", value: 128 },
      { name: "speed", value: 62 }
    ],
    abilities: ["Flower Veil"]
  },
  {
    id: 671,
    regionalId: "#040",
    name: "Florges",
    types: ["Fairy"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/671.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/671.png",
    category: "Garden Pokémon",
    description: "It claims beautiful flower gardens as its territory, protecting them with powerful fairy attacks.",
    stats: [
      { name: "hp", value: 78 },
      { name: "attack", value: 65 },
      { name: "defense", value: 68 },
      { name: "special-attack", value: 112 },
      { name: "special-defense", value: 154 },
      { name: "speed", value: 75 }
    ],
    abilities: ["Flower Veil", "Symbiosis"]
  },

  // --- CHUỒI SKIDDO ---
  {
    id: 672,
    regionalId: "#041",
    name: "Skiddo",
    types: ["Grass"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/672.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/672.png",
    category: "Mount Pokémon",
    description: "Very friendly and calm, it can sense its rider's emotions through the horns on its head.",
    stats: [
      { name: "hp", value: 66 },
      { name: "attack", value: 65 },
      { name: "defense", value: 48 },
      { name: "special-attack", value: 62 },
      { name: "special-defense", value: 57 },
      { name: "speed", value: 52 }
    ],
    abilities: ["Sap Sipper", "Grass Pelt"]
  },
  {
    id: 673,
    regionalId: "#042",
    name: "Gogoat",
    types: ["Grass"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/673.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/673.png",
    category: "Mount Pokémon",
    description: "It can carry people on its back for days without tiring, utilizing solar energy stored in its leafy coat.",
    stats: [
      { name: "hp", value: 123 },
      { name: "attack", value: 100 },
      { name: "defense", value: 62 },
      { name: "special-attack", value: 97 },
      { name: "special-defense", value: 81 },
      { name: "speed", value: 68 }
    ],
    abilities: ["Sap Sipper", "Grass Pelt"]
  },

  // --- CHUỒI ESPURR ---
  {
    id: 677,
    regionalId: "#043",
    name: "Espurr",
    types: ["Psychic"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/677.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/677.png",
    category: "Restraint Pokémon",
    description: "It has a psychic power strong enough to blow away everything within 300 feet, keeping its ears shut tight.",
    stats: [
      { name: "hp", value: 62 },
      { name: "attack", value: 48 },
      { name: "defense", value: 54 },
      { name: "special-attack", value: 63 },
      { name: "special-defense", value: 60 },
      { name: "speed", value: 68 }
    ],
    abilities: ["Keen Eye", "Infiltrator"]
  },
  {
    id: 678,
    regionalId: "#044",
    name: "Meowstic",
    types: ["Psychic"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/678.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/678.png",
    category: "Constraint Pokémon",
    description: "It keeps its eye-like patterns hidden. When threatened, it raises its ears to release psychic blasts.",
    stats: [
      { name: "hp", value: 74 },
      { name: "attack", value: 48 },
      { name: "defense", value: 76 },
      { name: "special-attack", value: 83 },
      { name: "special-defense", value: 81 },
      { name: "speed", value: 104 }
    ],
    abilities: ["Keen Eye", "Infiltrator"]
  },
  {
    id: 10025,
    regionalId: "#044",
    name: "Female Meowstic",
    types: ["Psychic"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10025.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/10025.png",
    category: "Constraint Pokémon",
    description: "Female Meowstic are highly aggressive and selfish, unleashing absolute psychic force if displeased.",
    stats: [
      { name: "hp", value: 74 },
      { name: "attack", value: 48 },
      { name: "defense", value: 76 },
      { name: "special-attack", value: 83 },
      { name: "special-defense", value: 81 },
      { name: "speed", value: 104 }
    ],
    abilities: ["Keen Eye", "Infiltrator"]
  },
  {
    id: 10678,
    regionalId: "#044",
    name: "Meowstic-Mega (M)",
    types: ["Psychic"],
    isMega: true,
    sprite: "/custom_sprites/#044-meowstic-mega-m.png",
    shinySprite: "/custom_sprites/#044-meowstic-mega-m-shiny.png",
    category: "Constraint Pokémon",
    description: "Mega Evolution unlocks boundless psychic focus, allowing it to predict every move of its opponent.",
    stats: [
      { name: "hp", value: 74 },
      { name: "attack", value: 68 },
      { name: "defense", value: 106 },
      { name: "special-attack", value: 113 },
      { name: "special-defense", value: 111 },
      { name: "speed", value: 114 }
    ],
    abilities: ["Prankster"]
  },
  {
    id: 30678,
    regionalId: "#044",
    name: "Meowstic-Mega (F)",
    types: ["Psychic"],
    isMega: true,
    sprite: "/custom_sprites/#044-meowstic-mega-f.png",
    shinySprite: "/custom_sprites/#044-meowstic-mega-f-shiny.png",
    category: "Constraint Pokémon",
    description: "Unleashing its pure destructive mind, Mega Evolution (F) crushes opponents with gravitational anomalies.",
    stats: [
      { name: "hp", value: 74 },
      { name: "attack", value: 68 },
      { name: "defense", value: 106 },
      { name: "special-attack", value: 113 },
      { name: "special-defense", value: 111 },
      { name: "speed", value: 114 }
    ],
    abilities: ["Competitive"]
  },

  // --- CHUỒI LITLEO ---
  {
    id: 667,
    regionalId: "#045",
    name: "Litleo",
    types: ["Fire", "Normal"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/667.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/667.png",
    category: "Lion Cub Pokémon",
    description: "Its red mane burns hotter when it encounters strong foes. It leaves the pride to train on its own.",
    stats: [
      { name: "hp", value: 62 },
      { name: "attack", value: 50 },
      { name: "defense", value: 58 },
      { name: "special-attack", value: 73 },
      { name: "special-defense", value: 54 },
      { name: "speed", value: 72 }
    ],
    abilities: ["Rivalry", "Moxie"]
  },
  {
    id: 668,
    regionalId: "#046",
    name: "Pyroar",
    types: ["Fire", "Normal"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/668.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/668.png",
    category: "Royal Pokémon",
    description: "The male with the largest mane of fire becomes the leader. It protects its pride from intruders.",
    stats: [
      { name: "hp", value: 86 },
      { name: "attack", value: 68 },
      { name: "defense", value: 72 },
      { name: "special-attack", value: 109 },
      { name: "special-defense", value: 66 },
      { name: "speed", value: 106 }
    ],
    abilities: ["Rivalry", "Moxie"]
  },
  {
    id: 10668,
    regionalId: "#046",
    name: "Pyroar-Mega",
    types: ["Fire", "Normal"],
    isMega: true,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/668-mega.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/668.png",
    category: "Royal Pokémon",
    description: "Mega Evolution covers its entire neck in a roaring corona of fire, paralyzing enemies with fear.",
    stats: [
      { name: "hp", value: 86 },
      { name: "attack", value: 88 },
      { name: "defense", value: 102 },
      { name: "special-attack", value: 139 },
      { name: "special-defense", value: 96 },
      { name: "speed", value: 116 }
    ],
    abilities: ["Intimidate"]
  },

  // --- CHUỒI PANCHAM ---
  {
    id: 674,
    regionalId: "#047",
    name: "Pancham",
    types: ["Fighting"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/674.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/674.png",
    category: "Playful Pokémon",
    description: "It tries to glare intimidatingly, but its cute appearance makes it hard to take seriously.",
    stats: [
      { name: "hp", value: 60 },
      { name: "attack", value: 82 },
      { name: "defense", value: 62 },
      { name: "special-attack", value: 46 },
      { name: "special-defense", value: 48 },
      { name: "speed", value: 43 }
    ],
    abilities: ["Iron Fist", "Mold Breaker"]
  },
  {
    id: 675,
    regionalId: "#048",
    name: "Pangoro",
    types: ["Fighting", "Dark"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/675.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/675.png",
    category: "Daunting Pokémon",
    description: "It has a quick temper, but does not tolerate bullies. It fights with a bamboo leaf clamped in its jaw.",
    stats: [
      { name: "hp", value: 95 },
      { name: "attack", value: 124 },
      { name: "defense", value: 78 },
      { name: "special-attack", value: 69 },
      { name: "special-defense", value: 71 },
      { name: "speed", value: 58 }
    ],
    abilities: ["Iron Fist", "Mold Breaker"]
  },

  // --- CHUỒI TRUBBISH ---
  {
    id: 568,
    regionalId: "#049",
    name: "Trubbish",
    types: ["Poison"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/568.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/568.png",
    category: "Rubbish Pokémon",
    description: "It was born from a chemical reaction between garbage bags and toxic industrial waste.",
    stats: [
      { name: "hp", value: 50 },
      { name: "attack", value: 50 },
      { name: "defense", value: 62 },
      { name: "special-attack", value: 40 },
      { name: "special-defense", value: 62 },
      { name: "speed", value: 65 }
    ],
    abilities: ["Stench", "Sticky Hold"]
  },
  {
    id: 569,
    regionalId: "#050",
    name: "Garbodor",
    types: ["Poison"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/569.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/569.png",
    category: "Trash Heap Pokémon",
    description: "It eats garbage to grow larger. It sprays toxic gas and filth from its right hand fingertips.",
    stats: [
      { name: "hp", value: 80 },
      { name: "attack", value: 95 },
      { name: "defense", value: 82 },
      { name: "special-attack", value: 60 },
      { name: "special-defense", value: 82 },
      { name: "speed", value: 75 }
    ],
    abilities: ["Stench", "Weak Armor"]
  },

  // --- CHUỒI DEDENNE ---
  {
    id: 702,
    regionalId: "#051",
    name: "Dedenne",
    types: ["Electric", "Fairy"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/702.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/702.png",
    category: "Antenna Pokémon",
    description: "Its whiskers act as antennas, allowing it to communicate with allies over long distances.",
    stats: [
      { name: "hp", value: 67 },
      { name: "attack", value: 58 },
      { name: "defense", value: 57 },
      { name: "special-attack", value: 81 },
      { name: "special-defense", value: 67 },
      { name: "speed", value: 101 }
    ],
    abilities: ["Cheek Pouch", "Plus"]
  },

  // --- CHUỒI PICHU / PIKACHU / RAICHU ---
  {
    id: 172,
    regionalId: "#052",
    name: "Pichu",
    types: ["Electric"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/172.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/172.png",
    category: "Tiny Mouse Pokémon",
    description: "It plays with others by touching tails and setting off sparks. This appears to be a test of courage.",
    stats: [
      { name: "hp", value: 20 },
      { name: "attack", value: 40 },
      { name: "defense", value: 15 },
      { name: "special-attack", value: 35 },
      { name: "special-defense", value: 35 },
      { name: "speed", value: 60 }
    ],
    abilities: ["Static", "Lightning Rod"]
  },
  {
    id: 25,
    regionalId: "#053",
    name: "Pikachu",
    types: ["Electric"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/25.png",
    category: "Mouse Pokémon",
    description: "Pikachu that can generate powerful electricity have cheek pouches that are extra soft and super stretchy.",
    stats: [
      { name: "hp", value: 35 },
      { name: "attack", value: 55 },
      { name: "defense", value: 40 },
      { name: "special-attack", value: 50 },
      { name: "special-defense", value: 50 },
      { name: "speed", value: 90 }
    ],
    abilities: ["Static", "Lightning Rod"]
  },
  {
    id: 26,
    regionalId: "#054",
    name: "Raichu",
    types: ["Electric"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/26.png",
    category: "Mouse Pokémon",
    description: "Its long tail serves as a ground to protect itself from its own high-voltage power.",
    stats: [
      { name: "hp", value: 60 },
      { name: "attack", value: 90 },
      { name: "defense", value: 55 },
      { name: "special-attack", value: 90 },
      { name: "special-defense", value: 80 },
      { name: "speed", value: 110 }
    ],
    abilities: ["Static", "Lightning Rod"]
  },
  {
    id: 10100,
    regionalId: "#054",
    name: "Raichu-Alola",
    types: ["Electric", "Psychic"],
    isMega: false,
    sprite: "/custom_sprites/#054-alolan-raichu.png",
    shinySprite: "/custom_sprites/#054-alolan-raichu-shiny.png",
    category: "Mouse Pokémon",
    description: "It uses psychic power to control electricity. It rides its broad tail like a surfboard, floating in the air.",
    stats: [
      { name: "hp", value: 60 },
      { name: "attack", value: 85 },
      { name: "defense", value: 50 },
      { name: "special-attack", value: 95 },
      { name: "special-defense", value: 85 },
      { name: "speed", value: 110 }
    ],
    abilities: ["Surge Surfer"]
  },
  {
    id: 10226,
    regionalId: "#054",
    name: "Raichu-Mega-X",
    types: ["Electric", "Fighting"],
    isMega: true,
    sprite: "/custom_sprites/#054-mega-raichu-x.png",
    shinySprite: "/custom_sprites/#054-mega-raichu-x-shiny.png",
    category: "Mouse Pokémon",
    description: "Mega Evolution X concentrates electrical energy into its muscles, allowing it to strike with martial arts precision.",
    stats: [
      { name: "hp", value: 60 },
      { name: "attack", value: 130 },
      { name: "defense", value: 75 },
      { name: "special-attack", value: 100 },
      { name: "special-defense", value: 90 },
      { name: "speed", value: 130 }
    ],
    abilities: ["Transistor"]
  },
  {
    id: 10326,
    regionalId: "#054",
    name: "Raichu-Mega-Y",
    types: ["Electric", "Psychic"],
    isMega: true,
    sprite: "/custom_sprites/#054-mega-raichu-y.png",
    shinySprite: "/custom_sprites/#054-mega-raichu-y-shiny.png",
    category: "Mouse Pokémon",
    description: "Mega Evolution Y unleashes its latent psychic potential, letting it float effortlessly while raining down thunderbolts.",
    stats: [
      { name: "hp", value: 60 },
      { name: "attack", value: 90 },
      { name: "defense", value: 65 },
      { name: "special-attack", value: 140 },
      { name: "special-defense", value: 100 },
      { name: "speed", value: 130 }
    ],
    abilities: ["Levitate"]
  },

  // --- CHUỒI CLEFFA ---
  {
    id: 173,
    regionalId: "#055",
    name: "Cleffa",
    types: ["Fairy"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/173.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/173.png",
    category: "Star Shape Pokémon",
    description: "Because of its unusual silhouette, people believe that it came here riding on a shooting star.",
    stats: [
      { name: "hp", value: 50 },
      { name: "attack", value: 25 },
      { name: "defense", value: 28 },
      { name: "special-attack", value: 45 },
      { name: "special-defense", value: 55 },
      { name: "speed", value: 15 }
    ],
    abilities: ["Cute Charm", "Magic Guard", "Friend Guard"]
  },
  {
    id: 35,
    regionalId: "#056",
    name: "Clefairy",
    types: ["Fairy"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/35.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/35.png",
    category: "Fairy Pokémon",
    description: "It is said that happiness will come to those who see a gathering of Clefairy dancing under a full moon.",
    stats: [
      { name: "hp", value: 70 },
      { name: "attack", value: 45 },
      { name: "defense", value: 48 },
      { name: "special-attack", value: 60 },
      { name: "special-defense", value: 65 },
      { name: "speed", value: 35 }
    ],
    abilities: ["Cute Charm", "Magic Guard", "Friend Guard"]
  },
  {
    id: 36,
    regionalId: "#057",
    name: "Clefable",
    types: ["Fairy"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/36.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/36.png",
    category: "Fairy Pokémon",
    description: "A timid Pokémon that is rarely seen. It will run and hide the moment it senses people.",
    stats: [
      { name: "hp", value: 95 },
      { name: "attack", value: 70 },
      { name: "defense", value: 73 },
      { name: "special-attack", value: 95 },
      { name: "special-defense", value: 90 },
      { name: "speed", value: 60 }
    ],
    abilities: ["Cute Charm", "Magic Guard", "Unaware"]
  },
  {
    id: 10036,
    regionalId: "#057",
    name: "Clefable-Mega",
    types: ["Fairy", "Psychic"],
    isMega: true,
    sprite: "/custom_sprites/#057-mega-clefable.png",
    shinySprite: "/custom_sprites/#057-mega-clefable-shiny.png",
    category: "Fairy Pokémon",
    description: "Empowered by lunar energy, its wings glow with stardust, reflecting all status conditions and hazards.",
    stats: [
      { name: "hp", value: 95 },
      { name: "attack", value: 80 },
      { name: "defense", value: 103 },
      { name: "special-attack", value: 125 },
      { name: "special-defense", value: 110 },
      { name: "speed", value: 70 }
    ],
    abilities: ["Magic Bounce"]
  },

  // --- CHUỒI SPINARAK ---
  {
    id: 167,
    regionalId: "#058",
    name: "Spinarak",
    types: ["Bug", "Poison"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/167.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/167.png",
    category: "String Spit Pokémon",
    description: "It spins a web and lies in wait for prey. It can tell what kind of prey is in its web by the vibrations.",
    stats: [
      { name: "hp", value: 40 },
      { name: "attack", value: 60 },
      { name: "defense", value: 40 },
      { name: "special-attack", value: 40 },
      { name: "special-defense", value: 40 },
      { name: "speed", value: 30 }
    ],
    abilities: ["Swarm", "Insomnia", "Sniper"]
  },
  {
    id: 168,
    regionalId: "#059",
    name: "Ariados",
    types: ["Bug", "Poison"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/168.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/168.png",
    category: "Long Leg Pokémon",
    description: "It attaches silk to its prey and sets it free. Later, it tracks the silk to the prey and its friends.",
    stats: [
      { name: "hp", value: 70 },
      { name: "attack", value: 90 },
      { name: "defense", value: 70 },
      { name: "special-attack", value: 60 },
      { name: "special-defense", value: 70 },
      { name: "speed", value: 40 }
    ],
    abilities: ["Swarm", "Insomnia", "Sniper"]
  },

  // --- CHUỒI EKANS ---
  {
    id: 23,
    regionalId: "#060",
    name: "Ekans",
    types: ["Poison"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/23.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/23.png",
    category: "Snake Pokémon",
    description: "It can freely detach its jaw to swallow large prey whole. It can barely move if it eats too much.",
    stats: [
      { name: "hp", value: 35 },
      { name: "attack", value: 60 },
      { name: "defense", value: 44 },
      { name: "special-attack", value: 40 },
      { name: "special-defense", value: 54 },
      { name: "speed", value: 55 }
    ],
    abilities: ["Intimidate", "Shed Skin", "Unnerve"]
  },
  {
    id: 24,
    regionalId: "#061",
    name: "Arbok",
    types: ["Poison"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/24.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/24.png",
    category: "Cobra Pokémon",
    description: "The frightening patterns on its belly have been studied. Six variations have been confirmed.",
    stats: [
      { name: "hp", value: 60 },
      { name: "attack", value: 95 },
      { name: "defense", value: 69 },
      { name: "special-attack", value: 65 },
      { name: "special-defense", value: 79 },
      { name: "speed", value: 80 }
    ],
    abilities: ["Intimidate", "Shed Skin", "Unnerve"]
  },

  // --- CHUỒI ABRA ---
  {
    id: 63,
    regionalId: "#062",
    name: "Abra",
    types: ["Psychic"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/63.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/63.png",
    category: "Psi Pokémon",
    description: "It sleeps for 18 hours a day. It uses teleportation to escape danger even while asleep.",
    stats: [
      { name: "hp", value: 25 },
      { name: "attack", value: 20 },
      { name: "defense", value: 15 },
      { name: "special-attack", value: 105 },
      { name: "special-defense", value: 55 },
      { name: "speed", value: 90 }
    ],
    abilities: ["Synchronize", "Inner Focus", "Magic Guard"]
  },
  {
    id: 64,
    regionalId: "#063",
    name: "Kadabra",
    types: ["Psychic"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/64.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/64.png",
    category: "Psi Pokémon",
    description: "It emits special alpha waves from its body that cause nearby electronic devices to malfunction.",
    stats: [
      { name: "hp", value: 40 },
      { name: "attack", value: 35 },
      { name: "defense", value: 30 },
      { name: "special-attack", value: 120 },
      { name: "special-defense", value: 70 },
      { name: "speed", value: 105 }
    ],
    abilities: ["Synchronize", "Inner Focus", "Magic Guard"]
  },
  {
    id: 65,
    regionalId: "#064",
    name: "Alakazam",
    types: ["Psychic"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/65.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/65.png",
    category: "Psi Pokémon",
    description: "Its brain cells multiply continually until it dies. As a result, it remembers everything.",
    stats: [
      { name: "hp", value: 55 },
      { name: "attack", value: 50 },
      { name: "defense", value: 45 },
      { name: "special-attack", value: 135 },
      { name: "special-defense", value: 95 },
      { name: "speed", value: 120 }
    ],
    abilities: ["Synchronize", "Inner Focus", "Magic Guard"]
  },
  {
    id: 10070,
    regionalId: "#064",
    name: "Alakazam-Mega",
    types: ["Psychic"],
    isMega: true,
    sprite: "/custom_sprites/#064-mega-alakazam.png",
    shinySprite: "/custom_sprites/#064-mega-alakazam-shiny.png",
    category: "Psi Pokémon",
    description: "Mega Evolution increases its brainpower infinitely, allowing it to predict every move of its opponents.",
    stats: [
      { name: "hp", value: 55 },
      { name: "attack", value: 50 },
      { name: "defense", value: 65 },
      { name: "special-attack", value: 175 },
      { name: "special-defense", value: 105 },
      { name: "speed", value: 150 }
    ],
    abilities: ["Trace"]
  },

  // --- CHUỒI GASTLY ---
  {
    id: 92,
    regionalId: "#065",
    name: "Gastly",
    types: ["Ghost", "Poison"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/92.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/92.png",
    category: "Gas Pokémon",
    description: "With its gaslike body, it can sneak into any building. However, it can be blown away by wind.",
    stats: [
      { name: "hp", value: 30 },
      { name: "attack", value: 35 },
      { name: "defense", value: 30 },
      { name: "special-attack", value: 100 },
      { name: "special-defense", value: 35 },
      { name: "speed", value: 80 }
    ],
    abilities: ["Levitate"]
  },
  {
    id: 93,
    regionalId: "#066",
    name: "Haunter",
    types: ["Ghost", "Poison"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/93.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/93.png",
    category: "Gas Pokémon",
    description: "It licks with its gaseous tongue to steal its victim's life-force. It hides in shadows to stalk prey.",
    stats: [
      { name: "hp", value: 45 },
      { name: "attack", value: 50 },
      { name: "defense", value: 45 },
      { name: "special-attack", value: 115 },
      { name: "special-defense", value: 55 },
      { name: "speed", value: 95 }
    ],
    abilities: ["Levitate"]
  },
  {
    id: 94,
    regionalId: "#067",
    name: "Gengar",
    types: ["Ghost", "Poison"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/94.png",
    category: "Shadow Pokémon",
    description: "It hides in shadows. It is said that if Gengar is hiding in a room, the temperature drops by nearly 10 degrees.",
    stats: [
      { name: "hp", value: 60 },
      { name: "attack", value: 65 },
      { name: "defense", value: 60 },
      { name: "special-attack", value: 130 },
      { name: "special-defense", value: 75 },
      { name: "speed", value: 110 }
    ],
    abilities: ["Cursed Body"]
  },
  {
    id: 10071,
    regionalId: "#067",
    name: "Gengar-Mega",
    types: ["Ghost", "Poison"],
    isMega: true,
    sprite: "/custom_sprites/#067-mega-gengar.png",
    shinySprite: "/custom_sprites/#067-mega-gengar-shiny.png",
    category: "Shadow Pokémon",
    description: "Its third eye is capable of seeing other dimensions. It locks down its prey's shadow, preventing escape.",
    stats: [
      { name: "hp", value: 60 },
      { name: "attack", value: 65 },
      { name: "defense", value: 80 },
      { name: "special-attack", value: 170 },
      { name: "special-defense", value: 95 },
      { name: "speed", value: 130 }
    ],
    abilities: ["Shadow Tag"]
  },

  // --- CHUỒI VENIPEDE ---
  {
    id: 543,
    regionalId: "#068",
    name: "Venipede",
    types: ["Bug", "Poison"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/543.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/543.png",
    category: "Centipede Pokémon",
    description: "Its bite is highly venomous. It is extremely aggressive, attacking anything that enters its territory.",
    stats: [
      { name: "hp", value: 30 },
      { name: "attack", value: 45 },
      { name: "defense", value: 59 },
      { name: "special-attack", value: 30 },
      { name: "special-defense", value: 39 },
      { name: "speed", value: 57 }
    ],
    abilities: ["Poison Point", "Swarm", "Speed Boost"]
  },
  {
    id: 544,
    regionalId: "#069",
    name: "Whirlipede",
    types: ["Bug", "Poison"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/544.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/544.png",
    category: "Curlipede Pokémon",
    description: "Protected by a sturdy shell, it spins like a wheel to crash into opponents at high speed.",
    stats: [
      { name: "hp", value: 40 },
      { name: "attack", value: 55 },
      { name: "defense", value: 99 },
      { name: "special-attack", value: 40 },
      { name: "special-defense", value: 79 },
      { name: "speed", value: 47 }
    ],
    abilities: ["Poison Point", "Swarm", "Speed Boost"]
  },
  {
    id: 545,
    regionalId: "#070",
    name: "Scolipede",
    types: ["Bug", "Poison"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/545.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/545.png",
    category: "Megapede Pokémon",
    description: "It clasps its prey with its claws and stabs them with its toxic horns. It is highly relentless.",
    stats: [
      { name: "hp", value: 60 },
      { name: "attack", value: 100 },
      { name: "defense", value: 89 },
      { name: "special-attack", value: 55 },
      { name: "special-defense", value: 69 },
      { name: "speed", value: 112 }
    ],
    abilities: ["Poison Point", "Swarm", "Speed Boost"]
  },
  {
    id: 10545,
    regionalId: "#070",
    name: "Scolipede-Mega",
    types: ["Bug", "Poison"],
    isMega: true,
    sprite: "/custom_sprites/#070-mega-scolipede.png",
    shinySprite: "/custom_sprites/#070-mega-scolipede-shiny.png",
    category: "Megapede Pokémon",
    description: "Mega Evolution hardens its carapace into iron-like segments, allowing it to charge with destructive momentum.",
    stats: [
      { name: "hp", value: 60 },
      { name: "attack", value: 140 },
      { name: "defense", value: 109 },
      { name: "special-attack", value: 65 },
      { name: "special-defense", value: 89 },
      { name: "speed", value: 122 }
    ],
    abilities: ["Tough Claws"]
  },

  // --- CHUỒI HONEDGE ---
  {
    id: 679,
    regionalId: "#071",
    name: "Honedge",
    types: ["Steel", "Ghost"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/679.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/679.png",
    category: "Sword Pokémon",
    description: "It is born when a departed spirit inhabits a sword. It drains the life force of whoever grabs its hilt.",
    stats: [
      { name: "hp", value: 45 },
      { name: "attack", value: 80 },
      { name: "defense", value: 100 },
      { name: "special-attack", value: 35 },
      { name: "special-defense", value: 37 },
      { name: "speed", value: 28 }
    ],
    abilities: ["No Guard"]
  },
  {
    id: 680,
    regionalId: "#072",
    name: "Doublade",
    types: ["Steel", "Ghost"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/680.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/680.png",
    category: "Sword Pokémon",
    description: "The two swords communicate telepathically to coordinate complex and unstoppable dual attacks.",
    stats: [
      { name: "hp", value: 59 },
      { name: "attack", value: 110 },
      { name: "defense", value: 150 },
      { name: "special-attack", value: 45 },
      { name: "special-defense", value: 49 },
      { name: "speed", value: 35 }
    ],
    abilities: ["No Guard"]
  },
  {
    id: 681,
    regionalId: "#073",
    name: "Aegislash",
    types: ["Steel", "Ghost"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/681.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/681.png",
    category: "Royal Sword Pokémon",
    description: "It can detect the qualities of leadership. Legend says whoever Aegislash recognizes will become king.",
    stats: [
      { name: "hp", value: 60 },
      { name: "attack", value: 50 },
      { name: "defense", value: 140 },
      { name: "special-attack", value: 50 },
      { name: "special-defense", value: 140 },
      { name: "speed", value: 60 }
    ],
    abilities: ["Stance Change"]
  },
  {
    id: 10026,
    regionalId: "#073",
    name: "Aegislash-Blade",
    types: ["Steel", "Ghost"],
    isMega: false,
    sprite: "/custom_sprites/#073-blade-aegislash.png",
    shinySprite: "/custom_sprites/#073-blade-aegislash-shiny.png",
    category: "Royal Sword Pokémon",
    description: "In its Blade Forme, it focuses all its spectral power into an offensive stance to slash foes.",
    stats: [
      { name: "hp", value: 60 },
      { name: "attack", value: 140 },
      { name: "defense", value: 50 },
      { name: "special-attack", value: 140 },
      { name: "special-defense", value: 50 },
      { name: "speed", value: 60 }
    ],
    abilities: ["Stance Change"]
  },

  // --- CHUỒI BELLSPROUT ---
  {
    id: 69,
    regionalId: "#074",
    name: "Bellsprout",
    types: ["Grass", "Poison"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/69.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/69.png",
    category: "Flower Pokémon",
    description: "It prefers hot and humid environments. It captures insects by spitting acid from its mouth.",
    stats: [
      { name: "hp", value: 50 },
      { name: "attack", value: 75 },
      { name: "defense", value: 35 },
      { name: "special-attack", value: 70 },
      { name: "special-defense", value: 30 },
      { name: "speed", value: 40 }
    ],
    abilities: ["Chlorophyll", "Gluttony"]
  },
  {
    id: 70,
    regionalId: "#075",
    name: "Weepinbell",
    types: ["Grass", "Poison"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/70.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/70.png",
    category: "Flycatcher Pokémon",
    description: "When hungry, it swallows anything that moves. Its acid dissolves digested prey in seconds.",
    stats: [
      { name: "hp", value: 65 },
      { name: "attack", value: 90 },
      { name: "defense", value: 50 },
      { name: "special-attack", value: 85 },
      { name: "special-defense", value: 45 },
      { name: "speed", value: 55 }
    ],
    abilities: ["Chlorophyll", "Gluttony"]
  },
  {
    id: 71,
    regionalId: "#076",
    name: "Victreebel",
    types: ["Grass", "Poison"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/71.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/71.png",
    category: "Flycatcher Pokémon",
    description: "It pools a sweet-smelling nectar in its mouth. Any prey lured inside is dissolved completely.",
    stats: [
      { name: "hp", value: 80 },
      { name: "attack", value: 105 },
      { name: "defense", value: 65 },
      { name: "special-attack", value: 100 },
      { name: "special-defense", value: 70 },
      { name: "speed", value: 70 }
    ],
    abilities: ["Chlorophyll", "Gluttony"]
  },
  {
    id: 100710,
    regionalId: "#076",
    name: "Victreebel-Mega",
    types: ["Grass", "Poison"],
    isMega: true,
    sprite: "/custom_sprites/#076-mega-victreebel.png",
    shinySprite: "/custom_sprites/#076-mega-victreebel-shiny.png",
    category: "Flycatcher Pokémon",
    description: "Its pitcher-like body overflows with corrosive digestive acid, capable of melting even the sturdiest armor.",
    stats: [
      { name: "hp", value: 80 },
      { name: "attack", value: 135 },
      { name: "defense", value: 85 },
      { name: "special-attack", value: 130 },
      { name: "special-defense", value: 85 },
      { name: "speed", value: 75 }
    ],
    abilities: ["Corrosion"]
  },

  // --- CHUỒI PANSAGE / SIMISAGE / PANSEAR / SIMISEAR / PANPOUR / SIMIPOUR ---
  {
    id: 511,
    regionalId: "#077",
    name: "Pansage",
    types: ["Grass"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/511.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/511.png",
    category: "Grass Monkey Pokémon",
    description: "It shares the leaf on its head with tired Pokémon. The leaf relieves fatigue instantly.",
    stats: [
      { name: "hp", value: 50 },
      { name: "attack", value: 53 },
      { name: "defense", value: 48 },
      { name: "special-attack", value: 53 },
      { name: "special-defense", value: 48 },
      { name: "speed", value: 64 }
    ],
    abilities: ["Gluttony", "Overgrow"]
  },
  {
    id: 512,
    regionalId: "#078",
    name: "Simisage",
    types: ["Grass"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/512.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/512.png",
    category: "Thorn Monkey Pokémon",
    description: "It has a wild temperament. It attacks by swinging its thorny tail like a whip.",
    stats: [
      { name: "hp", value: 75 },
      { name: "attack", value: 98 },
      { name: "defense", value: 63 },
      { name: "special-attack", value: 98 },
      { name: "special-defense", value: 63 },
      { name: "speed", value: 101 }
    ],
    abilities: ["Gluttony", "Overgrow"]
  },
  {
    id: 513,
    regionalId: "#079",
    name: "Pansear",
    types: ["Fire"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/513.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/513.png",
    category: "High Temp Pokémon",
    description: "The tuft on its head burns hot when it is angry. It roasts berries before eating them.",
    stats: [
      { name: "hp", value: 50 },
      { name: "attack", value: 53 },
      { name: "defense", value: 48 },
      { name: "special-attack", value: 53 },
      { name: "special-defense", value: 48 },
      { name: "speed", value: 64 }
    ],
    abilities: ["Gluttony", "Blaze"]
  },
  {
    id: 514,
    regionalId: "#080",
    name: "Simisear",
    types: ["Fire"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/514.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/514.png",
    category: "Ember Monkey Pokémon",
    description: "It showers its surroundings with embers from its head and tail, making it a very aggressive fighter.",
    stats: [
      { name: "hp", value: 75 },
      { name: "attack", value: 98 },
      { name: "defense", value: 63 },
      { name: "special-attack", value: 98 },
      { name: "special-defense", value: 63 },
      { name: "speed", value: 101 }
    ],
    abilities: ["Gluttony", "Blaze"]
  },
  {
    id: 515,
    regionalId: "#081",
    name: "Panpour",
    types: ["Water"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/515.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/515.png",
    category: "Spray Pokémon",
    description: "The water stored in its head tuft is rich in nutrients. It waters plants using its tail.",
    stats: [
      { name: "hp", value: 50 },
      { name: "attack", value: 53 },
      { name: "defense", value: 48 },
      { name: "special-attack", value: 53 },
      { name: "special-defense", value: 48 },
      { name: "speed", value: 64 }
    ],
    abilities: ["Gluttony", "Torrent"]
  },
  {
    id: 516,
    regionalId: "#082",
    name: "Simipour",
    types: ["Water"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/516.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/516.png",
    category: "Geyser Pokémon",
    description: "It prefers places with clean water. It shoots high-pressure water from its tail to blast enemies.",
    stats: [
      { name: "hp", value: 75 },
      { name: "attack", value: 98 },
      { name: "defense", value: 63 },
      { name: "special-attack", value: 98 },
      { name: "special-defense", value: 63 },
      { name: "speed", value: 101 }
    ],
    abilities: ["Gluttony", "Torrent"]
  },

  // --- CHUỒI MEDITITE ---
  {
    id: 307,
    regionalId: "#083",
    name: "Meditite",
    types: ["Fighting", "Psychic"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/307.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/307.png",
    category: "Meditate Pokémon",
    description: "It meditates for hours daily to heighten its spiritual energy, allowing it to float in the air.",
    stats: [
      { name: "hp", value: 30 },
      { name: "attack", value: 40 },
      { name: "defense", value: 55 },
      { name: "special-attack", value: 40 },
      { name: "special-defense", value: 55 },
      { name: "speed", value: 60 }
    ],
    abilities: ["Pure Power", "Telepathy"]
  },
  {
    id: 308,
    regionalId: "#084",
    name: "Medicham",
    types: ["Fighting", "Psychic"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/308.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/308.png",
    category: "Meditate Pokémon",
    description: "Through yoga training, it has gained the ability to predict its opponent's next move.",
    stats: [
      { name: "hp", value: 60 },
      { name: "attack", value: 60 },
      { name: "defense", value: 75 },
      { name: "special-attack", value: 60 },
      { name: "special-defense", value: 75 },
      { name: "speed", value: 80 }
    ],
    abilities: ["Pure Power", "Telepathy"]
  },
  {
    id: 10010,
    regionalId: "#084",
    name: "Medicham-Mega",
    types: ["Fighting", "Psychic"],
    isMega: true,
    sprite: "/custom_sprites/#084-mega-medicham.png",
    shinySprite: "/custom_sprites/#084-mega-medicham-shiny.png",
    category: "Meditate Pokémon",
    description: "Mega Evolution enhances its mental power, projecting physical energy as multiple spectral arms.",
    stats: [
      { name: "hp", value: 60 },
      { name: "attack", value: 100 },
      { name: "defense", value: 85 },
      { name: "special-attack", value: 80 },
      { name: "special-defense", value: 85 },
      { name: "speed", value: 100 }
    ],
    abilities: ["Pure Power"]
  },

  // --- CHUỒI ELECTRIKE ---
  {
    id: 309,
    regionalId: "#085",
    name: "Electrike",
    types: ["Electric"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/309.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/309.png",
    category: "Lightning Pokémon",
    description: "It stores static electricity in its long fur, running at high speeds to generate more spark.",
    stats: [
      { name: "hp", value: 40 },
      { name: "attack", value: 45 },
      { name: "defense", value: 40 },
      { name: "special-attack", value: 65 },
      { name: "special-defense", value: 40 },
      { name: "speed", value: 65 }
    ],
    abilities: ["Static", "Lightning Rod", "Minus"]
  },
  {
    id: 310,
    regionalId: "#086",
    name: "Manectric",
    types: ["Electric"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/310.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/310.png",
    category: "Discharge Pokémon",
    description: "It discharges electricity from its mane. It rarely appears before people, nesting where lightning strikes.",
    stats: [
      { name: "hp", value: 70 },
      { name: "attack", value: 75 },
      { name: "defense", value: 60 },
      { name: "special-attack", value: 105 },
      { name: "special-defense", value: 60 },
      { name: "speed", value: 105 }
    ],
    abilities: ["Static", "Lightning Rod", "Minus"]
  },
  {
    id: 10043,
    regionalId: "#086",
    name: "Manectric-Mega",
    types: ["Electric"],
    isMega: true,
    sprite: "/custom_sprites/#086-mega-manectric.png",
    shinySprite: "/custom_sprites/#086-mega-manectric-shiny.png",
    category: "Discharge Pokémon",
    description: "Mega Evolution overcharges its body, letting it dash at the speed of a lightning bolt.",
    stats: [
      { name: "hp", value: 70 },
      { name: "attack", value: 75 },
      { name: "defense", value: 80 },
      { name: "special-attack", value: 135 },
      { name: "special-defense", value: 80 },
      { name: "speed", value: 135 }
    ],
    abilities: ["Intimidate"]
  },

  // --- CHUỒI RALTS ---
  {
    id: 280,
    regionalId: "#087",
    name: "Ralts",
    types: ["Psychic", "Fairy"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/280.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/280.png",
    category: "Feeling Pokémon",
    description: "It is highly sensitive to the emotions of people and Pokémon. It hides if it senses hostility.",
    stats: [
      { name: "hp", value: 28 },
      { name: "attack", value: 25 },
      { name: "defense", value: 25 },
      { name: "special-attack", value: 45 },
      { name: "special-defense", value: 35 },
      { name: "speed", value: 40 }
    ],
    abilities: ["Synchronize", "Trace", "Telepathy"]
  },
  {
    id: 281,
    regionalId: "#088",
    name: "Kirlia",
    types: ["Psychic", "Fairy"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/281.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/281.png",
    category: "Emotion Pokémon",
    description: "It dances happily when it senses positive emotions. Its psychic power grows with its joy.",
    stats: [
      { name: "hp", value: 38 },
      { name: "attack", value: 35 },
      { name: "defense", value: 35 },
      { name: "special-attack", value: 65 },
      { name: "special-defense", value: 55 },
      { name: "speed", value: 50 }
    ],
    abilities: ["Synchronize", "Trace", "Telepathy"]
  },
  {
    id: 282,
    regionalId: "#089",
    name: "Gardevoir",
    types: ["Psychic", "Fairy"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/282.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/282.png",
    category: "Embrace Pokémon",
    description: "It will unleash its full psychic power and even risk its life to protect its trusted Trainer.",
    stats: [
      { name: "hp", value: 68 },
      { name: "attack", value: 65 },
      { name: "defense", value: 65 },
      { name: "special-attack", value: 125 },
      { name: "special-defense", value: 115 },
      { name: "speed", value: 80 }
    ],
    abilities: ["Synchronize", "Trace", "Telepathy"]
  },
  {
    id: 10051,
    regionalId: "#089",
    name: "Gardevoir-Mega",
    types: ["Psychic", "Fairy"],
    isMega: true,
    sprite: "/custom_sprites/#089-mega-gardevoir.png",
    shinySprite: "/custom_sprites/#089-mega-gardevoir-shiny.png",
    category: "Embrace Pokémon",
    description: "In its elegant white gown, it channels incredible fairy power to vaporize threats.",
    stats: [
      { name: "hp", value: 68 },
      { name: "attack", value: 85 },
      { name: "defense", value: 65 },
      { name: "special-attack", value: 165 },
      { name: "special-defense", value: 135 },
      { name: "speed", value: 100 }
    ],
    abilities: ["Pixilate"]
  },
  {
    id: 475,
    regionalId: "#090",
    name: "Gallade",
    types: ["Psychic", "Fighting"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/475.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/475.png",
    category: "Blade Pokémon",
    description: "A master of courtesy and swordsmanship, it fights using the extendable blades on its elbows.",
    stats: [
      { name: "hp", value: 68 },
      { name: "attack", value: 125 },
      { name: "defense", value: 65 },
      { name: "special-attack", value: 65 },
      { name: "special-defense", value: 115 },
      { name: "speed", value: 80 }
    ],
    abilities: ["Steadfast", "Sharpness", "Justified"]
  },
  {
    id: 10086,
    regionalId: "#090",
    name: "Gallade-Mega",
    types: ["Psychic", "Fighting"],
    isMega: true,
    sprite: "/custom_sprites/#090-mega-gallade.png",
    shinySprite: "/custom_sprites/#090-mega-gallade-shiny.png",
    category: "Blade Pokémon",
    description: "With capelike energy wings, it executes lightning-fast slashes with absolute chivalry.",
    stats: [
      { name: "hp", value: 68 },
      { name: "attack", value: 165 },
      { name: "defense", value: 95 },
      { name: "special-attack", value: 65 },
      { name: "special-defense", value: 115 },
      { name: "speed", value: 110 }
    ],
    abilities: ["Inner Focus"]
  },

  // --- CHUỒI HOUNDOUR ---
  {
    id: 228,
    regionalId: "#091",
    name: "Houndour",
    types: ["Dark", "Fire"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/228.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/228.png",
    category: "Dark Pokémon",
    description: "It communicates with its pack members using unique howls to coordinate hunting strategies.",
    stats: [
      { name: "hp", value: 45 },
      { name: "attack", value: 60 },
      { name: "defense", value: 30 },
      { name: "special-attack", value: 80 },
      { name: "special-defense", value: 50 },
      { name: "speed", value: 65 }
    ],
    abilities: ["Early Bird", "Flash Fire", "Unnerve"]
  },
  {
    id: 229,
    regionalId: "#092",
    name: "Houndoom",
    types: ["Dark", "Fire"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/229.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/229.png",
    category: "Dark Pokémon",
    description: "The toxins in its breath cause burns that can never heal completely, producing endless pain.",
    stats: [
      { name: "hp", value: 75 },
      { name: "attack", value: 90 },
      { name: "defense", value: 50 },
      { name: "special-attack", value: 110 },
      { name: "special-defense", value: 80 },
      { name: "speed", value: 95 }
    ],
    abilities: ["Early Bird", "Flash Fire", "Unnerve"]
  },
  {
    id: 10048,
    regionalId: "#092",
    name: "Houndoom-Mega",
    types: ["Dark", "Fire"],
    isMega: true,
    sprite: "/custom_sprites/#092-mega-houndoom.png",
    shinySprite: "/custom_sprites/#092-mega-houndoom-shiny.png",
    category: "Dark Pokémon",
    description: "Mega Evolution wraps its body in bony armor. Its breath becomes hot enough to melt stone.",
    stats: [
      { name: "hp", value: 75 },
      { name: "attack", value: 90 },
      { name: "defense", value: 90 },
      { name: "special-attack", value: 140 },
      { name: "special-defense", value: 90 },
      { name: "speed", value: 115 }
    ],
    abilities: ["Solar Power"]
  },

  // --- CHUỒI SWABLU ---
  {
    id: 333,
    regionalId: "#093",
    name: "Swablu",
    types: ["Normal", "Flying"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/333.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/333.png",
    category: "Cotton Bird Pokémon",
    description: "It is obsessed with cleanliness. It grooms its wings constantly, keeping them pure white.",
    stats: [
      { name: "hp", value: 45 },
      { name: "attack", value: 40 },
      { name: "defense", value: 60 },
      { name: "special-attack", value: 40 },
      { name: "special-defense", value: 75 },
      { name: "speed", value: 50 }
    ],
    abilities: ["Natural Cure", "Cloud Nine"]
  },
  {
    id: 334,
    regionalId: "#094",
    name: "Altaria",
    types: ["Dragon", "Flying"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/334.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/334.png",
    category: "Humming Pokémon",
    description: "It flies gracefully through the sky, humming beautiful melodies that soothe those who hear them.",
    stats: [
      { name: "hp", value: 75 },
      { name: "attack", value: 70 },
      { name: "defense", value: 90 },
      { name: "special-attack", value: 70 },
      { name: "special-defense", value: 105 },
      { name: "speed", value: 80 }
    ],
    abilities: ["Natural Cure", "Cloud Nine"]
  },
  {
    id: 10074,
    regionalId: "#094",
    name: "Altaria-Mega",
    types: ["Dragon", "Fairy"],
    isMega: true,
    sprite: "/custom_sprites/#094-mega-altaria.png",
    shinySprite: "/custom_sprites/#094-mega-altaria-shiny.png",
    category: "Humming Pokémon",
    description: "Wrapped in massive cloud-like plumage, its voice reaches a celestial frequency that purifies hearts.",
    stats: [
      { name: "hp", value: 75 },
      { name: "attack", value: 110 },
      { name: "defense", value: 110 },
      { name: "special-attack", value: 110 },
      { name: "special-defense", value: 105 },
      { name: "speed", value: 80 }
    ],
    abilities: ["Pixilate"]
  },

  // --- CHUỒI AUDINO ---
  {
    id: 531,
    regionalId: "#095",
    name: "Audino",
    types: ["Normal"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/531.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/531.png",
    category: "Hearing Pokémon",
    description: "Its ears can sense the heartbeat of other living things, letting it assess their physical state.",
    stats: [
      { name: "hp", value: 103 },
      { name: "attack", value: 60 },
      { name: "defense", value: 86 },
      { name: "special-attack", value: 60 },
      { name: "special-defense", value: 86 },
      { name: "speed", value: 50 }
    ],
    abilities: ["Healer", "Regenerator", "Klutz"]
  },
  {
    id: 10084,
    regionalId: "#095",
    name: "Audino-Mega",
    types: ["Normal", "Fairy"],
    isMega: true,
    sprite: "/custom_sprites/#095-mega-audino.png",
    shinySprite: "/custom_sprites/#095-mega-audino-shiny.png",
    category: "Hearing Pokémon",
    description: "Mega Evolution turns it into a comforting healer, emitting a soothing pulse that calms any conflict.",
    stats: [
      { name: "hp", value: 103 },
      { name: "attack", value: 60 },
      { name: "defense", value: 126 },
      { name: "special-attack", value: 80 },
      { name: "special-defense", value: 126 },
      { name: "speed", value: 50 }
    ],
    abilities: ["Healer"]
  },

  // --- CHUỒI SPRITZEE ---
  {
    id: 682,
    regionalId: "#096",
    name: "Spritzee",
    types: ["Fairy"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/682.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/682.png",
    category: "Perfume Pokémon",
    description: "It emits a delightful fragrance from its body that changes based on what it has eaten.",
    stats: [
      { name: "hp", value: 78 },
      { name: "attack", value: 52 },
      { name: "defense", value: 60 },
      { name: "special-attack", value: 63 },
      { name: "special-defense", value: 65 },
      { name: "speed", value: 23 }
    ],
    abilities: ["Healer", "Aroma Veil"]
  },
  {
    id: 683,
    regionalId: "#097",
    name: "Aromatisse",
    types: ["Fairy"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/683.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/683.png",
    category: "Fragrance Pokémon",
    description: "It can devise any kind of scent, from pleasant perfumes to horrible odors that disable foes.",
    stats: [
      { name: "hp", value: 101 },
      { name: "attack", value: 72 },
      { name: "defense", value: 72 },
      { name: "special-attack", value: 99 },
      { name: "special-defense", value: 89 },
      { name: "speed", value: 29 }
    ],
    abilities: ["Healer", "Aroma Veil"]
  },

  // --- CHUỒI SWIRLIX ---
  {
    id: 684,
    regionalId: "#098",
    name: "Swirlix",
    types: ["Fairy"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/684.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/684.png",
    category: "Cotton Candy Pokémon",
    description: "It eats nothing but sweet food, making its fur extremely sweet and sticky like cotton candy.",
    stats: [
      { name: "hp", value: 62 },
      { name: "attack", value: 48 },
      { name: "defense", value: 66 },
      { name: "special-attack", value: 59 },
      { name: "special-defense", value: 57 },
      { name: "speed", value: 49 }
    ],
    abilities: ["Sweet Veil", "Unburden"]
  },
  {
    id: 685,
    regionalId: "#099",
    name: "Slurpuff",
    types: ["Fairy"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/685.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/685.png",
    category: "Meringue Pokémon",
    description: "Its sense of smell is 100 million times more sensitive than a human's, letting it detect subtle scents.",
    stats: [
      { name: "hp", value: 82 },
      { name: "attack", value: 80 },
      { name: "defense", value: 86 },
      { name: "special-attack", value: 85 },
      { name: "special-defense", value: 75 },
      { name: "speed", value: 72 }
    ],
    abilities: ["Sweet Veil", "Unburden"]
  },

  // --- CHUỒI EEVEE ---
  {
    id: 133,
    regionalId: "#100",
    name: "Eevee",
    types: ["Normal"],
    isMega: false,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png",
    shinySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/133.png",
    category: "Evolution Pokémon",
    description: "An extremely rare Pokémon that can evolve in many diverse ways to adapt to its surroundings.",
    stats: [
      { name: "hp", value: 55 },
      { name: "attack", value: 55 },
      { name: "defense", value: 50 },
      { name: "special-attack", value: 45 },
      { name: "special-defense", value: 65 },
      { name: "speed", value: 55 }
    ],
    abilities: ["Run Away", "Adaptability", "Anticipation"]
  }
];

// Original hyperspaceDex with detailed entries and official artwork URLs, perfectly synchronized
export const hyperspaceDex: ZAPokemon[] = [
  {
    id: 1,
    regionalId: "#148",
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
    id: 10033,
    regionalId: "#150",
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
    regionalId: "#151",
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
    id: 10034,
    regionalId: "#153",
    name: "Charizard-Mega X",
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
    regionalId: "#129",
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
    regionalId: "#129",
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
    regionalId: "#132",
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
    regionalId: "#132",
    name: "Zeraora-Mega",
    types: ["Electric"],
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
].map(p => ({
  ...p,
  spriteUrl: p.sprite
}));

export const ZA_POKEDEX = { lumiose: lumioseDex, hyperspace: hyperspaceDex };
