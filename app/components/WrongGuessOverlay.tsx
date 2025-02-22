import { X } from "lucide-react";

type Props = {
  wrongGuesses: number;
  show: boolean;
};

export function WrongGuessesOverlay(props: Props) {
  return (
    props.show && (
      <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="p-4 rounded-lg border-orange-300 border-8 bg-white flex flex-col items-center">
          <div className="flex items-center">
            {[...Array(3)].map((_, index) => (
              <X
                key={index}
                className={`w-64 h-64 ${
                  index < props.wrongGuesses ? "text-red-600" : "text-gray-400"
                }`}
              />
            ))}
          </div>
          <p className="text-lg text-black">Wrong Guess!</p>
        </div>
      </div>
    )
  );
}
