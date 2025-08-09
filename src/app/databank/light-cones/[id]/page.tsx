'use client'
import React, { useEffect, useState } from 'react';
import { XIcon, ChevronLeftIcon } from 'lucide-react';
import { lightCones, type LightCone } from '../../../../utils/mockData'
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
const LightConeDetailsPage = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const [lightCone, setLightCone] = useState<LightCone | null>(null);
  useEffect(() => {
    if (id) {
      const foundLightCone = lightCones.find(lc => lc.id.toString() === id);
      setLightCone(foundLightCone || null);
    }
  }, [id]);
  if (!lightCone) {
    return <div className="flex items-center justify-center h-full">
        <p>Light Cone not found</p>
      </div>;
  }
  // Generate stars based on rarity
  const stars = Array(lightCone.rarity).fill(0);
  const pathColorClass = {
    Destruction: 'text-red-400',
    Hunt: 'text-green-400',
    Erudition: 'text-purple-400',
    Harmony: 'text-yellow-400',
    Nihility: 'text-blue-400',
    Preservation: 'text-cyan-400',
    Abundance: 'text-emerald-400'
  }[lightCone.path] || 'text-gray-400';
  const pathGradientClass = {
    Destruction: 'from-red-700/30 via-red-500/20 to-transparent',
    Hunt: 'from-green-700/30 via-green-500/20 to-transparent',
    Erudition: 'from-purple-700/30 via-purple-500/20 to-transparent',
    Harmony: 'from-yellow-700/30 via-yellow-500/20 to-transparent',
    Nihility: 'from-blue-700/30 via-blue-500/20 to-transparent',
    Preservation: 'from-cyan-700/30 via-cyan-500/20 to-transparent',
    Abundance: 'from-emerald-700/30 via-emerald-500/20 to-transparent'
  }[lightCone.path] || 'from-gray-700/30 via-gray-500/20 to-transparent';
  return <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-purple-950 to-black bg-cover bg-center">
      {/* Background overlay */}
       <div className='relative'>
        <Image
            width={500}
            height={500}
            alt='خلفية'
            src={"/bg3_v2.png"}
            className='fixed inset-0 z-10 opacity-10 w-full h-full object-cover'
        />
      </div>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-4 text-white">
        <div className="flex items-center gap-2">
          <Link href="/databank/light-cones" className="p-2 rounded-full hover:bg-gray-800/50">
            <ChevronLeftIcon size={24} />
          </Link>
          <div>
            <h1 className="text-lg font-medium">Light Cone Details</h1>
            <div className="flex items-center">
              <span className={`${pathColorClass}`}>
                ⚔ The {lightCone.path}
              </span>
            </div>
          </div>
        </div>
        <Link href="/databank/light-cones" className="p-2 rounded-full hover:bg-gray-800/50">
          <XIcon size={24} />
        </Link>
      </header>
      {/* Left side menu */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-6">
        <div className="flex items-center gap-2 bg-gray-900/70 px-4 py-3 rounded-full backdrop-blur-sm">
          <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black">
            i
          </div>
          <span className="text-white font-medium">Details</span>
        </div>
        <div className="flex items-center gap-2 bg-gray-900/50 px-4 py-3 rounded-full backdrop-blur-sm hover:bg-gray-900/70 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white">
            ↑
          </div>
          <span className="text-white font-medium">Ascend</span>
        </div>
        <div className="flex items-center gap-2 bg-gray-900/50 px-4 py-3 rounded-full backdrop-blur-sm hover:bg-gray-900/70 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white">
            S
          </div>
          <span className="text-white font-medium">Superimpose</span>
        </div>
      </div>
      {/* Light Cone Card with hover effects instead of 3D tilt */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="relative">
          {/* Rainbow glow effect beneath the card */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-72 h-12 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 via-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 blur-xl opacity-50"></div>
          {/* Card with hover effects instead of 3D tilt */}
          <div className="w-72 h-[28rem] transform transition-transform hover:scale-[1.02] hover:rotate-1">
            <div className="rounded-2xl border-2 border-white/20 bg-black/10 backdrop-blur-sm shadow-2xl h-full w-full">
              <div className="h-full w-full p-2">
                <div className="relative h-full w-full rounded-xl overflow-hidden border border-yellow-500/50 bg-black/40 shadow-inner">
                  {/* Path icon */}
                  <div className="absolute bottom-4 left-4 w-10 h-10 rounded-full bg-gray-900/80 flex items-center justify-center z-10">
                    <span className={`text-2xl ${pathColorClass}`}>⚔</span>
                  </div>
                  {/* Stars */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10">
                    {stars.map((_, i) => <svg key={i} className="w-6 h-6 text-yellow-400 drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>)}
                  </div>
                  {/* Light cone image */}
                  <img src={lightCone.imageUrl} alt={lightCone.name} className="h-full w-full object-cover" />
                  {/* Shine effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 hover:opacity-100 transition-opacity duration-700"></div>
                </div>
              </div>
            </div>
          </div>
          {/* Path-colored light effect beneath */}
          <div className={`absolute -bottom-12 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full bg-gradient-radial ${pathGradientClass} blur-md opacity-80`}></div>
        </div>
      </div>
      {/* Right side stats */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 max-w-md">
        <div className="bg-black/30 backdrop-blur-md p-6 rounded-lg border border-gray-700/50">
          <h2 className="text-3xl font-bold text-white mb-1">
            {lightCone.name}
          </h2>
          <div className="flex items-center mb-4">
            <span className={`font-medium ${pathColorClass}`}>
              ⚔ The {lightCone.path}
            </span>
            <div className="ml-2 flex">
              {stars.map((_, i) => <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>)}
            </div>
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">Lv. 20/20</span>
            </div>
            <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">❤</span>
                <span className="text-gray-300">HP</span>
              </div>
              <p className="text-white text-2xl font-medium">{lightCone.hp}</p>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">⚔</span>
                <span className="text-gray-300">ATK</span>
              </div>
              <p className="text-white text-2xl font-medium">{lightCone.atk}</p>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">🛡</span>
                <span className="text-gray-300">DEF</span>
              </div>
              <p className="text-white text-2xl font-medium">{lightCone.def}</p>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-medium text-white mb-2">
              Light Cone Ability
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <span className={pathColorClass}>⚔</span>
              <p className="text-gray-300">
                The following effects only work on characters of the
                <span className={`font-medium ${pathColorClass}`}>
                  {' '}
                  The {lightCone.path}
                </span>{' '}
                Path.
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-black text-xs font-bold">
                  i
                </div>
                <span className="text-white">Superimposition Lv. 1</span>
              </div>
              <h4 className="text-lg font-medium text-white mb-1">
                {lightCone.skill.name}
              </h4>
              <p className="text-gray-300 mb-4">
                {lightCone.skill.description}
              </p>
              <p className="text-gray-400 text-sm italic">
                "{lightCone.description}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default LightConeDetailsPage;