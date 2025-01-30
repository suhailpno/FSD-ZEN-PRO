import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SeatSelectionProps {
  onSelect: (seats: string[]) => void;
}

const SeatSelection = ({ onSelect }: SeatSelectionProps) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const rows = ["A", "B", "C", "D", "E", "F"];
  const seatsPerRow = 8;

  const handleSeatClick = (seat: string) => {
    setSelectedSeats((prev) => {
      const isSelected = prev.includes(seat);
      if (isSelected) {
        return prev.filter((s) => s !== seat);
      }
      if (prev.length >= 6) {
        return prev;
      }
      return [...prev, seat];
    });
  };

  const isSeatSelected = (seat: string) => selectedSeats.includes(seat);

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-full max-w-2xl bg-gray-800 p-4 rounded-lg">
          <div className="w-full h-2 bg-accent mb-8 rounded" />
          {rows.map((row) => (
            <div key={row} className="flex justify-center gap-2 mb-2">
              <span className="w-6 text-center">{row}</span>
              {Array.from({ length: seatsPerRow }).map((_, index) => {
                const seatNumber = `${row}${index + 1}`;
                return (
                  <button
                    key={seatNumber}
                    onClick={() => handleSeatClick(seatNumber)}
                    className={cn(
                      "w-8 h-8 rounded transition-colors",
                      isSeatSelected(seatNumber)
                        ? "bg-accent text-accent-foreground"
                        : "bg-gray-600 hover:bg-gray-500"
                    )}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-600 rounded" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-accent rounded" />
            <span>Selected</span>
          </div>
        </div>
      </div>
      <Button
        onClick={() => onSelect(selectedSeats)}
        disabled={selectedSeats.length === 0}
        className="w-full"
      >
        Confirm Selection ({selectedSeats.length} seats)
      </Button>
    </div>
  );
};

export default SeatSelection;