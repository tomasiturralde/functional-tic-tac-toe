import React from 'react';
import {Square} from "../Square/Square";
import styles from "./Board.module.css";

const Board = () => {
    const status = 'Next player: X';

    const renderSquare = (i: number) => (
        <Square />
    );

    return (
        <div>
            <div className={styles.status}>{status}</div>
            <div className={styles.boardRow}>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className={styles.boardRow}>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className={styles.boardRow}>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}

export default Board;
