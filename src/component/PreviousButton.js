function PreviousButton({ dispatch, index }) {
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
