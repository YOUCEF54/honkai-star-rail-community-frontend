// src/app/page.tsx
import Link from "next/link";
import { getUser } from "@/lib/auth";
import Image from "next/image";
import ScrapeButton from "@/components/ScrapeButton";
import ProfileLink from "@/components/ProfileLink";

export default async function HomePage() {
  const user = await getUser(); // null when not logged-in
  
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950/40 to-black/40 flex flex-col items-center justify-centerr relative text-white overflow-hidden"> {/* Added relative and overflow-hidden */}
      {/* Hero Section */}

       <Image
              width={500}
              height={500}
              alt='galaxy background'
              src='/bg3.jpeg'
              className={`fixed w-full left-0 h-screen object-cover  opacity-10 -z-10 inset-0 opacity-5m`}
              />
      <section className="relative z-10 w-full max-w-4xl text-center py-8 px-6  rounded-b-3xl shadow-xl"> {/* Added semi-transparent background */}
          <div className="flex max-sm:flex-col items-center sm:w-[36rem] mx-auto justify-between">
            <Image
            width={236}
            height={128}
            src="/Logo.png"
            alt="Honkai Star Rail logo"
            className="mb-6 max-sm:fixed hover:brightness-110 max-sm:h-14 max-sm:left-4 max-sm:top-4 h-40 w-auto"
            priority
          />
          <div className="relative">
            <Image
            width={236}
            height={128}
            src="/collab.png"
            alt="Honkai Star Rail logo"
            className="max-sm:hidden  shadow-white  sm:mb-6 h-11 w-auto"
            priority
            />
            <Image
            width={236}
            height={128}
            src="/collab.png"
            alt="Honkai Star Rail logo"
            className="blur absolute inset-0 opacity-30  shadow-white mb-6 h-11 w-auto"
            priority
            />
          </div>
            <Image
            width={236}
            height={128}
            src="/hsr_logo.png"
            alt="Honkai Star Rail logo"
            className=" mb-6 h-52 rounded-full hover:brightness-110 w-auto"
            priority
          />
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-lg">
            Honkai Star Rail Community Hub
          </h1>
          <p className="text-lg sm:text-xl text-indigo-200 drop-shadow-md">
            Builds, teams, guides &amp; discussion — all in one place!
          </p>

          {user ? (
            <div className="flex max-sm:flex-col relative items-center mt-6 gap-3 justify-center">
            <div className="relative text-indigo-200 font-medium rounded-l-fulll bg-indigo-800/50 px-4 py-2 w-fit  rounded-lgg shadow-md">

            <p className="z-10">
              Welcome back,
              <span className="font-semibol">{user.username}</span>! 
            </p>
            </div>
            <ProfileLink/>
            </div>
          ) : (
            <p className="mt-6 flex items-center w-fit mx-auto p-6 ">
              <Link
                className=" px-[4px] p-[3px] flex items-center w-fit bg-white hover:bg-white/90 text-gray-800 rounded-full  outline-offset-1"
                href="/auth/login"
              >
                <span className="border px-4 py-[3px] border-gray-600 rounded-full">
                Sign in
                </span>
              </Link>
              <span className="mx-2">or</span>
              <Link
                className="underline hover:text-indigo-300"
                href="/auth/register"
              >
                create an account
              </Link>
            </p>
          )}
      </section>

        {/* Quick Links */}
      <section className="relative tape-cardd  gap-5 transition-all duration-150 z-10 grid sm:grid-cols-3  w-full max-w-5xl px-6 mt-2  rounded-3xl shadow-2xl ">
    <LinkCard
      title="Characters"
      description="Browse builds & stats"
      href="/characters-test"
      src="/hsr_ch.avif"
      position="left"
    />
    <LinkCard
      title="Team Builder"
      description="Craft & share comps"
      href="/team-builder"
      src="/team.avif"
      position="middle"
    />
    <LinkCard
      title="Guides"
      description="Community tips & strategies"
      href="/guides"
      src="/guides.avif"
      position="right"
    />
      </section>

        {/* Render the new ScrapeButton Client Component */}
        {user?.roles?.includes('USER') && <ScrapeButton />}
    </main>
  );
}

/* ------------ Small reusable card component ------------ */

type CardProps = { title: string; description: string; href: string ,position :string, src: string};

function LinkCard({ title, description, href, src, position }: CardProps) {
  return (
    <Link
      href={href}
      className={`card-${position} brightness-105  hover:brightness-150 parallelogra group shadow shadow-white/20  border-[2px]j relative border-white/30 overflow-clip rounded-fulll p-6 px-8 transition  hover:-translate-y-1 bg-gray-800/50 `}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r border-2 border-white/20 m-1 rounded-fulll  z-20"></div>

      <div className="absolute inset-0 bg-gradient-to-r  from-black/90 via-black/85 to-black/40 z-10"></div>
      {/* Image */}
      <Image
        width={400}
        height={400}
        src={src}
        alt={`bg-${src}`}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Text Content */}
      <div className="relative z-20 parallelogram-contentt">
        <h2 className="text-xl font-semibold mb-1 group-hover:text-indigo-100">
          {title}
        </h2>
        <p className="text-gray-300">{description}</p>
      </div>
    </Link>
  );
}
