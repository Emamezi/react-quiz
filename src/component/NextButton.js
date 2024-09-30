function NextButton({ dispatch, answer, index, numQuestions }) {
  console.log(numQuestions, index);
  if (answer === null) return null;
  if (index < numQuestions - 1) {
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next Question
        </button>
      </div>
    );
  }
  if (index === numQuestions - 1) {
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finish" })}
        >
          Finish
        </button>
      </div>
    );
  }
}

export default NextButton;
