import { StarRail } from "starrail.js";
import { promises as fs } from 'fs';
import path from 'path';

const cachePath = path.join(__dirname, '../../hsr_cache');

async function initializeCache() {
  try {
    console.log('Creating cache directory...');
    await fs.mkdir(cachePath, { recursive: true });

    console.log('Initializing client...');
    const client = new StarRail();

    // New cache initialization method (v1.3.0+)
    await client.cache.initialize({
      path: cachePath,
      download: true
    });

    console.log('✅ Cache downloaded successfully!');
    
  } catch (error) {
    console.error('❌ Cache initialization failed:');
    if (error instanceof Error) {
      console.error(error.message);
      if (error.stack) console.error(error.stack);
    }
    process.exit(1);
  }
}

initializeCache();