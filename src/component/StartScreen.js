function StartScreen({ numQuestions, dispatch, difficulty }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz</h2>
      <h3> {numQuestions} questions to test you React mastery</h3>
      <div className="difficulty">
        <p>Select difficulty level </p>
        <select
          value={difficulty}
          onChange={(e) => {
            dispatch({ type: "setDifficulty", payload: e.target.value });
          }}
        >
          <option value="all">All</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Lets start
      </button>
    </div>
  );
}

export default StartScreen;
