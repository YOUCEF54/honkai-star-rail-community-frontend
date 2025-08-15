// // src/app/characters/[name]/page.tsx
// import Image from 'next/image';
// import type { ICharacter } from '@/types/character';
// import { cookies } from 'next/headers';

// /**
//  * Server-side fetcher to get a single character by name.
//  * It handles authentication by forwarding the JWT token from the cookie.
//  */
// async function fetchCharacterByNameServer(characterName: string): Promise<ICharacter> {
//   const cookieHeader = cookies().toString();
//   const tokenMatch = cookieHeader.match(/token=([^;]+)/);
//   const token = tokenMatch ? tokenMatch[1] : null;

//   const headers: HeadersInit = {
//     'cache-control': 'no-store',
//     'content-type': 'application/json'
//   };

//   if (token) {
//     headers['Authorization'] = `Bearer ${token}`;
//   } else {
//     // If no token is found, we assume the user is not logged in.
//     // This could be a good place to redirect to a login page or throw a specific error.
//     console.error('Authentication token not found in cookies.');
//     // The backend will likely return a 401 Unauthorized, which is handled below.
//   }

//   const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
//   const encodedName = encodeURIComponent(characterName);
//   const res = await fetch(`${apiUrl}/api/characters?name=${encodedName}`, {
//     headers: headers,
//     cache: 'no-store', // Ensures fresh data on each server-side render
//   });

//   if (res.status === 404) {
//     throw new Error('Character not found.');
//   }

//   if (!res.ok) {
//     const errorText = await res.text();
//     console.error(`Backend error fetching character (${res.status}):`, errorText);
//     throw new Error(`Failed to fetch character data: ${res.status}: ${errorText}`);
//   }

//   const chars: ICharacter[] = await res.json();
//   const char = chars[0];

//   if (!char) {
//     throw new Error('Character not found.');
//   }

//   return char;
// }

// export default async function CharacterPage({ params, searchParams }: { params: { name: string }, searchParams: { demo?: string } }) {
//   const isDemoMode = searchParams.demo === 'true';

//   let char: ICharacter | undefined;
//   let error: string | null = null;

//   try {

//       // Fetch from the authenticated backend API
//       char = await fetchCharacterByNameServer(params.name);
//   } catch (e: any) {
//     error = e.message;
//     console.error(`Error in CharacterPage:`, e);
//   }

//   if (error) {
//     return <p className="m-4 text-red-500 text-center font-bold">{error}</p>;
//   }

//   if (!char) {
//     return <p className="m-4 text-red-500 text-center font-bold">Character data could not be loaded.</p>;
//   }

//   return (
//     <main className="m-8 mx-auto max-w-5xl space-y-8 p-6 bg-gray-900/60 rounded-xl shadow-lg text-gray-200 border border-gray-800">
//       {/* Character Header Section: Name, Rarity, Path, Element, and Full Body Image */}
//       <section className="flex flex-col md:flex-row gap-8 items-center md:items-start p-4 bg-gray-800/50 rounded-lg shadow-inner border border-gray-700">
//         <div className="flex-grow space-y-3 text-center md:text-left">
//           <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-300 leading-tight">
//             {char.name}
//           </h1>
//           <p className="text-lg text-gray-300">
//             <strong>Rarity:</strong> {char.stars} {Array.from({ length: char.stars }).map((_, i) => (
//               <span key={i} className="text-amber-400">★</span>
//             ))}
//           </p>
//           <p className="text-lg text-gray-300"><strong>Path:</strong> {char.path}</p>
//           <p className="text-lg text-gray-300"><strong>Element:</strong> {char.combatType}</p>
//           {char.story && <p className="text-base text-gray-300 mt-4" dangerouslySetInnerHTML={{__html: char.story}}/>}
//         </div>
//         {char.splashCutInFigureImage && (
//           <div className="flex-shrink-0 w-full md:w-1/3 lg:w-1/4   bg-red-600 lmax-w-[300px]">
//             <Image
//               src={char.splashCutInFigureImage}
//               alt={char.name || 'Character Full Body Image'}
//               width={500} // Adjust width as needed for full body image
//               height={400} // Adjust height as needed
//               className="rounded-xl object-cover"
//               priority // Prioritize loading the main character image
//             />
//           </div>
//         )}
//       </section>

//       {/* Base Stats Section */}
//       {/* <section className="space-y-4 pt-6 border-t border-gray-700">
//         <h2 className="text-3xl font-bold text-indigo-300 mb-4">Base Stats (Level 80)</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
//             <p className="font-semibold text-gray-100">HP:</p>
//             <p className="text-lg text-indigo-200">{char.baseStats?.hp}</p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
//             <p className="font-semibold text-gray-100">ATK:</p>
//             <p className="text-lg text-indigo-200">{char.baseStats?.atk}</p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
//             <p className="font-semibold text-gray-100">DEF:</p>
//             <p className="text-lg text-indigo-200">{char.baseStats?.def}</p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
//             <p className="font-semibold text-gray-100">SPD:</p>
//             <p className="text-lg text-indigo-200">{char.baseStats?.spd}</p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
//             <p className="font-semibold text-gray-100">Crit Rate:</p>
//             <p className="text-lg text-indigo-200">{((char.baseStats?.critRate || 0) * 100).toFixed(2)}%</p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
//             <p className="font-semibold text-gray-100">Crit Damage:</p>
//             <p className="text-lg text-indigo-200">{((char.baseStats?.critDamage || 0) * 100).toFixed(2)}%</p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
//             <p className="font-semibold text-gray-100">Break Effect:</p>
//             <p className="text-lg text-indigo-200">{((char.baseStats?.breakEffect || 0) * 100).toFixed(2)}%</p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
//             <p className="font-semibold text-gray-100">Energy Regen Rate:</p>
//             <p className="text-lg text-indigo-200">{((char.baseStats?.energyRegenerationRate || 0) * 100).toFixed(2)}%</p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
//             <p className="font-semibold text-gray-100">Effect Hit Rate:</p>
//             <p className="text-lg text-indigo-200">{((char.baseStats?.effectHitRate || 0) * 100).toFixed(2)}%</p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
//             <p className="font-semibold text-gray-100">Effect RES:</p>
//             <p className="text-lg text-indigo-200">{((char.baseStats?.effectRes || 0) * 100).toFixed(2)}%</p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
//             <p className="font-semibold text-gray-100">Healing Boost:</p>
//             <p className="text-lg text-indigo-200">{((char.baseStats?.healingBoost || 0) * 100).toFixed(2)}%</p>
//           </div>
//           {char.baseStats?.elementalDamageBoost && Object.entries(char.baseStats.elementalDamageBoost).map(([element, boost]) => (
//             <div key={element} className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
//               <p className="font-semibold text-gray-100">{element} DMG Boost:</p>
//               <p className="text-lg text-indigo-200">{((boost as number) * 100).toFixed(2)}%</p>
//             </div>
//           ))}
//         </div>
//       </section> */}

//       {/* Skills Section */}
//       {char.skills && char.skills.length > 0 && (
//         <section className="space-y-4 pt-6 border-t border-gray-700">
//           <h2 className="text-3xl font-bold text-indigo-300 mb-4">Skills</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {char.skills.map((skill, index) => (
//               <div key={index} className="bg-gray-800 p-5 rounded-lg shadow-md border border-purple-700/50">
//                 <h3 className="text-xl font-semibold text-gray-100 flex items-center gap-3 mb-2">
//                   {skill.icon && (
//                     <Image
//                       src={skill.icon || "/star-lc.png"}
//                       alt={skill.name || "Skill Icon"}
//                       width={40}
//                       height={40}
//                       className="rounded-full border-2 border-purple-500 bg-gray-700 p-1"
//                     />
//                   )}
//                   {skill.name} <span className="text-base font-normal text-purple-300">({skill.type?.effectType})</span>
//                 </h3>
//                 <p className="text-gray-300 leading-relaxed">{skill.description}</p>
//                 {/* {skill.scaling && skill.scaling.length > 0 && (
//                   <div className="mt-4 p-3 bg-gray-700/40 rounded-md border border-gray-600">
//                     <p className="font-medium text-gray-400 mb-1">Scaling:</p>
//                     <ul className="list-disc list-inside ml-4 text-gray-300 text-sm">
//                       {skill.scaling.map((scale, i) => <li key={i}>{scale}</li>)}
//                     </ul>
//                   </div>
//                 )} */}
//               </div>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* Traces Section */}
//       {/* {char.traces && char.traces.length > 0 && (
//         <section className="space-y-4 pt-6 border-t border-gray-700">
//           <h2 className="text-3xl font-bold text-indigo-300 mb-4">Traces</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {char.traces.map((trace, index) => (
//               <div key={index} className="bg-gray-800 p-5 rounded-lg shadow-md border border-blue-700/50">
//                 <h3 className="text-xl font-semibold text-gray-100 flex items-center gap-3 mb-2">
//                   {trace.iconUrl && (
//                     <Image
//                       src={trace.iconUrl}
//                       alt={trace.name}
//                       width={32}
//                       height={32}
//                       className="rounded-full border-2 border-blue-500 bg-gray-700 p-1"
//                     />
//                   )}
//                   {trace.name}
//                 </h3>
//                 <p className="text-gray-300 leading-relaxed">{trace.description}</p>
//                 {trace.statBoost && (
//                   <p className="font-medium text-blue-300 mt-2">Boost: {trace.statBoost}</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         </section>
//       )} */}

//       {/* Eidolons Section */}
//       {char.eidolons && char.eidolons.length > 0 && (
//         <section className="space-y-4 pt-6 border-t border-gray-700">
//           <h2 className="text-3xl font-bold text-indigo-300 mb-4">Eidolons</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {char.eidolons.map((eidolon, index) => (
//               <div key={index} className="bg-gray-800 p-5 rounded-lg shadow-md border border-teal-700/50">
//                 <h3 className="text-xl font-semibold text-gray-100 flex items-center gap-3 mb-2">
//                   {eidolon.icon && (
//                     <Image
//                       src={eidolon.icon || "/star-lc.png"}
//                       alt={eidolon.name || "Eidolon Icon"}
//                       width={32}
//                       height={32}
//                       className="rounded-full border-2 border-teal-500 bg-gray-700 p-1"
//                     />
//                   )}
//                   E{index+1}: {eidolon.name}
//                 </h3>
//                 <p className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{__html: eidolon.description || "No description available"}}></p>
//                 {/* <HTMLRenderer html={eidolon.description ||"eidolonn description"} /> */}

//               </div>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* Build Recommendation Section
//       {char.buildRecommendation && (
//         <section className="space-y-4 pt-6 border-t border-gray-700">
//           <h2 className="text-3xl font-bold text-indigo-300 mb-4">Build Recommendation</h2>
//           <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-5 border border-orange-700/50">
//             {char.buildRecommendation.recommendedLightCones && char.buildRecommendation.recommendedLightCones.length > 0 && (
//               <div>
//                 <h3 className="font-semibold text-gray-100 text-xl mb-2">Recommended Light Cones:</h3>
//                 <ul className="list-disc list-inside ml-4 text-gray-300 space-y-1">
//                   {char.buildRecommendation.recommendedLightCones.map((lc, i) => <li key={i}>{lc}</li>)}
//                 </ul>
//               </div>
//             )}
//             {char.buildRecommendation.recommendedRelicSets && char.buildRecommendation.recommendedRelicSets.length > 0 && (
//               <div>
//                 <h3 className="font-semibold text-gray-100 text-xl mb-2">Recommended Relic Sets:</h3>
//                 <ul className="list-disc list-inside ml-4 text-gray-300 space-y-1">
//                   {char.buildRecommendation.recommendedRelicSets.map((rs, i) => <li key={i}>{rs}</li>)}
//                 </ul>
//               </div>
//             )}
//             {char.buildRecommendation.recommendedPlanarOrnaments && char.buildRecommendation.recommendedPlanarOrnaments.length > 0 && (
//               <div>
//                 <h3 className="font-semibold text-gray-100 text-xl mb-2">Recommended Planar Ornaments:</h3>
//                 <ul className="list-disc list-inside ml-4 text-gray-300 space-y-1">
//                   {char.buildRecommendation.recommendedPlanarOrnaments.map((po, i) => <li key={i}>{po}</li>)}
//                 </ul>
//               </div>
//             )}
//             {char.buildRecommendation.mainStatsPriority && Object.keys(char.buildRecommendation.mainStatsPriority).length > 0 && (
//               <div>
//                 <h3 className="font-semibold text-gray-100 text-xl mb-2">Main Stats Priority:</h3>
//                 <ul className="list-disc list-inside ml-4 text-gray-300 space-y-1">
//                   {Object.entries(char.buildRecommendation.mainStatsPriority).map(([slot, stats], i) => (
//                     <li key={i}><strong>{slot}:</strong> {stats.join(', ')}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//             {char.buildRecommendation.subStatsPriority && char.buildRecommendation.subStatsPriority.length > 0 && (
//               <div>
//                 <h3 className="font-semibold text-gray-100 text-xl mb-2">Sub Stats Priority:</h3>
//                 <ul className="list-disc list-inside ml-4 text-gray-300 space-y-1">
//                   {char.buildRecommendation.subStatsPriority.map((ss, i) => <li key={i}>{ss}</li>)}
//                 </ul>
//               </div>
//             )}
//             {char.buildRecommendation.synergisticCharacters && char.buildRecommendation.synergisticCharacters.length > 0 && (
//               <div>
//                 <h3 className="font-semibold text-gray-100 text-xl mb-2">Synergistic Characters:</h3>
//                 <ul className="list-disc list-inside ml-4 text-gray-300 space-y-1">
//                   {char.buildRecommendation.synergisticCharacters.map((sc, i) => <li key={i}>{sc}</li>)}
//                 </ul>
//               </div>
//             )}
//             {char.buildRecommendation.antiSynergisticCharacters && char.buildRecommendation.antiSynergisticCharacters.length > 0 && (
//               <div>
//                 <h3 className="font-semibold text-gray-100 text-xl mb-2">Anti-Synergistic Characters:</h3>
//                 <ul className="list-disc list-inside ml-4 text-gray-300 space-y-1">
//                   {char.buildRecommendation.antiSynergisticCharacters.map((asc, i) => <li key={i}>{asc}</li>)}
//                 </ul>
//               </div>
//             )}
//             {char.buildRecommendation.buildNotes && (
//               <div>
//                 <h3 className="font-semibold text-gray-100 text-xl mb-2">Build Notes:</h3>
//                 <p className="text-gray-300 ml-4 leading-relaxed">{char.buildRecommendation.buildNotes}</p>
//               </div>
//             )}
//             {char.buildRecommendation.ascensionMaterials && char.buildRecommendation.ascensionMaterials.length > 0 && (
//               <div>
//                 <h3 className="font-semibold text-gray-100 text-xl mb-2">Ascension Materials:</h3>
//                 <ul className="list-disc list-inside ml-4 text-gray-300 space-y-1">
//                   {char.buildRecommendation.ascensionMaterials.map((material, i) => <li key={i}>{material}</li>)}
//                 </ul>
//               </div>
//             )}
//             {char.buildRecommendation.traceMaterials && char.buildRecommendation.traceMaterials.length > 0 && (
//               <div>
//                 <h3 className="font-semibold text-gray-100 text-xl mb-2">Trace Materials:</h3>
//                 <ul className="list-disc list-inside ml-4 text-gray-300 space-y-1">
//                   {char.buildRecommendation.traceMaterials.map((material, i) => <li key={i}>{material}</li>)}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </section>
//       )} */}
//     </main>
//   );
// }

// src/app/characters/[name]/page.tsx
import Image from 'next/image';
import type { ICharacter } from '@/types/character';
import { cookies } from 'next/headers';
import { fetchCharacterByNameServer } from '@/lib/server/character';

export default async function CharacterPage({ params, searchParams }: { params: { name: string }, searchParams: { demo?: string } }) {

  let char: ICharacter | undefined;
  let error: string | null = null;

  try {
    // Get the cookies from the request
    const cookieHeader = cookies().toString();
    // Fetch from the authenticated backend API using the new server-side utility
    char = await fetchCharacterByNameServer(params?.name, cookieHeader);
  } catch (e: any) {
    error = e.message;
    console.error(`Error in CharacterPage:`, e);
  }

  if (error) {
    return <p className="m-4 text-red-500 text-center font-bold">{error}</p>;
  }

  if (!char) {
    return <p className="m-4 text-red-500 text-center font-bold">Character data could not be loaded.</p>;
  }

  return (
    <main className="m-8 mx-auto max-w-5xl space-y-8 p-6 bg-gray-900/60 rounded-xl shadow-lg text-gray-200 border border-gray-800">
      {/* Character Header Section: Name, Rarity, Path, Element, and Full Body Image */}
      <section className="flex flex-col md:flex-row gap-8 items-center md:items-start p-4 bg-gray-800/50 rounded-lg shadow-inner border border-gray-700">
        <div className="flex-grow space-y-3 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-300 leading-tight">
            {char.name}
          </h1>
          <p className="text-lg text-gray-300">
            <strong>Rarity:</strong> {char.stars} {Array.from({ length: char.stars }).map((_, i) => (
              <span key={i} className="text-amber-400">★</span>
            ))}
          </p>
          <p className="text-lg text-gray-300"><strong>Path:</strong> {char.path}</p>
          <p className="text-lg text-gray-300"><strong>Element:</strong> {char.combatType}</p>
          {char.story && <p className="text-base text-gray-300 mt-4" dangerouslySetInnerHTML={{__html: char.story}}/>}
        </div>
        {char.splashCutInFigureImage && (
          <div className="flex-shrink-0 w-full md:w-1/3 lg:w-1/4  max-w-[300px]">
            <Image
              src={char.shopItemIcon || char.splashCutInFigureImage || "/star-lc.png"}
              alt={char.name || 'Character Full Body Image'}
              width={500} // Adjust width as needed for full body image
              height={400} // Adjust height as needed
              className="rounded-xl object-cover "
              priority // Prioritize loading the main character image
            />
          </div>
        )}
      </section>

      {/* Skills Section */}
      {char.skills && char.skills.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-gray-700">
          <h2 className="text-3xl font-bold text-indigo-300 mb-4">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {char.skills.map((skill, index) => (
              <div key={index} className="bg-gray-800 p-5 rounded-lg shadow-md border border-purple-700/50">
                <h3 className="text-xl font-semibold text-gray-100 flex items-center gap-3 mb-2">
                  {skill.icon && (
                    <Image
                      src={skill.icon || "/star-lc.png"}
                      alt={skill.name || "Skill Icon"}
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-purple-500 bg-gray-700 p-1"
                    />
                  )}
                  {skill.name} <span className="text-base font-normal text-purple-300">({skill.type?.effectType})</span>
                </h3>
                <p className="text-gray-300 leading-relaxed">{skill.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Eidolons Section */}
      {char.eidolons && char.eidolons.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-gray-700">
          <h2 className="text-3xl font-bold text-indigo-300 mb-4">Eidolons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {char.eidolons.map((eidolon, index) => (
              <div key={index} className="bg-gray-800 p-5 rounded-lg shadow-md border border-teal-700/50">
                <h3 className="text-xl font-semibold text-gray-100 flex items-center gap-3 mb-2">
                  {eidolon.icon && (
                    <Image
                      src={eidolon.icon || "/star-lc.png"}
                      alt={eidolon.name || "Eidolon Icon"}
                      width={32}
                      height={32}
                      className="rounded-full border-2 border-teal-500 bg-gray-700 p-1"
                    />
                  )}
                  E{index+1}: {eidolon.name}
                </h3>
                <p className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{__html: eidolon.description || "No description available"}}></p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
