export type GameTableData = {
  photo: string
  game: string
  score: number
  platform: string
  ss: number
  lastPlayed: string
  status: string
}

export type Platform =
  | "steam"
  | "epicGames"
  | "ubisoft"
  | "xboxPc"
  | "eaGames"
  | "torrent"
  | "playstation"
  | "xboxSeries"
  | "nintendo"
  | "mobile"
  | "otherPlatforms"

export type Status =
  | "completed"
  | "abondoned"
  | "toBeCompleted"
  | "activePlaying"

type Screenshot = {
  _id: string
  ssName: string
  ssUrl: string
}
export type GamesData = {
  rating: number
  playTime: number
  status: Status
  lastPlay: string
  photo: string
  platform: Platform
  name: string
  review: string
  _id: string
  userId: string
  screenshots: Screenshot[]
  createdAt: Date
}

export type DialogGameData = Omit<
  GamesData,
  "userId" | "screenshots" | "createdAt"
>
