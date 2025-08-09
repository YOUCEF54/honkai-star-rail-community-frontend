// src/app/characters/[name]/page.tsx
import Image from 'next/image';
import type { ICharacter } from '@/types/character'; // Updated import to ICharacter

export default async function CharacterPage({ params, searchParams }: { params: { name: string }, searchParams: { demo?: string } }) {
  const isDemoMode = searchParams.demo === 'true';

  let char: ICharacter | undefined;
  let error: string | null = null;

  if (isDemoMode) {
    try {
      // Load from local JSON file in demo mode
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/sample-characters.json`, {
        next: { revalidate: 60 }, // cache for 60s
      });

      if (!res.ok) {
        throw new Error(`Failed to load sample data: ${res.statusText}`);
      }
      const chars: ICharacter[] = await res.json();
      const normalizedParamName = params.name.toLowerCase().replace(/\s+/g, '-');
      char = chars.find(c => c.basicInfo.name.toLowerCase().replace(/\s+/g, '-') === normalizedParamName);

      if (!char) {
        error = 'Character not found in sample data.';
      }
    } catch (e: any) {
      error = `Error loading sample data: ${e.message}`;
      console.error(error);
    }
  } else {
    // Original logic: fetch from backend API
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
      const encodedName = encodeURIComponent(params.name);
      const res = await fetch(`${apiUrl}/api/characters?name=${encodedName}`, {
        next: { revalidate: 60 }, // cache for 60s
      });

      if (!res.ok) {
        if (res.status === 404) {
          error = 'Character not found.';
        } else {
          error = `Failed to fetch character data: ${res.statusText}`;
        }
      } else {
        const chars: ICharacter[] = await res.json();
        const normalizedParamName = params.name.toLowerCase().replace(/\s+/g, '-');
        char = chars.find(c => c.basicInfo.name.toLowerCase().replace(/\s+/g, '-') === normalizedParamName);

        if (!char) {
          error = 'Character not found.';
        }
      }
    } catch (e: any) {
      error = `An unexpected error occurred while fetching character data: ${e.message}`;
      console.error(error);
    }
  }

  if (error) {
    return <p className="m-4 text-red-500">{error}</p>;
  }

  if (!char) {
    return <p className="m-4 text-red-500">Character data could not be loaded.</p>;
  }

  return (
    <main className="m-8 mx-auto max-w-5xl space-y-8 p-6 bg-gray-900/60 rounded-xl shadow-lg text-gray-200 border border-gray-800">
      {/* Character Header Section: Name, Rarity, Path, Element, and Full Body Image */}
      <section className="flex flex-col md:flex-row gap-8 items-center md:items-start p-4 bg-gray-800/50 rounded-lg shadow-inner border border-gray-700">
        {!char.basicInfo.imageFullBodyUrl && (
          <div className="flex-shrink-0 w-full md:w-1/3 lg:w-1/4 max-w-[300px]">
            <Image
              // src={char.basicInfo.imageFullBodyUrl}
              src={`/images/${char.basicInfo.name}-fullbody.webp`}
              alt={char.basicInfo.name}
              width={300} // Adjust width as needed for full body image
              height={400} // Adjust height as needed
              className="rounded-xl object-cover "
              priority // Prioritize loading the main character image
            />
          </div>
        )}
        <div className="flex-grow space-y-3 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-300 leading-tight">
            {char.basicInfo.name}
          </h1>
          <p className="text-lg text-gray-300">
            <strong>Rarity:</strong> {char.basicInfo.rarity} {Array.from({ length: parseInt(char.basicInfo.rarity.charAt(0)) }).map((_, i) => (
              <span key={i} className="text-amber-400">★</span>
            ))}
          </p>
          <p className="text-lg text-gray-300"><strong>Path:</strong> {char.basicInfo.path}</p>
          <p className="text-lg text-gray-300"><strong>Element:</strong> {char.basicInfo.element}</p>
          {char.basicInfo.gender && <p className="text-lg text-gray-300"><strong>Gender:</strong> {char.basicInfo.gender}</p>}
          {char.basicInfo.affiliation && <p className="text-lg text-gray-300"><strong>Affiliation:</strong> {char.basicInfo.affiliation}</p>}
          {char.basicInfo.releaseDate && <p className="text-lg text-gray-300"><strong>Release Date:</strong> {char.basicInfo.releaseDate}</p>}
          {char.basicInfo.description && <p className="text-base text-gray-300 mt-4">{char.basicInfo.description}</p>}
        </div>
      </section>

      {/* Base Stats Section */}
      <section className="space-y-4 pt-6 border-t border-gray-700">
        <h2 className="text-3xl font-bold text-indigo-300 mb-4">Base Stats (Level 80)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Individual stat cards for better visual separation */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
            <p className="font-semibold text-gray-100">HP:</p>
            <p className="text-lg text-indigo-200">{char.baseStats.hp}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
            <p className="font-semibold text-gray-100">ATK:</p>
            <p className="text-lg text-indigo-200">{char.baseStats.atk}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
            <p className="font-semibold text-gray-100">DEF:</p>
            <p className="text-lg text-indigo-200">{char.baseStats.def}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
            <p className="font-semibold text-gray-100">SPD:</p>
            <p className="text-lg text-indigo-200">{char.baseStats.spd}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
            <p className="font-semibold text-gray-100">Crit Rate:</p>
            <p className="text-lg text-indigo-200">{(char.baseStats.critRate * 100).toFixed(2)}%</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
            <p className="font-semibold text-gray-100">Crit Damage:</p>
            <p className="text-lg text-indigo-200">{(char.baseStats.critDamage * 100).toFixed(2)}%</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
            <p className="font-semibold text-gray-100">Break Effect:</p>
            <p className="text-lg text-indigo-200">{(char.baseStats.breakEffect * 100).toFixed(2)}%</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
            <p className="font-semibold text-gray-100">Energy Regen Rate:</p>
            <p className="text-lg text-indigo-200">{(char.baseStats.energyRegenerationRate * 100).toFixed(2)}%</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
            <p className="font-semibold text-gray-100">Effect Hit Rate:</p>
            <p className="text-lg text-indigo-200">{(char.baseStats.effectHitRate * 100).toFixed(2)}%</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
            <p className="font-semibold text-gray-100">Effect RES:</p>
            <p className="text-lg text-indigo-200">{(char.baseStats.effectRes * 100).toFixed(2)}%</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
            <p className="font-semibold text-gray-100">Healing Boost:</p>
            <p className="text-lg text-indigo-200">{(char.baseStats.healingBoost * 100).toFixed(2)}%</p>
          </div>
          {Object.entries(char.baseStats.elementalDamageBoost).map(([element, boost]) => (
            <div key={element} className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
              <p className="font-semibold text-gray-100">{element} DMG Boost:</p>
              <p className="text-lg text-indigo-200">{(boost * 100).toFixed(2)}%</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      {char.skills && char.skills.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-gray-700">
          <h2 className="text-3xl font-bold text-indigo-300 mb-4">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {char.skills.map((skill, index) => (
              <div key={index} className="bg-gray-800 p-5 rounded-lg shadow-md border border-purple-700/50">
                <h3 className="text-xl font-semibold text-gray-100 flex items-center gap-3 mb-2">
                  {skill.iconUrl && (
                    <Image
                      src={skill.iconUrl}
                      alt={skill.name}
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-purple-500 bg-gray-700 p-1"
                    />
                  )}
                  {skill.name} <span className="text-base font-normal text-purple-300">({skill.type})</span>
                </h3>
                <p className="text-gray-300 leading-relaxed">{skill.description}</p>
                {skill.scaling && skill.scaling.length > 0 && (
                  <div className="mt-4 p-3 bg-gray-700/40 rounded-md border border-gray-600">
                    <p className="font-medium text-gray-400 mb-1">Scaling:</p>
                    <ul className="list-disc list-inside ml-4 text-gray-300 text-sm">
                      {skill.scaling.map((scale, i) => <li key={i}>{scale}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Traces Section */}
      {char.traces && char.traces.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-gray-700">
          <h2 className="text-3xl font-bold text-indigo-300 mb-4">Traces</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {char.traces.map((trace, index) => (
              <div key={index} className="bg-gray-800 p-5 rounded-lg shadow-md border border-blue-700/50">
                <h3 className="text-xl font-semibold text-gray-100 flex items-center gap-3 mb-2">
                  {trace.iconUrl && (
                    <Image
                      src={trace.iconUrl}
                      alt={trace.name}
                      width={32}
                      height={32}
                      className="rounded-full border-2 border-blue-500 bg-gray-700 p-1"
                    />
                  )}
                  {trace.name}
                </h3>
                <p className="text-gray-300 leading-relaxed">{trace.description}</p>
                {trace.statBoost && (
                  <p className="font-medium text-blue-300 mt-2">Boost: {trace.statBoost}</p>
                )}
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
                  {eidolon.iconUrl && (
                    <Image
                      src={eidolon.iconUrl}
                      alt={eidolon.name}
                      width={32}
                      height={32}
                      className="rounded-full border-2 border-teal-500 bg-gray-700 p-1"
                    />
                  )}
                  E{eidolon.level}: {eidolon.name}
                </h3>
                <p className="text-gray-300 leading-relaxed">{eidolon.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Build Recommendation Section */}
      {char.buildRecommendation && (
        <section className="space-y-4 pt-6 border-t border-gray-700">
          <h2 className="text-3xl font-bold text-indigo-300 mb-4">Build Recommendation</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-5 border border-orange-700/50">
            {char.buildRecommendation.recommendedLightCones && char.buildRecommendation.recommendedLightCones.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-100 text-xl mb-2">Recommended Light Cones:</h3>
                <ul className="list-disc list-inside ml-4 text-gray-300 space-y-1">
                  {char.buildRecommendation.recommendedLightCones.map((lc, i) => <li key={i}>{lc}</li>)}
                </ul>
              </div>
            )}
            {char.buildRecommendation.recommendedRelicSets && char.buildRecommendation.recommendedRelicSets.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-100 text-xl mb-2">Recommended Relic Sets:</h3>
                <ul className="list-disc list-inside ml-4 text-gray-300 space-y-1">
                  {char.buildRecommendation.recommendedRelicSets.map((rs, i) => <li key={i}>{rs}</li>)}
                </ul>
              </div>
            )}
            {char.buildRecommendation.recommendedPlanarOrnaments && char.buildRecommendation.recommendedPlanarOrnaments.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-100 text-xl mb-2">Recommended Planar Ornaments:</h3>
                <ul className="list-disc list-inside ml-4 text-gray-300 space-y-1">
                  {char.buildRecommendation.recommendedPlanarOrnaments.map((po, i) => <li key={i}>{po}</li>)}
                </ul>
              </div>
            )}
            {char.buildRecommendation.mainStatsPriority && Object.keys(char.buildRecommendation.mainStatsPriority).length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-100 text-xl mb-2">Main Stats Priority:</h3>
                <ul className="list-disc list-inside ml-4 text-gray-300 space-y-1">
                  {Object.entries(char.buildRecommendation.mainStatsPriority).map(([slot, stats], i) => (
                    <li key={i}><strong>{slot}:</strong> {stats.join(', ')}</li>
                  ))}
                </ul>
              </div>
            )}
            {char.buildRecommendation.subStatsPriority && char.buildRecommendation.subStatsPriority.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-100 text-xl mb-2">Sub Stats Priority:</h3>
                <ul className="list-disc list-inside ml-4 text-gray-300 space-y-1">
                  {char.buildRecommendation.subStatsPriority.map((ss, i) => <li key={i}>{ss}</li>)}
                </ul>
              </div>
            )}
            {char.buildRecommendation.synergisticCharacters && char.buildRecommendation.synergisticCharacters.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-100 text-xl mb-2">Synergistic Characters:</h3>
                <ul className="list-disc list-inside ml-4 text-gray-300 space-y-1">
                  {char.buildRecommendation.synergisticCharacters.map((sc, i) => <li key={i}>{sc}</li>)}
                </ul>
              </div>
            )}
            {char.buildRecommendation.antiSynergisticCharacters && char.buildRecommendation.antiSynergisticCharacters.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-100 text-xl mb-2">Anti-Synergistic Characters:</h3>
                <ul className="list-disc list-inside ml-4 text-gray-300 space-y-1">
                  {char.buildRecommendation.antiSynergisticCharacters.map((asc, i) => <li key={i}>{asc}</li>)}
                </ul>
              </div>
            )}
            {char.buildRecommendation.buildNotes && (
              <div>
                <h3 className="font-semibold text-gray-100 text-xl mb-2">Build Notes:</h3>
                <p className="text-gray-300 ml-4 leading-relaxed">{char.buildRecommendation.buildNotes}</p>
              </div>
            )}
            {char.buildRecommendation.ascensionMaterials && char.buildRecommendation.ascensionMaterials.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-100 text-xl mb-2">Ascension Materials:</h3>
                <ul className="list-disc list-inside ml-4 text-gray-300 space-y-1">
                  {char.buildRecommendation.ascensionMaterials.map((material, i) => <li key={i}>{material}</li>)}
                </ul>
              </div>
            )}
            {char.buildRecommendation.traceMaterials && char.buildRecommendation.traceMaterials.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-100 text-xl mb-2">Trace Materials:</h3>
                <ul className="list-disc list-inside ml-4 text-gray-300 space-y-1">
                  {char.buildRecommendation.traceMaterials.map((material, i) => <li key={i}>{material}</li>)}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
