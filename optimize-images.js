const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const MAX_WIDTH = 1920;
const JPEG_QUALITY = 80;
const PNG_QUALITY = 80;

async function optimizeImage(inputPath, outputPath) {
  try {
    const ext = path.extname(inputPath).toLowerCase();

    if (ext === '.jpg' || ext === '.jpeg') {
      await sharp(inputPath)
        .resize(MAX_WIDTH, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({ quality: JPEG_QUALITY, progressive: true })
        .toFile(outputPath + '.tmp');
    } else if (ext === '.png') {
      await sharp(inputPath)
        .resize(MAX_WIDTH, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .png({ quality: PNG_QUALITY, compressionLevel: 9 })
        .toFile(outputPath + '.tmp');
    } else {
      console.log(`Skipping unsupported format: ${inputPath}`);
      return false;
    }

    // Get file sizes
    const originalSize = fs.statSync(inputPath).size;
    const newSize = fs.statSync(outputPath + '.tmp').size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

    // Replace original with optimized
    fs.renameSync(outputPath + '.tmp', outputPath);

    console.log(`✓ ${path.basename(inputPath)}: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024 / 1024).toFixed(2)}MB (${savings}% smaller)`);
    return true;
  } catch (error) {
    console.error(`✗ Error optimizing ${inputPath}:`, error.message);
    // Clean up temp file if it exists
    try {
      fs.unlinkSync(outputPath + '.tmp');
    } catch (e) {}
    return false;
  }
}

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await processDirectory(filePath);
    } else if (file.match(/\.(jpe?g|png)$/i) && !file.includes(':Zone.Identifier')) {
      await optimizeImage(filePath, filePath);
    }
  }
}

async function main() {
  console.log('Starting image optimization...\n');

  const imagesDir = path.join(__dirname, 'images');

  if (!fs.existsSync(imagesDir)) {
    console.error('Images directory not found!');
    process.exit(1);
  }

  await processDirectory(imagesDir);

  console.log('\n✓ Image optimization complete!');
}

main().catch(console.error);
