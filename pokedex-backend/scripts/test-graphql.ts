import fetch from 'node-fetch';

async function main() {
  console.log("Querying GraphQL server...");
  const query = `
    query {
      getAllAbilities(limit: 5) {
        results {
          id
          name
          flavorText
          shortEffect
          effect
        }
      }
    }
  `;

  const res = await fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });

  if (!res.ok) {
    console.error("HTTP error:", res.status, res.statusText);
    return;
  }

  const json = await res.json() as any;
  console.log("GraphQL Response:");
  console.log(JSON.stringify(json, null, 2));
}

main().catch(console.error);
