'use client'
import React, { useMemo, useState } from 'react';
import { FilterIcon, ChevronDownIcon } from 'lucide-react';
import SearchInput from '../../../components/ui/SearchInput';
import LightConeCard from '../../../components/databank/LightConeCard';
import LightConeDetail from '../../../components/databank/LightConeDetail';
import { lightCones, paths, type LightCone } from '../../../utils/mockData';
import { useSidebar } from '@/app/context/sidebar-context';
const LightCones = () => {
    const { isExpanded, setIsExpanded } = useSidebar();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRarity, setSelectedRarity] = useState<number | null>(null);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [selectedLightCone, setSelectedLightCone] = useState<LightCone | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  // Filter light cones based on search query and filters
  const filteredLightCones = useMemo(() => {
    return lightCones.filter(lightCone => {
      const matchesSearch = lightCone.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRarity = selectedRarity === null || lightCone.rarity === selectedRarity;
      const matchesPath = selectedPath === null || lightCone.path === selectedPath;
      return matchesSearch && matchesRarity && matchesPath;
    });
  }, [searchQuery, selectedRarity, selectedPath]);
  return <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-400">Light Cones</h1>
          <p className="text-gray-400">
            Browse and learn about Light Cones in Honkai: Star Rail
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search light cones..." />
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700" onClick={() => setShowFilters(!showFilters)}>
            <FilterIcon size={18} />
            <span>Filters</span>
          </button>
        </div>
      </div>
      {showFilters && <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-auto">
              <label className="block text-sm text-gray-400 mb-1">Rarity</label>
              <div className="flex gap-2">
                {[3, 4, 5].map(rarity => <button key={rarity} className={`px-3 py-1 rounded-md ${selectedRarity === rarity ? 'bg-blue-900 text-blue-300' : 'bg-gray-700 hover:bg-gray-600'}`} onClick={() => setSelectedRarity(selectedRarity === rarity ? null : rarity)}>
                    {Array(rarity).fill('★').join('')}
                  </button>)}
              </div>
            </div>
            <div className="w-full md:w-auto">
              <label className="block text-sm text-gray-400 mb-1">Path</label>
              <div className="relative">
                <select value={selectedPath || ''} onChange={e => setSelectedPath(e.target.value || null)} className="appearance-none bg-gray-700 border border-gray-600 rounded-md px-3 py-1 pr-8 focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option value="">All Paths</option>
                  {paths.map(path => <option key={path} value={path}>
                      {path}
                    </option>)}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDownIcon size={16} />
                </div>
              </div>
            </div>
            <div className="w-full md:w-auto flex items-end">
              <button className="px-4 py-1 bg-gray-700 hover:bg-gray-600 rounded-md" onClick={() => {
            setSelectedRarity(null);
            setSelectedPath(null);
            setSearchQuery('');
          }}>
                Clear All
              </button>
            </div>
          </div>
        </div>}
      {filteredLightCones.length > 0 ? <div className={`grid max-sm:flex max-sm:flex-col max-sm:items-center grid-cols-2 mx-auto sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 ${isExpanded?"xl:grid-cols-6 ":"xl:grid-cols-5"} gap-4`}>
          {filteredLightCones.map(lightCone => <LightConeCard key={lightCone.id} lightCone={lightCone} onClick={setSelectedLightCone} />)}
        </div> : <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
          <p className="text-lg text-gray-300">
            No Light Cones found matching your search criteria.
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md" onClick={() => {
        setSelectedRarity(null);
        setSelectedPath(null);
        setSearchQuery('');
      }}>
            Clear Filters
          </button>
        </div>}
      {selectedLightCone && <LightConeDetail lightCone={selectedLightCone} onClose={() => setSelectedLightCone(null)} />}
    </div>;
};
export default LightCones;