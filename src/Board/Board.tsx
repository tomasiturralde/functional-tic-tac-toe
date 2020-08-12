import React from 'react';
import {Square} from "../Square/Square";
import styles from "./Board.module.css";

type Props = {
    squares: string[],
    winners: boolean[],
    onClick: (i: number) => void,
}

const Board = (props: Props) => {

    const renderSquare = (i: number) => (
        <Square
            value={props.squares[i]}
            isWinner={props.winners[i]}
            onClick={() => props.onClick(i)}
            key={i}
        />
    );

    return (
        <div>
            {[0, 1, 2].map(i => {
                return (
                    <div className={styles.boardRow} key={i}>
                        {
                            [0, 1, 2].map(j => {
                                return renderSquare(i * 3 + j);
                            })}
                    </div>
                )
            })}
        </div>
    );
}

export default Board;
