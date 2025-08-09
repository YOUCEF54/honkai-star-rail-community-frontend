// Note: This is a self-contained component. In a real Next.js project,
// you would have Tailwind CSS configured globally, so you wouldn't need
// to import a stylesheet or a CDN link.

import React from 'react';

// Main component for the Beginner's Guide page
const BeginnersGuide = () => {
  return (
    <div className="antialiased text-gray-800 bg-gray-50 min-h-screen">
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl overflow-hidden">
          
          {/* Header Section */}
          <div className="bg-gray-900 text-white p-6 sm:p-8 rounded-t-3xl">
            <a href="#" className="flex items-center text-gray-300 hover:text-white transition-colors duration-200 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Back to Guides
            </a>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight">Beginner's Guide to the Galaxy: Honkai: Star Rail</h1>
            <p className="mt-2 text-gray-400">Welcome, Trailblazer! The cosmos is vast and full of wonders, but it can also be a little overwhelming. This guide will help you get your bearings and start your journey on the right foot. Let's get you ready for the Express!</p>
          </div>

          {/* Image for the hero section of the guide */}
          <img 
            src="https://placehold.co/900x300/1e293b/d1d5db?text=Honkai+Star+Rail+Banner" 
            alt="A wide banner image showing a scenic view from Honkai: Star Rail" 
            className="w-full h-auto object-cover rounded-none sm:rounded-t-3xl"
          />

          {/* Main Content Section */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Section 1: First Steps */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. The Very Beginning: Your First Steps</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Once you've boarded the Astral Express, you'll be introduced to the core concepts of the game through the main story. Don't worry too much about optimizing everything right away. Your first priorities should be to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li className="pl-2">
                  <span className="font-semibold text-gray-900">Follow the Main Story:</span> The main story quests (labeled with a golden compass icon) will introduce you to key mechanics, characters, and worlds. This is your primary source of experience (Trailblaze EXP) in the early game.
                </li>
                <li className="pl-2">
                  <span className="font-semibold text-gray-900">Explore & Interact:</span> Interact with everything! Containers, books, and NPCs often have hidden lore or small rewards. The game's worlds are filled with secrets.
                </li>
                <li className="pl-2">
                  <span className="font-semibold text-gray-900">Use Your Trailblaze Power:</span> This is the game's energy system (similar to stamina). Use it on the golden Calyxes or Caverns of Corrosion to get character and Light Cone materials. It replenishes over time, so don't let it sit at maximum.
                </li>
              </ul>
            </div>

            <hr className="border-t-2 border-gray-200" />

            {/* Section 2: Combat with images */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Mastering the Fundamentals of Combat</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Honkai: Star Rail uses a turn-based combat system. While it seems simple, there are layers of strategy you'll need to learn.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
                <img 
                  src="https://placehold.co/250x150/1e293b/d1d5db?text=Weakness+Break" 
                  alt="An illustration of an enemy with a toughness bar being broken" 
                  className="w-full sm:w-1/3 rounded-lg shadow-md"
                />
                <p className="text-gray-700 leading-relaxed flex-1">
                  <span className="font-semibold text-gray-900">Elements & Weakness Break:</span> Every enemy has a weakness to one or more Elements (e.g., Fire, Ice, Wind, etc.). Hitting an enemy with their weakness will deplete their Toughness bar (the white bar above their HP). Once the Toughness bar is gone, you trigger a <span className="font-bold">Weakness Break</span>, which deals a burst of damage, delays their turn, and applies a debuff based on the element used.
                </p>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li className="pl-2">
                  <span className="font-semibold text-gray-900">Skill Points (SP):</span> Your team shares a pool of Skill Points. Basic attacks generate SP, while most character Skills consume SP. The key is to balance using basic attacks to build SP and using skills to deal damage or support your team.
                </li>
                <li className="pl-2">
                  <span className="font-semibold text-gray-900">Ultimate Abilities:</span> Ultimates are powerful moves that charge up as you deal and take damage. Use them strategically, as they can be activated at any time, even during an enemy's turn.
                </li>
              </ul>
            </div>

            <hr className="border-t-2 border-gray-200" />

            {/* Section 3: Team Building with images */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Building Your First Team</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your team consists of four characters. A balanced team is crucial for success. Here's a simple template for a beginner-friendly team:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col items-center text-center">
                  <img 
                    src="https://placehold.co/100x100/1e293b/d1d5db?text=DPS" 
                    alt="Placeholder icon for a Damage-Dealer character" 
                    className="rounded-full shadow-md mb-2"
                  />
                  <p className="font-semibold">Damage-Dealer</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <img 
                    src="https://placehold.co/100x100/1e293b/d1d5db?text=Support" 
                    alt="Placeholder icon for a Support character" 
                    className="rounded-full shadow-md mb-2"
                  />
                  <p className="font-semibold">Support</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <img 
                    src="https://placehold.co/100x100/1e293b/d1d5db?text=Sub-DPS" 
                    alt="Placeholder icon for a Sub-DPS character" 
                    className="rounded-full shadow-md mb-2"
                  />
                  <p className="font-semibold">Sub-DPS</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <img 
                    src="https://placehold.co/100x100/1e293b/d1d5db?text=Healer" 
                    alt="Placeholder icon for a Healer or Shielder character" 
                    className="rounded-full shadow-md mb-2"
                  />
                  <p className="font-semibold">Healer/Shielder</p>
                </div>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li className="pl-2"><span className="font-semibold text-gray-900">Damage-Dealer (DPS):</span> Your main source of damage. Look for a character with high Attack stats and abilities that deal significant damage to single targets or multiple enemies.</li>
                <li className="pl-2"><span className="font-semibold text-gray-900">Support:</span> A character who buffs your DPS's damage, such as a Harmony character (e.g., Asta, Tingyun).</li>
                <li className="pl-2"><span className="font-semibold text-gray-900">Sub-DPS/Utility:</span> A character who provides secondary damage or useful effects. This could be a character who applies DoT (Damage over Time) or a character who can apply debuffs to enemies.</li>
                <li className="pl-2"><span className="font-semibold text-gray-900">Healer/Shielder:</span> A character to keep your team alive. Healers restore HP, while Shielder's prevent damage. Having at least one is essential for most content.</li>
              </ol>
            </div>

            <hr className="border-t-2 border-gray-200" />

            {/* Section 4: Character Progression with images */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Character Progression</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                There are several ways to make your characters stronger. Focus on these early on:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold text-gray-900">Traces:</span> These are a character's passive abilities and stat boosts. They unlock as you level up and use various materials to activate. Prioritize your DPS's Traces first.
                  </p>
                  <img 
                    src="https://placehold.co/400x250/1e293b/d1d5db?text=Traces+Skill+Tree+UI" 
                    alt="A screenshot of a character's Traces skill tree in Honkai: Star Rail" 
                    className="w-full rounded-xl shadow-md"
                  />
                </div>
                <div>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold text-gray-900">Relics:</span> These are your character's gear. Early on, don't worry about getting the perfect set. Just use what you get and focus on getting Relics with the correct main stats (e.g., ATK% on your DPS).
                  </p>
                  <img 
                    src="https://placehold.co/400x250/1e293b/d1d5db?text=Relics+Gear+UI" 
                    alt="A screenshot of a character's Relic gear slots" 
                    className="w-full rounded-xl shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer/Conclusion */}
          <div className="bg-gray-100 p-6 sm:p-8 rounded-b-3xl text-center">
            <p className="text-gray-600">
              By following these initial steps, you'll be well-equipped to tackle the early challenges and enjoy the rich story and worlds of Honkai: Star Rail. Good luck on your journey, Trailblazer!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeginnersGuide;
