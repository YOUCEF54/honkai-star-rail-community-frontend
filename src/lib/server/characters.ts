import type { ICharacter } from '@/types/character';

/** Server-only fetcher. Forward whatever cookie header the caller gives us. */
export async function fetchCharactersServer(cookieHeader: string): Promise<ICharacter[]> {
  // Extract the JWT token from the cookie header
  // This is a simple way to parse it, you might need a more robust solution depending on your cookie format.
  const tokenMatch = cookieHeader.match(/token=([^;]+)/);
  const token = tokenMatch ? tokenMatch[1] : null;

  const headers: HeadersInit = {
    'cache-control': 'no-store',
    'content-type': 'application/json'
  };

  if (token) {
    // Add the token to the Authorization header in the correct "Bearer" format
    headers['Authorization'] = `Bearer ${token}`;
  } else {
    // Handle the case where there is no token (e.g., redirect to login)
    throw new Error('Authentication token not found.');
  }

  const res = await fetch(`http://localhost:8080/api/characters`, {
    headers: headers,
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Backend error fetching characters (${res.status}):`, errorText);
    throw new Error(`Backend ${res.status}: ${errorText || 'Unknown error'}`);
  }

  return res.json() as Promise<ICharacter[]>;
}