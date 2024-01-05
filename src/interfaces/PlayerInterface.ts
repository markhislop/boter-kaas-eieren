export interface PlayerInterface {
    [key: string]: {
      id: "player_one" | "player_two"
      title: string,
      score: number,
      marking: string,
      color: string
    }
}