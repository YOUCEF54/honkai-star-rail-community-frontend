import CharacterCard from './CharacterCard';
import type { ICharacter } from '@/types/character';

export default function CharactersList({
  isExpanded,
  chars,
  selectedPath
}: {
  isExpanded: boolean;
  chars: ICharacter[];
  selectedPath: string;
}) {
  const filtered = selectedPath === "All" ? chars : chars.filter(c => c.basicInfo.path === selectedPath);

  return (
    <div className={`grid gap-6 sm:grid-cols-2 md:grid-cols-3 w-full ${isExpanded ? "lg:grid-cols-5" : "lg:grid-cols-3"} xl:grid-cols-4 2xl:grid-cols-5`}>
      {filtered.map(c => <CharacterCard key={c.id} c={c} />)}
    </div>
  );
}
