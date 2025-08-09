import React from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
const SearchInput = ({
  value,
  onChange,
  placeholder = 'Search...'
}: SearchInputProps) => {
  return <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <SearchIcon size={18} className="text-gray-400" />
      </div>
      <input type="text" value={value} onChange={e => onChange(e.target.value)} className="bg-gray-800 border border-gray-700 text-gray-100 pl-10 pr-10 py-2 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" placeholder={placeholder} />
      {value && <button onClick={() => onChange('')} className="absolute inset-y-0 right-0 flex items-center pr-3">
          <XIcon size={18} className="text-gray-400 hover:text-gray-200" />
        </button>}
    </div>;
};
export default SearchInput;