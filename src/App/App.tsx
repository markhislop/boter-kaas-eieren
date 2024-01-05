import { useEffect, useState } from 'react';

import styles from "./App.module.css"

import Scoreboard from "../containers/Scoreboard";
import Gameboard from "../containers/Gameboard";
import { GameStateContext } from '../contexts/GameStateContext';
import { GameStateInterface } from '../interfaces/GameStateInterface';
import { PlayerInterface } from '../interfaces/PlayerInterface';

const App = () => {
  const [gameStatus, setGameStatus] = useState<string>("")

  const [gameState, setGameState] = useState<GameStateInterface>({
    activePlayer: "player_one",
    fields: new Array(9).fill({value: "", color: ""})
  })

  const [players, setPlayers] = useState<PlayerInterface>({
    player_one: {
      id: "player_one",
      title: "Speler 1",
      score: 0,
      marking: "X",
      color: "#1ECBE1"
    },
    player_two: {
      id: "player_two",
      title: "Speler 2",
      score: 0,
      marking: "O",
      color: "#E1341E"
    }
  })

  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  /* Check if there is a winner */
  const checkForWinner = () => {
    let winner = false
    for (const playerId in players) {
      const player = players[playerId]
      // eslint-disable-next-line
      winCombinations.forEach((winCombination: Array<number>) => {
        if (gameState.fields[winCombination[0]].value === player.marking && 
          gameState.fields[winCombination[1]].value === player.marking && 
          gameState.fields[winCombination[2]].value === player.marking) 
          {

          /* Display winner */
          setGameStatus(player.title + " heeft gewonnen!")

          /* Update Score */
          winner = true
          const updatedPlayers = {
            ...players,
            [playerId]: {
              ...players[playerId],
              score: players[playerId].score + 1
            }
          }
          setPlayers(updatedPlayers)
        }
      })
    }

    return winner
  }

  const checkForDraw = () => {
    if (gameState.fields.filter(e => e.value === "").length === 0) {
      setGameStatus("Het spel is beëindigd in een gelijkspel")
    }
  }

  const resetGame = () => {
    setGameStatus("");
    setGameState({
      ...gameState,
      activePlayer: "player_one",
      fields: new Array(9).fill({value: "", color: ""})
    })
  }

  /* Check for a winner or a draw (if there is no winner) everytime "gameState" updates */
  useEffect(() => {
    if (checkForWinner() === false) {checkForDraw()}
    // eslint-disable-next-line
  }, [gameState])

  return (
    <div className={styles.wrapper}>
      {gameStatus !== "" && 
        <div className={styles.game_status}>
          {gameStatus}
          <button className={styles.restart} onClick={resetGame}>Spel opnieuw instellen</button>
        </div>
      }
      <div className={styles.game_container} > 
        <GameStateContext.Provider value={{ gameState, setGameState, players, gameStatus }}>
          <Scoreboard player={players.player_one} />
          <Gameboard />
          <Scoreboard player={players.player_two} />
        </GameStateContext.Provider>
      </div>
    </div>
  );
}

export default App;
