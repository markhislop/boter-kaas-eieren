export interface GameStateInterface {
    activePlayer: "player_one" | "player_two"
    fields: Array<{
        value: string,
        color: string
    }>,
}