const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  await client.connect();
  await client.query('UPDATE posts SET views = 0');
  console.log('Successfully reset all post views to 0');
  await client.end();
}

run().catch(console.error);
