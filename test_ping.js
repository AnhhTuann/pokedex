fetch("http://localhost:3000/api/ping").then(r => r.text()).then(t => console.log("Response:", t)).catch(e => console.error("Error:", e.message));
