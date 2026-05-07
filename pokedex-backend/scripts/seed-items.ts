import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Starting Item Dex Seeding Script...");

  try {
    const listRes = await fetch("https://pokeapi.co/api/v2/item?limit=2000");
    if (!listRes.ok) {
      throw new Error(`Failed to fetch items list: ${listRes.statusText}`);
    }

    const listData = await listRes.json();
    const itemRefs = listData.results || [];
    console.log(`📦 Found ${itemRefs.length} item references to fetch detailed data.`);

    const chunkSize = 50;
    let seededCount = 0;

    for (let i = 0; i < itemRefs.length; i += chunkSize) {
      const chunk = itemRefs.slice(i, i + chunkSize);
      console.log(`\n⏳ Processing chunk ${Math.floor(i / chunkSize) + 1}/${Math.ceil(itemRefs.length / chunkSize)}...`);

      await Promise.all(
        chunk.map(async (itemRef: { name: string; url: string }) => {
          try {
            const detailRes = await fetch(itemRef.url);
            if (!detailRes.ok) {
              console.error(`❌ Failed to fetch details for ${itemRef.name}`);
              return;
            }

            const data = await detailRes.json();

            // 1. Cost & Fling details
            const cost = data.cost !== undefined ? data.cost : null;
            const flingPower = data.fling_power !== undefined ? data.fling_power : null;
            const flingEffect = data.fling_effect?.name || null;

            // 2. Category & Pocket
            const category = data.category?.name || null;
            const pocket = data.pocket?.name || null;

            // 3. Flavor Text (English Game Description)
            let flavorText: string | null = null;
            const englishFlavor = data.flavor_text_entries?.find(
              (entry: any) => entry.language?.name === "en"
            );
            if (englishFlavor) {
              flavorText = englishFlavor.text
                .replace(/[\n\f\r\t]/g, " ")
                .replace(/\s+/g, " ")
                .trim();
            }

            // 4. Effect (English short_effect or effect)
            let effect: string | null = null;
            const englishEffectObj = data.effect_entries?.find(
              (entry: any) => entry.language?.name === "en"
            );
            if (englishEffectObj) {
              effect = englishEffectObj.short_effect || englishEffectObj.effect || null;
              if (effect) {
                effect = effect
                  .replace(/[\n\f\r\t]/g, " ")
                  .replace(/\s+/g, " ")
                  .trim();
              }
            }

            // 5. Sprite
            const spriteUrl = data.sprites?.default || null;

            // 6. DB Upsert
            await prisma.item.upsert({
              where: { name: itemRef.name },
              update: {
                cost,
                flingPower,
                flingEffect,
                category,
                pocket,
                flavorText,
                effect,
                spriteUrl,
              },
              create: {
                name: itemRef.name,
                cost,
                flingPower,
                flingEffect,
                category,
                pocket,
                flavorText,
                effect,
                spriteUrl,
              },
            });

            seededCount++;
          } catch (err) {
            console.error(`⚠️ Error processing item detail for "${itemRef.name}":`, err);
          }
        })
      );
    }

    console.log(`\n🎉 Item Dex seeding completed successfully! Total items seeded: ${seededCount}`);
  } catch (error) {
    console.error("❌ Fatal error during item seeding:", error);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
