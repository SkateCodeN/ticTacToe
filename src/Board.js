import { Square, calculateWinner } from "/App.js";
import { useState } from "react";
import Container from "react-bootstrap/Container";

export default function Board() {
  // Start the state for X to be filled first and the
  // array (that holds the state of x and o) as empty

  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  /* we create another instance of the squares array,
    there given the button that is clicked(i) we set it to x,
    we create another instance of the array to add "history" 
    to the array ( so we can see all the moves made) */
  function handleClick(i) {
    const nextSquares = squares.slice();

    // If squares at i is already filled, dont fill it.
    // We also check to see if there is a winner
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    // Check the state of wether to apply an x or o
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    //sets an instance of the new array that holds an x or o on the given button
    setSquares(nextSquares);
    // Sets the opposite of the current value so we can switch between x and o.
    setXIsNext(!xIsNext);
  }

  /* Custom function to clear the board */
  function clearBoard() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  // If there is a winner, tell me who, otherwise tell me
  // whom is next
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div style={{ padding: "0px 0px 10px " }}>
        <NavBar />
      </div>
      <Container>
        <div className="status">{status}</div>
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>

        <div className="board-row">
          <br />
          <ClearButton clearButtonClick={() => clearBoard()} />
        </div>
      </Container>
    </>
  );
}
