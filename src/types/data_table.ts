import { Platform, Status } from "types/games"

export type DataTableColumnData = {
  id: GameDataTableColumnKeys
  label: string
  minWidth?: number
  width?: number
  align?: "right" | "left" | "center"
  format?: (value: number) => string
}
export type UserDataTableColumnData = {
  id: UserDataTableColumnKeys
  label: string
  minWidth?: number
  align?: "right"
  format?: (value: number) => string
}

export type DataTableRowData = {
  photo: string
  name: string
  rating: number
  platform: Platform
  screenshots: number
  playTime: number
  lastPlay: string
  status: Status
  _id: string
  review: string
}
export type UserDataTableRowData = {
  profileImage: string
  name: string
  gameSize: number
  completedGameSize: number
  screenshotSize: number
}

type GameDataTableColumnKeys =
  | "photo"
  | "name"
  | "rating"
  | "platform"
  | "screenshots"
  | "lastPlay"
  | "status"
  | "playTime"
  | "actions"
type UserDataTableColumnKeys =
  | "profileImage"
  | "name"
  | "gameSize"
  | "completedGameSize"
  | "screenshotSize"
  | "actions"
