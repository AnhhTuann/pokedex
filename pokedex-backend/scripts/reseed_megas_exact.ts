import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const customVarieties = [
  { id: 10154, baseId: 154, name: "Meganium-Mega", types: ["grass", "fairy"], isMega: true, isAlternative: false, hp: 80, attack: 102, defense: 140, specialAttack: 110, specialDefense: 110, speed: 80, desc: "Mega Evolution gives it a majestic floral collar, radiating pure fairy energy that heals allies.", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/154-mega.png", shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/154.png" },
  { id: 10500, baseId: 500, name: "Emboar-Mega", types: ["fire", "fighting"], isMega: true, isAlternative: false, hp: 110, attack: 153, defense: 95, specialAttack: 135, specialDefense: 85, speed: 50, desc: "With unmatched power, its blazing armor becomes impenetrable, unleashing unstoppable fiery punches.", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/500-mega.png", shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/500.png" },
  { id: 10160, baseId: 160, name: "Feraligatr-Mega", types: ["water", "dark"], isMega: true, isAlternative: false, hp: 85, attack: 140, defense: 115, specialAttack: 90, specialDefense: 93, speed: 107, desc: "Harnessing the dark currents of underwater trenches, Mega Feraligatr tears through opponents with jaw power capable of crushing steel.", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/160-mega.png", shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/160.png" },
  { id: 10689, baseId: 689, name: "Barbaracle-Mega", types: ["rock", "fighting"], isMega: true, isAlternative: false, hp: 72, attack: 145, defense: 135, specialAttack: 54, specialDefense: 106, speed: 88, desc: "Mega Barbaracle acts with all hands synchronized perfectly, delivering crushing rocky combat moves.", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/689-mega.png", shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/689.png" },
  { id: 10121, baseId: 121, name: "Starmie-Mega", types: ["water", "psychic"], isMega: true, isAlternative: false, hp: 60, attack: 75, defense: 105, specialAttack: 140, specialDefense: 105, speed: 135, desc: "Its core glows in multiple cosmic colors, amplifying its psychic waves to manipulate ocean waves and gravity.", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/121-mega.png", shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/121.png" },
  { id: 10670, baseId: 670, name: "Floette-Eternal", types: ["fairy"], isMega: false, isAlternative: true, hp: 74, attack: 65, defense: 67, specialAttack: 125, specialDefense: 128, speed: 92, desc: "The legendary flower Floette carrying the dark flower of the ultimate weapon. Its fairy power is unmatched.", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/670-mega.png", shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/670.png" },
  { id: 10671, baseId: 670, name: "Floette-Mega", types: ["fairy"], isMega: true, isAlternative: false, hp: 74, attack: 85, defense: 87, specialAttack: 145, specialDefense: 148, speed: 112, desc: "Mega Evolution morphs Floette's flower into an immense magical shield, refracting incoming beams of light.", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/670-mega.png", shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/670.png" },
  { id: 10678, baseId: 678, name: "Meowstic-Mega (M)", types: ["psychic"], isMega: true, isAlternative: false, hp: 74, attack: 68, defense: 96, specialAttack: 123, specialDefense: 121, speed: 122, desc: "Its ears open completely, releasing raw telepathic frequencies that can lift up steel buildings with ease.", image: "/custom_sprites/#044-meowstic-mega-m.png", shinyImage: "/custom_sprites/#044-meowstic-mega-m-shiny.png" },
  { id: 30678, baseId: 678, name: "Meowstic-Mega (F)", types: ["psychic"], isMega: true, isAlternative: false, hp: 74, attack: 68, defense: 96, specialAttack: 123, specialDefense: 121, speed: 122, desc: "Releasing pure telepathic power from its ears, its psychic aura forms a shining protective barrier around itself.", image: "/custom_sprites/#044-meowstic-mega-f.png", shinyImage: "/custom_sprites/#044-meowstic-mega-f-shiny.png" },
  { id: 10668, baseId: 668, name: "Pyroar-Mega", types: ["fire", "normal"], isMega: true, isAlternative: false, hp: 86, attack: 88, defense: 92, specialAttack: 149, specialDefense: 86, speed: 129, desc: "Wrapped in an imperial crown of solar flare, Mega Pyroar's roar creates a burning heat wave exceeding 2,000 degrees.", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/668-mega.png", shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/668.png" },
  { id: 10226, baseId: 26, name: "Raichu-Mega-X", types: ["electric", "fighting"], isMega: true, isAlternative: false, hp: 60, attack: 130, defense: 75, specialAttack: 110, specialDefense: 90, speed: 125, desc: "Focusing electrical energy into physical blows, Mega Raichu X strikes with the swiftness and power of a lightning bolt.", image: "/custom_sprites/#054-mega-raichu-x.png", shinyImage: "/custom_sprites/#054-mega-raichu-x-shiny.png" },
  { id: 10326, baseId: 26, name: "Raichu-Mega-Y", types: ["electric", "psychic"], isMega: true, isAlternative: false, hp: 60, attack: 90, defense: 75, specialAttack: 140, specialDefense: 110, speed: 115, desc: "Using its long tail as an antenna, Mega Raichu Y emits powerful psychic electromagnetic fields to paralyze foes.", image: "/custom_sprites/#054-mega-raichu-y.png", shinyImage: "/custom_sprites/#054-mega-raichu-y-shiny.png" },
  { id: 20036, baseId: 36, name: "Clefable-Mega", types: ["fairy"], isMega: true, isAlternative: false, hp: 95, attack: 80, defense: 103, specialAttack: 125, specialDefense: 110, speed: 70, desc: "A beacon of cosmic stardust. Mega Clefable's floaty movements allow it to evade attacks with magical grace.", image: "/custom_sprites/#057-mega-clefable.png", shinyImage: "/custom_sprites/#057-mega-clefable-shiny.png" },
  { id: 10545, baseId: 545, name: "Scolipede-Mega", types: ["bug", "poison"], isMega: true, isAlternative: false, hp: 60, attack: 130, defense: 119, specialAttack: 65, specialDefense: 89, speed: 122, desc: "Its toxic horns grow massive, delivering quick and fatal jabs as it charges forward like a tank.", image: "/custom_sprites/#070-mega-scolipede.png", shinyImage: "/custom_sprites/#070-mega-scolipede-shiny.png" },
  { id: 100710, baseId: 71, name: "Victreebel-Mega", types: ["grass", "poison"], isMega: true, isAlternative: false, hp: 80, attack: 135, defense: 85, specialAttack: 130, specialDefense: 90, speed: 90, desc: "Its acidic pool melts any defense instantly. It secretes a sweet scent that lures entire crowds into its maw.", image: "/custom_sprites/#076-mega-victreebel.png", shinyImage: "/custom_sprites/#076-mega-victreebel-shiny.png" },
  { id: 10659, baseId: 530, name: "Excadrill-Mega", types: ["ground", "steel"], isMega: true, isAlternative: false, hp: 110, attack: 155, defense: 80, specialAttack: 50, specialDefense: 85, speed: 108, desc: "Mega Evolution sharpens its drill-horns into solid titanium blades, boring through solid earth instantly.", image: "/custom_sprites/#121-mega-excadrill.png", shinyImage: "/custom_sprites/#121-mega-excadrill-shiny.png" },
  { id: 11445, baseId: 445, name: "Mega Garchomp Z", types: ["dragon"], isMega: true, isAlternative: false, hp: 108, attack: 180, defense: 135, specialAttack: 140, specialDefense: 105, speed: 112, desc: "Unlocking hidden dragon genes, Mega Garchomp Z flies at supersonic speeds, slicing targets to ribbons with its blade-like arms.", image: "/custom_sprites/#130-mega-garchomp-z.png", shinyImage: "/custom_sprites/#130-mega-garchomp-z-shiny.png" },
  { id: 11359, baseId: 359, name: "Mega Absol Z", types: ["dark", "ghost"], isMega: true, isAlternative: false, hp: 65, attack: 160, defense: 80, specialAttack: 115, specialDefense: 80, speed: 125, desc: "Cloaked in phantom wings, Mega Absol Z senses disaster miles away, striking from the shadows before any threat realizes.", image: "/custom_sprites/#134-mega-absol-z.png", shinyImage: "/custom_sprites/#134-mega-absol-z-shiny.png" },
  { id: 11448, baseId: 448, name: "Mega Lucario Z", types: ["fighting", "steel"], isMega: true, isAlternative: false, hp: 70, attack: 155, defense: 108, specialAttack: 145, specialDefense: 90, speed: 122, desc: "Concentrating its aura into solid steel blades, Mega Lucario Z reads minds and blocks physical damage perfectly.", image: "/custom_sprites/#136-mega-lucario-z.png", shinyImage: "/custom_sprites/#136-mega-lucario-z-shiny.png" },
  { id: 10604, baseId: 604, name: "Eelektross-Mega", types: ["electric"], isMega: true, isAlternative: false, hp: 85, attack: 135, defense: 100, specialAttack: 135, specialDefense: 100, speed: 75, desc: "Harnessing deep ocean currents, Mega Eelektross floating without gravity, delivering continuous thunder bolts.", image: "/custom_sprites/#144-mega-eelektross.png", shinyImage: "/custom_sprites/#144-mega-eelektross-shiny.png" },
  { id: 10149, baseId: 149, name: "Dragonite-Mega", types: ["dragon", "flying"], isMega: true, isAlternative: false, hp: 91, attack: 164, defense: 115, specialAttack: 130, specialDefense: 120, speed: 100, desc: "Upon Mega Evolution, its speed matches jets, letting it circle the globe in less than sixteen hours.", image: "/custom_sprites/#147-mega-dragonite.png", shinyImage: "/custom_sprites/#147-mega-dragonite-shiny.png" },
  { id: 10687, baseId: 687, name: "Malamar-Mega", types: ["dark", "psychic"], isMega: true, isAlternative: false, hp: 86, attack: 122, defense: 108, specialAttack: 88, specialDefense: 115, speed: 101, desc: "Its glowing body flashes complex patterns, hypnotizing onlookers and completely inverting their senses of reality.", image: "/custom_sprites/#160-mega-malamar.png", shinyImage: "/custom_sprites/#160-mega-malamar-shiny.png" },
  { id: 10691, baseId: 691, name: "Dragalge-Mega", types: ["poison", "dragon"], isMega: true, isAlternative: false, hp: 65, attack: 95, defense: 110, specialAttack: 137, specialDefense: 143, speed: 60, desc: "Mega Dragalge secretes highly corrosive dragon venom that can dissolve double-plated metal armor within seconds.", image: "/custom_sprites/#162-mega-dragalge.png", shinyImage: "/custom_sprites/#162-mega-dragalge-shiny.png" },
  { id: 10701, baseId: 701, name: "Hawlucha-Mega", types: ["fighting", "flying"], isMega: true, isAlternative: false, hp: 78, attack: 132, defense: 95, specialAttack: 74, specialDefense: 83, speed: 138, desc: "The ultimate wrestling champion. Mega Hawlucha leaps from clouds to deliver spectacular flying presses.", image: "/custom_sprites/#181-mega-hawlucha.png", shinyImage: "/custom_sprites/#181-mega-hawlucha-shiny.png" },
  { id: 10560, baseId: 560, name: "Scrafty-Mega", types: ["dark", "fighting"], isMega: true, isAlternative: false, hp: 65, attack: 130, defense: 135, specialAttack: 45, specialDefense: 135, speed: 78, desc: "Its tough skin acts like armor. Mega Scrafty deals devastating headbutts while easily shrugging off hits.", image: "/custom_sprites/#185-mega-scrafty.png", shinyImage: "/custom_sprites/#185-mega-scrafty-shiny.png" },
  { id: 10609, baseId: 609, name: "Chandelure-Mega", types: ["ghost", "fire"], isMega: true, isAlternative: false, hp: 60, attack: 65, defense: 110, specialAttack: 185, specialDefense: 110, speed: 100, desc: "Its flames flare into spectral colors, consuming nearby spirits to fuel its devastating special fire powers.", image: "/custom_sprites/#191-mega-chandelure.png", shinyImage: "/custom_sprites/#191-mega-chandelure-shiny.png" },
  { id: 10658, baseId: 658, name: "Greninja-Mega", types: ["water", "dark"], isMega: true, isAlternative: false, hp: 72, attack: 125, defense: 87, specialAttack: 133, specialDefense: 91, speed: 142, desc: "Mega Greninja blends seamlessly into shadows, throwing high-speed water shurikens that cut steel blocks cleanly.", image: "/custom_sprites/#211-mega-greninja.png", shinyImage: "/custom_sprites/#211-mega-greninja-shiny.png" },
  { id: 10870, baseId: 870, name: "Falinks-Mega", types: ["fighting"], isMega: true, isAlternative: false, hp: 65, attack: 140, defense: 120, specialAttack: 70, specialDefense: 80, speed: 105, desc: "Forming an impenetrable phalanx circle, Mega Falinks fights in perfect unison, creating defensive iron spikes.", image: "/custom_sprites/#212-mega-falinks.png", shinyImage: "/custom_sprites/#212-mega-falinks-shiny.png" },
  { id: 10652, baseId: 652, name: "Chesnaught-Mega", types: ["grass", "fighting"], isMega: true, isAlternative: false, hp: 88, attack: 147, defense: 152, specialAttack: 74, specialDefense: 95, speed: 74, desc: "Its spike shell expands into full shields, packing power that can deflect heavy artillery.", image: "/custom_sprites/#215-mega-chesnaught.png", shinyImage: "/custom_sprites/#215-mega-chesnaught-shiny.png" },
  { id: 10227, baseId: 227, name: "Skarmory-Mega", types: ["steel", "flying"], isMega: true, isAlternative: false, hp: 65, attack: 110, defense: 170, specialAttack: 50, specialDefense: 90, speed: 105, desc: "Its wings sharpen into solid steel swords, dealing heavy blade-wing strikes while completely immune to impact.", image: "/custom_sprites/#216-mega-skarmory.png", shinyImage: "/custom_sprites/#216-mega-skarmory-shiny.png" },
  { id: 10655, baseId: 655, name: "Delphox-Mega", types: ["fire", "psychic"], isMega: true, isAlternative: false, hp: 75, attack: 69, defense: 92, specialAttack: 154, specialDefense: 120, speed: 124, desc: "Its branch morphs into a glowing magical staff, casting complex fire illusions and predictive spells.", image: "/custom_sprites/#219-mega-delphox.png", shinyImage: "/custom_sprites/#219-mega-delphox-shiny.png" },
  { id: 10780, baseId: 780, name: "Drampa-Mega", types: ["normal", "dragon"], isMega: true, isAlternative: false, hp: 78, attack: 80, defense: 115, specialAttack: 165, specialDefense: 135, speed: 56, desc: "Its friendly aura intensifies, but its dragon breath can flatten mountains if any child is threatened.", image: "/custom_sprites/#224-mega-drampa.png", shinyImage: "/custom_sprites/#224-mega-drampa-shiny.png" },
  { id: 10718, baseId: 718, name: "Zygarde-Core", types: ["dragon", "ground"], isMega: false, isAlternative: true, hp: 50, attack: 50, defense: 50, specialAttack: 50, specialDefense: 50, speed: 50, desc: "The core of Zygarde's life force, monitoring the ecosystem and directing cells to merge when danger arises.", image: "/custom_sprites/#230-zygarde-core.png", shinyImage: "/custom_sprites/#230-zygarde-core-shiny.png" },
  { id: 11718, baseId: 718, name: "Zygarde-Cell", types: ["dragon", "ground"], isMega: false, isAlternative: true, hp: 30, attack: 30, defense: 30, specialAttack: 30, specialDefense: 30, speed: 30, desc: "Scattered across Kalos, Zygarde cells have no consciousness but act as the eyes and ears of the ecosystem.", image: "/custom_sprites/#230-zygarde-cell.png", shinyImage: "/custom_sprites/#230-zygarde-cell-shiny.png" },
  { id: 12718, baseId: 718, name: "Zygarde-Mega", types: ["dragon", "ground"], isMega: true, isAlternative: false, hp: 216, attack: 140, defense: 151, specialAttack: 121, specialDefense: 125, speed: 95, desc: "Zygarde's ultimate power. Its dragon body unleashes energy beams capable of restoring planetary balance.", image: "/custom_sprites/#230-mega-zygarde.png", shinyImage: "/custom_sprites/#230-mega-zygarde-shiny.png" },
  { id: 80700, baseId: 807, name: "Zeraora-Mega", types: ["electric", "fighting"], isMega: true, isAlternative: false, hp: 88, attack: 142, defense: 95, specialAttack: 122, specialDefense: 100, speed: 153, desc: "Its lightning speed breaks space-time, channeling cosmic storm power into every punch.", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/807.png", shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/807.png" },
  { id: 10026, baseId: 681, name: "Aegislash-Blade", types: ["steel", "ghost"], isMega: false, isAlternative: true, hp: 60, attack: 150, defense: 50, specialAttack: 150, specialDefense: 50, speed: 60, desc: "Its stance shifts to absolute attack, focusing all shield-energy into a piercing giant blade.", image: "/custom_sprites/#073-blade-aegislash.png", shinyImage: "/custom_sprites/#073-blade-aegislash-shiny.png" },
  { id: 10071, baseId: 80, name: "Slowbro-Mega", types: ["water", "psychic"], isMega: true, isAlternative: false, hp: 95, attack: 75, defense: 180, specialAttack: 130, specialDefense: 80, speed: 30, desc: "Shellder swallows Slowbro entirely, acting as iron armor that completely blocks physical moves.", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10071.png", shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/10071.png" },
  { id: 10036, baseId: 9, name: "Blastoise-Mega", types: ["water"], isMega: true, isAlternative: false, hp: 79, attack: 103, defense: 120, specialAttack: 135, specialDefense: 115, speed: 78, desc: "The three water cannons on its back merge into a singular immense launcher, blowing away hills with water pressure.", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10036.png", shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/10036.png" }
];

// Complete name list for Lumiose Dex (exactly as specified by the user)
const lumioseNamesList = [
  { name: "chikorita", regNum: 1 },
  { name: "bayleef", regNum: 2 },
  { name: "meganium", regNum: 3 },
  { name: "meganium-mega", regNum: 3 },
  { name: "tepig", regNum: 4 },
  { name: "pignite", regNum: 5 },
  { name: "emboar", regNum: 6 },
  { name: "emboar-mega", regNum: 6 },
  { name: "totodile", regNum: 7 },
  { name: "croconaw", regNum: 8 },
  { name: "feraligatr", regNum: 9 },
  { name: "feraligatr-mega", regNum: 9 },
  { name: "fletchling", regNum: 10 },
  { name: "fletchinder", regNum: 11 },
  { name: "talonflame", regNum: 12 },
  { name: "bunnelby", regNum: 13 },
  { name: "diggersby", regNum: 14 },
  { name: "scatterbug", regNum: 15 },
  { name: "spewpa", regNum: 16 },
  { name: "vivillon", regNum: 17 },
  { name: "weedle", regNum: 18 },
  { name: "kakuna", regNum: 19 },
  { name: "beedrill", regNum: 20 },
  { name: "beedrill-mega", regNum: 20 },
  { name: "pidgey", regNum: 21 },
  { name: "pidgeotto", regNum: 22 },
  { name: "pidgeot", regNum: 23 },
  { name: "pidgeot-mega", regNum: 23 },
  { name: "mareep", regNum: 24 },
  { name: "flaaffy", regNum: 25 },
  { name: "ampharos", regNum: 26 },
  { name: "ampharos-mega", regNum: 26 },
  { name: "patrat", regNum: 27 },
  { name: "watchog", regNum: 28 },
  { name: "budew", regNum: 29 },
  { name: "roselia", regNum: 30 },
  { name: "roserade", regNum: 31 },
  { name: "magikarp", regNum: 32 },
  { name: "gyarados", regNum: 33 },
  { name: "gyarados-mega", regNum: 33 },
  { name: "binacle", regNum: 34 },
  { name: "barbaracle", regNum: 35 },
  { name: "barbaracle-mega", regNum: 35 },
  { name: "staryu", regNum: 36 },
  { name: "starmie", regNum: 37 },
  { name: "starmie-mega", regNum: 37 },
  { name: "flabebe", regNum: 38 },
  { name: "floette", regNum: 39 },
  { name: "floette-eternal", regNum: 39 },
  { name: "floette-mega", regNum: 39 },
  { name: "florges", regNum: 40 },
  { name: "skiddo", regNum: 41 },
  { name: "gogoat", regNum: 42 },
  { name: "espurr", regNum: 43 },
  { name: "meowstic-male", regNum: 44 },
  { name: "meowstic-female", regNum: 44 },
  { name: "meowstic-mega-m", regNum: 44 },
  { name: "meowstic-mega-f", regNum: 44 },
  { name: "litleo", regNum: 45 },
  { name: "pyroar", regNum: 46 },
  { name: "pyroar-mega", regNum: 46 },
  { name: "pancham", regNum: 47 },
  { name: "pangoro", regNum: 48 },
  { name: "trubbish", regNum: 49 },
  { name: "garbodor", regNum: 50 },
  { name: "dedenne", regNum: 51 },
  { name: "pichu", regNum: 52 },
  { name: "pikachu", regNum: 53 },
  { name: "raichu", regNum: 54 },
  { name: "raichu-alola", regNum: 54 },
  { name: "raichu-mega-x", regNum: 54 },
  { name: "raichu-mega-y", regNum: 54 },
  { name: "cleffa", regNum: 55 },
  { name: "clefairy", regNum: 56 },
  { name: "clefable", regNum: 57 },
  { name: "clefable-mega", regNum: 57 },
  { name: "spinarak", regNum: 58 },
  { name: "ariados", regNum: 59 },
  { name: "ekans", regNum: 60 },
  { name: "arbok", regNum: 61 },
  { name: "abra", regNum: 62 },
  { name: "kadabra", regNum: 63 },
  { name: "alakazam", regNum: 64 },
  { name: "alakazam-mega", regNum: 64 },
  { name: "gastly", regNum: 65 },
  { name: "haunter", regNum: 66 },
  { name: "gengar", regNum: 67 },
  { name: "gengar-mega", regNum: 67 },
  { name: "venipede", regNum: 68 },
  { name: "whirlipede", regNum: 69 },
  { name: "scolipede", regNum: 70 },
  { name: "scolipede-mega", regNum: 70 },
  { name: "honedge", regNum: 71 },
  { name: "doublade", regNum: 72 },
  { name: "aegislash", regNum: 73 },
  { name: "aegislash-blade", regNum: 73 },
  { name: "bellsprout", regNum: 74 },
  { name: "weepinbell", regNum: 75 },
  { name: "victreebel", regNum: 76 },
  { name: "victreebel-mega", regNum: 76 },
  { name: "pansage", regNum: 77 },
  { name: "simisage", regNum: 78 },
  { name: "pansear", regNum: 79 },
  { name: "simisear", regNum: 80 },
  { name: "panpour", regNum: 81 },
  { name: "simipour", regNum: 82 },
  { name: "meditite", regNum: 83 },
  { name: "medicham", regNum: 84 },
  { name: "medicham-mega", regNum: 84 },
  { name: "electrike", regNum: 85 },
  { name: "manectric", regNum: 86 },
  { name: "manectric-mega", regNum: 86 },
  { name: "ralts", regNum: 87 },
  { name: "kirlia", regNum: 88 },
  { name: "gardevoir", regNum: 89 },
  { name: "gardevoir-mega", regNum: 89 },
  { name: "gallade", regNum: 90 },
  { name: "gallade-mega", regNum: 90 },
  { name: "houndour", regNum: 91 },
  { name: "houndoom", regNum: 92 },
  { name: "houndoom-mega", regNum: 92 },
  { name: "swablu", regNum: 93 },
  { name: "altaria", regNum: 94 },
  { name: "altaria-mega", regNum: 94 },
  { name: "audino", regNum: 95 },
  { name: "audino-mega", regNum: 95 },
  { name: "spritzee", regNum: 96 },
  { name: "aromatisse", regNum: 97 },
  { name: "swirlix", regNum: 98 },
  { name: "slurpuff", regNum: 99 },
  { name: "eevee", regNum: 100 },
  { name: "vaporeon", regNum: 101 },
  { name: "jolteon", regNum: 102 },
  { name: "flareon", regNum: 103 },
  { name: "espeon", regNum: 104 },
  { name: "umbreon", regNum: 105 },
  { name: "leafeon", regNum: 106 },
  { name: "glaceon", regNum: 107 },
  { name: "sylveon", regNum: 108 },
  { name: "buneary", regNum: 109 },
  { name: "lopunny", regNum: 110 },
  { name: "lopunny-mega", regNum: 110 },
  { name: "shuppet", regNum: 111 },
  { name: "banette", regNum: 112 },
  { name: "banette-mega", regNum: 112 },
  { name: "vanillite", regNum: 113 },
  { name: "vanillish", regNum: 114 },
  { name: "vanilluxe", regNum: 115 },
  { name: "numel", regNum: 116 },
  { name: "camerupt", regNum: 117 },
  { name: "camerupt-mega", regNum: 117 },
  { name: "hippopotas", regNum: 118 },
  { name: "hippowdon", regNum: 119 },
  { name: "drilbur", regNum: 120 },
  { name: "excadrill", regNum: 121 },
  { name: "excadrill-mega", regNum: 121 },
  { name: "sandile", regNum: 122 },
  { name: "krokorok", regNum: 123 },
  { name: "krookodile", regNum: 124 },
  { name: "machop", regNum: 125 },
  { name: "machoke", regNum: 126 },
  { name: "machamp", regNum: 127 },
  { name: "gible", regNum: 128 },
  { name: "gabite", regNum: 129 },
  { name: "garchomp", regNum: 130 },
  { name: "garchomp-mega", regNum: 130 },
  { name: "garchomp-mega-z", regNum: 130 },
  { name: "carbink", regNum: 131 },
  { name: "sableye", regNum: 132 },
  { name: "sableye-mega", regNum: 132 },
  { name: "mawile", regNum: 133 },
  { name: "mawile-mega", regNum: 133 },
  { name: "absol", regNum: 134 },
  { name: "absol-mega", regNum: 134 },
  { name: "absol-mega-z", regNum: 134 },
  { name: "riolu", regNum: 135 },
  { name: "lucario", regNum: 136 },
  { name: "lucario-mega", regNum: 136 },
  { name: "lucario-mega-z", regNum: 136 },
  { name: "slowpoke", regNum: 137 },
  { name: "slowpoke-galar", regNum: 137 },
  { name: "slowbro", regNum: 138 },
  { name: "slowbro-galar", regNum: 138 },
  { name: "slowbro-mega", regNum: 138 },
  { name: "slowking", regNum: 139 },
  { name: "slowking-galar", regNum: 139 },
  { name: "carvanha", regNum: 140 },
  { name: "sharpedo", regNum: 141 },
  { name: "sharpedo-mega", regNum: 141 },
  { name: "tynamo", regNum: 142 },
  { name: "eelektrik", regNum: 143 },
  { name: "eelektross", regNum: 144 },
  { name: "eelektross-mega", regNum: 144 },
  { name: "dratini", regNum: 145 },
  { name: "dragonair", regNum: 146 },
  { name: "dragonite", regNum: 147 },
  { name: "dragonite-mega", regNum: 147 },
  { name: "bulbasaur", regNum: 148 },
  { name: "ivysaur", regNum: 149 },
  { name: "venusaur", regNum: 150 },
  { name: "venusaur-mega", regNum: 150 },
  { name: "charmander", regNum: 151 },
  { name: "charmeleon", regNum: 152 },
  { name: "charizard", regNum: 153 },
  { name: "charizard-mega-x", regNum: 153 },
  { name: "charizard-mega-y", regNum: 153 },
  { name: "squirtle", regNum: 154 },
  { name: "wartortle", regNum: 155 },
  { name: "blastoise", regNum: 156 },
  { name: "blastoise-mega", regNum: 156 },
  { name: "stunfisk", regNum: 157 },
  { name: "stunfisk-galar", regNum: 157 },
  { name: "furfrou", regNum: 158 },
  { name: "inkay", regNum: 159 },
  { name: "malamar", regNum: 160 },
  { name: "malamar-mega", regNum: 160 },
  { name: "skrelp", regNum: 161 },
  { name: "dragalge", regNum: 162 },
  { name: "dragalge-mega", regNum: 162 },
  { name: "clauncher", regNum: 163 },
  { name: "clawitzer", regNum: 164 },
  { name: "goomy", regNum: 165 },
  { name: "sliggoo", regNum: 166 },
  { name: "sliggoo-hisui", regNum: 166 },
  { name: "goodra", regNum: 167 },
  { name: "goodra-hisui", regNum: 167 },
  { name: "delibird", regNum: 168 },
  { name: "snorunt", regNum: 169 },
  { name: "glalie", regNum: 170 },
  { name: "glalie-mega", regNum: 170 },
  { name: "froslass", regNum: 171 },
  { name: "froslass-mega", regNum: 171 },
  { name: "snover", regNum: 172 },
  { name: "abomasnow", regNum: 173 },
  { name: "abomasnow-mega", regNum: 173 },
  { name: "bergmite", regNum: 174 },
  { name: "avalugg", regNum: 175 },
  { name: "avalugg-hisui", regNum: 175 },
  { name: "scyther", regNum: 176 },
  { name: "scizor", regNum: 177 },
  { name: "scizor-mega", regNum: 177 },
  { name: "pinsir", regNum: 178 },
  { name: "pinsir-mega", regNum: 178 },
  { name: "heracross", regNum: 179 },
  { name: "heracross-mega", regNum: 179 },
  { name: "emolga", regNum: 180 },
  { name: "hawlucha", regNum: 181 },
  { name: "hawlucha-mega", regNum: 181 },
  { name: "phantump", regNum: 182 },
  { name: "trevenant", regNum: 183 },
  { name: "scraggy", regNum: 184 },
  { name: "scrafty", regNum: 185 },
  { name: "scrafty-mega", regNum: 185 },
  { name: "noibat", regNum: 186 },
  { name: "noivern", regNum: 187 },
  { name: "klefki", regNum: 188 },
  { name: "litwick", regNum: 189 },
  { name: "lampent", regNum: 190 },
  { name: "chandelure", regNum: 191 },
  { name: "chandelure-mega", regNum: 191 },
  { name: "aerodactyl", regNum: 192 },
  { name: "aerodactyl-mega", regNum: 192 },
  { name: "tyrunt", regNum: 193 },
  { name: "tyrantrum", regNum: 194 },
  { name: "amaura", regNum: 195 },
  { name: "aurorus", regNum: 196 },
  { name: "onix", regNum: 197 },
  { name: "steelix", regNum: 198 },
  { name: "steelix-mega", regNum: 198 },
  { name: "aron", regNum: 199 },
  { name: "lairon", regNum: 200 },
  { name: "aggron", regNum: 201 },
  { name: "aggron-mega", regNum: 201 },
  { name: "helioptile", regNum: 202 },
  { name: "heliolisk", regNum: 203 },
  { name: "pumpkaboo-small", regNum: 204 },
  { name: "pumpkaboo-average", regNum: 204 },
  { name: "pumpkaboo-large", regNum: 204 },
  { name: "pumpkaboo-super", regNum: 204 },
  { name: "gourgeist-small", regNum: 205 },
  { name: "gourgeist-average", regNum: 205 },
  { name: "gourgeist-large", regNum: 205 },
  { name: "gourgeist-super", regNum: 205 },
  { name: "larvitar", regNum: 206 },
  { name: "pupitar", regNum: 207 },
  { name: "tyranitar", regNum: 208 },
  { name: "tyranitar-mega", regNum: 208 },
  { name: "froakie", regNum: 209 },
  { name: "frogadier", regNum: 210 },
  { name: "greninja", regNum: 211 },
  { name: "greninja-ash", regNum: 211 },
  { name: "greninja-mega", regNum: 211 },
  { name: "falinks", regNum: 212 },
  { name: "falinks-mega", regNum: 212 },
  { name: "chespin", regNum: 213 },
  { name: "quilladin", regNum: 214 },
  { name: "chesnaught", regNum: 215 },
  { name: "chesnaught-mega", regNum: 215 },
  { name: "skarmory", regNum: 216 },
  { name: "skarmory-mega", regNum: 216 },
  { name: "fennekin", regNum: 217 },
  { name: "braixen", regNum: 218 },
  { name: "delphox", regNum: 219 },
  { name: "delphox-mega", regNum: 219 },
  { name: "bagon", regNum: 220 },
  { name: "shelgon", regNum: 221 },
  { name: "salamence", regNum: 222 },
  { name: "salamence-mega", regNum: 222 },
  { name: "kangaskhan", regNum: 223 },
  { name: "kangaskhan-mega", regNum: 223 },
  { name: "drampa", regNum: 224 },
  { name: "drampa-mega", regNum: 224 },
  { name: "beldum", regNum: 225 },
  { name: "metang", regNum: 226 },
  { name: "metagross", regNum: 227 },
  { name: "metagross-mega", regNum: 227 },
  { name: "xerneas", regNum: 228 },
  { name: "yveltal", regNum: 229 },
  { name: "zygarde", regNum: 230 },
  { name: "zygarde-core", regNum: 230 },
  { name: "zygarde-cell", regNum: 230 },
  { name: "zygarde-10", regNum: 230 },
  { name: "zygarde-complete", regNum: 230 },
  { name: "zygarde-mega", regNum: 230 },
  { name: "diancie", regNum: 231 },
  { name: "diancie-mega", regNum: 231 },
  { name: "mewtwo", regNum: 232 },
  { name: "mewtwo-mega-x", regNum: 232 },
  { name: "mewtwo-mega-y", regNum: 232 }
];

const hyperspaceNamesList = [
  { name: "groudon", regNum: 1 },
  { name: "groudon-primal", regNum: 2 },
  { name: "kyogre", regNum: 3 },
  { name: "kyogre-primal", regNum: 4 },
  { name: "rayquaza", regNum: 5 },
  { name: "rayquaza-mega", regNum: 6 },
  { name: "zeraora", regNum: 7 },
  { name: "zeraora-mega", regNum: 8 },
  { name: "hoopa", regNum: 9 },
  { name: "hoopa-unbound", regNum: 10 },
  { name: "volcanion", regNum: 11 }
];

async function main() {
  console.log("Seeding and correcting custom Z-A Megas & Dex Entries...");

  // Clean up any existing custom entries to avoid key constraint violations
  const customIds = customVarieties.map(v => v.id);
  const customNames: string[] = [];
  for (const v of customVarieties) {
    customNames.push(v.name);
    customNames.push(v.name.toLowerCase());
    customNames.push(v.name.toUpperCase());
  }

  console.log("Cleaning up old custom variety entries...");
  await prisma.dexEntry.deleteMany({
    where: {
      OR: [
        { pokemonId: { in: customIds } },
        { pokemon: { name: { in: customNames } } }
      ]
    }
  });

  await prisma.pokemonVariety.deleteMany({
    where: {
      OR: [
        { id: { in: customIds } },
        { name: { in: customNames } }
      ]
    }
  });

  await prisma.pokemon.deleteMany({
    where: {
      OR: [
        { pokedexNumber: { in: customIds } },
        { name: { in: customNames } }
      ]
    }
  });

  // 1. Seed custom varieties with stats, types, descriptions, and custom images
  for (const m of customVarieties) {
    console.log(`Upserting variety: ${m.name} (pokedexNumber: ${m.id}, speciesId: ${m.baseId})`);
    const defaultDesc = `A special alternative form of species #${m.baseId}.`;
    await prisma.pokemon.upsert({
      where: { name: m.name },
      update: {
        pokedexNumber: m.id,
        isDefault: false,
        speciesId: m.baseId,
        generation: 6,
        category: m.isMega ? "Mega Form" : "Alternative Form",
        description: m.desc || defaultDesc,
        regionalDexes: ["kalos-central-lumiose"],
        altFormAvailableIn: ["legends-za"],
        gameVersions: ["legends-za"],
        imageUrl: m.image,
        shinyImageUrl: m.shinyImage || m.image,
        hp: m.hp,
        attack: m.attack,
        defense: m.defense,
        specialAttack: m.specialAttack,
        specialDefense: m.specialDefense,
        speed: m.speed,
        types: {
          set: [],
          connectOrCreate: m.types.map((t: string) => ({
            where: { name: t },
            create: { name: t }
          }))
        }
      },
      create: {
        pokedexNumber: m.id,
        name: m.name,
        isDefault: false,
        speciesId: m.baseId,
        generation: 6,
        category: m.isMega ? "Mega Form" : "Alternative Form",
        description: m.desc || defaultDesc,
        regionalDexes: ["kalos-central-lumiose"],
        altFormAvailableIn: ["legends-za"],
        gameVersions: ["legends-za"],
        imageUrl: m.image,
        shinyImageUrl: m.shinyImage || m.image,
        hp: m.hp,
        attack: m.attack,
        defense: m.defense,
        specialAttack: m.specialAttack,
        specialDefense: m.specialDefense,
        speed: m.speed,
        types: {
          connectOrCreate: m.types.map((t: string) => ({
            where: { name: t },
            create: { name: t }
          }))
        }
      }
    });

    await prisma.pokemonVariety.upsert({
      where: { id: m.id },
      update: {
        name: m.name,
        imageUrl: m.image,
        shinyImageUrl: m.shinyImage || m.image,
        isMega: m.isMega,
        isAlternative: m.isAlternative,
        types: m.types,
      },
      create: {
        id: m.id,
        pokemonId: m.baseId,
        name: m.name,
        imageUrl: m.image,
        shinyImageUrl: m.shinyImage || m.image,
        isMega: m.isMega,
        isAlternative: m.isAlternative,
        types: m.types,
      }
    });
  }

  // 2. Resolve database entities and map regional indexes
  console.log("Resolving and mapping Lumiose City Dex...");
  for (const entry of lumioseNamesList) {
    // Standard name matching strategies
    let nameSearch = entry.name;
    if (nameSearch === "meowstic-male") nameSearch = "meowstic";
    if (nameSearch === "meowstic-mega-m") nameSearch = "Meowstic-Mega (M)";
    if (nameSearch === "meowstic-mega-f") nameSearch = "Meowstic-Mega (F)";
    if (nameSearch === "aegislash-blade") nameSearch = "Aegislash-Blade";
    if (nameSearch === "slowbro-mega") nameSearch = "Slowbro-Mega";
    if (nameSearch === "blastoise-mega") nameSearch = "Blastoise-Mega";
    if (nameSearch === "zygarde") nameSearch = "zygarde-50";
    if (nameSearch === "zygarde-10") nameSearch = "zygarde-10-power-construct";

    let dbPoke = await prisma.pokemon.findFirst({
      where: { name: { equals: nameSearch, mode: "insensitive" } }
    });

    if (!dbPoke) {
      dbPoke = await prisma.pokemon.findFirst({
        where: { name: { contains: nameSearch, mode: "insensitive" } }
      });
    }

    if (dbPoke) {
      const updatedGameVersions = Array.from(new Set([...dbPoke.gameVersions, "legends-za"]));
      const updatedRegionalDexes = Array.from(new Set([...dbPoke.regionalDexes, "kalos-central-lumiose"]));
      const updatedAltForms = Array.from(new Set([...dbPoke.altFormAvailableIn, "legends-za"]));

      await prisma.pokemon.update({
        where: { id: dbPoke.id },
        data: {
          gameVersions: updatedGameVersions,
          regionalDexes: updatedRegionalDexes,
          altFormAvailableIn: updatedAltForms
        }
      });

      await prisma.dexEntry.upsert({
        where: { pokemonId_regionName: { pokemonId: dbPoke.id, regionName: "kalos-central-lumiose" } },
        update: { entryNumber: entry.regNum },
        create: { pokemonId: dbPoke.id, regionName: "kalos-central-lumiose", entryNumber: entry.regNum }
      });
    } else {
      console.warn(`WARNING: Could not find Lumiose species by name: ${entry.name}`);
    }
  }

  console.log("Resolving and mapping Hyperspace Dex...");
  for (const entry of hyperspaceNamesList) {
    let nameSearch = entry.name;
    let dbPoke = await prisma.pokemon.findFirst({
      where: { name: { equals: nameSearch, mode: "insensitive" } }
    });

    if (!dbPoke) {
      dbPoke = await prisma.pokemon.findFirst({
        where: { name: { contains: nameSearch, mode: "insensitive" } }
      });
    }

    if (dbPoke) {
      const updatedGameVersions = Array.from(new Set([...dbPoke.gameVersions, "legends-za"]));
      const updatedRegionalDexes = Array.from(new Set([...dbPoke.regionalDexes, "kalos-central-hyperspace"]));
      const updatedAltForms = Array.from(new Set([...dbPoke.altFormAvailableIn, "legends-za"]));

      await prisma.pokemon.update({
        where: { id: dbPoke.id },
        data: {
          gameVersions: updatedGameVersions,
          regionalDexes: updatedRegionalDexes,
          altFormAvailableIn: updatedAltForms
        }
      });

      await prisma.dexEntry.upsert({
        where: { pokemonId_regionName: { pokemonId: dbPoke.id, regionName: "kalos-central-hyperspace" } },
        update: { entryNumber: entry.regNum },
        create: { pokemonId: dbPoke.id, regionName: "kalos-central-hyperspace", entryNumber: entry.regNum }
      });
    } else {
      console.warn(`WARNING: Could not find Hyperspace species by name: ${entry.name}`);
    }
  }

  // 3. Final verification print
  const lumioseCount = await prisma.dexEntry.count({ where: { regionName: "kalos-central-lumiose" } });
  const hyperspaceCount = await prisma.dexEntry.count({ where: { regionName: "kalos-central-hyperspace" } });
  console.log(`Reseed finished! Lumiose Entries: ${lumioseCount}, Hyperspace Entries: ${hyperspaceCount}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
