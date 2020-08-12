import React from 'react';
import Board from "../Board/Board";
import styles from "./Game.module.css";
import {Info} from "../Info/Info";

type Pos = {
    column: number,
    row: number,
}

type History = {
    squares: string[],
    pos?: Pos,
}

const Game = () => {
    const [history, setHistory] = React.useState<History[]>([{
        squares: Array(9).fill(null),
    }]);

    const [xIsNext, setXIsNext] = React.useState(true);

    const [stepNumber, setStepNumber] = React.useState(0);

    const [winners, setWinners] = React.useState(Array(9).fill(null));

    const [ascending, setAscending] = React.useState(true);

    const handleClick = (i: number) => {
        const historyCopy = history.slice(0, stepNumber + 1);
        const current = historyCopy[historyCopy.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        const winner = calculateWinner(squares);
        let winnersCopy = Array(9).fill(null);
        if (winner) {
            winner.squares.forEach(v => winnersCopy[v] = true)
        }
        setHistory(historyCopy.concat([{
            squares: squares,
            pos: {
                column: (i % 3) + 1,
                row: Math.trunc(i / 3) + 1,
            }
        }]));
        setStepNumber(historyCopy.length);
        setXIsNext(!xIsNext);
        setWinners(winnersCopy);
    }

    const jumpTo = (step: number) => {
        const winner = calculateWinner(history[step].squares);
        let winnersCopy = Array(9).fill(null);
        if (winner) {
            winner.squares.forEach(v => winnersCopy[v] = true);
        }
        setStepNumber(step);
        setXIsNext((step % 2) === 0);
        setWinners(winnersCopy);
    }

    const calculateWinner = (squares: string[]) => {
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
                return {
                    symbol: squares[a],
                    squares: [a, b, c],
                }
            }
        }
        return null;
    }

    const getCurrent = () => {return history[stepNumber]};

    const handleSwitch = () => setAscending(!ascending);

    const getMoves = () => {
        const historyCopy = ascending? history: history.slice(0).reverse();
        return historyCopy.map((step, move) => {
            let moveNum = ascending ? move : history.length - (move + 1);
            const desc = step.pos ?
                'Go to move in col #' + step.pos.column + ' and row #' + step.pos.row :
                'Go to game start';
            return (
                <li key={move}>
                    <button
                        onClick={() => {
                            jumpTo(moveNum);
                        }}
                        style={{fontWeight: (stepNumber === moveNum ? 'bold' : 'normal')}}
                    >
                        {desc}
                    </button>
                </li>
            )
        })
    }

    const getStatus = () => {
        const winner = calculateWinner(getCurrent().squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner.symbol;
        } else {
            status = stepNumber === 9 ? 'Draw' : 'Next player: ' + (xIsNext ? 'X' : 'O');
        }
        return status;
    }
    return (
        <div className={styles.game}>
            <div>
                <Board
                    squares={getCurrent().squares}
                    onClick={(i) => handleClick(i)}
                    winners={winners}
                />
            </div>
            <Info status={getStatus()}
                  handleSwitch={handleSwitch}
                  moves={getMoves()}
            />
        </div>
    );
}

export default Game;
