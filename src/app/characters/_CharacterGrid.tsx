'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchCharactersClient } from '@/lib/client/characters';
import type { ICharacter } from '@/types/character'; // Updated import to ICharacter

type Props = { initial: ICharacter[] }; // Updated type to ICharacter[]

export default function CharacterGrid({ initial }: Props) {
  const { data: chars, isFetching } = useQuery({
    queryKey: ['characters'],
    queryFn: fetchCharactersClient,
    initialData: initial,
    staleTime: 30_000,
  });

  return (
    <>
      {isFetching && <p className="text-sm text-indigo-400">Refreshing…</p>}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {chars.map((c) => (
          <div key={c.id} className="border rounded-xl p-4 shadow">
            <p className="font-semibold">{c.basicInfo.name}</p> {/* Access name from basicInfo */}
            <p className="text-xs text-gray-400">
              {c.basicInfo.element} • {c.basicInfo.path} {/* Access element and path from basicInfo */}
            </p>
            <p>
              {/* Rarity is now a string like "4-star", so parse it */}
              {'★'.repeat(parseInt(c.basicInfo.rarity.charAt(0)))}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
