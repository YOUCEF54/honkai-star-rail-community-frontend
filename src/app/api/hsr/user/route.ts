// src/app/api/hsr/user/route.ts
// This API route handles fetching Honkai: Star Rail user data using the starrail.js library.

import { NextResponse } from 'next/server';
import { StarRail } from 'starrail.js';

// Create a new instance of the StarRail client to interact with the API.
// IMPORTANT: We now pass the cache directory directly in the constructor.
// This is a more robust way to ensure the library uses the correct, writable path.
const client = new StarRail({ cacheDirectory: './cache' });

// A promise to handle cache initialization. This ensures it's only called once.
const cachePromise = client.cachedAssetsManager.fetchAllContents();
console.log('StarRail.js cache initialization process started. API will be ready once this is complete.');

/**
 * Handles GET requests to fetch Honkai: Star Rail user data.
 * The UID is expected as a query parameter.
 * @param request The incoming request object.
 * @returns A JSON response with user data or an error message.
 */
export async function GET(request: Request) {
    try {
        // Wait for the cache initialization promise to resolve.
        // If the cache is already ready, this will resolve instantly.
        await cachePromise;

        // Parse the URL to get the query parameters.
        const { searchParams } = new URL(request.url);
        const uid = searchParams.get('uid');

        // Check if the UID parameter is present.
        if (!uid) {
            return NextResponse.json({ error: 'UID is a required query parameter.' }, { status: 400 });
        }

        // Call the actual library function to fetch user data for the given UID.
        // The correct method is `fetchUser`, which returns an object containing
        // all user details, including characters.
        const userData = await client.fetchUser(uid, 'en');

        // Check if the userData is valid. The library might return an empty
        // object or null if the user doesn't exist or their profile is private.
        if (!userData || !userData.characters) {
            return NextResponse.json({ error: 'Could not find user data. The UID may be invalid or the user profile is set to private.' }, { status: 404 });
        }

        // Return a successful JSON response with the fetched data.
        return NextResponse.json(userData);
    } catch (error: any) {
        // Handle any errors that occur during the fetch operation.
        // The `error.message` will give you more details about what went wrong.
        console.error('Error fetching user data:', error.message);

        // Return a 500 status with a more specific error message.
        return NextResponse.json({ error: `Failed to fetch user data. Details: ${error.message}` }, { status: 500 });
    }
}
