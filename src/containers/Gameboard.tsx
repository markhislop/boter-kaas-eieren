import { useContext } from "react";

import styles from "./styles/Gameboard.module.css"

import GameboardField from "../components/GameboardField";
import { GameStateContext } from "../contexts/GameStateContext";

const Gameboard = () => {
    const { gameState, gameStatus } = useContext(GameStateContext)

    return (
        <div className={styles.container} style={{pointerEvents: gameStatus !== "" ? "none" : "auto"}}>
            {gameState.fields.map((fieldData: {value: string, color: string}, index:number) => <GameboardField fieldData={{...fieldData, index: index}}/>)}
        </div>
    )
}

export default Gameboard;