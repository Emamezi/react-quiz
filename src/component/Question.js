import Options from "./options";
function Question({ question, dispatch, answer }) {
  console.log(question);
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
