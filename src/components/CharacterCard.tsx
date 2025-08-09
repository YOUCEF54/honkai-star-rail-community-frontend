'use client';
import Image from 'next/image';
import Link from 'next/link';
import type { ICharacter } from '@/types/character';

export default function CharacterCard({ c }: { c: ICharacter }) {
  const stars = parseInt(c.basicInfo.rarity);
  const rarityStars = Array.from({ length: stars }).map((_, i) => (
    <span key={i} className="text-amber-400">★</span>
  ));
  const slug = c.basicInfo.name.toLowerCase().replace(/\s+/g, '-');

  return (
    <Link
      href={`/characters/${encodeURIComponent(slug)}`}
      className="relative rounded-tr-xl bg-gray-900/60 shadow-xl ring-1 ring-gray-800
                 flex flex-col items-center text-center overflow-hidden transition-transform duration-200 ease-in-out max-w-44"
    >
      {/* Background Effects */}
      <div
        style={{ backgroundImage: `url(${stars === 5 ? '/images/bg5star.webp' : '/images/bg4star.webp'})` }}
        className="absolute w-full opacity-5 bg-repeat-x bg-contain inset-0 z-0"
      />
      
      {/* Portrait Image */}
      <Image
        src={c.basicInfo.imagePortraitUrl || `/images/${c.basicInfo.name}.webp`}
        alt={c.basicInfo.name}
        width={500}
        height={128}
        className={`absolute top-0 w-full bg-cover bg-center shadow-lg z-50 ${c.basicInfo.gender === "male" ? "" : "blur-sm"}`}
      />

      {/* Lower Part - Info */}
      <div className="z-50 absolute bottom-0 w-full p-4 bg-gradient-to-b from-transparent via-black/30 to-black/50">
        <h2 className="text-xl font-bold text-white mb-1">{c.basicInfo.name}</h2>
        <p className="text-sm text-gray-300 mb-1">
          {c.basicInfo.element} • {c.basicInfo.path}
        </p>
        <p className="text-lg">{rarityStars}</p>
      </div>

      {/* Gradient Effects */}
      <div className={`absolute bottom-0 left-0 h-1.5 w-full ${stars === 5 ? 'bg-amber-500' : 'bg-purple-400/70'}`} />
      <div className={`absolute bottom-0 left-0 h-full w-full opacity-30 ${stars === 5 ? 'bg-amber-400/80' : 'bg-purple-400/70'}`} />
      
      {/* Element and Path Icons */}
      <div className="absolute flex flex-col top-0 left-0 p-2 z-50 gap-2 bg-gradient-to-b from-gray-900/70 via-gray-900 via-55% to-transparent">
        <Image src={`/Type_${c.basicInfo.element}.webp`} width={28} height={28} alt="element" />
        <Image src={`/Path_${c.basicInfo.path === 'Hunt' ? 'The_Hunt' : c.basicInfo.path}.webp`} width={28} height={28} alt="path" className="rounded-full" />
      </div>
    </Link>
  );
}
