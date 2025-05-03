import { useEffect, useState } from "react";
import { Square } from "./Square";
import { WinnerModal } from "./WinnerModal";
import { TURNS } from "../logic/constants";
import { checkWinnerFrom, checkEndGame } from "../logic/checkBoard";
import { saveGameToStorage, resetGameFromStorage } from "../logic/storage";

export const Board = () => {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = JSON.parse(window.localStorage.getItem("board"));
    return boardFromStorage ?? Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X;
  });

  const [winner, setWinner] = useState(() => {
    const winnerFromStorage = JSON.parse(window.localStorage.getItem("winner"));
    return winnerFromStorage;
  });

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkWinnerFrom(newBoard);

    if (newWinner) {
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameFromStorage();
  };

  useEffect(() => {
    saveGameToStorage({
      board,
      turn,
      winner,
    });
  }, [board, turn, winner]);

  return (
    <div className="board">
      <button onClick={resetGame}>Reset game</button>
      <section className="game">
        {board.map((move, index) => (
          <Square key={index} index={index} updateBoard={updateBoard}>
            {move}
          </Square>
        ))}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </div>
  );
};
