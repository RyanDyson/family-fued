import { Button } from "@/components/ui/button"

interface Answer {
  text: string
  points: number
}

interface AnswerListProps {
  answers: Answer[]
  revealedAnswers: number[]
  onReveal: (index: number) => void
}

export default function AnswerList({ answers, revealedAnswers, onReveal }: AnswerListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {answers.map((answer, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg ${revealedAnswers.includes(index) ? "bg-green-500" : "bg-gray-700"}`}
        >
          {revealedAnswers.includes(index) ? (
            <>
              <span className="font-semibold">{answer.text}</span>
              <span className="float-right">{answer.points}</span>
            </>
          ) : (
            <Button onClick={() => onReveal(index)} className="w-full h-full bg-transparent hover:bg-gray-600">
              {index + 1}
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}

