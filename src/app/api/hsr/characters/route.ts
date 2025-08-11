// src/app/api/hsr/characters/route.ts
// This API route fetches all available Honkai: Star Rail characters and their combat types.

import { NextResponse } from 'next/server';
import { StarRail } from 'starrail.js';
import * as fs from 'fs/promises'; // Import Node.js filesystem module

// Create a new instance of the StarRail client to interact with the API.
// We pass the cache directory directly in the constructor for a more robust configuration.
const client = new StarRail({ cacheDirectory: './cache' });

// Ensure the cache directory is set up correctly.
client.cachedAssetsManager.cacheDirectorySetup();

// A promise to handle cache initialization. This ensures it's only called once.
const cachePromise = client.cachedAssetsManager.fetchAllContents();

/**
 * Handles GET requests to fetch the list of all characters.
 * @param request The incoming request object.
 * @returns A JSON response with the character list or an error message.
 */
export async function GET(request: Request) {
    try {
        // Wait for the cache to be initialized before fetching any data.
        await cachePromise;

        // Get all characters from the cached assets.
        const allCharacters = client.getAllCharacters();

        // The filter for 'isReleased' has been removed to ensure all available character data is included.

        // ======================== LOGGING FOR DEBUGGING ========================
        // This block is for debugging purposes. It fetches a single character
        // and logs the full object to a JSON file to inspect all available data.
        // const firstCharacter = allCharacters[0];
        // if (firstCharacter) {
        //     try {
        //         // Use the same mapping logic as the final response to ensure a clean,
        //         // serializable object without circular references.
        //         const logCharacterData = {
        //             // Core Identity
        //             id: firstCharacter.id,
        //             name: firstCharacter.name?.get() || null,
        //             stars: firstCharacter.stars,
        //             path: firstCharacter.path?.name?.get() || null,
        //             combatType: firstCharacter.combatType?.name?.get() || null,
        //             isReleased: firstCharacter.isReleased,
        //             // Attributes & Biographical
        //             maxEnergy: firstCharacter.maxEnergy,
        //             level: firstCharacter.level, // May be null for a base character
        //             exp: firstCharacter.exp, // May be null for a base character
        //             story: firstCharacter?.description?.getAsFormattedText() || null,
        //             age: firstCharacter.age?.get() || null,
        //             gender: firstCharacter.gender?.get() || null,
        //             origin: firstCharacter.origin?.get() || null,
        //             birthday: firstCharacter.birthday?.get() || null,
        //             // Visual Assets
        //             icon: firstCharacter.icon?.url || null,
        //             sideIcon: firstCharacter.sideIcon?.url || null,
        //             miniIcon: firstCharacter.miniIcon?.url || null,
        //             teamActionIcon: firstCharacter.teamActionIcon?.url || null,
        //             teamWaitingIcon: firstCharacter.teamWaitingIcon?.url || null,
        //             shopItemIcon: firstCharacter.shopItemIcon?.url || null,
        //             portrait: firstCharacter.portrait?.url || null,
        //             fullImage: firstCharacter.fullImage?.url || null,
        //             splashImage: firstCharacter.splashImage?.url || null,
        //             splashCutInFigureImage: firstCharacter.splashCutInFigureImage?.url || null,
        //             splashCutInBackgroundImage: firstCharacter.splashCutInBackgroundImage?.url || null,
        //             // Skills & Traces
        //             skills: firstCharacter.skills?.map(skill => ({
        //                 id: skill.id,
        //                 name: skill.name?.get() || null,
        //                 type: skill.type?.get() || null,
        //                 description: skill.description?.get() || null,
        //                 icon: skill.icon?.url || null,
        //             })) || [],
        //             eidolons: firstCharacter.eidolons?.map(eidolon => ({
        //                 id: eidolon.id,
        //                 name: eidolon.name?.get() || null,
        //                 description: eidolon.description?.get() || null,
        //                 icon: eidolon.icon?.url || null,
        //             })) || [],
        //             skillTreeNodes: firstCharacter.skillTreeNodes?.map(node => ({
        //                 id: node.id,
        //                 name: node.name?.get() || null,
        //                 icon: node.icon?.url || null,
        //                 isUnlockedByDefault: node.isUnlockedByDefault,
        //             })) || [],
        //             lightcones: firstCharacter.recommendedLightCones?.map(lightcone => ({
        //                 id: lightcone.id,
        //                 name: lightcone.name?.get() || null,
        //                 rank: lightcone.rank || null,
        //             })) || [],
        //         };
        //         const jsonOutput = JSON.stringify(logCharacterData, null, 2);
        //         await fs.writeFile('character_data.json', jsonOutput);
        //         console.log('Successfully wrote character data to character_data.json');
        //     } catch (fileError: any) {
        //         console.error('Failed to write log file:', fileError.message);
        //     }
        // }
        // // =======================================================================

        // Map over the allCharacters array to create a clean, structured response.
        const characterList = allCharacters.map(character => {
            console.log(`Processing character hhhhhhh: ${character.description || 'Unknown'}`);
            return {
                // Core Identity
                id: character.id,
                name: character.name?.get() || null,
                stars: character.stars,
                path: character.path?.name?.get() || null,
                combatType: character.combatType?.name?.get() || null,
                isReleased: character.isReleased,
                // Attributes & Biographical
                maxEnergy: character.maxEnergy,
                // level: character.level, // May be null for a base character
                // exp: character.exp, // May be null for a base character
                story: character?.description?.toString() || null,
                age: character.age?.get() || null,
                gender: character.gender?.get() || null,
                origin: character.origin?.get() || null,
                birthday: character.birthday?.get() || null,
                // Visual Assets
                icon: character.icon?.url || null,
                sideIcon: character.sideIcon?.url || null,
                miniIcon: character.miniIcon?.url || null,
                teamActionIcon: character.teamActionIcon?.url || null,
                teamWaitingIcon: character.teamWaitingIcon?.url || null,
                shopItemIcon: character.shopItemIcon?.url || null,
                // portrait: character.portrait?.url || null,
                // fullImage: character.fullImage?.url || null,
                splashImage: character.splashImage?.url || null,
                splashCutInFigureImage: character.splashCutInFigureImage?.url || null,
                splashCutInBackgroundImage: character.splashCutInBackgroundImage?.url || null,
                // Skills & Traces
                // The `skills` array contains the character's active combat abilities.
                skills: character.skills?.map(skill => ({
                    id: skill.id,
                    name: skill.name?.get() || null,
                    type: {
                        combatType:{
                            id : skill.combatType?.id || null,
                            name : skill.combatType?.name?.get() || null,
                            descreption: skill.combatType?.description?.get() || null,
                            bigIcon: skill.combatType?.bigIcon?.url || null,
                            icon : skill.combatType?.icon?.url || null,
                            iconColor: skill.combatType?.iconColor || null,
                        },
                        effectType: skill?.effectType?.toString() || null,
                    } ,
                    icon: skill.skillIcon?.url || null,
                })) || [],
                // The `eidolons` array contains the character's eidolons.
                eidolons: character.eidolons?.map(eidolon => ({
                    id: eidolon.id,
                    name: eidolon.name?.get() || null,
                    description: eidolon.description?.get() || null,
                    icon: eidolon.icon?.url || null,
                })) || [],
                // The `skillTreeNodes` array contains the character's passive abilities and stat boosts (traces).
                skillTreeNodes: character.skillTreeNodes?.map(node => ({
                    id: node.id,
                    name: node.name?.get() || null,
                    icon: node.icon?.url || null,
                    isUnlockedByDefault: node.isUnlockedByDefault,
                })) || [],
                lightcones: character.recommendedLightCones?.map(lightcone => ({
                    id: lightcone.id,
                    name: lightcone.name?.get() || null,
                    rank: lightcone.rank || null,
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
