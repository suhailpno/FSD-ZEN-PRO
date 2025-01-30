import React from "react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  id: string;
  title: string;
  poster: string;
  year: string;
}

const MovieCard = ({ id, title, poster, year }: MovieCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="relative overflow-hidden cursor-pointer transition-all hover:animate-movie-hover"
      onClick={() => navigate(`/movie/${id}`)}
    >
      <div className="aspect-[2/3] relative">
        <img 
          src={poster !== "N/A" ? poster : "/placeholder.svg"} 
          alt={title}
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h3 className="text-white font-semibold truncate">{title}</h3>
          <p className="text-white/80 text-sm">{year}</p>
        </div>
      </div>
    </Card>
  );
};

export default MovieCard;