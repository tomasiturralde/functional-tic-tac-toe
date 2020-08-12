import React, {useState} from 'react';
import Board from "../Board/Board";
import styles from "./Game.module.css";

const Game = () => {
    const [history,setHistory] = useState([{
        squares: Array(9).fill(null),
    }]);
    const [xIsNext,setXIsNext] = useState<boolean>(true);
    const [stepNumber,setStepNumber] = useState<number>(0);

    const handleClick = (i:number) => {
        const historySlice = history.slice(0,stepNumber+1);
        const current = historySlice[historySlice.length -1];
        const newSquares = current.squares.slice();
        if (calculateWinner(newSquares) || newSquares[i]) {
            return;
        }
        newSquares[i] = xIsNext? 'X' : 'O';
        setHistory(historySlice.concat([{
            squares: newSquares,
        }]));
        setXIsNext(!xIsNext);
        setStepNumber(historySlice.length);
    }

    const calculateWinner = (squares : string[] ) => {
        const lines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ];
        for (let i=0; i < lines.length; i++){
            const [a,b,c] = lines[i];
            if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    }
    else if(stepNumber === 9) {
        //Si llegabas a llenar el cuadro y ninguno ganó seguia mostrando "Next Player", small improvement
        status = 'Draw!';
    }
    else {
        status = 'Next Player: ' + (xIsNext? 'X' : 'O');
    }

    const jumpTo = (step:number) => {
        setStepNumber(step);
        setXIsNext((step%2)===0);
    }

    const moves = history.map((step ,move) => {
        const desc = move ?
            'Go to move #' + move:
            'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        )
    })

    return (
        <div className={styles.game}>
            <div>
                <Board onClick={i => handleClick(i)} squares={current.squares}/>
            </div>
            <div className={styles.gameInfo}>
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

export default Game;


