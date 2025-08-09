// src/app/profile/page.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';

// import Modal from '@/components/Modal';
import { useModal } from '../context/modal-context';

const Modal = () =>{
  const {isModalOpen,setIsModalOpen} = useModal()
  return(
    <section className=' fixed font-serif font-extralight text-lg backdrop-blur-3xl flex items-center justify-center z-[80] inset-0'>
      <div onClick={()=>setIsModalOpen(false)} className='bg-black/80 absolute inset-0 -z-40'/>

      <div className='flex flex-col items-center'>
          
        <div className='w-[36rem] z-50 flex  justify-center relative mx-auto border p-2 bg-gradient-to-b from-black/80 via-neutral-950 to-black rounded-t-[3.5rem]l border-amber-200'>
     
          <Image
            width={500}
            height={500}
            alt='Favorite character'
            src={"/bgg.png"}
            className='absolute z-0 opacity-5  '
            />
          <div className='flex flex-col gap-4 z-50'>

            <h2 className='text-amber-950 text-center bg-amber-200 px-2 '>
              <span>Favorite Characters</span>
            </h2>
            {/* -------------------------------------------------------------- */}
            <div className='flex gap-2   p-2 border border-amber-200 bg-black'>
              <div 
              className='h-72 w-1/3 z-50 overflow-clip  bg-gradient-to-b from-amber-500/90 to-amber-950/40
                        after:h-3.5 after:w-6 after:-right-4 after:bottom-0 after:rounded-tr-full
                        after:absolute  after:bg-black after:z-50 after:rounded-tl-full
                        before:w-6 before:h-3.5 before:-right-4 before:top-0 before:rounded-br-full
                        before:rounded-bl-full
                        before:absolute relative before:bg-black before:z-50
                        before:border-l  before:border-b before:border-amber-100 after:border-amber-200
                        after:border-l  after:border-t bg-gradient-to-bll from-amber-500l to-amber-800l'>
                <Image
                  width={500}
                  height={500}
                  alt='Favorite character'
                  src={"/images/phainon.webp"}
                  className='h-full drop-shadow-2xl z-50 shadow-black border border-amber-200 object-cover'
                />
                <Image
                  width={500}
                  height={500}
                  alt='Favorite character'
                  src={"/ticket-ict.png"}
                  className='h-full drop-shadow-2xl absolute opacity-35 top-0 -z-50 shadow-black border border-amber-200 object-cover'
                />

                <div className='absolute text-amber-200 bottom-[1px] flex items-center justify-center flex-col py-4 left-[1px] right-[1px] pt-8 bg-gradient-to-b from-transparent via-black/50 to-black/70 '>
                  <div>Phainon</div>
                  <div>★★★★★</div>
                </div>
              </div>
              <div 
              className='h-72 w-1/3 z-40 overflow-clip  bg-gradient-to-b from-amber-500/90 to-amber-950/40
                        after:h-3.5 after:w-6 after:-right-4 after:bottom-0 after:rounded-tr-full
                        after:absolute  after:bg-black after:z-50 after:rounded-tl-full
                        before:w-6 before:h-3.5 before:-right-4 before:top-0 before:rounded-br-full
                        before:rounded-bl-full
                        before:absolute relative before:bg-black before:z-50
                        before:border-l  before:border-b before:border-amber-100
                        after:border-t  after:border-l after:border-amber-200 bg-gradient-to-bll from-amber-500l to-amber-800l'>
                <div className='after:h-3.5  after:w-6 after:-left-4 after:bottom-0 after:rounded-tr-full
                        after:absolute z-50 after:bg-black after:z-50 after:rounded-tl-full
                        before:w-6 before:h-3.5 before:-left-4 before:top-0 before:rounded-br-full
                        before:rounded-bl-full
                        before:absolute  before:bg-black before:z-50
                        before:border-r  before:border-b before:border-amber-100
                        after:border-t  after:border-r after:border-amber-200'/>
                <Image
                  width={200}
                  height={500}
                  alt='Favorite character'
                  src={"/images/anaxa.webp"}
                  className='h-full drop-shadow-2xl z-50 shadow-black border border-amber-200 object-cover'
                />
                <Image
                  width={500}
                  height={500}
                  alt='Favorite character'
                  src={"/ticket-ict.png"}
                  className='h-full drop-shadow-2xl absolute opacity-35 top-0 -z-50 shadow-black border border-amber-200 object-cover'
                />
                <div className='absolute text-amber-200 bottom-[1px] flex items-center justify-center flex-col py-4 left-[1px] right-[1px] pt-12 bg-gradient-to-b from-transparent via-black/50 to-black/70 '>
                  <div>Anaxa</div>
                  <div>★★★★★</div>
                </div>

              </div>
              <div 
              className='h-72 w-1/3 overflow-clip z-30  bg-gradient-to-b from-amber-500/90 to-amber-950/40
                        relative bg-gradient-to-bll from-amber-500l to-amber-800l'>
                <Image
                  width={500}
                  height={500}
                  alt='Favorite character'
                  src={"/images/mydei.webp"}
                  className='h-full drop-shadow-2xl z-50 shadow-black border border-amber-200 object-cover'
                />
                <Image
                  width={500}
                  height={500}
                  alt='Favorite character'
                  src={"/ticket-ict.png"}
                  className='h-full drop-shadow-2xl absolute opacity-35 top-0 -z-50 shadow-black border border-amber-200 object-cover'
                />
                <div className='absolute text-amber-200 bottom-[1px] flex items-center justify-center flex-col py-4 left-[1px] right-[1px] pt-8 bg-gradient-to-b from-transparent via-black/50 to-black/70 '>
                  <div>Mydei</div>
                  <div>★★★★★</div>
                </div>
                <div className='after:h-3.5  after:w-6 after:-left-4 after:bottom-0 after:rounded-tr-full
                        after:absolute z-50 after:bg-black after:z-50 after:rounded-tl-full
                        before:w-6 before:h-3.5 before:-left-4 before:top-0 before:rounded-br-full
                        before:rounded-bl-full
                        before:absolute  before:bg-black before:z-50
                        before:border-r  before:border-b before:border-amber-100
                        after:border-t  after:border-r after:border-amber-200'/>
              </div>
            </div>
              {/* <div className='h-72 w-1/3 after:size-6 after:-right-4 after:-bottom-3 after:rounded-full  after:absolute  after:bg-black after:z-50   before:size-6 before:-right-4 before:-top-3 before:rounded-full  before:absolute relative before:bg-black before:z-50   bg-green-400'></div> */}
            {/* -------------------------------------------------------------- */}
              <h2 className='text-amber-950 bg-amber-200 text-center px-2 font-serif font-extralight text-lg'>Favorite Team</h2>
            <div>
              <div className='flex gap-2 bg-black p-2 border border-amber-200'>
                <div className='flex  border border-amber-200 size-1/4 overflow-clip aspect-square bg-black/40 backdrop-blur-lg'>
                  <Image
                  width={500}
                  height={500}
                  alt='Favorite character'
                  src={"/images/phainon.webp"}
                  className=' drop-shadow-2xl w-full z-50 h-[14rem] -top-3 absolute shadow-black  object-cover'
                />
                </div>
                
                <div className='flex border border-amber-200 size-1/4 overflow-clip aspect-square bg-black/40 backdrop-blur-lg'>
                  <Image
                  width={500}
                  height={500}
                  alt='Favorite character'
                  src={"/images/sunday.webp"}
                  className=' drop-shadow-2xl w-full z-50 h-[14rem] -top-3 absolute shadow-black  object-cover'
                />
                </div>
                <div className='flex  border border-amber-200 size-1/4 overflow-clip aspect-square bg-black/40 backdrop-blur-lg'>
                  <Image
                  width={500}
                  height={500}
                  alt='Favorite character'
                  src={"/images/bronya.webp"}
                  className=' drop-shadow-2xl w-full z-50 h-[14rem] -top-3 absolute shadow-black  object-cover'
                />
                </div>
                <div className='flex  border border-amber-200 size-1/4 overflow-clip aspect-square bg-black/40 backdrop-blur-lg'>
                  <Image
                  width={500}
                  height={500}
                  alt='Favorite character'
                  src={"/images/tingyun.webp"}
                  className=' drop-shadow-2xl w-full z-50 h-[14rem] -top-3 absolute shadow-black  object-cover'
                />
                </div>
              </div>
            </div>
            {/* -------------------------------------------------------------- */}
          </div>
        </div>
      </div>
    </section>
  )
}


export default function ProfilePage() {
  const {isModalOpen,setIsModalOpen} = useModal()

  // Dummy User Data (replace with actual fetched data later)
  const dummyUser = {
    username: 'Trailblazer_Stellar',
    email: 'trailblazer.star@example.com',
    profilePicture: '/pic.webp', // Placeholder image, ensure this path exists or use a generic one
    coverImage: '/guides.avif', // Placeholder cover image
    joinDate: '2023-04-26',
    uid: 'USR-HSR-789012345',
    inGameStats: {
      trailblazeLevel: 70,
      equilibriumLevel: 6,
      charactersOwned: 35,
      lightConesOwned: 20,
      relicSetsCompleted: 15,
      favoritePath: 'Destruction',
      favoriteElement: 'Imaginary',
    },
    achievements: [
      'First Warp: Achieved',
      'Stellar Hunter: Rank A',
      'Echoes of War: Mastered',
      'Simulated Universe: Conquered',
      'Forgotten Hall: Cleared',
      'Interastral Guide: Explorer',
      'Aetherium Wars: Champion',
    ],
    recentActivity: [
      { type: 'character_build', id: '123', name: 'New Kafka Build', date: '2025-07-20' },
      { type: 'guide_post', id: '456', name: 'Ultimate Guide to Penacony', date: '2025-07-18' },
      { type: 'team_comp', id: '789', name: 'Mono Quantum Team V2', date: '2025-07-15' },
    ],
    friends: [ // Dummy friends data
      { username: 'StellaronHunter', profilePicture: '/team.avif' },
      { username: 'AstralExpressCrew', profilePicture: '/team.avif' },
      { username: 'JingliuFan', profilePicture: '/team.avif' },
      { username: 'HertaSpaceStation', profilePicture: '/team.avif' },
    ]
  };

  return (
    <main className={`min-h-screen grid grid-cols-4  relative text-white overflow-hidden `}>
          {isModalOpen ? <Modal/> : null}
          <section className="xl:col-span-3 col-span-4  bg-black/80 shadow-2xl  backdrop-blur-sm overflow-hidden w-full">
            {/* Cover Image Section */}
            <div className="relative h-60 bg-green-500 sm:h-64 md:h-72 bg-gradient-to-br from-black to-amber-900">
              <Image
                src={dummyUser.coverImage}
                alt="Profile Cover"
                layout="fill"
                objectFit="cover"
                className="opacity-60" // Make it slightly transparent to blend with background
              />
              {/* Profile Picture and Name Overlay */}
              <div className="absolute  bottom-0 left-0 right-0 p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-end z-10 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                <div className="relative  w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden   shadow-lg -mb-4  sm:mb-0 sm:mr-6">
                 <div className='relative  size-full flex items-center justify-center'>
                  <Image
                    src={dummyUser.profilePicture}
                    alt={`${dummyUser.username}'s Profile Picture`}
                    width={250}
                    height={128}
                    objectFit="cover"
                    className="filter  h-full object-cover lneutralscale hover:neutralscale-0 transition-all duration-300"
                  />
                  <div className='size-[95%] z-20 border-2 border-gary-200 absolute  rounded-full'/>
                  <div className='size-full border-4 border-black/70 blur-[3px] absolute  rounded-full'/>
                 </div>
                  {/* Online/Offline indicator (dummy) */}
                  <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black shadow-md"></div>
                </div>
                <div className="mt-4 sm:mt-0 space-y-1 text-center sm:text-left">
                  <h1 className="text-3xl sm:text-5xl font-bold text-neutral-300 tracking-wide drop-shadow-lg">
                    {dummyUser.username}
                  </h1>
                  <p className="text-sm sm:text-base text-neutral-400 font-mono drop-shadow-md">
                    UID: {dummyUser.uid}
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1 drop-shadow-md">
                    Joined: {dummyUser.joinDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Main Profile Details */}
            <div className="p-6 sm:p-10 pt-16 sm:pt-20"> {/* Adjusted padding-top to account for overlay */}
              <div className='flex text-white font-medium gap-2 w-full mb-4'>
                <button onClick={()=>setIsModalOpen(true)} className='bg-neutral-950/95 hover:brightness-125  cursor-pointer justify-center flex items-center relative w-1/1 text-amber-200/80 p-2 rounded-full px-4'>
                  <div className='border-2 border-amber-200/30 absolute rounded-full inset-0'/>
                  show Favorited Characters and team
                </button>
                {/* <button className='bg-neutral-800/95 hover:brightness-125 cursor-pointer justify-center flex items-center relative w-1/2 text-neutral-300/80 p-2 rounded-full px-4'>
                  <div className='border-2 border-neutral-400/40 absolute rounded-full inset-0'/>
                  show Favorited Characters
                </button> */}
              </div>
              {/* Profile Details Grid */}
              <div id="overview" className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Contact Info */}
                {/* <div className="bg-neutral-800/60 p-5 rounded-xl border border-neutral-700 shadow-inner">
                  <h2 className="text-xl font-semibold text-amber-200 mb-3 flex items-center">
                    <span className="mr-2 text-amber-200">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                    </span>
                    Contact Information
                  </h2>
                  <p className="text-neutral-300">Email: {dummyUser.email}</p>
                </div> */}

                {/* In-Game Stats */}
                <div className="bg-neutral-800/60 p-5 rounded-xl border border-neutral-700 shadow-inner">
                  <h2 className="text-xl font-semibold text-amber-200 mb-3 flex items-center">
                    <span className="mr-2 text-amber-200">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.256l-1.414-1.414a1 1 0 00-1.414 0l-1.414 1.414a1 1 0 01-1.414 0l-1.414-1.414a1 1 0 00-1.414 0l-1.414 1.414a1 1 0 01-1.414 0l-1.414-1.414a1 1 0 00-1.414 0L3.293 13.293A8 8 0 0010 18a8 8 0 006.707-4.707l-1.414-1.414a1 1 0 00-1.414 0z" clipRule="evenodd"></path></svg>
                    </span>
                    In-Game Statistics
                  </h2>
                  <ul className="space-y-1 text-neutral-300">
                    <li >Trailblaze Level: <span className="font-semibold text-neutral-200">{dummyUser.inGameStats.trailblazeLevel}</span></li>
                    <li>Equilibrium Level: <span className="font-semibold text-neutral-200">{dummyUser.inGameStats.equilibriumLevel}</span></li>
                    <li>Characters Owned: <span className="font-semibold text-neutral-200">{dummyUser.inGameStats.charactersOwned}</span></li>
                    <li>Light Cones Owned: <span className="font-semibold text-neutral-200">{dummyUser.inGameStats.lightConesOwned}</span></li>
                    <li>Relic Sets Completed: <span className="font-semibold text-neutral-200">{dummyUser.inGameStats.relicSetsCompleted}</span></li>
                    <li>Favorite Path: <span className="font-semibold text-neutral-200">{dummyUser.inGameStats.favoritePath}</span></li>
                    <li>Favorite Element: <span className="font-semibold text-neutral-200">{dummyUser.inGameStats.favoriteElement}</span></li>
                  </ul>
                </div>
                {/* Achievements/Badges */}
                <div className="bg-neutral-800/60 p-5 rounded-xl border border-neutral-700 shadow-inner mb-8">
                <h2 className="text-xl font-semibold text-amber-200 mb-3 flex items-center">
                  <span className="mr-2 text-amber-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  </span>
                  Achievements
                </h2>
                <ul className="list-disc list-inside space-y-1 text-neutral-300">
                  {dummyUser.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span> {achievement}
                    </li>
                  ))}
                </ul>
              </div>
              </div>

            

              {/* Recent Activity (New Section) */}
              <div className="bg-neutral-800/60 p-5 rounded-xl border border-neutral-700 shadow-inner mb-8">
                <h2 className="text-xl font-semibold text-amber-200 mb-3 flex items-center">
                  <span className="mr-2 text-amber-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                  </span>
                  Recent Activity
                </h2>
                <ul className="space-y-2 text-neutral-300">
                  {dummyUser.recentActivity.map((activity, index) => (
                    <li key={index} className="flex items-center justify-between bg-neutral-700/50 p-3 rounded-lg">
                      <span className="flex items-center">
                        {activity.type === 'character_build' && <span className="mr-2 text-blue-400">⚙️</span>}
                        {activity.type === 'guide_post' && <span className="mr-2 text-yellow-400">📝</span>}
                        {activity.type === 'team_comp' && <span className="mr-2 text-green-400">👥</span>}
                        {activity.name}
                      </span>
                      <span className="text-sm text-neutral-400">{activity.date}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/profile/edit" className='bg-neutral-950/95 hover:brightness-125  cursor-pointer justify-center flex items-center relative w-1/1 text-amber-200/80 p-2 rounded-full px-4'>
                  <div className='border-2 border-amber-200/30 absolute rounded-full inset-0'/>
                  <span className="mr-2">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-user-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h3.5" /><path d="M18.42 15.61a2.1 2.1 0 0 1 2.97 2.97l-3.39 3.42h-3v-3l3.42 -3.39z" /></svg>                  </span>
                  Edit Profile
                </Link>
                <Link href="/auth/logout" className='bg-neutral-950/95 hover:brightness-125  cursor-pointer justify-center flex items-center relative w-1/1 text-amber-200/80 p-2 rounded-full px-4'>
                  <div className='border-2 border-amber-200/30 absolute rounded-full inset-0'/>
                   <span className="mr-2">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-logout"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>
                  </span>
                  Logout
                </Link>
              </div>
            </div>
          </section>

          {/* Right Sidebar */}
          <aside className=" h-full block xl:col-span-1 col-span-4  pb-16 bg-black/80 shadow-2xl p-6 border-l border-neutral-800 backdrop-blur-sm   max-xl:border-t w-full   "> {/* Adjusted top-0 for sticky */}
            <div className=''>
              <h2 className="text-xl font-semibold text-amber-200 mb-4 flex items-center">
              <span className="mr-2 text-amber-200">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-users"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>              </span>
              Friends List
            </h2>
            <ul className="space-y-3">
              {dummyUser.friends.map((friend, index) => (
                <li key={index} className="flex items-center bg-neutral-800/50 p-2 rounded-lg border border-neutral-700">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 border-2 border-neutral-600">
                    <Image
                      src={friend.profilePicture}
                      alt={`${friend.username}'s Profile`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <span className="text-neutral-200 font-medium">{friend.username}</span>
                  {/* Dummy online indicator */}
                  <span className="ml-auto w-3 h-3 bg-green-500 rounded-full border border-black" title="Online"></span>
                </li>
              ))}
              {dummyUser.friends.length === 0 && (
                <p className="text-neutral-400 text-sm">No friends yet. Add some!</p>
              )}
            </ul>
            <div className="mt-6 text-right">

              <Link href="/friends/add" className='bg-neutral-950/95 hover:brightness-125  cursor-pointer justify-center flex items-center relative w-1/1 text-amber-200/80 p-2 rounded-full px-4'>
                  <div className='border-2 border-amber-200/30 absolute rounded-full inset-0'/>
               Add Friend
              </Link>
            </div>
            </div>
          <div className='w-full mx-auto'>
            <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
              <GlassCard
                // imageUrl='/Hyselin.webp'
                // rarity={5}
                // name='Light cone'
              />
            </div>
          </div>
          </aside>
          </main>
  );
}
