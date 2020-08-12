import React from 'react';
import styles from "./Square.module.css";

export const Square = (props: {value: string, onClick: () => void}) => (
    <button className={styles.square} onClick={() => props.onClick()}>
        {props.value}
    </button>
);