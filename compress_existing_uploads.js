const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const uploadsDir = path.join(__dirname, 'public', 'uploads');

if (!fs.existsSync(uploadsDir)) {
  console.log('Uploads directory not found:', uploadsDir);
  process.exit(0);
}

const files = fs.readdirSync(uploadsDir);
console.log(`Found ${files.length} files in ${uploadsDir}`);

async function compressAll() {
  for (const file of files) {
    const filePath = path.join(uploadsDir, file);
    const ext = path.extname(file).toLowerCase();
    
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.webp') {
      try {
        const stats = fs.statSync(filePath);
        if (stats.size > 300 * 1024) { // Larger than 300KB
          console.log(`Compressing ${file} (${Math.round(stats.size / 1024)} KB)...`);
          const tempPath = filePath + '.tmp';
          await sharp(filePath)
            .resize({ width: 1200, height: 630, fit: 'inside', withoutEnlargement: true })
            .jpeg({ quality: 80, progressive: true })
            .toFile(tempPath);
            
          fs.renameSync(tempPath, filePath);
          const newStats = fs.statSync(filePath);
          console.log(`  -> Compressed to ${Math.round(newStats.size / 1024)} KB`);
        }
      } catch (err) {
        console.error(`Error processing ${file}:`, err.message);
      }
    }
  }
  console.log('Finished compressing all existing uploads!');
}

compressAll();
