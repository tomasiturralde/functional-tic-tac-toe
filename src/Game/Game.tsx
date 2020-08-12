import React, {useState} from 'react';
import Board from "../Board/Board";
import styles from "./Game.module.css";
import MyForm from "../MyForm/MyForm";
import {Button} from "@material-ui/core";



const Game = () => {

    const [player1, setPlayer1] = useState<string>();
    const [player2, setPlayer2] = useState<string>();

    const calculateWinner = (squares: string[]) => {
        const lines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ];
        for(let i = 0; i < lines.length; i++){
            const [a, b, c] = lines[i];
            if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
                if(squares[a] === 'X') return player1;
                if(squares[a] === 'O') return player2;
            }
        }
        return null;
    }

    const handleClick = (i: number) =>{
        const historySlice = history.slice(0, stepNumber +1);
        const current = historySlice[historySlice.length-1];
        const newSquares = current.squares.slice();

        if(calculateWinner(newSquares) || newSquares[i]){
            return;
        }

        newSquares[i] = xIsNext ? 'X' : 'O';
        setHistory(historySlice.concat([{
            squares: newSquares,
        }]));
        setXISNext(!xIsNext);
        setStepNumber(historySlice.length);
    }

    const jumpTo = (step : number) => {
        setStepNumber(step);
        setXISNext((step%2) === 0);
    }


    const [history, setHistory] = useState([{
        squares: Array(9).fill(null)
    }]);

    const [xIsNext, setXISNext] = useState<boolean>(true);
    const [stepNumber, setStepNumber] = useState<number>(0);

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if(winner){
        status = `Winner: ${winner}`;
    } else {
        status = 'Next player: ' + (xIsNext ? player1 : player2);
    }

    const moves = history.map((step, move) => {
        const desc = move ?
            `Go to move # ${move}`:
            'Go to game start';
        return (
            <li key = {move}>
                <button onClick={()=> jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    const [isVisible, setVisible] = useState<boolean>(false);

    return (
        <div className={styles.game}>

            <div hidden={isVisible}>
                <MyForm onSubmit={({player2Name, player1Name}) => {
                    setPlayer1(player1Name);
                    setPlayer2(player2Name);
                    setVisible(true);
                }}/>
            </div>
            <div hidden={!isVisible}>
            <div>
                <Board onClick={i => handleClick(i)} squares={current.squares}/>
            </div>
            <div className={styles.gameInfo}>
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
                <Button type="submit" onClick={() => {
                    setVisible(false);
                    jumpTo(0);
                }}>Change Players</Button>
            </div>
        </div>
    );
}

export default Game;