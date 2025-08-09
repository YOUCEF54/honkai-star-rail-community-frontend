'use client'
import { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ICharacter } from '@/types/character';
import { useSidebar } from '../context/sidebar-context';

// Character card component (keep your existing implementation)
function CharacterCard({ c }: { c: ICharacter }) {
  const rarityStars = Array.from({ length: parseInt(c.basicInfo.rarity.charAt(0)) }).map((_, i) => (
    <span key={i} className="text-amber-400">★</span>
  ));

  // Normalize the character name for the URL slug
  const characterSlug = c.basicInfo.name.toLowerCase().replace(/\s+/g, '-');

  return (
    <Link
      href={`/characters/${encodeURIComponent(characterSlug)}`}
      key={c.id}
      className="relative min-w-38 max-w-44 rounded-tr-xl h-full bg-gray-900/60 shadow-xl ring-1 ring-gray-800
                 transition-transform duration-200 ease-in-out
                 flex flex-col items-center text-center overflow-hidden"
    >
      {rarityStars.length == 5 ?
          <div
            style={{backgroundImage:"url(https://cdn.starrailstation.com/assets/9cfcdf6d0d67550d5961b840cc1d4704d24230dc18fe838e1f6741d8d57a3665.webp)"}}
            className="absolute w-full opacity-5 bg-repeat-x bg-contain inset-0 z-0"></div>
            :
            <div
              style={{backgroundImage:"url(https://cdn.starrailstation.com/assets/ebf11e773e416a832bbe26a06d07a3046e976e7bf9892574e5966cbdb6864833.webp)"}}
              className="absolute w-full opacity-5 bg-repeat-x bg-contain inset-0 z-0"></div>
      }
        <Image
          src={c.basicInfo.imagePortraitUrl || `/images/${c.basicInfo.name}.webp`}
          alt={c.basicInfo.name}
          width={500}
          height={128}
          className={`bg-no-repeat zoom-in-75 ${c.basicInfo.gender == "male" ?"":"blur-sm"} top-0 absolute  bg-center bg-cover z-50 w-full shadow-lg`}
        />
      <div className='z-10 relative w-full sm:min-h-58'>
        <Image
          src={c.basicInfo.imagePortraitUrl || `/images/${c.basicInfo.name}.webp`}
          alt={c.basicInfo.name}
          width={500}
          height={128}
          className={`bg-no-repeat zoom-in-75 ${c.basicInfo.gender == "male" ?"":"blur-md"} bg-center bg-cover z-40 w-full shadow-lg`}
        />
      </div>
      <div className="z-50 absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-b from-transparent via-black/30 to-black/50">
        <h2 className="text-xl font-bold text-white  text-shadow-md text-shadow-black mb-1">{c.basicInfo.name}</h2>
        <p className="text-sm text-nowrap text-gray-300 mb-1 text-shadow-2xs text-shadow-black">
          {c.basicInfo.element} • {c.basicInfo.path}
        </p>
        <p className="mt-1 text-lg">
          {rarityStars}
        </p>
        
        <div className={`h-1.5 w-full opacity-85 brightness-120 absolute op bottom-0 left-0 ${c.basicInfo.rarity == "5-star" ? "bg-amber-500" : "bg-purple-400/70"} `}/>
        <div className={`h-full opacity-30 w-full absolute bottom-0 left-0 ${c.basicInfo.rarity == "5-star" ? "bg-gradient-to-b from-transparent to-amber-400/80" : "bg-gradient-to-b from-transparent to-purple-400/70"} `}/>
      </div>
     <div className={`absolute flex flex-col max-sm:gap-4 gap-2 top-0 left-0 p-1.5 py-2 z-50 bg-gradient-to-b pb-12 ${c.basicInfo.gender == "male" ? "from-gray-900/80 via-gray-900 via-55% to-transparent":"from-gray-900/60 via-gray-900/70 via-55% to-transparent"}`}>
         <Image
        width={500}
        height={500}
        alt={c.basicInfo.element}
        className='max-sm:w-8 w-7  z-50 left-2 top-2'
        src={`/Type_${c.basicInfo.element}.webp`}/>
      <Image
        width={500}
        height={500}
        alt={c.basicInfo.element}
        className='max-sm:w-8 w-7 shadow-black drop-shadow-lg brightness-150  z-50 left-2  rounded-full top-10'
        src={(c.basicInfo.path !="Hunt") ? `/Path_${c.basicInfo.path}.webp` : "/Path_The_Hunt.webp"}/>
     </div>
    </Link>
  );
}

// Loading skeleton (keep your existing implementation)
function CharacterCardSkeleton() {
  return (
    <div className="relative rounded-2xl bg-gray-900/60 p-5 shadow-xl ring-1 ring-gray-800
                   flex flex-col items-center text-center overflow-hidden animate-pulse">
      <div className="h-32 w-32 rounded-full bg-gray-700 mb-4"></div>
      <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2 mb-1"></div>
      <div className="h-4 bg-gray-700 rounded w-1/3"></div>
    </div>
  );
}

function CharactersList({ isExpanded, chars, selectedPath }: {isExpanded : boolean, chars: ICharacter[]; selectedPath: string }) {
    const filteredChars = selectedPath === "All"
    ? chars
    : chars.filter((c) => c.basicInfo.path === selectedPath);

  return (
    <div className={`grid gap-6 sm:grid-cols-2 md:grid-cols-3 w-full xl:w-full  ${isExpanded ? "xl:grid-cols-5 lg:grid-cols-4":"lg:grid-cols-3 xl:grid-cols-4"} 2xl:grid-cols-5`}>
      {filteredChars.map((c) => (
        <CharacterCard key={c.id} c={c} />
      ))}
    </div>
  );
}

const paths = [
    'Destruction',
    'The Hunt',
    'Erudition',
    'Harmony',
    'Nihility',
    'Preservation',
    'Abundance',
    'Remembrance'
]

export default function CharactersPage() {
  const [chars, setChars] = useState<ICharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPath, setSelectedPath] = useState("All");
  const { isExpanded, setIsExpanded } = useSidebar();

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
        const res = await fetch(`${apiUrl}/api/characters`);
        
        if (!res.ok) {
          throw new Error('Failed to fetch characters');
        }
        
        const data = await res.json();
        setChars(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching characters:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) {
    return (
      <div className={`min-h-screen relative grid grid-cols-12 pl-50  w-full transition-all duration-300 items-start  z-20 ${isExpanded?"pt-20 pr-20":"pt-20 pr-16"}   text-white bg-black/40 overflow-hidden`}>
        <div className={`${!isExpanded?"col-span-1 ":"col-span-1"} h-full w-full`}></div>
        <div className={`${!isExpanded?"col-span-11 ":"col-span-11"} h-full z-[90]`}>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(10)].map((_, i) => (
              <CharacterCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen relative grid grid-cols-12 pl-50  w-full transition-all duration-300 items-start  z-20 ${isExpanded?"pt-20 pr-20":"pt-20 pr-16"}   text-white bg-black/40 overflow-hidden`}>
        <div className={`${!isExpanded?"col-span-1 ":"col-span-1"} h-full w-full`}></div>
        <div className={`${!isExpanded?"col-span-11 ":"col-span-11"} h-full z-[90] flex items-center justify-center`}>
          <div className="text-red-500 text-center p-4 bg-gray-900/80 rounded-lg">
            Error loading characters: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='fixed inset-0  z-10'>
        <Image
          width={500}
          height={500}
          alt='خلفية'
          src={"/bg3_v2.png"}
          className=' opacity-10 w-full h-full object-cover'
        />
      </div>
      
      <div className={`fixed ${!isExpanded ?" lg:left-68 left-8 lg:top-25 top-20":"top-5 left-16 "}  transition-all duration-300 z-30`}>
        <div className='font-medium gap-2    w-fit flex items-center mb-10 justify-start  text-neutral-100 '>
          <Image
            width={500}
            height={128}
            alt='galaxy background'
            src='/databank_ch.png'
            className={` absolute w-52 opacity-10 -z-10  -left-6 -top-12 opacity-5m`}
          />
          <Image
            width={500}
            height={128}
            alt='Honkai: Star Rail Data Bank'
            src='/databank.png'
            className='w-7'
          />
          <div className="">
            <div className='text-[#F6D8AA]'>Data Bank</div>
            <div>Characters</div>
          </div>
        </div>
        
        <div className='flex flex-col gap-8'>
          <button onClick={()=>setSelectedPath("All")} className='flex cursor-pointer items-center gap-6'>
            <div className='flex items-center justify-center'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                className="icon mix-blend-difference text-white z-10 icon-tabler icons-tabler-filled icon-tabler-cards">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M10.348 3.169l-7.15 3.113a2 2 0 0 0 -1.03 2.608l4.92 11.895a1.96 1.96 0 0 0 2.59 1.063l7.142 -3.11a2.002 2.002 0 0 0 1.036 -2.611l-4.92 -11.894a1.96 1.96 0 0 0 -2.588 -1.064z" />
                <path d="M16 3a2 2 0 0 1 1.995 1.85l.005 .15v3.5a1 1 0 0 1 -1.993 .117l-.007 -.117v-3.5h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" />
                <path d="M19.08 5.61a1 1 0 0 1 1.31 -.53c.257 .108 .505 .21 .769 .314a2 2 0 0 1 1.114 2.479l-.056 .146l-2.298 5.374a1 1 0 0 1 -1.878 -.676l.04 -.11l2.296 -5.371l-.366 -.148l-.402 -.167a1 1 0 0 1 -.53 -1.312z" />
              </svg>
              <div className={`size-11 ${!(selectedPath === "All") && "hidden"} bg-white absolute -left-[10px]l rounded-full`}/>
              <div className={`size-13 ${!(selectedPath === "All") && "hidden"} animate-spinl animation-duration-5000l border-dashed border absolute -left-[10px]l rounded-full`}>
                <div className={`size-[7px] border-2 border-gray-800 bg-white left-0.5 top-[5.1px] absolute -left-[10px]l rounded-full`}/>
                <div className={`size-[7px] border-2 border-gray-800 bg-white right-0.5 bottom-[5.1px] absolute -left-[10px]l rounded-full`}/>
              </div>
            </div>
            <span>All</span>
          </button>
          
          {paths.map((path,index)=>(
            <button onClick={()=>setSelectedPath(path)} key={index} className='flex relative cursor-pointer items-center gap-4'>
              <div className='flex items-center justify-center'>
                <Image
                  width={500}
                  height={128}
                  alt='Honkai: Star Rail Data Bank'
                  src={`/Path_${path.replace(" ","_")}.webp`}
                  className={`w-7 mix-blend-difference z-10 ${index == 0 && ""}`}
                />
                <div className={`size-11 ${!(selectedPath === path) && "hidden"} bg-white absolute -left-[10px]l rounded-full`}/>
                <div className={`size-13 ${!(selectedPath === path) && "hidden"} animate-spinl animation-duration-5000l border-dashed border absolute -left-[10px]l rounded-full`}>
                  <div className={`size-[7px] border-2 border-gray-800 bg-white left-0.5 top-[5.1px] absolute -left-[10px]l rounded-full`}/>
                  <div className={`size-[7px] border-2 border-gray-800 bg-white right-0.5 bottom-[5.1px] absolute -left-[10px]l rounded-full`}/>
                </div>
              </div>
              <span>{path}</span>
            </button>
          ))}
        </div>
      </div>
      
      <main className={`min-h-screen relative grid grid-cols-12 pl-50 w-full transition-all duration-300 items-start z-20 ${isExpanded?"pt-20 pr-20":"pt-20 pr-16"} text-white bg-black/40 overflow-hidden`}>
        <div className={`${!isExpanded?"col-span-1 ":"col-span-1"} h-full w-full`}></div>
        <div className={`${!isExpanded?"col-span-11 ":"col-span-11"} h-full z-[90]`}>
          <Suspense fallback={
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
              {[...Array(10)].map((_, i) => (
                <CharacterCardSkeleton key={i} />
              ))}
            </div>
          }>
            <CharactersList 
              isExpanded={isExpanded} 
              selectedPath={selectedPath === "The Hunt" ? "Hunt" : selectedPath} 
              chars={chars} 
            />
          </Suspense>
        </div>
      </main>
    </>
  );
}