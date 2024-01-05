import { useContext } from "react";

import styles from "./styles/GameboardField.module.css"

import { GameStateContext } from "../contexts/GameStateContext";

interface GameboardFieldInterface {
    fieldData: {
        index: number
        value: string,
        color: string
    }
}

const GameboardField = ({fieldData}:GameboardFieldInterface) => {
    const { gameState, setGameState, players } = useContext(GameStateContext)

    const updateGameState = () => {
        if (fieldData.value === "") {
            const updatedFields = gameState.fields.map((field: {value: string, color: string}, index: number) => {
                if (index === fieldData.index) {
                    /* Update field with player marking and color if field is empty */
                    return {
                        ...field,
                        value: players[gameState.activePlayer].marking,
                        color: players[gameState.activePlayer].color
                    }
                } else {
                    /* Don't update field if field is not empty*/
                    return field
                }
            })
            setGameState({
                activePlayer: gameState.activePlayer === "player_one" ? "player_two" : "player_one",
                fields: updatedFields
            })
        }
    }

    return (
        <div className={styles.container} onClick={updateGameState}>
            <div className={styles.marking} style={{color: fieldData.color}}>
                {fieldData.value}
            </div>
        </div>
    )
}

export default GameboardField;
