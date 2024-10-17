import { useQuiz } from "../Context/QuizContext";

function PreviousButton() {
  const { dispatch, index } = useQuiz();
  if (index === 0) return null;

  return (
    <>
      <button
        className="btn"
        onClick={() => dispatch({ type: "prevQuestion" })}
      >
        Previous
      </button>
    </>
  );
}

export default PreviousButton;
