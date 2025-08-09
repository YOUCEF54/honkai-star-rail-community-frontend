'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// NOTE: This is a standalone component.
// In a real application, this data would be fetched from a server-side API.
const mockScrapedData = [
  { id: 1, title: 'Top 10 Builds for Jingliu', source: 'Honkai-Star-Rail.com', date: '2025-07-30' },
  { id: 2, title: 'The Best Free-to-Play Light Cones', source: 'StarRail-Guides.net', date: '2025-07-29' },
  { id: 3, title: 'Version 2.3 Ruan Mei Rerun Confirmed', source: 'News.StarRail', date: '2025-07-28' },
  { id: 4, title: 'A Comprehensive Guide to Simulated Universe', source: 'Community Wiki', date: '2025-07-27' },
];

export default function DashboardPage() {
  const [data, setData] = useState<typeof mockScrapedData>([]);
  const [isLoading, setIsLoading] = useState(true);

  // In a real app, this effect would call an API route.
  useEffect(() => {
    const fetchData = async () => {
      // Simulate an API call
      setIsLoading(true);
      try {
        // await new Promise(resolve => setTimeout(resolve, 1500));
        setData(mockScrapedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen w-full overflow-hidden bg-black text-white p-4 sm:p-8">
      {/* Background Visuals */}
      <div className="absolute inset-0 z-0 bg-black bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,40,200,0.3),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 z-0 opacity-20" style={{
        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
      }}></div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto py-12 px-4">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 sm:mb-0">
            Scraped Articles Dashboard
          </h1>
          <Link href="/">
            <button className="px-6 py-3 rounded-xl border border-gray-500 text-white font-medium hover:bg-gray-700 transition-colors duration-300">
              Back to Home
            </button>
          </Link>
        </header>

        {/* Data Table */}
        <section className="p-6 rounded-3xl bg-black/30 backdrop-blur-sm border border-purple-700 shadow-xl overflow-x-auto">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">Scraped Articles</h2>
          {isLoading ? (
            <div className="text-center py-10 text-gray-400">Loading data...</div>
          ) : (
            <table className="min-w-full table-auto">
              <thead className="text-left text-gray-300">
                <tr>
                  <th className="py-2 px-4 border-b border-gray-600">ID</th>
                  <th className="py-2 px-4 border-b border-gray-600">Title</th>
                  <th className="py-2 px-4 border-b border-gray-600">Source</th>
                  <th className="py-2 px-4 border-b border-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                    <td className="py-3 px-4">{item.id}</td>
                    <td className="py-3 px-4 text-purple-300">{item.title}</td>
                    <td className="py-3 px-4 text-gray-400">{item.source}</td>
                    <td className="py-3 px-4 text-gray-500">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
}
