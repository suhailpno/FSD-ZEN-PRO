import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieSearch from "@/components/MovieSearch";
import MovieGrid from "@/components/MovieGrid";
import { supabase } from "@/integrations/supabase/client";

const defaultMovies = [
  "tt0468569", // The Dark Knight
  "tt0993846", // The Wolf of Wall Street
  "tt0816692", // Interstellar
  "tt0109830", // Forrest Gump
  "tt0133093", // The Matrix
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) navigate("/auth");
    };
    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-primary/10">
      <div className="container py-8">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">
          Book Your Movie Experience
        </h1>
        <div className="max-w-xl mx-auto mb-8">
          <MovieSearch onSearch={setSearchQuery} />
        </div>
        {!searchQuery && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Featured Movies
            </h2>
            <MovieGrid searchQuery={defaultMovies.join(",")} />
          </div>
        )}
        {searchQuery && <MovieGrid searchQuery={searchQuery} />}
      </div>
    </div>
  );
};

export default Index;