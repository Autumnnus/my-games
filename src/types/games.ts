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

type Platform =
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

type Status = "completed" | "abondoned" | "toBeCompleted" | "activePlaying"

type Screenshot = {
  id: string
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
  id: string
}

export type DialogGameData = {
  name: string
  photo?: string
  lastPlay: string
  platform: Platform
  review?: string
  rating: number
  status: string
  playTime: number
  id?: string
}
