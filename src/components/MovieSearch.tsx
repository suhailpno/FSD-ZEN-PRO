import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface MovieSearchProps {
  onSearch: (query: string) => void;
}

const MovieSearch = ({ onSearch }: MovieSearchProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <Input
        type="text"
        placeholder="Search movies..."
        className="pl-10 w-full"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default MovieSearch;