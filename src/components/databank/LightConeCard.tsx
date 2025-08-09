import React from 'react';
import type { LightCone } from '../../utils/mockData';
import Link from 'next/link';
import Image from 'next/image';
interface LightConeCardProps {
  lightCone: LightCone;
  onClick: (lightCone: LightCone) => void;
}
const LightConeCard: React.FC<LightConeCardProps> = ({
  lightCone,
  onClick
}) => {
  // Generate stars based on rarity
  const stars = Array(lightCone.rarity).fill(0);
  const pathColorClass = {
    Destruction: 'bg-red-900/60 border-red-700',
    Hunt: 'bg-green-900/60 border-green-700',
    Erudition: 'bg-purple-900/60 border-purple-700',
    Harmony: 'bg-yellow-900/60 border-yellow-700',
    Nihility: 'bg-blue-900/60 border-blue-700',
    Preservation: 'bg-cyan-900/60 border-cyan-700',
    Abundance: 'bg-emerald-900/60 border-emerald-700'
  }[lightCone.path] || 'bg-gray-800/60 border-gray-700';
  const pathGradientClass = {
    Destruction: 'from-red-700/30 via-red-500/20 to-transparent',
    Hunt: 'from-green-700/30 via-green-500/20 to-transparent',
    Erudition: 'from-purple-700/30 via-purple-500/20 to-transparent',
    Harmony: 'from-yellow-700/30 via-yellow-500/20 to-transparent',
    Nihility: 'from-blue-700/30 via-blue-500/20 to-transparent',
    Preservation: 'from-cyan-700/30 via-cyan-500/20 to-transparent',
    Abundance: 'from-emerald-700/30 via-emerald-500/20 to-transparent'
  }[lightCone.path] || 'from-gray-700/30 via-gray-500/20 to-transparent';
  return <div className="group relative">
      {/* Card with hover effect */}
      <div className="bg-gray-800 border border-gray-700 sm:max-w-56 sm:max-sm:w-full min-w-46 rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1" onClick={() => onClick(lightCone)}>
        <div className="relative">
          <Image width={500} height={500} src={lightCone.imageUrl} alt={lightCone.name} className="w-full sm:h-48 max-sm:h-80 object-cover object-center" />
          <div className="absolute bottom-0 left-0 right-0 flex justify-center py-1 bg-gray-900/80">
            {stars.map((_, i) => <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>)}
          </div>
          <div className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-medium border ${pathColorClass}`}>
            {lightCone.path}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg line-clamp-1 font-semibold text-blue-400 mb-1">
            {lightCone.name}
          </h3>
          <div className="grid grid-cols-3 gap-2 text-sm mb-3">
            <div className="text-center">
              <div className="text-gray-400">HP</div>
              <div className="font-medium">{lightCone.hp}</div>
            </div>
            <div className="text-center">
              <div className="text-gray-400">ATK</div>
              <div className="font-medium">{lightCone.atk}</div>
            </div>
            <div className="text-center">
              <div className="text-gray-400">DEF</div>
              <div className="font-medium">{lightCone.def}</div>
            </div>
          </div>
          <div className="text-xs text-gray-300 line-clamp-2">
            {lightCone.skill.name}: {lightCone.skill.description}
          </div>
        </div>
      </div>
      {/* View details button that appears on hover */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center pb-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <Link href={`/databank/lightcones/${lightCone.id}`} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium shadow-lg" onClick={e => e.stopPropagation()}>
          View Details
        </Link>
      </div>
      {/* Light cone reflection effect on hover */}
      <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 rounded-full bg-gradient-radial ${pathGradientClass} opacity-0 group-hover:opacity-70 transition-opacity duration-300 blur-md -z-10`}></div>
    </div>;
};
export default LightConeCard;