import { Button } from "@/components/ui/button";

interface Answer {
  text: string;
  points: number;
}

interface AnswerListProps {
  answers: Answer[];
  revealedAnswers: number[];
  onReveal: (index: number) => void;
}

export default function AnswerList({
  answers,
  revealedAnswers,
  onReveal,
}: AnswerListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {answers.map((answer, index) => (
        <div
          key={index}
          className={` rounded-lg border-white border-2 ${
            revealedAnswers.includes(index) ? "bg-blue-600" : "bg-blue-950 "
          }`}
        >
          {revealedAnswers.includes(index) ? (
            <div className="flex justify-between">
              <span className="font-semibold p-4 flex">{answer.text}</span>
              <span className="rounded-e-lg font-bold text-3xl min-w-20 text-center float-right p-4 bg-gradient-to-b from-blue-950 to-blue-300">
                {answer.points}
              </span>
            </div>
          ) : (
            <Button
              onClick={() => onReveal(index)}
              className="w-full h-full bg-transparent hover:bg-gray-600 min-h-16 flex justify-center items-center"
            >
              <div className="bg-gradient-to-t from-blue-950 to-blue-800 rounded-full p-2 min-w-16 min-h-12 text-lg font-bold">
                {index + 1}
              </div>
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
