import React from "react";
import MovieCard from "./MovieCard";
import { useQuery } from "@tanstack/react-query";

interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
}

interface MovieGridProps {
  searchQuery: string;
}

const MovieGrid = ({ searchQuery }: MovieGridProps) => {
  const { data: movies, isLoading, error } = useQuery({
    queryKey: ["movies", searchQuery],
    queryFn: async () => {
      if (!searchQuery) return [];
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=c9780bdd&s=${searchQuery}&type=movie`
      );
      const data = await response.json();
      return data.Search || [];
    },
    enabled: searchQuery.length > 2,
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading movies...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error loading movies</div>;
  }

  if (!movies?.length && searchQuery.length > 2) {
    return <div className="text-center py-10">No movies found</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-6">
      {movies?.map((movie: Movie) => (
        <MovieCard
          key={movie.imdbID}
          id={movie.imdbID}
          title={movie.Title}
          poster={movie.Poster}
          year={movie.Year}
        />
      ))}
    </div>
  );
};

export default MovieGrid;