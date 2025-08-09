// src/app/characters/page.tsx
import { cookies } from 'next/headers';
import { fetchCharactersServer } from '@/lib/server/characters';
import type { ICharacter } from '@/types/character'; // Updated import to ICharacter
import CharactersClient from './CharactersClient';

export default async function CharactersPage() {
  const cookieStore = await cookies();
  const chars: ICharacter[] = await fetchCharactersServer(cookieStore.toString());
    return (
    <>
      <CharactersClient chars={chars}  />
    </>
    )
}