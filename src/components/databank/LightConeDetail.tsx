import React from 'react';
import type { LightCone } from '../../utils/mockData';
import { XIcon } from 'lucide-react';
interface LightConeDetailProps {
  lightCone: LightCone;
  onClose: () => void;
}
const LightConeDetail: React.FC<LightConeDetailProps> = ({
  lightCone,
  onClose
}) => {
  // Generate stars based on rarity
  const stars = Array(lightCone.rarity).fill(0);
  const pathColorClass = {
    Destruction: 'bg-red-900/60 border-red-700 text-red-400',
    Hunt: 'bg-green-900/60 border-green-700 text-green-400',
    Erudition: 'bg-purple-900/60 border-purple-700 text-purple-400',
    Harmony: 'bg-yellow-900/60 border-yellow-700 text-yellow-400',
    Nihility: 'bg-blue-900/60 border-blue-700 text-blue-400',
    Preservation: 'bg-cyan-900/60 border-cyan-700 text-cyan-400',
    Abundance: 'bg-emerald-900/60 border-emerald-700 text-emerald-400'
  }[lightCone.path] || 'bg-gray-800/60 border-gray-700 text-gray-400';
  return <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 flex justify-between items-center p-4">
          <h2 className="text-xl font-bold text-blue-400">{lightCone.name}</h2>
          <button className="p-1 rounded-full hover:bg-gray-700" onClick={onClose}>
            <XIcon size={20} />
          </button>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <div className="relative">
                <img src={lightCone.imageUrl} alt={lightCone.name} className="w-full rounded-lg" />
                <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                  {stars.map((_, i) => <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>)}
                </div>
              </div>
              <div className={`mt-4 px-3 py-2 rounded-md text-sm font-medium border ${pathColorClass} text-center`}>
                {lightCone.path} Path
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="bg-gray-900 rounded-md p-3 text-center">
                  <div className="text-gray-400 text-xs">HP</div>
                  <div className="font-medium">{lightCone.hp}</div>
                </div>
                <div className="bg-gray-900 rounded-md p-3 text-center">
                  <div className="text-gray-400 text-xs">ATK</div>
                  <div className="font-medium">{lightCone.atk}</div>
                </div>
                <div className="bg-gray-900 rounded-md p-3 text-center">
                  <div className="text-gray-400 text-xs">DEF</div>
                  <div className="font-medium">{lightCone.def}</div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-gray-300">{lightCone.description}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Skill: {lightCone.skill.name}
                </h3>
                <div className="bg-gray-900 border border-gray-700 rounded-md p-4">
                  <p className="text-gray-300">{lightCone.skill.description}</p>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">
                  Recommended Characters
                </h3>
                <div className="bg-gray-900 border border-gray-700 rounded-md p-4 text-gray-300">
                  <p>
                    Character recommendations would appear here based on game
                    data and meta analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default LightConeDetail;