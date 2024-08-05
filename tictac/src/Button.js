import { useState } from "react";
import WinnerModal from "./winner";
import "./button.css";

function Square({ value, onClick }) {
	return (
		<button className="square" onClick={onClick}>
			{value}
		</button>
	);
}

export default function Board() {
	const [playStarted, setPlayStarted] = useState(false);
	const [xIsNext, setXIsNext] = useState(true);
	const [squares, setSquares] = useState(Array(9).fill(null));
	const [winner, setWinner] = useState(null);

	const handleStartPlay = () => {
		setPlayStarted(true);
		setSquares(Array(9).fill(null));
		setWinner(null);
		setXIsNext(true); // Ensure the game starts with 'X'
	};

	const handleClick = (i) => {
		if (!playStarted || squares[i] || winner) return;

		const nextSquares = squares.slice();
		nextSquares[i] = xIsNext ? "X" : "O";
		setSquares(nextSquares);
		setXIsNext(!xIsNext);

		const result = calculateWinner(nextSquares);
		if (result) {
			setWinner(result);
		}
	};

	const handleCloseModal = () => {
		setSquares(Array(9).fill(null));
		setWinner(null);
		setPlayStarted(false);
		setXIsNext(true);
	};

	return (
		<>
			<button className="start" onClick={handleStartPlay}>
				Start play
			</button>

			<div className="board-row">
				<Square value={squares[0]} onClick={() => handleClick(0)} />
				<Square value={squares[1]} onClick={() => handleClick(1)} />
				<Square value={squares[2]} onClick={() => handleClick(2)} />
			</div>
			<div className="board-row">
				<Square value={squares[3]} onClick={() => handleClick(3)} />
				<Square value={squares[4]} onClick={() => handleClick(4)} />
				<Square value={squares[5]} onClick={() => handleClick(5)} />
			</div>
			<div className="board-row">
				<Square value={squares[6]} onClick={() => handleClick(6)} />
				<Square value={squares[7]} onClick={() => handleClick(7)} />
				<Square value={squares[8]} onClick={() => handleClick(8)} />
			</div>

			<WinnerModal winner={winner} onClose={handleCloseModal} />
		</>
	);
}

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}

	return null;
}
