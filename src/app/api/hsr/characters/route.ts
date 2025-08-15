// src/app/api/hsr/characters/route.ts
// This API route fetches all available Honkai: Star Rail characters and their combat types.

import { NextResponse } from 'next/server';
import { StarRail } from 'starrail.js';

// =======================================================================
// Refactored to initialize the client and await the cache globally.
// This ensures the cache is downloaded only once when the server starts,
// making all subsequent requests fast.
// =======================================================================
const client = new StarRail({ cacheDirectory: './cache' });

// Ensure the cache directory is set up correctly.
client.cachedAssetsManager.cacheDirectorySetup();

// To ensure the data is always up to date, we must fetch the latest contents.
// This is the line that was previously commented out and is crucial for new characters.
// This call will check for updates and download new data if available.
const fetchAndCacheData = async () => {
    try {
        await client.cachedAssetsManager.fetchAllContents();
        console.log('Successfully updated Star Rail data cache.');
    } catch (error) {
        console.error('Failed to fetch and cache Star Rail data:', error);
    }
};

// We call this function on startup to have fresh data immediately.
// We will also call it within the GET request to ensure it's always fresh.
fetchAndCacheData();

/**
 * Handles GET requests to fetch the list of all characters.
 * @param request The incoming request object.
 * @returns A JSON response with the character list or an error message.
 */
export async function GET(request: Request) {
    try {
        // Ensure we have the latest data by calling the fetcher again.
        // The library handles caching, so this will only re-download if there are updates.
        await fetchAndCacheData();

        const allCharacters = client.getAllCharacters();

        // Map over the allCharacters array to create a clean, structured response.
        const characterList = allCharacters.map(character => {
            return {
                // Core Identity
                id: character.id || 0, // Ensure id is always a number
                name: character.name?.get() || "Unknown",
                stars: character.stars || 0, // Default to 0 if stars is not set
                path: character.path?.name?.get() || "Unknown",
                combatType: character.combatType?.name?.get() || "Unknown",
                // isReleased: character.isReleased,
                // Attributes & Biographical
                maxEnergy: character.maxEnergy || 0,
                story: character?.description?.get() || "No description available",
                // Visual Assets
                icon: character.icon?.url || "",
                sideIcon: character.sideIcon?.url || "",
                miniIcon: character.miniIcon?.url || "",
                teamActionIcon: character.teamActionIcon?.url || "",
                teamWaitingIcon: character.teamWaitingIcon?.url || "",
                shopItemIcon: character.shopItemIcon?.url || "",
                splashImage: character.splashImage?.url || "",
                splashCutInFigureImage: character.splashCutInFigureImage?.url || "",
                splashCutInBackgroundImage: character.splashCutInBackgroundImage?.url || "",
                // Skills & Traces
                // The `skills` array contains the character's active combat abilities.
                skills: character.skills?.map(skill => ({
                    id: skill.id,
                    name: skill.name?.get() || "Unknown",
                    type: {
                        combatType: {
                            id: skill.combatType?.id || 0,
                            name: skill.combatType?.name?.get() || "Unknown",
                            descreption: skill.combatType?.description?.get() || "Unknown",
                            bigIcon: skill.combatType?.bigIcon?.url || "",
                            icon: skill.combatType?.icon?.url || "",
                            iconColor: skill.combatType?.iconColor || 0,
                        },
                        effectType: skill?.effectType?.toString() || "Unknown",
                    },
                    icon: skill.skillIcon?.url || "",
                })) || [],
                // The `eidolons` array contains the character's eidolons.
                eidolons: character.eidolons?.map(eidolon => ({
                    id: eidolon.id || 0,
                    name: eidolon.name?.get() || "Unknown",
                    description: eidolon.description?.get() || "Unknown",
                    icon: eidolon.icon?.url || "",
                })) || [],
                // The `skillTreeNodes` array contains the character's passive abilities and stat boosts (traces).
                skillTreeNodes: character.skillTreeNodes?.map(node => ({
                    id: node.id || 0,
                    name: node.name?.get() || "Unknown",
                    icon: node.icon?.url || "",
                    isUnlockedByDefault: node.isUnlockedByDefault || false,
                })) || [],
            };
        });

        // Return a successful JSON response with the formatted list.
        return NextResponse.json(characterList);
    } catch (error: any) {
        // Handle any errors that occur during the operation.
        console.error('Error fetching character list:', error.message);

        // Return a 500 status with a more specific error message.
        return NextResponse.json({ error: `Failed to fetch character list. Details: ${error.message}` }, { status: 500 });
    }
}
