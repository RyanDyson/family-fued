type props = {
  show: boolean;
  question: string;
};

export function QuestionOverlay({ show, question }: props) {
  return (
    show && (
      <div className="fixed backdrop-blur-md z-50 inset-0 bg-blue bg-opacity-50 flex items-center justify-center">
        <div className=" p-4 rounded-lg border-orange-300 border-8 bg-blue-600 flex flex-col items-center">
          <p className="text-3xl text-white">{question}</p>
        </div>
      </div>
    )
  );
}
