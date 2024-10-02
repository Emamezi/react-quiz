import Options from "./Options";
function Question({ question, dispatch, answer }) {
  return (
    <div>
      <h4>{question.question} </h4>
      <div>
        <Options question={question} dispatch={dispatch} answer={answer} />
      </div>
    </div>
  );
}

export default Question;
