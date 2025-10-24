import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const THUMBNAIL_SIZE = 600;  // Width in pixels for thumbnails (grid view)
const FULL_SIZE = 1920;      // Width in pixels for full-size images (lightbox)
const QUALITY = 85;          // JPEG quality (0-100)

const automotiveDir = path.join(__dirname, '..', 'public', 'images', 'automotive');
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

console.log('🖼️  Starting image optimization...\n');

// Process all folders
const folders = fs.readdirSync(automotiveDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

let totalProcessed = 0;
let totalSkipped = 0;

for (const folderName of folders) {
  const folderPath = path.join(automotiveDir, folderName);
  const thumbsPath = path.join(folderPath, 'thumbs');

  // Create thumbs directory if it doesn't exist
  if (!fs.existsSync(thumbsPath)) {
    fs.mkdirSync(thumbsPath);
  }

  // Get all image files
  const files = fs.readdirSync(folderPath);
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext);
  });

  if (imageFiles.length === 0) continue;

  console.log(`📁 ${folderName} (${imageFiles.length} images)`);

  for (const filename of imageFiles) {
    const originalPath = path.join(folderPath, filename);
    const nameWithoutExt = path.parse(filename).name;
    const thumbnailPath = path.join(thumbsPath, `${nameWithoutExt}.jpg`);
    const optimizedPath = path.join(folderPath, `${nameWithoutExt}_optimized.jpg`);

    try {
      // Check if thumbnail already exists
      if (fs.existsSync(thumbnailPath)) {
        totalSkipped++;
        continue;
      }

      // Get original file size
      const originalStats = fs.statSync(originalPath);
      const originalSizeMB = (originalStats.size / 1024 / 1024).toFixed(2);

      // Create thumbnail (for grid view)
      await sharp(originalPath)
        .resize(THUMBNAIL_SIZE, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({ quality: QUALITY })
        .toFile(thumbnailPath);

      // Create optimized full-size (for lightbox)
      await sharp(originalPath)
        .resize(FULL_SIZE, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({ quality: QUALITY })
        .toFile(optimizedPath);

      const thumbStats = fs.statSync(thumbnailPath);
      const thumbSizeMB = (thumbStats.size / 1024 / 1024).toFixed(2);

      const optimizedStats = fs.statSync(optimizedPath);
      const optimizedSizeMB = (optimizedStats.size / 1024 / 1024).toFixed(2);

      console.log(`   ✅ ${filename}`);
      console.log(`      Original: ${originalSizeMB}MB → Thumb: ${thumbSizeMB}MB, Full: ${optimizedSizeMB}MB`);

      totalProcessed++;
    } catch (error) {
      console.log(`   ❌ Failed to process ${filename}: ${error.message}`);
    }
  }
}

console.log('\n' + '='.repeat(60));
console.log(`✅ Optimization complete!`);
console.log(`   Processed: ${totalProcessed} images`);
console.log(`   Skipped: ${totalSkipped} images (already optimized)`);
console.log('='.repeat(60));
console.log('\n💡 Next steps:');
console.log('   1. Run: npm run photos');
console.log('   2. Refresh your browser');
console.log('   3. Check page load speed!');
