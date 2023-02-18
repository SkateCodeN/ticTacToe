import { useState } from "react";
import { NavBar } from "./html_components/myNavBar.js";
import Container from "react-bootstrap/Container";
import Square from "./Square.js";
import calculateWinner from "./calculateWinner.js";

// Board is the Top level component of Square given that we
// call square components inside of the Board and maintain their state
function Board({ xIsNext, squares, onPlay }) {
  // Start the state for X to be filled first and the
  // array (that holds the state of x and o) as empty

  // We moved this state up to the Game component.
  //const [xIsNext, setXIsNext] = useState(true);
  //const [squares, setSquares] = useState(Array(9).fill(null));

  /* we create another instance of the squares array,
    there given the button that is clicked(i) we set it to x,
    we create another instance of the array to add "history" 
    to the array ( so we can see all the moves made) */
  function handleClick(i) {
    // If squares at i is already filled, dont fill it.
    // We also check to see if there is a winner
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    //const nextSquares = squares.slice();
    const nextSquares = squares.slice();
    // Check the state of wether to apply an x or o
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    /* handled in the Game component
    //sets an instance of the new array that holds an x or o on the given button
    setSquares(nextSquares);
    // Sets the opposite of the current value so we can switch between x and o.
    setXIsNext(!xIsNext);
    */
    onPlay(nextSquares);
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
      <div style={{ padding: "0px 0px 10px" }}>
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
      </Container>
    </>
  );
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  //const currentSquares = history[history.length - 1];
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    // TODO
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }
  /* Custom function to clear the board */
  function clearBoard() {
    setHistory([]);
    setXIsNext(true);
  }
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        <div className="board-row">
          <br />
          <ClearButton clearButtonClick={() => clearBoard()} />
        </div>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
// External function that clears the board and sets X as next
function ClearButton({ clearButtonClick }) {
  return <button onClick={clearButtonClick}>Clear</button>;
}
