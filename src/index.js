import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';

//cada cuadrado del tablero, son botones
const Square = ({ value, onClick }) => {

  return (
    <button
      className="square"
      onClick={onClick}>
      {value}
    </button>
  );

}

//tablero con identificador llamar al render
const Board = props=> {

  const renderSquare = (i) => {
    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      />
    );
  }
 
    return (
      <div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    );
}

//tablero e historial de la clase
const FunctionalGame = props => {

  const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
  const [stepNumber, setstepNumber] = useState(0);
  const [xIsNext, setxIsNext] = useState(true);
  
  const handleClick = (i) => {
    const localHistory = history.slice(0, stepNumber + 1);
    const current = localHistory[localHistory.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory([...localHistory, { squares }]); 
    setstepNumber(localHistory.length);
    setxIsNext(!xIsNext);
      
  }

  const jumpTo= (step) => {
    setstepNumber(step);
    setxIsNext((step % 2) === 0);          
  }

  

    const localHistory = history;
    const current = localHistory[stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = localHistory.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status= '';
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={ current.squares }
            onClick={ handleClick }
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  
}

// ========================================

ReactDOM.render(
  <FunctionalGame />,
  document.getElementById('root')
);

function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}