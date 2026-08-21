const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  await client.connect();
  const updates = [
    { id: 49, category: "Amakuru,Ubutabera" },
    { id: 48, category: "Amakuru,Ubutabera" },
    { id: 47, category: "Amakuru,Ubutabera" },
    { id: 46, category: "Amakuru" },
    { id: 44, category: "Amakuru,Ubutabera" },
    { id: 43, category: "Amakuru" },
    { id: 42, category: "Amakuru,Ubutabera" },
    { id: 40, category: "Amakuru,Politiki" },
    { id: 39, category: "Amakuru,Politiki" },
    { id: 38, category: "Amakuru,Ubutabera" },
    { id: 37, category: "Amakuru,Ubutabera,Imyidagaduro" },
    { id: 36, category: "Amakuru" },
    { id: 35, category: "Amakuru,Ubutabera,Imyidagaduro" },
    { id: 34, category: "Amakuru,Ubucukuzi bw'amabuye yagaciro,lang:en" },
    { id: 33, category: "Amakuru,Ubucukuzi bw'amabuye yagaciro" }
  ];

  for (const u of updates) {
    await client.query('UPDATE posts SET category = $1 WHERE id = $2', [u.category, u.id]);
    console.log(`Updated post ${u.id}`);
  }
  await client.end();
}

run().catch(console.error);
