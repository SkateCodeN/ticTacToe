// External functuon to render squares, the board function sends state and props to it
export default function Square({ value, onSquareClick, isWinner }) {
  return (
    <button
      //If a square is the winner then make it green
      style={
        isWinner ? { backgroundColor: "green" } : { backgroundColor: "white" }
      }
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
