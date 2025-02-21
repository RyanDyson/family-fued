"use client";

import { useState } from "react";
import Question from "./components/Question";
import AnswerList from "./components/AnswerList";
import ScoreBoard from "./components/ScoreBoard";
import WrongGuesses from "./components/WrongGuesses";
import { Button } from "@/components/ui/button";
import { questionData } from "./question";

// Sample game data
const Team = [
  { name: "Team 1", score: 0 },
  { name: "Team 2", score: 0 },
  { name: "Team 3", score: 0 },
];

export default function Game() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [revealedAnswers, setRevealedAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState<number[]>([]);
  const [teams, setTeams] = useState(Team);

  const handleReveal = (index: number) => {
    if (!revealedAnswers.includes(index)) {
      setRevealedAnswers([...revealedAnswers, index]);
      setScore(score + questionData[currentQuestion].Answer[index].points);
    }
  };

  const handleWrongGuess = () => {
    const wrongSound = new Audio("/wrong-sound.mp3");
    wrongSound.play();
    setWrongGuesses(wrongGuesses + 1);
  };

  const handleNextQuestion = () => {
    const randi = Math.floor(Math.random() * questionData.length);
    if (!questionsAnswered.includes(randi)) {
      setCurrentQuestion(randi);
      setRevealedAnswers([]);
      setQuestionsAnswered([...questionsAnswered, randi]);
      setScore(0);
      setWrongGuesses(0);
    }
  };

  const handleRemoveTeam = () => {
    setTeams(teams.slice(0, -1));
  };

  const handleAddTeam = () => {
    const newTeam = { name: `Team ${teams.length + 1}`, score: 0 };
    setTeams([...teams, newTeam]);
  };

  const resetTeamScore = () => {
    setTeams(teams.map((team) => ({ ...team, score: 0 })));
  };

  const handleTeamWin = (index: number) => {
    setTeams(
      teams.map((team, i) =>
        i === index ? { ...team, score: team.score + score } : team
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Family Feud Game</h1>
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-lg p-8">
        <Question question={questionData[currentQuestion].Question} />
        <AnswerList
          answers={questionData[currentQuestion].Answer}
          revealedAnswers={revealedAnswers}
          onReveal={handleReveal}
        />
        <div className="flex justify-between items-center mt-8">
          <ScoreBoard score={score} />
          <WrongGuesses wrongGuesses={wrongGuesses} />
        </div>
        <div className="mt-8 flex justify-between">
          <Button
            onClick={handleWrongGuess}
            disabled={wrongGuesses >= 3}
            variant="destructive"
          >
            Wrong Answer (X)
          </Button>
          <div className="flex justify-between space-x-4">
            {teams.map((team, index) => (
              <div key={index} className="flex flex-col items-center">
                <h2 className="text-xl font-bold">{team.name}</h2>
                <p className="text-2xl font-bold">{team.score}</p>
                <Button onClick={() => handleTeamWin(index)}>Wins</Button>
              </div>
            ))}
            <Button onClick={() => resetTeamScore()}>Reset</Button>
            <Button onClick={() => handleAddTeam()}>Add Team</Button>
            <Button onClick={() => handleRemoveTeam()}>Remove Team</Button>
          </div>
          <Button
            onClick={handleNextQuestion}
            disabled={currentQuestion >= questionData.length - 1}
          >
            Next Question
          </Button>
        </div>
      </div>
    </div>
  );
}
