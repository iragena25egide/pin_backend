const { Client } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL is not defined in .env");
  process.exit(1);
}

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to database successfully!");

    // Run the migration query
    const res = await client.query(`
      ALTER TABLE posts ADD COLUMN IF NOT EXISTS language VARCHAR(10) DEFAULT 'rw';
    `);
    console.log("Migration executed successfully:", res);
  } catch (err) {
    console.error("Error running migration query:", err);
  } finally {
    await client.end();
  }
}

run();
