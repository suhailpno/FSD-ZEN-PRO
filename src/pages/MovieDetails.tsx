import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: movie, isLoading } = useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=c9780bdd&i=${id}&plot=full`
      );
      return response.json();
    },
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading movie details...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-primary/10">
      <div className="container py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2" size={20} />
          Back
        </Button>
        
        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          <div>
            <img
              src={movie?.Poster !== "N/A" ? movie?.Poster : "/placeholder.svg"}
              alt={movie?.Title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          
          <div>
            <h1 className="text-4xl font-bold mb-4">{movie?.Title}</h1>
            <div className="space-y-4">
              <p className="text-lg text-gray-600">{movie?.Plot}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Release Year</h3>
                  <p>{movie?.Year}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Runtime</h3>
                  <p>{movie?.Runtime}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Genre</h3>
                  <p>{movie?.Genre}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Director</h3>
                  <p>{movie?.Director}</p>
                </div>
              </div>
              
              <div className="pt-6">
                <Button className="w-full md:w-auto" size="lg">
                  Book Tickets
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;