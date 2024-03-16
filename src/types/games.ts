export type GameTableData = {
  photo: string
  game: string
  score: number
  platform: string
  ss: number
  lastPlayed: string
  status: string
}

export type GamesData = {
  gameScore: number
  gameTotalTime: number
  gameStatus: string
  gameDate: string
  gamePhoto: string
  createdAt: {
    seconds: number
    nanoseconds: number
  }
  gamePlatform: string
  screenshots: {
    id: string
    ssName: string
    ssUrl: string
  }[]
  gameName: string
  gameReview: string
  userId: string
  id: string
}
