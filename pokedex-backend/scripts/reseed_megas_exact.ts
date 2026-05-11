import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const customVarieties = [
  { id: 10154, baseId: 154, name: "Meganium-Mega", types: ["grass", "fairy"], isMega: true, isAlternative: false, hp: 80, attack: 102, defense: 140, specialAttack: 110, specialDefense: 110, speed: 80, desc: "Mega Evolution gives it a majestic floral collar, radiating pure fairy energy that heals allies.", image: "/custom_sprites/154-mega.png", shinyImage: "/custom_sprites/shiny/154-mega.png" },
  { id: 10500, baseId: 500, name: "Emboar-Mega", types: ["fire", "fighting"], isMega: true, isAlternative: false, hp: 110, attack: 153, defense: 95, specialAttack: 135, specialDefense: 85, speed: 50, desc: "With unmatched power, its blazing armor becomes impenetrable, unleashing unstoppable fiery punches.", image: "/custom_sprites/500-mega.png", shinyImage: "/custom_sprites/shiny/500-mega.png" },
  { id: 10160, baseId: 160, name: "Feraligatr-Mega", types: ["water", "dark"], isMega: true, isAlternative: false, hp: 85, attack: 140, defense: 115, specialAttack: 90, specialDefense: 93, speed: 107, desc: "Harnessing the dark currents of underwater trenches, Mega Feraligatr tears through opponents with jaw power capable of crushing steel.", image: "/custom_sprites/160-mega.png", shinyImage: "/custom_sprites/shiny/160-mega.png" },
  { id: 10689, baseId: 689, name: "Barbaracle-Mega", types: ["rock", "fighting"], isMega: true, isAlternative: false, hp: 72, attack: 145, defense: 135, specialAttack: 54, specialDefense: 106, speed: 88, desc: "Mega Barbaracle acts with all hands synchronized perfectly, delivering crushing rocky combat moves.", image: "/custom_sprites/689-mega.png", shinyImage: "/custom_sprites/shiny/689-mega.png" },
  { id: 10121, baseId: 121, name: "Starmie-Mega", types: ["water", "psychic"], isMega: true, isAlternative: false, hp: 60, attack: 75, defense: 105, specialAttack: 140, specialDefense: 105, speed: 135, desc: "Its core glows in multiple cosmic colors, amplifying its psychic waves to manipulate ocean waves and gravity.", image: "/custom_sprites/121-mega.png", shinyImage: "/custom_sprites/shiny/121-mega.png" },
  { id: 10670, baseId: 670, name: "Floette-Eternal", types: ["fairy"], isMega: false, isAlternative: true, hp: 74, attack: 65, defense: 67, specialAttack: 125, specialDefense: 128, speed: 92, desc: "The legendary flower Floette carrying the dark flower of the ultimate weapon. Its fairy power is unmatched.", image: "/custom_sprites/670-mega.png", shinyImage: "/custom_sprites/shiny/670-mega.png" },
  { id: 10671, baseId: 670, name: "Floette-Mega", types: ["fairy"], isMega: true, isAlternative: false, hp: 74, attack: 85, defense: 87, specialAttack: 145, specialDefense: 148, speed: 112, desc: "Mega Evolution morphs Floette's flower into an immense magical shield, refracting incoming beams of light.", image: "/custom_sprites/670-mega.png", shinyImage: "/custom_sprites/shiny/670-mega.png" },
  { id: 10678, baseId: 678, name: "Meowstic-Mega (M)", types: ["psychic"], isMega: true, isAlternative: false, hp: 74, attack: 68, defense: 96, specialAttack: 123, specialDefense: 121, speed: 122, desc: "Its ears open completely, releasing raw telepathic frequencies that can lift up steel buildings with ease.", image: "/custom_sprites/044-meowstic-mega-m.png", shinyImage: "/custom_sprites/shiny/678-mega.png" },
  { id: 30678, baseId: 678, name: "Meowstic-Mega (F)", types: ["psychic"], isMega: true, isAlternative: false, hp: 74, attack: 68, defense: 96, specialAttack: 123, specialDefense: 121, speed: 122, desc: "Releasing pure telepathic power from its ears, its psychic aura forms a shining protective barrier around itself.", image: "/custom_sprites/044-meowstic-mega-f.png", shinyImage: "/custom_sprites/shiny/678-mega.png" },
  { id: 10668, baseId: 668, name: "Pyroar-Mega", types: ["fire", "normal"], isMega: true, isAlternative: false, hp: 86, attack: 88, defense: 92, specialAttack: 149, specialDefense: 86, speed: 129, desc: "Wrapped in an imperial crown of solar flare, Mega Pyroar's roar creates a burning heat wave exceeding 2,000 degrees.", image: "/custom_sprites/668-mega.png", shinyImage: "/custom_sprites/shiny/668-mega.png" },
  { id: 10226, baseId: 26, name: "Raichu-Mega-X", types: ["electric", "fighting"], isMega: true, isAlternative: false, hp: 60, attack: 130, defense: 75, specialAttack: 110, specialDefense: 90, speed: 125, desc: "Focusing electrical energy into physical blows, Mega Raichu X strikes with the swiftness and power of a lightning bolt.", image: "/custom_sprites/054-mega-raichu-x.png", shinyImage: "/custom_sprites/shiny/26-mega.png" },
  { id: 10326, baseId: 26, name: "Raichu-Mega-Y", types: ["electric", "psychic"], isMega: true, isAlternative: false, hp: 60, attack: 90, defense: 75, specialAttack: 140, specialDefense: 110, speed: 115, desc: "Using its long tail as an antenna, Mega Raichu Y emits powerful psychic electromagnetic fields to paralyze foes.", image: "/custom_sprites/054-mega-raichu-y.png", shinyImage: "/custom_sprites/shiny/26-mega.png" },
  { id: 20036, baseId: 36, name: "Clefable-Mega", types: ["fairy"], isMega: true, isAlternative: false, hp: 95, attack: 80, defense: 103, specialAttack: 125, specialDefense: 110, speed: 70, desc: "A beacon of cosmic stardust. Mega Clefable's floaty movements allow it to evade attacks with magical grace.", image: "/custom_sprites/057-mega-clefable.png", shinyImage: "/custom_sprites/shiny/36-mega.png" },
  { id: 10545, baseId: 545, name: "Scolipede-Mega", types: ["bug", "poison"], isMega: true, isAlternative: false, hp: 60, attack: 130, defense: 119, specialAttack: 65, specialDefense: 89, speed: 122, desc: "Its toxic horns grow massive, delivering quick and fatal jabs as it charges forward like a tank.", image: "/custom_sprites/070-mega-scolipede.png", shinyImage: "/custom_sprites/shiny/545-mega.png" },
  { id: 100710, baseId: 71, name: "Victreebel-Mega", types: ["grass", "poison"], isMega: true, isAlternative: false, hp: 80, attack: 135, defense: 85, specialAttack: 130, specialDefense: 90, speed: 90, desc: "Its acidic pool melts any defense instantly. It secretes a sweet scent that lures entire crowds into its maw.", image: "/custom_sprites/076-mega-victreebel.png", shinyImage: "/custom_sprites/shiny/71-mega.png" },
  { id: 10659, baseId: 530, name: "Excadrill-Mega", types: ["ground", "steel"], isMega: true, isAlternative: false, hp: 110, attack: 155, defense: 80, specialAttack: 50, specialDefense: 85, speed: 108, desc: "Mega Evolution sharpens its drill-horns into solid titanium blades, boring through solid earth instantly.", image: "/custom_sprites/121-mega-excadrill.png", shinyImage: "/custom_sprites/shiny/530-mega.png" },
  { id: 11445, baseId: 445, name: "Mega Garchomp Z", types: ["dragon"], isMega: true, isAlternative: false, hp: 108, attack: 180, defense: 135, specialAttack: 140, specialDefense: 105, speed: 112, desc: "Unlocking hidden dragon genes, Mega Garchomp Z flies at supersonic speeds, slicing targets to ribbons with its blade-like arms.", image: "/custom_sprites/130-mega-garchomp-z.png", shinyImage: "/custom_sprites/shiny/445-mega.png" },
  { id: 11359, baseId: 359, name: "Mega Absol Z", types: ["dark", "ghost"], isMega: true, isAlternative: false, hp: 65, attack: 160, defense: 80, specialAttack: 115, specialDefense: 80, speed: 125, desc: "Cloaked in phantom wings, Mega Absol Z senses disaster miles away, striking from the shadows before any threat realizes.", image: "/custom_sprites/134-mega-absol-z.png", shinyImage: "/custom_sprites/shiny/359-mega.png" },
  { id: 11448, baseId: 448, name: "Mega Lucario Z", types: ["fighting", "steel"], isMega: true, isAlternative: false, hp: 70, attack: 155, defense: 108, specialAttack: 145, specialDefense: 90, speed: 122, desc: "Concentrating its aura into solid steel blades, Mega Lucario Z reads minds and blocks physical damage perfectly.", image: "/custom_sprites/136-mega-lucario-z.png", shinyImage: "/custom_sprites/shiny/448-mega.png" },
  { id: 10604, baseId: 604, name: "Eelektross-Mega", types: ["electric"], isMega: true, isAlternative: false, hp: 85, attack: 135, defense: 100, specialAttack: 135, specialDefense: 100, speed: 75, desc: "Harnessing deep ocean currents, Mega Eelektross floating without gravity, delivering continuous thunder bolts.", image: "/custom_sprites/144-mega-eelektross.png", shinyImage: "/custom_sprites/shiny/604-mega.png" },
  { id: 10149, baseId: 149, name: "Dragonite-Mega", types: ["dragon", "flying"], isMega: true, isAlternative: false, hp: 91, attack: 164, defense: 115, specialAttack: 130, specialDefense: 120, speed: 100, desc: "Upon Mega Evolution, its speed matches jets, letting it circle the globe in less than sixteen hours.", image: "/custom_sprites/147-mega-dragonite.png", shinyImage: "/custom_sprites/shiny/149-mega.png" },
  { id: 10687, baseId: 687, name: "Malamar-Mega", types: ["dark", "psychic"], isMega: true, isAlternative: false, hp: 86, attack: 122, defense: 108, specialAttack: 88, specialDefense: 115, speed: 101, desc: "Its glowing body flashes complex patterns, hypnotizing onlookers and completely inverting their senses of reality.", image: "/custom_sprites/160-mega-malamar.png", shinyImage: "/custom_sprites/shiny/687-mega.png" },
  { id: 10691, baseId: 691, name: "Dragalge-Mega", types: ["poison", "dragon"], isMega: true, isAlternative: false, hp: 65, attack: 95, defense: 110, specialAttack: 137, specialDefense: 143, speed: 60, desc: "Mega Dragalge secretes highly corrosive dragon venom that can dissolve double-plated metal armor within seconds.", image: "/custom_sprites/162-mega-dragalge.png", shinyImage: "/custom_sprites/shiny/691-mega.png" },
  { id: 10701, baseId: 701, name: "Hawlucha-Mega", types: ["fighting", "flying"], isMega: true, isAlternative: false, hp: 78, attack: 132, defense: 95, specialAttack: 74, specialDefense: 83, speed: 138, desc: "The ultimate wrestling champion. Mega Hawlucha leaps from clouds to deliver spectacular flying presses.", image: "/custom_sprites/181-mega-hawlucha.png", shinyImage: "/custom_sprites/shiny/701-mega.png" },
  { id: 10560, baseId: 560, name: "Scrafty-Mega", types: ["dark", "fighting"], isMega: true, isAlternative: false, hp: 65, attack: 130, defense: 135, specialAttack: 45, specialDefense: 135, speed: 78, desc: "Its tough skin acts like armor. Mega Scrafty deals devastating headbutts while easily shrugging off hits.", image: "/custom_sprites/185-mega-scrafty.png", shinyImage: "/custom_sprites/shiny/560-mega.png" },
  { id: 10609, baseId: 609, name: "Chandelure-Mega", types: ["ghost", "fire"], isMega: true, isAlternative: false, hp: 60, attack: 65, defense: 110, specialAttack: 185, specialDefense: 110, speed: 100, desc: "Its flames flare into spectral colors, consuming nearby spirits to fuel its devastating special fire powers.", image: "/custom_sprites/191-mega-chandelure.png", shinyImage: "/custom_sprites/shiny/609-mega.png" },
  { id: 10658, baseId: 658, name: "Greninja-Mega", types: ["water", "dark"], isMega: true, isAlternative: false, hp: 72, attack: 125, defense: 87, specialAttack: 133, specialDefense: 91, speed: 142, desc: "Mega Greninja blends seamlessly into shadows, throwing high-speed water shurikens that cut steel blocks cleanly.", image: "/custom_sprites/211-mega-greninja.png", shinyImage: "/custom_sprites/shiny/658-mega.png" },
  { id: 10870, baseId: 870, name: "Falinks-Mega", types: ["fighting"], isMega: true, isAlternative: false, hp: 65, attack: 140, defense: 120, specialAttack: 70, specialDefense: 80, speed: 105, desc: "Forming an impenetrable phalanx circle, Mega Falinks fights in perfect unison, creating defensive iron spikes.", image: "/custom_sprites/212-mega-falinks.png", shinyImage: "/custom_sprites/shiny/870-mega.png" },
  { id: 10652, baseId: 652, name: "Chesnaught-Mega", types: ["grass", "fighting"], isMega: true, isAlternative: false, hp: 88, attack: 147, defense: 152, specialAttack: 74, specialDefense: 95, speed: 74, desc: "Its spike shell expands into full shields, packing power that can deflect heavy artillery.", image: "/custom_sprites/215-mega-chesnaught.png", shinyImage: "/custom_sprites/shiny/652-mega.png" },
  { id: 10227, baseId: 227, name: "Skarmory-Mega", types: ["steel", "flying"], isMega: true, isAlternative: false, hp: 65, attack: 110, defense: 170, specialAttack: 50, specialDefense: 90, speed: 105, desc: "Its wings sharpen into solid steel swords, dealing heavy blade-wing strikes while completely immune to impact.", image: "/custom_sprites/216-mega-skarmory.png", shinyImage: "/custom_sprites/shiny/227-mega.png" },
  { id: 10655, baseId: 655, name: "Delphox-Mega", types: ["fire", "psychic"], isMega: true, isAlternative: false, hp: 75, attack: 69, defense: 92, specialAttack: 154, specialDefense: 120, speed: 124, desc: "Its branch morphs into a glowing magical staff, casting complex fire illusions and predictive spells.", image: "/custom_sprites/219-mega-delphox.png", shinyImage: "/custom_sprites/shiny/655-mega.png" },
  { id: 10780, baseId: 780, name: "Drampa-Mega", types: ["normal", "dragon"], isMega: true, isAlternative: false, hp: 78, attack: 80, defense: 115, specialAttack: 165, specialDefense: 135, speed: 56, desc: "Its friendly aura intensifies, but its dragon breath can flatten mountains if any child is threatened.", image: "/custom_sprites/224-mega-drampa.png", shinyImage: "/custom_sprites/shiny/780-mega.png" },
  { id: 10718, baseId: 718, name: "Zygarde-Core", types: ["dragon", "ground"], isMega: false, isAlternative: true, hp: 50, attack: 50, defense: 50, specialAttack: 50, specialDefense: 50, speed: 50, desc: "The core of Zygarde's life force, monitoring the ecosystem and directing cells to merge when danger arises.", image: "/custom_sprites/230-zygarde-core.png", shinyImage: "/custom_sprites/shiny/718-mega.png" },
  { id: 11718, baseId: 718, name: "Zygarde-Cell", types: ["dragon", "ground"], isMega: false, isAlternative: true, hp: 30, attack: 30, defense: 30, specialAttack: 30, specialDefense: 30, speed: 30, desc: "Scattered across Kalos, Zygarde cells have no consciousness but act as the eyes and ears of the ecosystem.", image: "/custom_sprites/230-zygarde-cell.png", shinyImage: "/custom_sprites/shiny/718-mega.png" },
  { id: 12718, baseId: 718, name: "Zygarde-Mega", types: ["dragon", "ground"], isMega: true, isAlternative: false, hp: 216, attack: 140, defense: 151, specialAttack: 121, specialDefense: 125, speed: 95, desc: "Zygarde's ultimate power. Its dragon body unleashes energy beams capable of restoring planetary balance.", image: "/custom_sprites/230-mega-zygarde.png", shinyImage: "/custom_sprites/shiny/718-mega.png" },
  { id: 80700, baseId: 807, name: "Zeraora-Mega", types: ["electric"], isMega: true, isAlternative: false, hp: 88, attack: 142, defense: 95, specialAttack: 122, specialDefense: 100, speed: 153, desc: "Its lightning speed breaks space-time, channeling cosmic storm power into every punch.", image: "/custom_sprites/807.png", shinyImage: "/custom_sprites/shiny/807-mega.png" },
  { id: 10026, baseId: 681, name: "Aegislash-Blade", types: ["steel", "ghost"], isMega: false, isAlternative: true, hp: 60, attack: 150, defense: 50, specialAttack: 150, specialDefense: 50, speed: 60, desc: "Its stance shifts to absolute attack, focusing all shield-energy into a piercing giant blade.", image: "/custom_sprites/073-blade-aegislash.png", shinyImage: "/custom_sprites/shiny/681-mega.png" },
  { id: 10071, baseId: 80, name: "Slowbro-Mega", types: ["water", "psychic"], isMega: true, isAlternative: false, hp: 95, attack: 75, defense: 180, specialAttack: 130, specialDefense: 80, speed: 30, desc: "Shellder swallows Slowbro entirely, acting as iron armor that completely blocks physical moves.", image: "/custom_sprites/10071.png", shinyImage: "/custom_sprites/shiny/80-mega.png" },
  { id: 10036, baseId: 9, name: "Blastoise-Mega", types: ["water"], isMega: true, isAlternative: false, hp: 79, attack: 103, defense: 120, specialAttack: 135, specialDefense: 115, speed: 78, desc: "The three water cannons on its back merge into a singular immense launcher, blowing away hills with water pressure.", image: "/custom_sprites/10036.png", shinyImage: "/custom_sprites/shiny/9-mega.png" },
  { id: 100951, baseId: 951, name: "Scovillain-Mega", types: ["grass", "fire"], isMega: true, isAlternative: false, hp: 65, attack: 138, defense: 105, specialAttack: 138, specialDefense: 105, speed: 95, desc: "Mega Evolution amplifies its split brains, unleashing double-headed torrents of spicy fire and seeds.", image: "/custom_sprites/951-mega.png", shinyImage: "/custom_sprites/shiny/951-mega.png" },
  { id: 100970, baseId: 970, name: "Glimmora-Mega", types: ["rock", "poison"], isMega: true, isAlternative: false, hp: 83, attack: 70, defense: 120, specialAttack: 170, specialDefense: 111, speed: 106, desc: "Its crystallized petals open completely, discharging dense toxic stardust that crystallizes upon impact.", image: "/custom_sprites/970-mega.png", shinyImage: "/custom_sprites/shiny/970-mega.png" },
  { id: 100978, baseId: 978, name: "Tatsugiri-Curly-Mega", types: ["dragon", "water"], isMega: true, isAlternative: false, hp: 68, attack: 70, defense: 80, specialAttack: 150, specialDefense: 115, speed: 112, desc: "The curly mega form uses its vibrant colors to hypnotize giant fish-like hosts, commanding them with psychic dragon aura.", image: "/custom_sprites/978-mega.png", shinyImage: "/custom_sprites/shiny/978-mega.png" },
  { id: 110978, baseId: 978, name: "Tatsugiri-Droopy-Mega", types: ["dragon", "water"], isMega: true, isAlternative: false, hp: 68, attack: 70, defense: 80, specialAttack: 150, specialDefense: 115, speed: 112, desc: "Looking deceptively helpless, Mega Droopy Tatsugiri's bait glows with immense energy, tricking predators into heavy counter-attacks.", image: "/custom_sprites/978-mega.png", shinyImage: "/custom_sprites/shiny/978-mega.png" },
  { id: 120978, baseId: 978, name: "Tatsugiri-Stretchy-Mega", types: ["dragon", "water"], isMega: true, isAlternative: false, hp: 68, attack: 70, defense: 80, specialAttack: 150, specialDefense: 115, speed: 112, desc: "Expanding its dragon body, Mega Stretchy Tatsugiri executes incredibly swift maneuvers, escaping any threat while launching precise water cannons.", image: "/custom_sprites/978-mega.png", shinyImage: "/custom_sprites/shiny/978-mega.png" },
  { id: 100998, baseId: 998, name: "Baxcalibur-Mega", types: ["dragon", "ice"], isMega: true, isAlternative: false, hp: 115, attack: 185, defense: 112, specialAttack: 95, specialDefense: 116, speed: 107, desc: "Its glaive spine grows into an colossal sword of absolute-zero ice, allowing it to slice through glaciers with physical ease.", image: "/custom_sprites/998-mega.png", shinyImage: "/custom_sprites/shiny/998-mega.png" },
  { id: 100358, baseId: 358, name: "Chimecho-Mega", types: ["psychic", "fairy"], isMega: true, isAlternative: false, hp: 75, attack: 50, defense: 100, specialAttack: 135, specialDefense: 120, speed: 95, desc: "Its metallic bells echo with chime energy, creating continuous acoustic forcefields that heal allies and disorient rivals.", image: "/custom_sprites/358-mega.png", shinyImage: "/custom_sprites/shiny/358-mega.png" },
  { id: 100768, baseId: 768, name: "Golisopod-Mega", types: ["bug", "steel"], isMega: true, isAlternative: false, hp: 75, attack: 155, defense: 160, specialAttack: 60, specialDefense: 115, speed: 65, desc: "Its shell hardens into ultimate iron armor, transforming its claws into heavy armored cleavers that slice with mechanical precision.", image: "/custom_sprites/768-mega.png", shinyImage: "/custom_sprites/shiny/768-mega.png" },
  { id: 100623, baseId: 623, name: "Golurk-Mega", types: ["ground", "ghost"], isMega: true, isAlternative: false, hp: 89, attack: 164, defense: 110, specialAttack: 75, specialDefense: 110, speed: 75, desc: "With the seal of its core completely unleased, Mega Golurk transforms its arms into twin rocket cannons, firing pure spectral energy.", image: "/custom_sprites/623-mega.png", shinyImage: "/custom_sprites/shiny/623-mega.png" },
  { id: 100398, baseId: 398, name: "Staraptor-Mega", types: ["fighting", "flying"], isMega: true, isAlternative: false, hp: 85, attack: 150, defense: 90, specialAttack: 50, specialDefense: 80, speed: 125, desc: "Its wings harden into martial shields, enabling it to swoop at extreme speeds while delivering devastating fighting combat moves.", image: "/custom_sprites/398-mega.png", shinyImage: "/custom_sprites/shiny/398-mega.png" },
  { id: 100740, baseId: 740, name: "Crabominable-Mega", types: ["fighting", "ice"], isMega: true, isAlternative: false, hp: 97, attack: 162, defense: 117, specialAttack: 62, specialDefense: 107, speed: 55, desc: "Its pincers freeze into gargantuan solid ice blocks, delivering freezing punches that shatter boulders on impact.", image: "/custom_sprites/740-mega.png", shinyImage: "/custom_sprites/shiny/740-mega.png" },
  { id: 100485, baseId: 485, name: "Heatran-Mega", types: ["fire", "steel"], isMega: true, isAlternative: false, hp: 91, attack: 110, defense: 136, specialAttack: 160, specialDefense: 136, speed: 87, desc: "Its volcanic shell heats up to cosmic temperatures, melting steel defenses instantly while creating a rain of molten magma.", image: "/custom_sprites/485-mega.png", shinyImage: "/custom_sprites/shiny/485-mega.png" },
  { id: 100491, baseId: 491, name: "Darkrai-Mega", types: ["dark"], isMega: true, isAlternative: false, hp: 70, attack: 110, defense: 110, specialAttack: 175, specialDefense: 110, speed: 145, desc: "The lord of nightmares. Mega Darkrai's aura of darkness completely envelops its target, inducing continuous horrific dreams.", image: "/custom_sprites/491-mega.png", shinyImage: "/custom_sprites/shiny/491-mega.png" },
  { id: 100801, baseId: 801, name: "Magearna-Mega", types: ["steel", "fairy"], isMega: true, isAlternative: false, hp: 80, attack: 115, defense: 135, specialAttack: 160, specialDefense: 135, speed: 85, desc: "Its artificial heart sparkles with infinite energy, casting spectacular fairy spells that harmonize the surrounding ecosystem.", image: "/custom_sprites/801-mega.png", shinyImage: "/custom_sprites/shiny/801-mega.png" }
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
  // #001 Mankey, #002 Primeape, #003 Annihilape
  { name: "mankey", regNum: 1 },
  { name: "primeape", regNum: 2 },
  { name: "annihilape", regNum: 3 },

  // #004 Meowth, #004 Alolan Meowth, #004 Galarian Meowth, #005 Persian, #005 Alolan Persian, #006 Perrserker
  { name: "meowth", regNum: 4 },
  { name: "meowth-alola", regNum: 4 },
  { name: "meowth-galar", regNum: 4 },
  { name: "persian", regNum: 5 },
  { name: "persian-alola", regNum: 5 },
  { name: "perrserker", regNum: 6 },

  // #007 Farfetch'd, #007 Galarian Farfetch'd, #008 Sirfetch'd
  { name: "farfetchd", regNum: 7 },
  { name: "farfetchd-galar", regNum: 7 },
  { name: "sirfetchd", regNum: 8 },

  // #009 Cubone, #010 Marowak, #010 Alolan Marowak
  { name: "cubone", regNum: 9 },
  { name: "marowak", regNum: 10 },
  { name: "marowak-alola", regNum: 10 },

  // #011 Porygon, #012 Porygon2, #013 Porygon-Z
  { name: "porygon", regNum: 11 },
  { name: "porygon2", regNum: 12 },
  { name: "porygon-z", regNum: 13 },

  // #014 Capsakid, #015 Scovillain, #015 Mega Scovillain (Custom)
  { name: "capsakid", regNum: 14 },
  { name: "scovillain", regNum: 15 },
  { name: "scovillain-mega", regNum: 15 },

  // #016 Tinkatink, #017 Tinkatuff, #018 Tinkaton
  { name: "tinkatink", regNum: 16 },
  { name: "tinkatuff", regNum: 17 },
  { name: "tinkaton", regNum: 18 },

  // #019 Cyclizar
  { name: "cyclizar", regNum: 19 },

  // #020 Glimmet, #021 Glimmora, #021 Mega Glimmora (Custom)
  { name: "glimmet", regNum: 20 },
  { name: "glimmora", regNum: 21 },
  { name: "glimmora-mega", regNum: 21 },

  // #022 Rotom, #022 Heat Rotom, #022 Wash Rotom, #022 Frost Rotom, #022 Fan Rotom, #022 Mow Rotom
  { name: "rotom", regNum: 22 },
  { name: "rotom-heat", regNum: 22 },
  { name: "rotom-wash", regNum: 22 },
  { name: "rotom-frost", regNum: 22 },
  { name: "rotom-fan", regNum: 22 },
  { name: "rotom-mow", regNum: 22 },

  // #023 Greavard, #024 Houndstone
  { name: "greavard", regNum: 23 },
  { name: "houndstone", regNum: 24 },

  // #025 Sandygast, #026 Palossand
  { name: "sandygast", regNum: 25 },
  { name: "palossand", regNum: 26 },

  // #027 Kecleon, #028 Flamigo, #029 Cryogonal, #030 Dondozo
  { name: "kecleon", regNum: 27 },
  { name: "flamigo", regNum: 28 },
  { name: "cryogonal", regNum: 29 },
  { name: "dondozo", regNum: 30 },

  // #031 Curly Tatsugiri, #031 Droopy Tatsugiri, #031 Stretchy Tatsugiri, #031 Mega Curly Tatsugiri (Custom), #031 Mega Droopy Tatsugiri (Custom), #031 Mega Stretchy Tatsugiri (Custom)
  { name: "tatsugiri-curly", regNum: 31 },
  { name: "tatsugiri-droopy", regNum: 31 },
  { name: "tatsugiri-stretchy", regNum: 31 },
  { name: "tatsugiri-curly-mega", regNum: 31 },
  { name: "tatsugiri-droopy-mega", regNum: 31 },
  { name: "tatsugiri-stretchy-mega", regNum: 31 },

  // #032 Frigibax, #033 Arctibax, #034 Baxcalibur, #034 Mega Baxcalibur (Custom)
  { name: "frigibax", regNum: 32 },
  { name: "arctibax", regNum: 33 },
  { name: "baxcalibur", regNum: 34 },
  { name: "baxcalibur-mega", regNum: 34 },

  // #035 Chest Gimmighoul, #035 Roaming Gimmighoul, #036 Gholdengo
  { name: "gimmighoul", regNum: 35 },
  { name: "gimmighoul-roaming", regNum: 35 },
  { name: "gholdengo", regNum: 36 },

  // #037 Qwilfish, #037 Hisuian Qwilfish, #038 Overqwil
  { name: "qwilfish", regNum: 37 },
  { name: "qwilfish-hisui", regNum: 37 },
  { name: "overqwil", regNum: 38 },

  // #039 Treecko, #040 Grovyle, #041 Sceptile, #041 Mega Sceptile
  { name: "treecko", regNum: 39 },
  { name: "grovyle", regNum: 40 },
  { name: "sceptile", regNum: 41 },
  { name: "sceptile-mega", regNum: 41 },

  // #042 Torchic, #043 Combusken, #044 Blaziken, #044 Mega Blaziken
  { name: "torchic", regNum: 42 },
  { name: "combusken", regNum: 43 },
  { name: "blaziken", regNum: 44 },
  { name: "blaziken-mega", regNum: 44 },

  // #045 Mudkip, #046 Marshtomp, #047 Swampert, #047 Mega Swampert
  { name: "mudkip", regNum: 45 },
  { name: "marshtomp", regNum: 46 },
  { name: "swampert", regNum: 47 },
  { name: "swampert-mega", regNum: 47 },

  // #048 Feebas, #049 Milotic
  { name: "feebas", regNum: 48 },
  { name: "milotic", regNum: 49 },

  // #050 Chingling, #051 Chimecho, #051 Mega Chimecho (Custom)
  { name: "chingling", regNum: 50 },
  { name: "chimecho", regNum: 51 },
  { name: "chimecho-mega", regNum: 51 },

  // #052 Indeedee (Male), #052 Female Indeedee
  { name: "indeedee-male", regNum: 52 },
  { name: "indeedee-female", regNum: 52 },

  // #053 Purrloin, #054 Liepard
  { name: "purrloin", regNum: 53 },
  { name: "liepard", regNum: 54 },

  // #055 Munna
  { name: "munna", regNum: 55 },

  // #056 Musharna, #057 Throh, #058 Sawk
  { name: "musharna", regNum: 56 },
  { name: "throh", regNum: 57 },
  { name: "sawk", regNum: 58 },

  // #059 Yamask, #059 Galarian Yamask, #060 Cofagrigus, #061 Runerigus
  { name: "yamask", regNum: 59 },
  { name: "yamask-galar", regNum: 59 },
  { name: "cofagrigus", regNum: 60 },
  { name: "runerigus", regNum: 61 },

  // #062 Wimpod, #063 Golisopod, #063 Mega Golisopod (Custom - Hệ Bug/Steel)
  { name: "wimpod", regNum: 62 },
  { name: "golisopod", regNum: 63 },
  { name: "golisopod-mega", regNum: 63 },

  // #064 Nickit, #065 Thievul
  { name: "nickit", regNum: 64 },
  { name: "thievul", regNum: 65 },

  // #066 Clobbopus, #067 Grapploct
  { name: "clobbopus", regNum: 66 },
  { name: "grapploct", regNum: 67 },

  // #068 Mimikyu, #069 Kleavor
  { name: "mimikyu", regNum: 68 },
  { name: "kleavor", regNum: 69 },

  // #070 Morpeko, #070 Hangry Morpeko
  { name: "morpeko", regNum: 70 },
  { name: "morpeko-hangry", regNum: 70 },

  // #071 Golett, #072 Golurk, #072 Mega Golurk (Custom - Hệ Ground/Ghost)
  { name: "golett", regNum: 71 },
  { name: "golurk", regNum: 72 },
  { name: "golurk-mega", regNum: 72 },

  // #073 Rookidee, #074 Corvisquire, #075 Corviknight
  { name: "rookidee", regNum: 73 },
  { name: "corvisquire", regNum: 74 },
  { name: "corviknight", regNum: 75 },

  // #076 Igglybuff, #077 Jigglypuff, #078 Wigglytuff
  { name: "igglybuff", regNum: 76 },
  { name: "jigglypuff", regNum: 77 },
  { name: "wigglytuff", regNum: 78 },

  // #079 Fidough, #080 Dachsbun
  { name: "fidough", regNum: 79 },
  { name: "dachsbun", regNum: 80 },

  // #081 Starly, #082 Staravia, #083 Staraptor, #083 Mega Staraptor (Custom - Đổi hệ thành Fighting/Flying)
  { name: "starly", regNum: 81 },
  { name: "staravia", regNum: 82 },
  { name: "staraptor", regNum: 83 },
  { name: "staraptor-mega", regNum: 83 },

  // #084 Spoink, #085 Grumpig
  { name: "spoink", regNum: 84 },
  { name: "grumpig", regNum: 85 },

  // #086 Green Squawkabilly, #086 Blue Squawkabilly, #086 Yellow Squawkabilly, #086 White Squawkabilly
  { name: "squawkabilly-green-plumage", regNum: 86 },
  { name: "squawkabilly-blue-plumage", regNum: 86 },
  { name: "squawkabilly-yellow-plumage", regNum: 86 },
  { name: "squawkabilly-white-plumage", regNum: 86 },

  // #087 Crabrawler, #088 Crabominable, #088 Mega Crabominable (Custom - Hệ Fighting/Ice)
  { name: "crabrawler", regNum: 87 },
  { name: "crabominable", regNum: 88 },
  { name: "crabominable-mega", regNum: 88 },

  // #089 Nacli, #090 Naclstack, #091 Garganacl
  { name: "nacli", regNum: 89 },
  { name: "naclstack", regNum: 90 },
  { name: "garganacl", regNum: 91 },

  // #092 Gulpin, #093 Swalot
  { name: "gulpin", regNum: 92 },
  { name: "swalot", regNum: 93 },

  // #094 Zubat, #095 Golbat, #096 Crobat
  { name: "zubat", regNum: 94 },
  { name: "golbat", regNum: 95 },
  { name: "crobat", regNum: 96 },

  // #097 Charcadet, #098 Armarouge, #099 Ceruledge
  { name: "charcadet", regNum: 97 },
  { name: "armarouge", regNum: 98 },
  { name: "ceruledge", regNum: 99 },

  // #100 Maschiff, #101 Mabosstiff
  { name: "maschiff", regNum: 100 },
  { name: "mabosstiff", regNum: 101 },

  // #102 Toxel, #103 Toxtricity, #103 Low Key Toxtricity
  { name: "toxel", regNum: 102 },
  { name: "toxtricity-amped", regNum: 103 },
  { name: "toxtricity-low-key", regNum: 103 },

  // #104 Shroodle, #105 Grafaiai
  { name: "shroodle", regNum: 104 },
  { name: "grafaiai", regNum: 105 },

  // #106 Zangoose, #107 Seviper
  { name: "zangoose", regNum: 106 },
  { name: "seviper", regNum: 107 },

  // #108 Mime Jr., #109 Mr. Mime, #109 Galarian Mr. Mime, #110 Mr. Rime
  { name: "mime-jr", regNum: 108 },
  { name: "mr-mime", regNum: 109 },
  { name: "mr-mime-galar", regNum: 109 },
  { name: "mr-rime", regNum: 110 },

  // #111 Foongus, #112 Amoonguss
  { name: "foongus", regNum: 111 },
  { name: "amoonguss", regNum: 112 },

  // #113 Heatran, #113 Mega Heatran (Custom - Hệ Fire/Steel)
  { name: "heatran", regNum: 113 },
  { name: "heatran-mega", regNum: 113 },

  // #114 Volcanion, #115 Cobalion, #116 Terrakion, #117 Virizion
  { name: "volcanion", regNum: 114 },
  { name: "cobalion", regNum: 115 },
  { name: "terrakion", regNum: 116 },
  { name: "virizion", regNum: 117 },

  // #118 Keldeo, #118 Resolute Keldeo
  { name: "keldeo", regNum: 118 },
  { name: "keldeo-resolute", regNum: 118 },

  // #119 Meloetta, #119 Pirouette Meloetta
  { name: "meloetta-aria", regNum: 119 },
  { name: "meloetta-pirouette", regNum: 119 },

  // #120 Genesect
  { name: "genesect", regNum: 120 },

  // #121 Hoopa, #121 Hoopa Unbound
  { name: "hoopa", regNum: 121 },
  { name: "hoopa-unbound", regNum: 121 },

  // #122 Marshadow
  { name: "marshadow", regNum: 122 },

  // #123 Meltan
  { name: "meltan", regNum: 123 },

  // #124 Melmetal
  { name: "melmetal", regNum: 124 },

  // #125 Darkrai, #125 Mega Darkrai (Custom - Hệ Dark)
  { name: "darkrai", regNum: 125 },
  { name: "darkrai-mega", regNum: 125 },

  // #126 Latias
  { name: "latias", regNum: 126 },

  // #127 Latios
  { name: "latios", regNum: 127 },

  // #128 Kyogre, #128 Primal Kyogre
  { name: "kyogre", regNum: 128 },
  { name: "kyogre-primal", regNum: 128 },

  // #129 Groudon, #129 Primal Groudon
  { name: "groudon", regNum: 129 },
  { name: "groudon-primal", regNum: 129 },

  // #130 Rayquaza, #130 Mega Rayquaza
  { name: "rayquaza", regNum: 130 },
  { name: "rayquaza-mega", regNum: 130 },

  // #131 Magearna, #131 Mega Magearna (Custom - Hệ Steel/Fairy)
  { name: "magearna", regNum: 131 },
  { name: "magearna-mega", regNum: 131 },

  // #132 Zeraora, #132 Mega Zeraora (Custom - Hệ Electric)
  { name: "zeraora", regNum: 132 },
  { name: "zeraora-mega", regNum: 132 }
];

async function main() {
  console.log("Seeding and correcting custom Z-A Megas & Dex Entries...");

  console.log("Resetting regionalDexes and gameVersions for all Pokemon in DB...");
  const pokesToReset = await prisma.pokemon.findMany({
    where: {
      OR: [
        { regionalDexes: { hasSome: ["kalos-central-lumiose", "kalos-central-hyperspace"] } },
        { gameVersions: { has: "legends-za" } },
        { altFormAvailableIn: { has: "legends-za" } }
      ]
    }
  });

  for (const p of pokesToReset) {
    const updatedDexes = p.regionalDexes.filter(d => d !== "kalos-central-lumiose" && d !== "kalos-central-hyperspace");
    const updatedVersions = p.gameVersions.filter(v => v !== "legends-za");
    const updatedAltForms = p.altFormAvailableIn.filter(v => v !== "legends-za");

    await prisma.pokemon.update({
      where: { id: p.id },
      data: {
        regionalDexes: updatedDexes,
        gameVersions: updatedVersions,
        altFormAvailableIn: updatedAltForms
      }
    });
  }

  console.log("Deleting old regional DexEntry records...");
  await prisma.dexEntry.deleteMany({
    where: {
      regionName: { in: ["kalos-central-lumiose", "kalos-central-hyperspace"] }
    }
  });

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

async function getOrFetchPokemon(nameSearch: string) {
  // 1. Try to find by exact name
  let dbPoke = await prisma.pokemon.findFirst({
    where: { name: { equals: nameSearch, mode: "insensitive" } }
  });

  if (!dbPoke) {
    // 2. Try to find by contains name
    dbPoke = await prisma.pokemon.findFirst({
      where: { name: { contains: nameSearch, mode: "insensitive" } }
    });
  }

  if (dbPoke) {
    return dbPoke;
  }

  // 3. Not found, let's fetch from PokeAPI!
  console.log(`Dynamically fetching and seeding missing species: ${nameSearch}...`);
  try {
    let apiName = nameSearch.toLowerCase()
      .replace(/ /g, "-")
      .replace(/'/g, "")
      .replace(/\./g, "")
      .replace(/\(male\)/, "-male")
      .replace(/\(female\)/, "-female")
      .replace(/female-/, "")
      .replace(/-ordinary/, "");

    if (apiName === "farfetchd") apiName = "farfetchd";
    if (apiName === "sirfetchd") apiName = "sirfetchd";
    if (apiName === "mr-mime") apiName = "mr-mime";
    if (apiName === "mr-rime") apiName = "mr-rime";
    if (apiName === "mime-jr") apiName = "mime-jr";
    if (apiName === "squawkabilly-green-plumage") apiName = "squawkabilly-green";
    if (apiName === "squawkabilly-blue-plumage") apiName = "squawkabilly-blue";
    if (apiName === "squawkabilly-yellow-plumage") apiName = "squawkabilly-yellow";
    if (apiName === "squawkabilly-white-plumage") apiName = "squawkabilly-white";
    if (apiName === "toxtricity-amped") apiName = "toxtricity-amped";
    if (apiName === "toxtricity-low-key") apiName = "toxtricity-low-key";

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${apiName}`);
    if (!res.ok) {
      console.warn(`Could not fetch ${nameSearch} (apiName: ${apiName}) from PokeAPI`);
      return null;
    }
    const d = await res.json();

    let speciesId = d.id;
    if (d.species && d.species.url) {
      const speciesUrlParts = d.species.url.split('/').filter(Boolean);
      speciesId = parseInt(speciesUrlParts[speciesUrlParts.length - 1], 10);
    }

    let category: string | null = null;
    let description: string | null = null;
    try {
      const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${speciesId}`);
      if (speciesRes.ok) {
        const speciesData = await speciesRes.json();
        const genusObj = speciesData.genera?.find((g: any) => g.language?.name === "en");
        if (genusObj) category = genusObj.genus;

        const englishEntries = speciesData.flavor_text_entries?.filter((entry: any) => entry.language?.name === "en") || [];
        if (englishEntries.length > 0) {
          description = englishEntries[englishEntries.length - 1].flavor_text
            .replace(/[\n\f\r\t]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
        }
      }
    } catch (e) {
      // Ignore species details errors
    }

    const stats = d.stats.reduce((acc: any, s: any) => {
      const statName = s.stat.name;
      if (statName === "hp") acc.hp = s.base_stat;
      if (statName === "attack") acc.attack = s.base_stat;
      if (statName === "defense") acc.defense = s.base_stat;
      if (statName === "special-attack") acc.specialAttack = s.base_stat;
      if (statName === "special-defense") acc.specialDefense = s.base_stat;
      if (statName === "speed") acc.speed = s.base_stat;
      return acc;
    }, {});

    const baseNameFormatted = nameSearch.charAt(0).toUpperCase() + nameSearch.slice(1);

    const created = await prisma.pokemon.create({
      data: {
        pokedexNumber: d.id,
        name: baseNameFormatted,
        isDefault: d.is_default ?? true,
        speciesId: speciesId,
        generation: d.id <= 151 ? 1 : d.id <= 251 ? 2 : d.id <= 386 ? 3 : d.id <= 493 ? 4 : d.id <= 649 ? 5 : d.id <= 721 ? 6 : d.id <= 809 ? 7 : d.id <= 905 ? 8 : 9,
        category: category || "Unknown",
        description: description || `A fascinating species from the Pokémon world.`,
        regionalDexes: [],
        altFormAvailableIn: [],
        gameVersions: [],
        imageUrl: d.sprites?.other?.['official-artwork']?.front_default || d.sprites?.front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${d.id}.png`,
        shinyImageUrl: d.sprites?.other?.['official-artwork']?.front_shiny || d.sprites?.front_shiny || null,
        hp: stats.hp || 50,
        attack: stats.attack || 50,
        defense: stats.defense || 50,
        specialAttack: stats.specialAttack || 50,
        specialDefense: stats.specialDefense || 50,
        speed: stats.speed || 50,
        types: {
          connectOrCreate: d.types.map((t: any) => ({
            where: { name: t.type.name },
            create: { name: t.type.name }
          }))
        }
      }
    });

    return created;
  } catch (err) {
    console.error(`Error dynamically seeding ${nameSearch}:`, err);
    return null;
  }
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

    const dbPoke = await getOrFetchPokemon(nameSearch);

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
    if (nameSearch === "scovillain-mega") nameSearch = "Scovillain-Mega";
    if (nameSearch === "glimmora-mega") nameSearch = "Glimmora-Mega";
    if (nameSearch === "tatsugiri-curly-mega") nameSearch = "Tatsugiri-Curly-Mega";
    if (nameSearch === "tatsugiri-droopy-mega") nameSearch = "Tatsugiri-Droopy-Mega";
    if (nameSearch === "tatsugiri-stretchy-mega") nameSearch = "Tatsugiri-Stretchy-Mega";
    if (nameSearch === "baxcalibur-mega") nameSearch = "Baxcalibur-Mega";
    if (nameSearch === "chimecho-mega") nameSearch = "Chimecho-Mega";
    if (nameSearch === "golisopod-mega") nameSearch = "Golisopod-Mega";
    if (nameSearch === "golurk-mega") nameSearch = "Golurk-Mega";
    if (nameSearch === "staraptor-mega") nameSearch = "Staraptor-Mega";
    if (nameSearch === "crabominable-mega") nameSearch = "Crabominable-Mega";
    if (nameSearch === "heatran-mega") nameSearch = "Heatran-Mega";
    if (nameSearch === "darkrai-mega") nameSearch = "Darkrai-Mega";
    if (nameSearch === "magearna-mega") nameSearch = "Magearna-Mega";
    if (nameSearch === "zeraora-mega") nameSearch = "Zeraora-Mega";

    if (nameSearch === "tatsugiri-curly") nameSearch = "tatsugiri";

    const dbPoke = await getOrFetchPokemon(nameSearch);

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
