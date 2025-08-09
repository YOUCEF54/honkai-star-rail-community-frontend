'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { ICharacter, ICharacterDto, ICharacterBasicInfo, ICharacterStats, ICharacterSkill, ICharacterTrace, ICharacterEidolon, ICharacterBuildRecommendation } from '@/types/character';
import type { ChangeEvent } from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion

export default function EditCharPage({ params }: { params: { name: string } }) {
  const router = useRouter();
  const [characterId, setCharacterId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<ICharacterDto, 'id' | 'basicInfo' | 'baseStats' | 'skills' | 'traces' | 'eidolons' | 'buildRecommendation'> & {
    basicInfo: Omit<ICharacterBasicInfo, 'imagePortraitUrl' | 'imageFullBodyUrl'>;
    baseStats: ICharacterStats;
    skills: ICharacterSkill[];
    traces: ICharacterTrace[];
    eidolons: ICharacterEidolon[];
    buildRecommendation: ICharacterBuildRecommendation;
  }>({
    basicInfo: {
      name: '',
      rarity: '5-star',
      path: 'Destruction',
      element: 'Physical',
      gender: '',
      affiliation: '',
      releaseDate: '',
      description: '',
    },
    baseStats: {
      hp: 0,
      atk: 0,
      def: 0,
      spd: 0,
      critRate: 0,
      critDamage: 0,
      breakEffect: 0,
      energyRegenerationRate: 0,
      effectHitRate: 0,
      effectRes: 0,
      healingBoost: 0,
      elementalDamageBoost: {},
    },
    skills: [],
    traces: [],
    eidolons: [],
    buildRecommendation: {
      recommendedLightCones: [],
      recommendedRelicSets: [],
      recommendedPlanarOrnaments: [],
      mainStatsPriority: {},
      subStatsPriority: [],
      synergisticCharacters: [],
      antiSynergisticCharacters: [],
      buildNotes: '',
      ascensionMaterials: [], // New
      traceMaterials: [], // New
    },
  });

  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);

  // Image processing states and refs (for display, not for upload in this version)
  const [currentImagePortraitUrl, setCurrentImagePortraitUrl] = useState<string | null>(null);
  const [currentImageFullBodyUrl, setCurrentImageFullBodyUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCharacterData() {
      setLoading(true);
      setErr('');
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
        const encodedName = encodeURIComponent(params.name);
        const res = await fetch(`${apiUrl}/api/characters?name=${encodedName}`);

        if (!res.ok) {
          throw new Error(`Failed to fetch character: ${res.statusText}`);
        }

        const chars: ICharacter[] = await res.json();
        const char = chars.find(c => c.basicInfo.name.toLowerCase().replace(/\s+/g, '-') === params.name.toLowerCase());

        if (!char) {
          throw new Error('Character not found.');
        }

        setCharacterId(char.id ? parseInt(char.id) : null); // Ensure ID is a number
        setFormData({
          basicInfo: {
            name: char.basicInfo.name,
            rarity: char.basicInfo.rarity,
            path: char.basicInfo.path,
            element: char.basicInfo.element,
            gender: char.basicInfo.gender || '',
            affiliation: char.basicInfo.affiliation || '',
            releaseDate: char.basicInfo.releaseDate || '',
            description: char.basicInfo.description || '',
          },
          baseStats: char.baseStats,
          skills: char.skills,
          traces: char.traces,
          eidolons: char.eidolons,
          buildRecommendation: char.buildRecommendation,
        });
        setCurrentImagePortraitUrl(char.basicInfo.imagePortraitUrl || null);
        setCurrentImageFullBodyUrl(char.basicInfo.imageFullBodyUrl || null);

      } catch (error: any) {
        setErr(error.message || 'An unexpected error occurred while fetching character data.');
      } finally {
        setLoading(false);
      }
    }
    fetchCharacterData();
  }, [params.name]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(''); // Clear previous errors

    if (characterId === null) {
      setErr('Character ID not found. Cannot update.');
      return;
    }

    // Basic validation for required fields
    if (!formData.basicInfo.name || !formData.basicInfo.element || !formData.basicInfo.path) {
      setErr('Basic information (name, element, path) is required.');
      return;
    }

    // Prepare data to send
    const dataToSend: ICharacterDto = {
      id: characterId, // Include the ID for the PUT request
      basicInfo: {
        ...formData.basicInfo,
        slug: formData.basicInfo.name.toLowerCase().replace(/\s+/g, '-'), // Generate slug from name
        imagePortraitUrl: currentImagePortraitUrl || '', // Use existing image URLs
        imageFullBodyUrl: currentImageFullBodyUrl || '', // Use existing image URLs
      },
      baseStats: formData.baseStats,
      skills: formData.skills,
      traces: formData.traces,
      eidolons: formData.eidolons,
      buildRecommendation: formData.buildRecommendation,
    };

    // Convert empty strings to null for optional fields in basicInfo and buildNotes
    if (dataToSend.basicInfo.gender === '') dataToSend.basicInfo.gender = null;
    if (dataToSend.basicInfo.affiliation === '') dataToSend.basicInfo.affiliation = null;
    if (dataToSend.basicInfo.releaseDate === '') dataToSend.basicInfo.releaseDate = null;
    if (dataToSend.basicInfo.description === '') dataToSend.basicInfo.description = null;
    if (dataToSend.buildRecommendation.buildNotes === '') dataToSend.buildRecommendation.buildNotes = null;


    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
      const res = await fetch(`${apiUrl}/api/characters/${characterId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(dataToSend),
      });

      if (res.ok) {
        router.push(`/characters/${encodeURIComponent(formData.basicInfo.name.toLowerCase().replace(/\s+/g, '-'))}?refresh=${Date.now()}`);
      } else {
        const errorText = await res.text();
        setErr(`Failed to update character: ${errorText}`);
        console.error("Backend Error Response:", errorText);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErr(`An unexpected error occurred: ${error.message}`);
        console.error("Frontend caught error:", error);
      } else {
        setErr('An unexpected error occurred.');
        console.error("Frontend caught error:", error);
      }
    }
  }

  function handleBasicInfoChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        [name]: value,
      },
    }));
  }

  function handleStatsChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value, type } = event.target;
    setFormData((prev) => ({
      ...prev,
      baseStats: {
        ...prev.baseStats,
        [name]: type === 'number' ? Number(value) : value,
      },
    }));
  }

  function handleElementalDamageBoostChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    const { value } = event.target;
    try {
      const parsed = value.trim() === '' ? {} : JSON.parse(value);
      setFormData((prev) => ({
        ...prev,
        baseStats: {
          ...prev.baseStats,
          elementalDamageBoost: parsed,
        },
      }));
      setErr('');
    } catch {
      setErr('Elemental Damage Boost must be valid JSON.');
    }
  }

  function handleArrayFieldChange(e: ChangeEvent<HTMLTextAreaElement>, field: 'skills' | 'traces' | 'eidolons'): void {
    try {
      const value = e.target.value.trim();
      const parsed = value === '' ? [] : JSON.parse(value);
      setFormData((prev) => ({
        ...prev,
        [field]: parsed,
      }));
      setErr('');
    } catch {
      setErr(`${field.charAt(0).toUpperCase() + field.slice(1)} must be valid JSON array.`);
    }
  }

  function handleBuildRecommendationChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    const { name, value } = event.target;
    setErr('');
    try {
      const parsedValue: string | object | unknown[] = value.trim() === '' ? (name === 'buildNotes' ? '' : (name === 'mainStatsPriority' ? {} : [])) : JSON.parse(value);
      setFormData((prev) => ({
        ...prev,
        buildRecommendation: {
          ...prev.buildRecommendation,
          [name]: name === 'buildNotes' ? value : parsedValue,
        },
      }));
    } catch {
      setErr(
        name === 'mainStatsPriority'
          ? 'Main Stats Priority must be valid JSON object.'
          : name === 'buildNotes'
          ? ''
          : `${name.replace(/([A-Z])/g, ' $1')} must be valid JSON.`
      );
    }
  }

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1, // Stagger children animations by 0.1 seconds
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 to-black text-gray-300">
        <p className="text-xl animate-pulse">Loading character data...</p>
      </main>
    );
  }

  if (err && !loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 to-black text-red-500">
        <p className="text-xl bg-red-900/40 p-4 rounded-lg shadow-lg">Error: {err}</p>
      </main>
    );
  }

  return (
    <motion.main
      className="m-8 mx-auto max-w-4xl relative z-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background overlay for subtle effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-transparent to-purple-950/20 opacity-50 -z-10"></div>

      <motion.h1
        className="text-4xl font-extrabold text-center text-indigo-300 mb-10 tracking-wide drop-shadow-lg"
        variants={itemVariants}
      >
        Edit Character: <span className="text-purple-300">{formData.basicInfo.name}</span>
      </motion.h1>

      <form onSubmit={submit} className="space-y-8 p-8 bg-gray-900/70 rounded-3xl shadow-2xl backdrop-blur-sm border border-gray-800">

        {/* Basic Info */}
        <motion.section
          className="space-y-6 pb-6 border-b border-indigo-700/50"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-semibold text-indigo-400 flex items-center gap-2">
            <svg className="w-6 h-6 text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
            Basic Information
          </h2>
          <input className="input-field" name="name" placeholder="Name" value={formData.basicInfo.name} onChange={handleBasicInfoChange} required />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select className="input-field" name="rarity" value={formData.basicInfo.rarity} onChange={handleBasicInfoChange} required>
              <option value="4-star">4-star</option>
              <option value="5-star">5-star</option>
            </select>
            <select className="input-field" name="path" value={formData.basicInfo.path} onChange={handleBasicInfoChange} required>
              <option value="Destruction">Destruction</option>
              <option value="Hunt">Hunt</option>
              <option value="Harmony">Harmony</option>
              <option value="Nihility">Nihility</option>
              <option value="Preservation">Preservation</option>
              <option value="Abundance">Abundance</option>
              <option value="Erudition">Erudition</option>
            </select>
            <select className="input-field" name="element" value={formData.basicInfo.element} onChange={handleBasicInfoChange} required>
              <option value="Physical">Physical</option>
              <option value="Fire">Fire</option>
              <option value="Ice">Ice</option>
              <option value="Lightning">Lightning</option>
              <option value="Wind">Wind</option>
              <option value="Quantum">Quantum</option>
              <option value="Imaginary">Imaginary</option>
            </select>
            <input className="input-field" name="gender" placeholder="Gender" value={formData.basicInfo.gender} onChange={handleBasicInfoChange} />
            <input className="input-field" name="affiliation" placeholder="Affiliation" value={formData.basicInfo.affiliation} onChange={handleBasicInfoChange} />
            <input className="input-field" name="releaseDate" type="date" placeholder="Release Date" value={formData.basicInfo.releaseDate} onChange={handleBasicInfoChange} />
          </div>
          <textarea className="input-field" name="description" placeholder="Description" value={formData.basicInfo.description} onChange={handleBasicInfoChange} rows={4}></textarea>
        </motion.section>

        {/* Current Images (display only) */}
        <motion.section
          className="space-y-6 pb-6 border-b border-indigo-700/50"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-semibold text-indigo-400 flex items-center gap-2">
            <svg className="w-6 h-6 text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-4 4 4 4-4V5h-2l-4 4-4-4H4v10z" clipRule="evenodd"></path></svg>
            Current Images (Display Only)
          </h2>
          <p className="text-sm text-gray-400">Image updates are not supported on this page. Please use the scraping tool for image updates or implement a separate image upload feature.</p>
          <div className="flex flex-wrap gap-6 justify-center">
            {currentImagePortraitUrl && (
              <div className="text-center bg-gray-800/50 p-3 rounded-lg shadow-inner border border-gray-700">
                <p className="text-gray-400 text-sm mb-2 font-medium">Portrait</p>
                <img src={currentImagePortraitUrl} alt="Portrait" className="w-32 h-32 object-cover rounded-full border-4 border-indigo-600 shadow-lg shadow-indigo-500/30" />
              </div>
            )}
            {currentImageFullBodyUrl && (
              <div className="text-center bg-gray-800/50 p-3 rounded-lg shadow-inner border border-gray-700">
                <p className="text-gray-400 text-sm mb-2 font-medium">Full Body</p>
                <img src={currentImageFullBodyUrl} alt="Full Body" className="w-48 h-64 object-cover rounded-lg border-4 border-purple-600 shadow-lg shadow-purple-500/30" />
              </div>
            )}
            {(!currentImagePortraitUrl && !currentImageFullBodyUrl) && (
              <p className="text-gray-400 text-lg">No images available.</p>
            )}
          </div>
        </motion.section>

        {/* Base Stats */}
        <motion.section
          className="space-y-6 pb-6 border-b border-indigo-700/50"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-semibold text-indigo-400 flex items-center gap-2">
            <svg className="w-6 h-6 text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 9a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zm3 5a1 1 0 000 2h6a1 1 0 100-2H7z"></path></svg>
            Base Stats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input className="input-field" name="hp" type="number" placeholder="HP" value={formData.baseStats.hp} onChange={handleStatsChange} />
            <input className="input-field" name="atk" type="number" placeholder="ATK" value={formData.baseStats.atk} onChange={handleStatsChange} />
            <input className="input-field" name="def" type="number" placeholder="DEF" value={formData.baseStats.def} onChange={handleStatsChange} />
            <input className="input-field" name="spd" type="number" placeholder="SPD" value={formData.baseStats.spd} onChange={handleStatsChange} />
            <input className="input-field" name="critRate" type="number" step="0.01" placeholder="Crit Rate (e.g., 0.05)" value={formData.baseStats.critRate} onChange={handleStatsChange} />
            <input className="input-field" name="critDamage" type="number" step="0.01" placeholder="Crit Damage (e.g., 0.50)" value={formData.baseStats.critDamage} onChange={handleStatsChange} />
            <input className="input-field" name="breakEffect" type="number" step="0.01" placeholder="Break Effect" value={formData.baseStats.breakEffect} onChange={handleStatsChange} />
            <input className="input-field" name="energyRegenerationRate" type="number" step="0.01" placeholder="Energy Regeneration Rate" value={formData.baseStats.energyRegenerationRate} onChange={handleStatsChange} />
            <input className="input-field" name="effectHitRate" type="number" step="0.01" placeholder="Effect Hit Rate" value={formData.baseStats.effectHitRate} onChange={handleStatsChange} />
            <input className="input-field" name="effectRes" type="number" step="0.01" placeholder="Effect RES" value={formData.baseStats.effectRes} onChange={handleStatsChange} />
            <input className="input-field" name="healingBoost" type="number" step="0.01" placeholder="Healing Boost" value={formData.baseStats.healingBoost} onChange={handleStatsChange} />
          </div>
          <textarea
            className="input-field"
            name="elementalDamageBoost"
            placeholder="Elemental Damage Boost (JSON: {'Element': Value})"
            value={JSON.stringify(formData.baseStats.elementalDamageBoost, null, 2)}
            onChange={handleElementalDamageBoostChange}
            rows={3}
          ></textarea>
        </motion.section>

        {/* Skills */}
        <motion.section
          className="space-y-6 pb-6 border-b border-indigo-700/50"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-semibold text-indigo-400 flex items-center gap-2">
            <svg className="w-6 h-6 text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd"></path></svg>
            Skills (JSON Array)
          </h2>
          <textarea
            className="input-field"
            name="skills"
            placeholder="[{'type': 'Basic Attack', 'name': '...', 'description': '...', 'iconUrl': '...', 'scaling': ['...']}]"
            value={JSON.stringify(formData.skills, null, 2)}
            onChange={(e) => handleArrayFieldChange(e, 'skills')}
            rows={8}
          ></textarea>
        </motion.section>

        {/* Traces */}
        <motion.section
          className="space-y-6 pb-6 border-b border-indigo-700/50"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-semibold text-indigo-400 flex items-center gap-2">
            <svg className="w-6 h-6 text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 000-2H7zm3 0a1 1 0 000 2h.01a1 1 0 000-2H10zm3 0a1 1 0 000 2h.01a1 1 0 000-2H13zm-3 4a1 1 0 000 2h.01a1 1 0 000-2H10z" clipRule="evenodd"></path></svg>
            Traces (JSON Array)
          </h2>
          <textarea
            className="input-field"
            name="traces"
            placeholder="[{'name': '...', 'description': '...', 'iconUrl': '...', 'statBoost': '...'}]"
            value={JSON.stringify(formData.traces, null, 2)}
            onChange={(e) => handleArrayFieldChange(e, 'traces')}
            rows={6}
          ></textarea>
        </motion.section>

        {/* Eidolons */}
        <motion.section
          className="space-y-6 pb-6 border-b border-indigo-700/50"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-semibold text-indigo-400 flex items-center gap-2">
            <svg className="w-6 h-6 text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414L10 3.586l4.707 4.707a1 1 0 01-1.414 1.414L10 6.414 6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path><path fillRule="evenodd" d="M10 16a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1z" clipRule="evenodd"></path></svg>
            Eidolons (JSON Array)
          </h2>
          <textarea
            className="input-field"
            name="eidolons"
            placeholder="[{'level': 1, 'name': '...', 'description': '...', 'iconUrl': '...'}]"
            value={JSON.stringify(formData.eidolons, null, 2)}
            onChange={(e) => handleArrayFieldChange(e, 'eidolons')}
            rows={6}
          ></textarea>
        </motion.section>

        {/* Build Recommendation */}
        <motion.section
          className="space-y-6"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-semibold text-indigo-400 flex items-center gap-2">
            <svg className="w-6 h-6 text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.3-.837-2.918.668-2.03 2.03a1.532 1.532 0 01-.947 2.285c-1.56.38-1.56 2.6 0 2.98a1.532 1.532 0 01.948 2.286c-.837 1.3.668 2.919 2.03 2.03a1.532 1.532 0 012.285.947c.38 1.56 2.6 1.56 2.98 0a1.532 1.532 0 012.286-.948c1.3.837 2.918-.668 2.03-2.03a1.532 1.532 0 01.947-2.285c1.56-.38 1.56-2.6 0-2.98a1.532 1.532 0 01-.948-2.286c.837-1.3-.668-2.918-2.03-2.03a1.532 1.532 0 01-2.285-.947zM10 11a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
            Build Recommendation
          </h2>
          <textarea
            className="input-field"
            name="recommendedLightCones"
            placeholder="Recommended Light Cones (JSON Array)"
            value={JSON.stringify(formData.buildRecommendation.recommendedLightCones, null, 2)}
            onChange={handleBuildRecommendationChange}
            rows={3}
          ></textarea>
          <textarea
            className="input-field"
            name="recommendedRelicSets"
            placeholder="Recommended Relic Sets (JSON Array)"
            value={JSON.stringify(formData.buildRecommendation.recommendedRelicSets, null, 2)}
            onChange={handleBuildRecommendationChange}
            rows={3}
          ></textarea>
          <textarea
            className="input-field"
            name="recommendedPlanarOrnaments"
            placeholder="Recommended Planar Ornaments (JSON Array)"
            value={JSON.stringify(formData.buildRecommendation.recommendedPlanarOrnaments, null, 2)}
            onChange={handleBuildRecommendationChange}
            rows={3}
          ></textarea>
          <textarea
            className="input-field"
            name="mainStatsPriority"
            placeholder="Main Stats Priority (JSON Object: {'Slot': ['Stat1', 'Stat2']})"
            value={JSON.stringify(formData.buildRecommendation.mainStatsPriority, null, 2)}
            onChange={handleBuildRecommendationChange}
            rows={4}
          ></textarea>
          <textarea
            className="input-field"
            name="subStatsPriority"
            placeholder="Sub Stats Priority (JSON Array)"
            value={JSON.stringify(formData.buildRecommendation.subStatsPriority, null, 2)}
            onChange={handleBuildRecommendationChange}
            rows={3}
          ></textarea>
          <textarea
            className="input-field"
            name="synergisticCharacters"
            placeholder="Synergistic Characters (JSON Array)"
            value={JSON.stringify(formData.buildRecommendation.synergisticCharacters, null, 2)}
            onChange={handleBuildRecommendationChange}
            rows={3}
          ></textarea>
          <textarea
            className="input-field"
            name="antiSynergisticCharacters"
            placeholder="Anti-Synergistic Characters (JSON Array)"
            value={JSON.stringify(formData.buildRecommendation.antiSynergisticCharacters, null, 2)}
            onChange={handleBuildRecommendationChange}
            rows={3}
          ></textarea>
          <textarea
            className="input-field"
            name="buildNotes"
            placeholder="Build Notes"
            value={formData.buildRecommendation.buildNotes}
            onChange={handleBuildRecommendationChange}
            rows={4}
          ></textarea>
          <textarea
            className="input-field"
            name="ascensionMaterials"
            placeholder="Ascension Materials (JSON Array)"
            value={JSON.stringify(formData.buildRecommendation.ascensionMaterials, null, 2)}
            onChange={handleBuildRecommendationChange}
            rows={3}
          ></textarea>
          <textarea
            className="input-field"
            name="traceMaterials"
            placeholder="Trace Materials (JSON Array)"
            value={JSON.stringify(formData.buildRecommendation.traceMaterials, null, 2)}
            onChange={handleBuildRecommendationChange}
            rows={3}
          ></textarea>
        </motion.section>

        {err && <p className="text-red-400 bg-red-900/40 p-3 rounded-md text-sm shadow-inner">{err}</p>}

        <motion.button
          type="submit"
          className="btn-submit w-full"
          whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(99, 102, 241, 0.7)" }} // Enhanced hover effect
          whileTap={{ scale: 0.98 }} // Click effect
          transition={{ type: "spring", stiffness: 400, damping: 10 }} // Smooth spring transition
        >
          Save Changes
        </motion.button>
      </form>

      {/* Tailwind Custom Styles (can be moved to global.css if preferred) */}
      <style jsx>{`
        .input-field {
          @apply w-full p-3 rounded-lg bg-gray-800/70 text-gray-100 border border-gray-700
                 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                 placeholder-gray-500 shadow-sm transition-all duration-300;
        }
        .input-field:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.5); /* indigo-500 with 50% opacity */
        }
        .btn-submit {
          @apply bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold
                 py-3 px-6 rounded-lg shadow-lg hover:shadow-xl
                 transition-all duration-300 transform hover:-translate-y-0.5
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500;
        }
      `}</style>
    </motion.main>
  );
}
