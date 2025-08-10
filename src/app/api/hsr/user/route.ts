import { StarRail } from "starrail.js";
import { NextResponse } from "next/server";

export async function GET() {
  const TEST_UID = "800069903";
  
  try {
    const client = new StarRail({
      cacheOptions: {
        // Explicit cache path
        path: "./node_modules/starrail.js/cache" 
      }
    });

    // Initialize cache (downloads data if missing)
    await client.initialize();
    
    const user = await client.fetchUser(TEST_UID);
    return NextResponse.json(user);
    
  } catch (error: any) {
    return NextResponse.json(
      { error: "HSR API failed", details: error.message },
      { status: 500 }
    );
  }
}