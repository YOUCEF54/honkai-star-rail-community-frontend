import type { ICharacter } from '@/types/character';

/**
 * Server-only fetcher to get a single character by their name.
 * It forwards the cookie header to the backend for authentication.
 *
 * @param characterName The name of the character to fetch.
 * @param cookieHeader The cookie header string from the incoming request.
 * @returns A promise that resolves to a single ICharacter object.
 * @throws An error if the authentication token is not found or the API request fails.
 */
export async function fetchCharacterByNameServer(characterName: string, cookieHeader: string): Promise<ICharacter> {
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
    // Handle the case where there is no token
    throw new Error('Authentication token not found.');
  }

  // Construct the URL with the character's name
  const res = await fetch(`http://localhost:8080/api/characters/${characterName}`, {
    headers: headers,
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Backend error fetching character by name (${res.status}):`, errorText);
    throw new Error(`Backend ${res.status}: ${errorText || 'Unknown error'}`);
  }

  // The API is expected to return a single character object, not an array
  return res.json() as Promise<ICharacter>;
}
