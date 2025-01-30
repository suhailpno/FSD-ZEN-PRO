import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import SeatSelection from "@/components/SeatSelection";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showSeats, setShowSeats] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (!user) navigate("/auth");
    };
    getUser();
  }, [navigate]);

  const { data: movie, isLoading } = useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=c9780bdd&i=${id}&plot=full`
      );
      return response.json();
    },
  });

  const handleSeatSelection = (seats: string[]) => {
    setSelectedSeats(seats);
    handlePayment(seats);
  };

  const handlePayment = async (seats: string[]) => {
    try {
      const amount = seats.length * 10; // $10 per seat
      const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
      
      const { error } = await supabase.from("bookings").insert({
        user_id: user?.id,
        movie_id: id as string,
        showtime: tomorrow.toISOString(), // Convert Date to ISO string format
        seats,
        amount,
        payment_status: "completed",
      });

      if (error) throw error;

      toast({
        title: "Booking Successful!",
        description: `You have booked ${seats.length} seats for ${movie?.Title}`,
      });

      navigate("/");
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!movie) {
    return <div className="text-center py-10">Movie not found</div>;
  }

  return (
    <div className="container py-8">
      <Card className="p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-primary">{movie.Title}</h1>
            <div className="space-y-2">
              <p><span className="font-semibold">Year:</span> {movie.Year}</p>
              <p><span className="font-semibold">Runtime:</span> {movie.Runtime}</p>
              <p><span className="font-semibold">Genre:</span> {movie.Genre}</p>
              <p><span className="font-semibold">Director:</span> {movie.Director}</p>
              <p><span className="font-semibold">Cast:</span> {movie.Actors}</p>
            </div>
            <p className="text-gray-600">{movie.Plot}</p>
            {!showSeats ? (
              <Button
                onClick={() => setShowSeats(true)}
                className="w-full md:w-auto"
              >
                Book Tickets
              </Button>
            ) : (
              <SeatSelection onSelect={handleSeatSelection} />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MovieDetails;