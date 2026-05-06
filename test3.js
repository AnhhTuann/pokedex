fetch("http://localhost:3000/graphql", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query: "{ ping }" })
}).then(r => r.json()).then(console.log).catch(console.error);
