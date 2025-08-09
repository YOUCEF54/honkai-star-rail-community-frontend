'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ch_icon from "../../public/ch_icon.svg"
import { useSidebar } from './context/sidebar-context';
import { useModal } from './context/modal-context';
import { usePathname } from 'next/navigation'; // Import usePathname

import { useClickOutside } from './hooks/useClickOutside';
import { ChevronDown, ChevronDownCircleIcon } from 'lucide-react';


interface SidebarProps {
  children?: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const pathname = usePathname();

  const menuRef = useRef<HTMLDivElement>(null);
  
  useClickOutside(menuRef, () => {
    setProfileMenu(false);
  });

  const { 
    isExpanded, 
    setIsExpanded,
    isLeftSidebarOpen,
    setIsLeftSidebarOpen 
  } = useSidebar();

  const { 
    isModalOpen, 
    setIsModalOpen,
  } = useModal();
  

  const navLinks = [
    { name: 'Home', href: '/home', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
    )},
    { name: 'Characters', href: '/characters-test', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
    )},
    { name: 'Teams', href: '/team-builder', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18H4v-3a6 6 0 0112 0v3z"></path></svg>
    )},
    { name: 'Guides', href: '/guides', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 2h2v2H6V6zm0 4h2v2H6v-2zm0 4h2v2H6v-2zm4-4h2v2h-2v-2zm0 4h2v2h-2v-2zm0-8h2v2h-2V6zm4 0h2v2h-2V6zm0 4h2v2h-2v-2z" clipRule="evenodd"></path></svg>
    )},
    { name: 'Data Bank', icon: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.3-.837-2.918.668-2.03 2.03a1.532 1.532 0 01-.947 2.285c-1.56.38-1.56 2.6 0 2.98a1.532 1.532 0 01.948 2.286c-.837 1.3.668 2.919 2.03 2.03a1.532 1.532 0 012.285.947c.38 1.56 2.6 1.56 2.98 0a1.532 1.532 0 012.286-.948c1.3.837 2.918-.668 2.03-2.03a1.532 1.532 0 01.947-2.285c1.56-.38 1.56-2.6 0-2.98a1.532 1.532 0 01-.948-2.286c.837-1.3-.668-2.918-2.03-2.03a1.532 1.532 0 01-2.285-.947zM10 11a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>),
      subLinks :[ 
        { name: 'Characters', href: '/characters-test', icon: (<Image width={25} height={25} className='size-7.5 bg-red- w-5.5 object-cover' src="/ch_icon.png" alt='character icone'/>)},
        { name: 'Light Cones', href: '/databank/light-cones', icon: (
<svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-cards"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.348 3.169l-7.15 3.113a2 2 0 0 0 -1.03 2.608l4.92 11.895a1.96 1.96 0 0 0 2.59 1.063l7.142 -3.11a2.002 2.002 0 0 0 1.036 -2.611l-4.92 -11.894a1.96 1.96 0 0 0 -2.588 -1.064z" /><path d="M16 3a2 2 0 0 1 1.995 1.85l.005 .15v3.5a1 1 0 0 1 -1.993 .117l-.007 -.117v-3.5h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" /><path d="M19.08 5.61a1 1 0 0 1 1.31 -.53c.257 .108 .505 .21 .769 .314a2 2 0 0 1 1.114 2.479l-.056 .146l-2.298 5.374a1 1 0 0 1 -1.878 -.676l.04 -.11l2.296 -5.371l-.366 -.148l-.402 -.167a1 1 0 0 1 -.53 -1.312z" /></svg>        )},
        { name: 'Relics', href: '/databank/light-cones', icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.3-.837-2.918.668-2.03 2.03a1.532 1.532 0 01-.947 2.285c-1.56.38-1.56 2.6 0 2.98a1.532 1.532 0 01.948 2.286c-.837 1.3.668 2.919 2.03 2.03a1.532 1.532 0 012.285.947c.38 1.56 2.6 1.56 2.98 0a1.532 1.532 0 012.286-.948c1.3.837 2.918-.668 2.03-2.03a1.532 1.532 0 01.947-2.285c1.56-.38 1.56-2.6 0-2.98a1.532 1.532 0 01-.948-2.286c.837-1.3-.668-2.918-2.03-2.03a1.532 1.532 0 01-2.285-.947zM10 11a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
        )},
  ]
  },
    { name: 'Settings', href: '/settings', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.3-.837-2.918.668-2.03 2.03a1.532 1.532 0 01-.947 2.285c-1.56.38-1.56 2.6 0 2.98a1.532 1.532 0 01.948 2.286c-.837 1.3.668 2.919 2.03 2.03a1.532 1.532 0 012.285.947c.38 1.56 2.6 1.56 2.98 0a1.532 1.532 0 012.286-.948c1.3.837 2.918-.668 2.03-2.03a1.532 1.532 0 01.947-2.285c1.56-.38 1.56-2.6 0-2.98a1.532 1.532 0 01-.948-2.286c.837-1.3-.668-2.918-2.03-2.03a1.532 1.532 0 01-2.285-.947zM10 11a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
    )},
  ];

  const [profileMenu, setProfileMenu] = useState(false)
  const [isOpenDataBank, setIsOpenDatabank] = useState(false)
  return (
    <main className={`min-h-screen flex relative text-white overflow-hidden  `}>
      <button 
        onClick={() => setIsExpanded(!isExpanded)} 
        className={`fixed ${isModalOpen && "hidden"} max-lg:hidden ${isExpanded ? " top-10" : "top-18"} right-8 transition-all duration-300 z-50 cursor-pointer backdrop-blur-md bg-white/10 hover:bg-white/20 p-2 rounded-full`}
      >
        {!isExpanded?
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
            className="icon  icon-tabler icons-tabler-outline icon-tabler-arrows-maximize">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M16 4l4 0l0 4" />
          <path d="M14 10l6 -6" />
          <path d="M8 20l-4 0l0 -4" />
          <path d="M4 20l6 -6" />
          <path d="M16 20l4 0l0 -4" />
          <path d="M14 14l6 6" />
          <path d="M8 4l-4 0l0 4" />
          <path d="M4 4l6 6" />
        </svg>
        :
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-minimize"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 19v-2a2 2 0 0 1 2 -2h2" /><path d="M15 5v2a2 2 0 0 0 2 2h2" /><path d="M5 15h2a2 2 0 0 1 2 2v2" /><path d="M5 9h2a2 2 0 0 0 2 -2v-2" /></svg>
        }
      </button>
        {/* ------------------------------------- profileMenu -------------------------------------- */}
        <div>
          {profileMenu&&<div className='fixed cursor-pointer z-50 right-2 size-14 bg-transparent'/>}
          <div ref={menuRef} className={`fixed w-60 ${!profileMenu && "hidden"} bg-gradient-to-b from-neutral-950 via-neutral-950 to-black/90 drop-shadow-2xl drop-shadow-amber-200/5  backdrop-blur-lg rounded-3xll text-neutral-200 gap-2 top-16 right-2 flex flex-col p-2 border border-neutral-200  z-[90]`}>
              <Link href="/profile"    className='cursor-pointer flex items-center gap-2 border border-neutral-200 hover:bg-neutral-900 bg-neutral-950 p-1 px-2 rounded-2xll'>
                <Image
                  src="/pic.jpg"
                  width={500}
                  height={500}
                  alt='pic'
                  className='aspect-square border border-neutral-200 w-9 rounded-fulll'
                />
                <div className='text-left'>
                  <div>View profile</div>
                  <div className=' text-[12px] opacity-80'>u/star_ranger70821</div>
                </div>
              </Link>
              <Link href="/profile" className='cursor-pointer border flex items-center gap-5 border-neutral-200 hover:bg-neutral-900 bg-neutral-950 p-1 px-4 rounded-2xll'>
                <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-eye-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M11.192 17.966c-3.242 -.28 -5.972 -2.269 -8.192 -5.966c2.4 -4 5.4 -6 9 -6c3.326 0 6.14 1.707 8.442 5.122" /><path d="M18.42 15.61a2.1 2.1 0 0 1 2.97 2.97l-3.39 3.42h-3v-3l3.42 -3.39z" /></svg>
                Edite profile
              </Link> 
              <button className='cursor-pointer border flex items-center gap-5 border-neutral-200 hover:bg-neutral-900 bg-neutral-950 p-1 px-4 rounded-2xll'>
                <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="currentColor"
                      className="icon icon-tabler icons-tabler-filled icon-tabler-moon"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z" /></svg>
                <span>Dark mode</span>
              </button> 
              <button className='cursor-pointer border flex items-center gap-5 border-neutral-200 hover:bg-neutral-900 bg-neutral-950 p-1 px-4 rounded-2xll'>
                <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-eye-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M11.192 17.966c-3.242 -.28 -5.972 -2.269 -8.192 -5.966c2.4 -4 5.4 -6 9 -6c3.326 0 6.14 1.707 8.442 5.122" /><path d="M18.42 15.61a2.1 2.1 0 0 1 2.97 2.97l-3.39 3.42h-3v-3l3.42 -3.39z" /></svg>
                Edite profile
              </button> 
              <button className='cursor-pointer border flex items-center gap-5 border-neutral-200 hover:bg-neutral-900 bg-neutral-950 p-1 px-4 rounded-2xll'>
              
              <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round" 
                    className="icon icon-tabler icons-tabler-outline icon-tabler-logout"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>  Log Out
              </button> 
              <hr className='border-neutral-200 my-2'/>
              <button className='cursor-pointer border flex items-center gap-5 border-neutral-200 hover:bg-neutral-900 bg-neutral-950 p-1 px-4 rounded-2xll'>
              <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-settings"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>
                Settings
              </button> 
          </div>
        </div>

      {/* Left Sidebar */}
      <aside className={`fixed overflow-hidden top-0 bottom-0 bg-black/80 shadow-2xl border-r border-neutral-800l border-neutral-200/30 backdrop-blur-sm z-50 transition-all duration-300 ease-in-out
                     ${isLeftSidebarOpen ? 'w-72 translate-x-0' : 'w-0 -translate-x-full'}
                     ${isExpanded || isModalOpen ? " lg:w-0 ":" lg:w-56 "} lg:translate-x-0`}>
        <div className='border-b border-neutral-800l border-neutral-200/30 absolute inset-0 h-14 flex items-center'>
          <Link href="/">
            <Image
              src={"/logo_text_only.png"}
              width={500}
              height={128}
              className='w-18  ml-8 lg:ml-8 cursor-pointer'
              alt='HSR logo'
            />
          </Link>
          <button
            onClick={() => setIsLeftSidebarOpen(false)}
            className={`absolute ${!isLeftSidebarOpen&&"hidden"} right-4 z-[60] p-2 rounded-full cursor-pointer text-white lg:hidden`}
          >
            <svg className="w-6 h-6 " fill="currentColor" viewBox="0 0 24 24">
              <path d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06z"></path>
            </svg>
          </button>
        </div>
        
        <nav className="space-y-3 flex flex-col xl:mt-24 mt-20">
          {navLinks.filter(l=>l.name).map(link => (
            link.name !== "Data Bank" ?<Link
              key={link.name}
              href={link.href}
              className={`flex ${pathname == link.href && "bg-neutral-200/10"} justify-start p-2 px-6 text-md font-normal text-white hover:brightness-110 transition-colors duration-200 opacity-100 ${!isLeftSidebarOpen && "opacity-0"}`}
              onClick={() => setIsLeftSidebarOpen(false)}
            >
              {link.icon}
              <span className="inline-block ml-3">{link.name}</span>
            </Link>:
            <div className=' bg-neutral-100/0 ' key={link.name}>
              <div className='flex items-center bg-neutral-200/0 justify-between pr-4'>
                <div className='px-6 p-2 flex gap-2 '>
                  <Image
                  width={25}
                  height={2}
                  className=' size-5 aspect-square'
                  src={"/databank_white.png"}
                  alt=''
                  />
                  Data Bank
                </div>
                <ChevronDown onClick={()=>setIsOpenDatabank(!isOpenDataBank)} className={`size-6.5 cursor-pointer transition-all duration-200 ${isOpenDataBank?" rotate-180":" rotate-0"} hover:bg-neutral-600/50  rounded-full text-neutral-300 p-1`}/>
              </div>
              <div className={`${isOpenDataBank?"h-33":"h-0"}  transition-all duration-300 overflow-clip`}>

              {link.subLinks?.map((sublink)=>(
                <Link
                key={sublink.name}
                href={sublink.href}
                className={`flex ${pathname == sublink.href && "bg-neutral-200/10"} border-l border-neutral-100/20 h-10 hover:bg-neutral-200/10 justify-start p-2 my-1 ml-8 px-4 text-md font-normal text-white hover:brightness-110 transition-colors duration-200 opacity-100 ${!isLeftSidebarOpen && "opacity-0"}`}
                onClick={() => setIsLeftSidebarOpen(false)}
                >
              {sublink.icon}
              <span className="inline-block ml-3">{sublink.name}</span>
            </Link>
              ))}
              </div>
            </div>

          ))}
          <hr className="border-neutral-200/30  my-4" />
        
         <button className=' shrink-0   hover:brightness-115 cursor-pointer relative  overflow-hidden object-cover border border-neutral-700/70 '>
              <Image
                width={500}
                height={500}
                alt='play Honkai: Star Rail now'
                src={"/hsr_ch.avif"}
                className='-translate-y-4 -z-20 absolute'
              />
              <div className='bg-gradient-to-r flex p-2 items-start w-full gap-2  flex-col from-black/60 to-black/85 '>
                <span className='p-1 font-medium text-gray-100 py-0.5 text-sm  left-2 top-1'>Honkai: Star Rail</span>
                <span className='p-1 py-[1px] text-[12px] w-fit bg-rose-700/80  left-2 bottom-2'>Play Now!</span>
              </div>
          </button>
        </nav>

      </aside>

      {/* Overlay for mobile */}
      {isLeftSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 lg:hidden"
          onClick={() => setIsLeftSidebarOpen(false)}
        ></div>
      )}

      {/* Content Area */}
      <div className={`flex-1 outline-none z-10 flex flex-col
                       ${isLeftSidebarOpen ? '  ' : 'ml-0 relative'}
                       ${!isExpanded ?"lg:ml-56":"lg:ml-0"}
                       transition-all duration-300 ease-in-out`}>
        <div className="grid grid-cols-1  gap-0 h-full">
          <div className={` duration-300 transition-all  overflow-hidden ${(!isExpanded ) ? "lg:pr-56 h-14":" h-0"} transition-all duration-300 backdrop-blur-lg z-50 fixed flex items-center justify-between border-b border-neutral-200/30 bg-black/60 w-full`}>
            <button
              onClick={() => setIsLeftSidebarOpen(true)}
              className="ml-4 cursor-pointer z-[60] p-2 rounded-full text-white lg:hidden"
            >
              <svg className="w-6 h-6 " fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
              </svg>
            </button>
            
            <div className='absolute w-full'>
              <Image
                src={"/logo_text_only.png"}
                width={500}
                height={128}
                className={`w-18 hover:brightness-110 cursor-pointer max-sm:hidden lg:hidden mx-auto ${isLeftSidebarOpen && 'hidden'}`}
                alt='HSR logo'
              />
            </div>
            {/* ----------------------- Profile Link ------------------------------------------- */}
            <div className='flex lg:w-full flex-row-reverse justify-start '>
              <div className='relative'>
                <button
                  onClick={(e)=>{
                    if(profileMenu == true){
                      console.log("onClick while profile menu is open")
                    } else {
                      setProfileMenu(!profileMenu)
                    }
                  }}
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="shawarma Instagram page"
                  className='mr-3 rounded-fulll border border-neutral-200 overflow-clip aspect-square relative z-10 cursor-pointer hover:scale-105 hover:brightness-105  h-10 flex items-center justify-center'
                >
                  
                  <Image
                    src="/pic.jpg"
                    width={500}
                    height={500}
                    alt='pic'
                    className='aspect-square rounded-fulll'
                  />
                </button>
               
              </div>
        
            {/* ----------------------- Social Links ------------------------------------------- */}
             
              <button
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="shawarma Facebook group"
                className='mr-6 relative  z-10 border border-neutral-200 cursor-pointer hover:scale-105 hover:brightness-105 bg-[#039be5] h-10 flex items-center  aspect-square justify-center'
              >
                <svg className='size-8 z-40' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={"auto"} height={"auto"} viewBox="0 0 48 48">
                  <path fill="transparent" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path>
                  <path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
                </svg>
                <Image
                  src="/shawarma.jpg"
                  width={500}
                  height={500}
                  alt='shawarma'
                  className='absolute h-full object-cover opacity-35'
                />
              </button>

               <button
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="shawarma Instagram page"
                className='mr-2 relative  z-10 cursor-pointer border border-neutral-200 aspect-square hover:scale-105 hover:brightness-105 bg-[#FF0061] h-10 flex items-center  justify-center'
              >
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="transparent" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon z-40 icon-tabler icons-tabler-outline icon-tabler-brand-instagram">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/> 
                  <path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                  <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                  <path d="M16.5 7.5v.01" />
                </svg>
                <Image
                  src="/shawarma.jpg"
                  width={500}
                  height={500}
                  alt='shawarma'
                  className='absolute h-full object-cover opacity-35'
                />
              </button>
              
            </div>
          </div>
          
          <div className={`${isExpanded || isModalOpen?"lg:mt-0":" mt-14"} transition-all duration-300 relative  w-full`}>
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}