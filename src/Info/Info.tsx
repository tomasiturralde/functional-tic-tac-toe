import React from 'react';
import styles from "./Info.module.css";

type Props = {
    status: string,
    handleSwitch: () => void,
    moves: object,
}

export const Info = (props: Props) => {
    return (
        <div className={styles.gameInfo}>
            <div>{props.status}</div>
            <div className={styles.switchDiv}>
                <label className={styles.switch}>
                    <input type="checkbox" onChange={props.handleSwitch}/>
                    <span className={styles.slider + " " + styles.round}/>
                </label>
                <div className={styles.switchText}>Descending | Ascending</div>
            </div>
            <ol>{props.moves}</ol>
        </div>
    )
}
