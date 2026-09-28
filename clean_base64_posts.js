const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { Client } = require('pg');
require('dotenv').config();

const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const dbUrl = process.env.DATABASE_URL || `postgresql://${process.env.DB_USERNAME}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME}`;

async function cleanBase64Posts() {
  const client = new Client({
    connectionString: dbUrl.replace(/\?sslmode=.*$/, ''),
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
  });

  await client.connect();
  console.log('Connected to database to clean base64 images from post contents...');

  const res = await client.query("SELECT id, title, slug, content FROM post WHERE content LIKE '%data:image/%'");
  console.log(`Found ${res.rows.length} posts with inline base64 images.`);

  for (const row of res.rows) {
    let content = row.content;
    let modified = false;

    const regex = /src=["'](data:image\/([a-zA-Z0-9]+);base64,([^"']+))["']/g;
    let match;

    const replacements = [];

    while ((match = regex.exec(content)) !== null) {
      const fullDataUri = match[1];
      const mimeType = match[2];
      const base64Data = match[3];

      try {
        const buffer = Buffer.from(base64Data, 'base64');
        const filename = `img_clean_${row.id}_${Date.now()}_${Math.floor(Math.random() * 1000)}.jpg`;
        const filePath = path.join(uploadsDir, filename);

        await sharp(buffer)
          .resize({ width: 1200, height: 800, fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 80, progressive: true })
          .toFile(filePath);

        const imgUrl = `https://api.pinrwanda.com/uploads/${filename}`;
        replacements.push({ original: fullDataUri, replacement: imgUrl });
        console.log(`Extracted & compressed base64 image for post #${row.id} -> ${filename}`);
      } catch (err) {
        console.error(`Failed to process base64 image for post #${row.id}:`, err.message);
      }
    }

    for (const r of replacements) {
      content = content.replace(r.original, r.replacement);
      modified = true;
    }

    if (modified) {
      await client.query("UPDATE post SET content = $1 WHERE id = $2", [content, row.id]);
      console.log(`Updated post #${row.id} ("${row.title}") with clean image URLs.`);
    }
  }

  await client.end();
  console.log('Done cleaning inline base64 images from all posts!');
}

cleanBase64Posts().catch(err => {
  console.error('Error running cleanBase64Posts:', err);
  process.exit(1);
});
