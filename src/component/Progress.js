import { useQuiz } from "../Context/QuizContext";

function Progress() {
  const { index, numQuestions, points, totalPoints, answer } = useQuiz();
  return (
    <header className="progress">
      <progress
        value={index + Number(answer !== null)}
        max={numQuestions}
      ></progress>
      <p>
        Question
        <strong> {index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong> {points} </strong> / {totalPoints} points
      </p>
    </header>
  );
}

export default Progress;
