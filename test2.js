fetch("http://0.0.0.0:3000/graphql?random=" + Math.random(), { 
  method: "POST", 
  headers: { "Content-Type": "application/json" }, 
  body: JSON.stringify({query: "{ pokemon(id: 1) { name matchups { type multiplier } cry } }"}) 
}).then(r=>r.json()).then(r => console.dir(r, {depth: null})).catch(console.error);
