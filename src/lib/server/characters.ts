import type { ICharacter } from '@/types/character'; // Using ICharacter as defined in types/character.ts

/** Server-only fetcher. Forward whatever cookie header the caller gives us. */
export async function fetchCharactersServer(cookieHeader: string): Promise<ICharacter[]> {
  // FIX: Change the URL to point to your Spring Boot backend
  const res = await fetch(`http://localhost:3000/api/characters`, {
    headers: cookieHeader ? { cookie: cookieHeader } : {},
    cache: 'no-store', // Ensures fresh data on each server-side render
  });

  if (!res.ok) {
    const errorText = await res.text(); // Get more details from the backend error
    console.error(`Backend error fetching characters (${res.status}):`, errorText);
    throw new Error(`Backend ${res.status}: ${errorText || 'Unknown error'}`);
  }
  return res.json() as Promise<ICharacter[]>;
}
