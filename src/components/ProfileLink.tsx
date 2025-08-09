'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function ProfileLink(){
    const[profileOpen,setProfileOpen] = useState(false)
    return(
      <Link
              href="/profile"
              onMouseEnter={()=>setProfileOpen(true)}
              onMouseLeave={()=>setProfileOpen(false)}
              className="relative rounded-full  size-10 w-[45px]l  flex items-center justify-center  hover:brightness-100 rounded-r-fulll "
              > 
              <Image
              width={500}
              height={500}
              alt="profile"
              className="w-10 z-20"
              src="/pic.webp"/>
              <div className={`${profileOpen?"w-28 pr-1 opacity-100 ":"size-10 opacity-0 pr-0"} transition-all duration-400 overflow-hidden bg-indigo-800/50 flex items-center justify-end hover:bg-indigo-800/65 rounded-full h-full absolute left-0 `}>
                <div className={`${profileOpen?"border":""} z-10 border-white/40 p-1 pr-4 pl-8 rounded-full`}>
                    {profileOpen ? "Profile":""}
                </div>
                 <Image
                    width={500}
                    height={500}
                    alt="profile"
                    className=" top-0 h-full w-full z-0 absolute "
                    src="/bg_btn.jpg"/>
              </div>
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="auto"  height="auto"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"
                className="icon absolute  icon-tabler rounded-r-fulll borderr p-1 stroke-[1.5px] border-indigo-300/50 icons-tabler-outline size-[35px] w-[40px]l  stroke-indigo-200 icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg> */}
            </Link>
    )
  }