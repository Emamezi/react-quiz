import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const SEC_PER_QUESTION = 30;

const initialState = {
  questions: [],
  //loading, error,ready,active,finished,review
  filteredQuestions: [],
  answers: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
  difficulty: "all",
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        status: "ready",
        questions: action.payload,
        filteredQuestions: action.payload,
      };

    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.filteredQuestions.length * SEC_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.filteredQuestions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
        answers: [...state.answers, action.payload],
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer:
          state.status === "review" ? state.answers.at(state.index + 1) : null,
      };
    case "prevQuestion":
      return {
        ...state,
        index: state.index - 1,
        answer: state.answers.at(state.index - 1),
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        index: 0,
        secondsRemaining: 0,
        answer: null,
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        filteredQuestions: state.filteredQuestions,
        difficulty: state.difficulty,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    case "setDifficulty":
      return {
        ...state,
        difficulty: action.payload,
        filteredQuestions:
          action.payload === "all"
            ? state.questions
            : state.questions.filter(
                (question) => question.difficulty === action.payload
              ),
      };
    case "review":
      return {
        ...state,
        status: "review",
        answer: state.answers.at(state.index),
      };
    default:
      throw new Error("Action Unknown");
  }
}

function QuizProvider({ children }) {
  const [
    {
      questions,
      status,
      index,
      answer,
      answers,
      points,
      highScore,
      secondsRemaining,
      filteredQuestions,
      difficulty,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = filteredQuestions.length;
  const totalPoints = filteredQuestions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("http://localhost:8000/questions");

        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }
    getData();
  }, []);
  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        answers,
        points,
        highScore,
        secondsRemaining,
        filteredQuestions,
        difficulty,
        numQuestions,
        totalPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

//custom quiz hooks
function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("Using Quiz context in different scope");
  return context;
}
export { QuizProvider, useQuiz };
