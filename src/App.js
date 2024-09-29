import { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./component/Header";
import Main from "./component/Main";
import Loader from "./component/Loader";
import Error from "./component/Error";
import StartScreen from "./component/StartScreen";
import Question from "./component/Question";

const initialState = {
  questions: [],
  //loading, error,ready,active,finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, status: "ready", questions: action.payload };
    case "dataailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    default:
      throw new Error("Action Unknown");
  }
}

function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestions = questions.length;

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
      // console.log(data);
    }
    getData();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main />
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && (
        <StartScreen dispatch={dispatch} numQuestions={numQuestions} />
      )}
      {status === "active" && (
        <Question
          question={questions[index]}
          dispatch={dispatch}
          answer={answer}
        />
      )}
    </div>
  );
}

export default App;
