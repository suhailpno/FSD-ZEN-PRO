import React, { useState } from "react";
import MovieSearch from "@/components/MovieSearch";
import MovieGrid from "@/components/MovieGrid";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-primary/10">
      <div className="container py-8">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">
          Movie Ticket Booking
        </h1>
        <div className="max-w-xl mx-auto mb-8">
          <MovieSearch onSearch={setSearchQuery} />
        </div>
        <MovieGrid searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default Index;