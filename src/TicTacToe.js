import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const handleClick = (row, col) => {
    if (gameWon || gameOver) {
      return;
    }
    const updatedBoard = board.slice();
    updatedBoard[row][col] = currentPlayer;
    setBoard(updatedBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    checkForWinner();
  }

  const checkForWinner = () => {
    // check rows
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') {
        setGameWon(true);
        return;
      }
    }

    // check columns
    for (let i = 0; i < 3; i++) {
      if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== '') {
        setGameWon(true);
        return;
      }
    }

    // check diagonals
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') {
      setGameWon(true);
      return;
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '') {
      setGameWon(true);
      return;
    }
    if (!board.flat().includes('')) {
      setGameOver(true);
    }
  }

  const resetGame = () => {
    setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setCurrentPlayer("X");
    setGameWon(false);
    setGameOver(false);
  }

  return (
    <div className="tic-tac-toe">
      <div className={"message"}>
        {gameWon ? "Player " + `${currentPlayer === "O" ? "X" : "O"}` + " won!" : gameOver ? "Game Over" : "Player " + currentPlayer + "'s turn"}
      </div>
      <div className={"cell"}>
        {board.map((row, i) => (
          <div key={i} >
            {row.map((col, j) => (
              <button key={j} onClick={() => handleClick(i, j)}>
                {col}
              </button>
            ))}
          </div>
        ))}
      </div>
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
}

export default TicTacToe;
