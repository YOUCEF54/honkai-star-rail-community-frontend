import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';

// Import the server-side utility function to get the user
import { getUser } from "@/lib/auth";

// Import the client components we've created
import GalaxyBackground from "@/components/GalaxyBackground";
import GlassEffect from "@/components/GlassEffect";

// This is a client component wrapper for the ScrapeButton
// We need this because server components cannot handle client-side interactions
// or use 'use client' components directly.
import AdminPanel from "./_components/AdminPanel"; 

// Example placeholder component for a recent post card
const RecentPostCard = ({ title, author, date, tags }: { title: string; author: string; date: string; tags: string[] }) => (
  <Card className="hover:shadow-lg transition-shadow duration-300">
    <CardHeader>
      <CardTitle className="text-lg">{title}</CardTitle>
      <p className="text-sm text-gray-500 dark:text-gray-400">By {author} on {date}</p>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Badge key={index} variant="secondary">{tag}</Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);

// This is a Next.js Server Component
export default async function HomePage() {
  // Fetch user data on the server side
  const user = await getUser();
  const isAdmin = user && user.roles.includes('ADMIN');

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Background visual components */}
      <GalaxyBackground />
      <GlassEffect />
      
      {/* Main content container with appropriate z-index to be on top */}
      <main className="relative z-10 container mx-auto py-12 px-4">
        {/* Hero section with a welcome message */}
        <section className="text-center mb-12 py-16 backdrop-blur-sm bg-black/30 rounded-3xl border border-gray-700/50 shadow-xl">
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 animate-pulse">
            Star Rail Community
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-200">
            {user ? (
              <>Welcome back, <span className="font-semibold text-purple-300">{user.username}</span>!</>
            ) : (
              "Dive into the Honkai: Star Rail universe."
            )}
          </p>
          <div className="mt-8">
            {!user && (
              <Link href="/login">
                <Button variant="outline" className="text-white border-purple-500 hover:bg-purple-500 transition-colors">
                  Log In
                </Button>
              </Link>
            )}
          </div>
        </section>

        {/* Conditional Admin Panel */}
        {isAdmin && (
          <AdminPanel />
        )}

        {/* Featured Content & Community Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Community Posts Section */}
          <section className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6 text-purple-400">Latest Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Placeholder posts - replace with real data fetching */}
              <RecentPostCard title="New Kafka DoT Guide" author="Trailblazer42" date="Jul 28, 2025" tags={["Kafka", "DoT", "Guide"]} />
              <RecentPostCard title="Question about Ruan Mei's break effect" author="AstaFan" date="Jul 27, 2025" tags={["Ruan Mei", "Team Building"]} />
              <RecentPostCard title="Looking for teammates for farming" author="HimekoLover" date="Jul 26, 2025" tags={["Co-op", "Farming"]} />
              <RecentPostCard title="Poll: Best 5-star light cone?" author="SilverWolfMain" date="Jul 26, 2025" tags={["Light Cones", "Poll"]} />
            </div>
            <div className="text-center mt-8">
              <Link href="/posts">
                <Button variant="outline" className="text-white border-gray-500 hover:bg-gray-700">View All Posts</Button>
              </Link>
            </div>
          </section>

          {/* Sidebar Section */}
          <aside className="lg:col-span-1 space-y-8">
            {/* Featured Guides Section */}
            <Card className="bg-black/30 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-purple-400">Featured Guides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Top guides and character builds curated by the community.</p>
                <ul className="space-y-2">
                  <li><Link href="/guides/kafka-build" className="text-blue-400 hover:text-blue-300">Kafka: Ultimate DoT Build</Link></li>
                  <li><Link href="/guides/fuxuan-breakdown" className="text-blue-400 hover:text-blue-300">Fu Xuan: A Master of Survival</Link></li>
                  <li><Link href="/guides/speed-tuning-101" className="text-blue-400 hover:text-blue-300">A Guide to Speed Tuning</Link></li>
                </ul>
              </CardContent>
            </Card>

            {/* Character Spotlight Section */}
            <Card className="bg-black/30 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-purple-400">Character Spotlight</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>Today's featured character is:</p>
                <h3 className="text-2xl font-bold mt-2">Blade</h3>
                <p className="text-sm text-gray-400">A self-healing, self-damaging powerhouse.</p>
                <div className="mt-4">
                  <Link href="/characters/blade">
                    <Button variant="default" className="bg-purple-600 hover:bg-purple-700">Learn More</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}
