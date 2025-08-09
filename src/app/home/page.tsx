'use client'; // This component will be a client component to handle state for the scraper button.

import { useState } from 'react';
import Link from 'next/link';

// NOTE: This is a standalone version.
// In a real app, you would replace this mock data with
// a server-side authentication check and data fetching.
const mockUser = {
  username: "AdminUser",
  roles: ["USER", "ADMIN"]
};
const isAdmin = mockUser && mockUser.roles.includes('ADMIN');
const user = mockUser;

const mockCommunityPosts = [
  { id: 1, title: "My favorite team comps for the new endgame mode", author: "Trailblazer42", date: "Jul 31, 2025", tags: ["Team Building", "Endgame"] },
  { id: 2, title: "Question about Ruan Mei's break effect", author: "AstaFan", date: "Jul 30, 2025", tags: ["Ruan Mei", "Team Building"] },
  { id: 3, title: "A new Kafka DoT guide for F2P players", author: "KafkaEnjoyer", date: "Jul 29, 2025", tags: ["Kafka", "DoT", "Guide"] },
];

export default function HomePage() {
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeMessage, setScrapeMessage] = useState<string | null>(null);

  const handleScrape = async () => {
    setIsScraping(true);
    setScrapeMessage("Starting to scrape data...");

    // Simulate an API call to a server-side endpoint
    // In your actual application, you would create an API route to handle this.
    try {
      // We are just simulating a 3-second scrape here.
      // Replace this with a real fetch call to your scraping API route.
      await new Promise(resolve => setTimeout(resolve, 3000));
      setScrapeMessage("Scraping complete! Check the dashboard.");
    } catch (error) {
      console.error("Scraping error:", error);
      setScrapeMessage("An error occurred during scraping.");
    } finally {
      setIsScraping(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-amber">
      {/* Background Visuals (using simple Tailwind/CSS) */}
      {/* <div className="absolute inset-0 z-0 bg-black bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,40,200,0.3),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 z-0 opacity-20" style={{
        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
      }}></div>
       */}
      {/* Main content container with a higher z-index */}
      <main className="relative max-w-[55rem] z-10 container mx-auto py-12 px-4">
        {/* Hero section with a welcome message */}
        <section className="text-center mb-12 py-16 backdrop-blur-sm bg-black/30 rounded-3xll border border-amber-200/50 shadow-xl">
          <h1 className="text-5xl md:text-7xl mb-2 font-extrabold text-amber-200">
            Star Rail Community
          </h1>
          <p className="text-xl md:text-2xl font-light text-amber-200/80">
            {user ? (
              <>Welcome back, <span className="font-semibold text-amber-200/90">{user.username}</span>!</>
            ) : (
              "Dive into the Honkai: Star Rail universe."
            )}
          </p>
          <div className="mt-8">
            {!user && (
              <Link href="/login">
                <button className="px-6 py-3 rounded-xlll border border-amber-500 text-amber font-medium hover:bg-amber-500 transition-colors duration-300">
                  Log In
                </button>
              </Link>
            )}
          </div>
        </section>

        {/* Conditional Admin Panel with integrated logic */}
        {isAdmin && (
          <div className="mb-8 p-6 rounded-3xll bg-black/30 backdrop-blur-sm border border-neutral-400/90 shadow-xl flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-neutral-400">Admin Tools</h2>
              <p className="text-sm text-neutral-200">This panel is visible only to administrators.</p>
            </div>
            <div className="flex gap-4 items-center">
              <button
                onClick={handleScrape}
                disabled={isScraping}
                className="px-6 py-3 rounded-xlll text-neutral-100 bg-neutral-600 text-amber font-semibold  cursor-pointer shadow-md hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isScraping ? "Scraping..." : "Run Web Scraper"}
              </button>
              <Link href="/dashboard">
                <button className="px-6 py-3 rounded-xlll border border-neutral-500/50 text-neutral-200 cursor-pointer font-medium hover:bg-amber-700 transition-colors duration-300">
                  View Scraped Data
                </button>
              </Link>
            </div>
            {scrapeMessage && (
              <p className="mt-4 w-full text-sm text-neutral-300">{scrapeMessage}</p>
            )}
          </div>
        )}

        {/* Community Posts Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-amber-200">Latest Community Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockCommunityPosts.map(post => (
              <div key={post.id} className="p-6 rounded-xll bg-amber-950/50 border border-amber-700/50 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-sm text-amber-500/70 dark:text-amber-200 mb-2">By {post.author} on {post.date}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-700 text-amber-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/posts">
              <button className="px-6 py-3 rounded-xll border border-amber-500 text-amber font-medium hover:bg-amber-700 transition-colors duration-300">
                View All Posts
              </button>
            </Link>
          </div>
        </section>

        {/* Sidebar Section */}
        <aside className="mt-8 space-y-8">
          {/* Character Spotlight Section */}
          <div className="p-6 rounded-xll bg-black/30 backdrop-blur-sm border border-amber-700 shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-amber-200">Character Spotlight</h3>
            <div className="text-center">
              <p>Today&apos;s featured character is:</p>
              <h4 className="text-2xl font-bold mt-2">Blade</h4>
              <p className="text-sm text-amber-200">A self-healing, self-damaging powerhouse.</p>
              <div className="mt-4">
                <Link href="/characters/blade">
                  <button className="px-6 py-3 rounded-xll bg-amber-600 text-amber font-semibold shadow-md hover:bg-amber-700 transition-colors">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
