fetch("http://localhost:3000/graphql", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query: "{ pokemon(id: 1) { id name shinyImage gameVersions flavorTexts { version text } stats { name value } evolutions { id name image } matchups { type multiplier } cry } }" })
}).then(r => r.json()).then(r => console.log(JSON.stringify(r, null, 2))).catch(e => console.error(e));
