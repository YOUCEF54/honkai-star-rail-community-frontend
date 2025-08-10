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
'use client';
import { useState, useEffect } from "react";

export default function CharacterPage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
   async function fetchHSRUser() {
      const res = await fetch("/api/hsr/user");
      const data = await res.json();
      setUserData(data);
      console.log(data); // { uid: "800069903", nickname: "SampleUser", ... }
    }
    fetchHSRUser();
  }, []);

  return (
    <div>
      {userData ? (
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}