// External func that calculates the winner comparing all possible combinations to
// contain the same char
export default function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  // we go over the line matrix to specically match all of the same char
  // if uts the case we return the winning char
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      console.log(`${a}...${b} ... ${c}`);
      return squares[a];
    }
  }
  return null;
}
