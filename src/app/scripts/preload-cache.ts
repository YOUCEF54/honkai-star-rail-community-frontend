import { StarRail } from "starrail.js";
import fs from "fs/promises";

async function setupCache() {
  const client = new StarRail({
    cacheOptions: {
      path: "./public/hsr_cache", // Custom cache path
      autoUpdate: true,
    },
  });

  try {
    await client.initialize();
    console.log("✅ Star Rail cache downloaded");
  } catch (error) {
    console.error("❌ Cache setup failed:", error);
  }
}

setupCache();