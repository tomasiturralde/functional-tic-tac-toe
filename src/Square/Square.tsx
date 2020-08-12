import React from 'react';
import styles from "./Square.module.css";

type Props = {
    isWinner: boolean,
    onClick: () => void,
    value: string,
}

export const Square = (props: Props) => (
    <button
        className={styles.square}
        style={{
            border: props.isWinner ? '3px solid #999' : '1px solid #999',
        }}
        onClick={props.onClick}
    >
        {props.value}
    </button>
);
