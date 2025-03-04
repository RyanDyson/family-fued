"use client";

import { useState } from "react";
import Question from "./components/Question";
import AnswerList from "./components/AnswerList";
import ScoreBoard from "./components/ScoreBoard";
import WrongGuesses from "./components/WrongGuesses";
import { Button } from "@/components/ui/button";
import { questionData } from "./questionbank2";
import { WrongGuessesOverlay } from "./components/WrongGuessOverlay";
import { QuestionOverlay } from "./components/QuestionOverlay";
import { additionalQuestions } from "./questionbank1";
import { finalQuestionData } from "./questionbank3";

// Sample game data
const Team = [
  { name: "Team 1", score: 0 },
  { name: "Team 2", score: 0 },
  { name: "Team 3", score: 0 },
];

export default function Game() {
  const [currentQuestionData, setQuestionData] = useState(questionData);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [revealedAnswers, setRevealedAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [teams, setTeams] = useState(Team);
  const [showWrongOverlay, setShowWrongOverlay] = useState(false);
  const [showQuestionOverlay, setShowQuestionOverlay] = useState(false);

  const handleReveal = (index: number) => {
    if (!revealedAnswers.includes(index)) {
      setRevealedAnswers([...revealedAnswers, index]);
      setScore(
        score + currentQuestionData[currentQuestion].Answer[index].points
      );
    }
  };

  const handleWrongGuess = () => {
    setWrongGuesses(wrongGuesses + 1);
    setShowWrongOverlay(true);
    setTimeout(() => {
      setShowWrongOverlay(false);
    }, 2000);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < currentQuestionData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setRevealedAnswers([]);
      setScore(0);
      setWrongGuesses(0);
      setShowQuestionOverlay(true);
      setTimeout(() => {
        setShowQuestionOverlay(false);
      }, 2000);
    } else {
      // Handle the case when all questions have been answered
      console.log("All questions have been answered.");
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

  const handleSwtichQuestionBank = (index: number) => {
    switch (index) {
      case 1:
        setQuestionData(questionData);
        break;
      case 2:
        setQuestionData(additionalQuestions);
        break;
      case 3:
        setQuestionData(finalQuestionData);
        break;
      default:
        setQuestionData(questionData);
    }
  };

  console.log(currentQuestionData.length);
  console.log(currentQuestionData);

  return (
    <>
      <QuestionOverlay
        question={currentQuestionData[currentQuestion].Question}
        show={showQuestionOverlay}
      />
      <WrongGuessesOverlay
        wrongGuesses={wrongGuesses}
        show={showWrongOverlay}
      />
      <div className="relative z-10 min-h-screen polkadot-bg  text-white p-8">
        <h1 className="text-2xl font-bold text-center mb-4 bg-blue-800/70 backdrop-blur-md rounded-3xl p-4 border-8 border-orange-400">
          Hall 10 Family Feud: Trivia Night
        </h1>
        <div className="flex justify-center space-x-4 mb-4">
          <Button onClick={() => handleSwtichQuestionBank(1)}>
            Session 1 Question Bank
          </Button>
          <Button onClick={() => handleSwtichQuestionBank(2)}>
            Session 2 Question Bank
          </Button>
          <Button onClick={() => handleSwtichQuestionBank(3)}>
            Finals Question Bank
          </Button>
        </div>
        <div className="border-8 border-orange-400 max-w-4xl mx-auto bg-blue-800/70 backdrop-blur-md rounded-3xl p-4">
          <Question question={currentQuestionData[currentQuestion].Question} />
          <AnswerList
            answers={currentQuestionData[currentQuestion].Answer}
            revealedAnswers={revealedAnswers}
            onReveal={handleReveal}
          />
          <div className="flex justify-between items-center mt-2">
            <ScoreBoard score={score} />
            <WrongGuesses wrongGuesses={wrongGuesses} />
          </div>
          <div className="mt-2 flex justify-between">
            <Button
              onClick={handleWrongGuess}
              disabled={wrongGuesses >= 3}
              variant="destructive"
            >
              Strike (X)
            </Button>

            <Button
              onClick={handleNextQuestion}
              disabled={currentQuestion >= currentQuestionData.length - 1}
            >
              Next Question
            </Button>
          </div>
        </div>
        <div className="mt-4 max-w-4xl mx-auto mb-8 bg-blue-800/70 backdrop-blur-md rounded-3xl p-4 border-8 border-orange-400">
          <div className="flex justify-between space-x-4">
            {teams.map((team, index) => (
              <div key={index} className="flex flex-col items-center">
                <h2 className="text-xl font-bold">{team.name}</h2>
                <p className="text-2xl font-bold">{team.score}</p>
                <Button onClick={() => handleTeamWin(index)}>Wins</Button>
              </div>
            ))}
            <div className="flex flex-col items-end space-y-1">
              <Button onClick={() => resetTeamScore()}>Reset</Button>
              <Button onClick={() => handleAddTeam()}>Add Team</Button>
              <Button onClick={() => handleRemoveTeam()}>Remove Team</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
