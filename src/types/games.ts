export type GameTableData = {
  photo: string
  game: string
  score: number
  platform: string
  ss: number
  lastPlayed: string
  status: string
}

type Timestamp = {
  seconds: number
  nanoseconds: number
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
  createdAt: Timestamp
  platform: Platform
  screenshots: Screenshot[]
  name: string
  review: string
  userId: string
  _id: string
}

export type DialogGameData = {
  name: string
  photo?: string
  lastPlay: string
  platform: Platform
  review?: string
  rating?: number
  status: string
  playTime: number
  _id?: string
}
