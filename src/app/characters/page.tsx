// // src/app/characters/page.tsx
// import { cookies } from 'next/headers';
// import { fetchCharactersServer } from '@/lib/server/characters';
// import type { ICharacter } from '@/types/character'; // Updated import to ICharacter
// import CharactersClient from './CharactersClient';

// export default async function CharactersPage() {
//   const cookieStore = await cookies();
//   const chars: ICharacter[] = await fetchCharactersServer(cookieStore.toString());
//     return (
//     <>
//       <CharactersClient chars={chars}  />
//     </>
//     )
// }
///////////////////////////////////////////////
// src/app/characters/page.tsx
// This is the client-side component to display Honkai: Star Rail characters.
// It features an input for the user's UID and a list of characters.
// src/app/characters/page.tsx
// This is the client-side component to display Honkai: Star Rail characters.
// It features an input for the user's UID and a list of characters.
// src/app/characters/page.tsx
// This is the client-side component to display all Honkai: Star Rail characters.

"use client";

import React, { useState, useEffect } from 'react';
import { Loader2, Sword } from 'lucide-react'; // Using lucide-react for icons

// Define the shape of the character data we expect from the new API route.
interface Character {
    id: number;
    name: string;
    combatType: string;
    rarity: number;
    path: string;
    icon: string;
    portrait: string;
}

// The main CharactersPage component.
const CharactersPage = () => {
    // State to store the fetched character data.
    const [characters, setCharacters] = useState<Character[]>([]);
    // State to manage the loading status.
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // State to hold any error messages.
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetches the list of all characters from our local API route.
     */
    const fetchAllCharacters = async () => {
        setIsLoading(true);
        try {
            // Make the fetch call to the new server-side API route.
            const response = await fetch('/api/hsr/characters');
            const data: Character[] | { error: string } = await response.json();

            // Handle API errors.
            if (!response.ok || 'error' in data) {
                throw new Error(data.error || 'Failed to fetch characters.');
            }

            // Set the characters data if the fetch was successful.
            setCharacters(data as Character[]);
        } catch (err: any) {
            // Set the error message if something went wrong.
            setError(err.message);
            console.error(err);
        } finally {
            // Stop the loading indicator.
            setIsLoading(false);
        }
    };

    // Use useEffect to fetch the data when the component mounts.
    useEffect(() => {
        fetchAllCharacters();
    }, []);

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-8 flex flex-col items-center font-sans">
            <div className="w-full max-w-6xl bg-slate-800 rounded-2xl shadow-lg p-6 sm:p-10 my-8">
                <div className="flex items-center mb-6">
                    <Sword className="text-pink-400 w-8 h-8 mr-3" />
                    <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400">
                        Honkai: Star Rail Character Compendium
                    </h1>
                </div>

                {/* Conditional rendering for different states */}
                {isLoading && (
                    <div className="flex justify-center items-center h-48">
                        <Loader2 className="animate-spin text-indigo-400 w-12 h-12" />
                    </div>
                )}

                {error && (
                    <div className="bg-red-900/40 border border-red-700 text-red-300 p-4 rounded-xl text-center">
                        {error}
                    </div>
                )}

                {characters.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
                        {characters.map((char) => (
                            <div key={char.id} className="relative group bg-slate-700 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-200 ease-in-out border border-slate-600 overflow-hidden">
                                <img
                                    src={char.icon}
                                    alt={char.name}
                                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-200"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-4 w-full">
                                    <h3 className="text-lg font-bold text-indigo-300">{char.name}</h3>
                                    <p className="text-sm text-slate-300 font-medium">{char.combatType} | {char.path}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {characters.length === 0 && !isLoading && !error && (
                    <div className="bg-slate-700 p-6 rounded-xl text-center text-slate-400">
                        No characters found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default CharactersPage;
