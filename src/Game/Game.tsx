import React from 'react';
import Board from "../Board/Board";
import styles from "./Game.module.css";

const Game = () => {
    return (
        <div className={styles.game}>
            <div>
                <Board />
            </div>
            <div className={styles.gameInfo}>
                <div>status</div>
                <ol>{/* TODO */}</ol>
            </div>
        </div>
    );
}

export default Game;