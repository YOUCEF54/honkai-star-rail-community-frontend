// src/lib/client/characters.ts

import type { ICharacter } from '@/types/character';

/** Client-side fetcher for characters. */
export async function fetchCharactersClient(): Promise<ICharacter[]> {
  const res = await fetch(`/api/characters`, {
    method: 'GET', // Explicitly set method
    credentials: 'include', // <--- IMPORTANT: This ensures cookies (like your JWT) are sent
    cache: 'no-store', // Ensures fresh data on each client-side fetch
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Backend error fetching characters (${res.status}):`, errorText);
    throw new Error(`Backend ${res.status}: ${errorText || 'Unknown error'}`);
  }
  return res.json() as Promise<ICharacter[]>;
}
