import { X } from "lucide-react";

export default function WrongGuesses({
  wrongGuesses,
}: {
  wrongGuesses: number;
}) {
  return (
    <div className="flex items-center">
      {[...Array(3)].map((_, index) => (
        <X
          key={index}
          className={`w-8 h-8 ${
            index < wrongGuesses ? "text-red-500" : "text-gray-400"
          }`}
        />
      ))}
    </div>
  );
}
