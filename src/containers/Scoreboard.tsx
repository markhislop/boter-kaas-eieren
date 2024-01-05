import { useContext } from "react";

import styles from "./styles/Scoreboard.module.css"

import { GameStateContext } from "../contexts/GameStateContext";

const Scoreboard = ({player}: any) => {
    const { gameState } = useContext(GameStateContext)

    return (
        <div className={styles.container}>
            <div className={styles.name}>{player.title}</div>
            <div className={styles.score}>Score: {player.score}</div>
            {
                gameState.activePlayer === player.id && 
                <div className={styles.marking} style={{color: player.color}}>
                    {player.marking}
                </div>
            }
        </div>
    )
}

export default Scoreboard;