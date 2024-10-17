import { useQuiz } from "../Context/QuizContext";
import Options from "./Options";
function Question() {
  const { dispatch, answer, index, filteredQuestions } = useQuiz();
  // console.log(questions);
  const question = filteredQuestions[index];
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
