import { useQuiz } from "../Context/QuizContext";

function FinishScreen() {
  const { points, totalPoints, highScore, dispatch } = useQuiz();
  let quizReaction;
  const percentage = Math.ceil((points / totalPoints) * 100);
  if (totalPoints > 90) quizReaction = "🥇";
  if (totalPoints >= 80 && percentage < 100) quizReaction = "👏🏼";
  if (totalPoints >= 50 && percentage < 80) quizReaction = "🙃";
  if (totalPoints >= 0 && percentage < 50) quizReaction = "🤔";
  if (totalPoints === 0) quizReaction = "🤦🏽‍♂️";
  return (
    <>
      <p className="result">
        <span> {quizReaction}</span> You scored <strong> {points} </strong> out
        of {totalPoints} ({percentage}%)
      </p>
      <p className="highscore">HighScore : {highScore} points</p>
      <div className="btn-container">
        <button className="btn" onClick={() => dispatch({ type: "review" })}>
          Review Answers
        </button>
        <button className="btn" onClick={() => dispatch({ type: "restart" })}>
          Restart Quiz
        </button>
      </div>
    </>
  );
}

export default FinishScreen;
