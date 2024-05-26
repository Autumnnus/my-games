import { Platform, Status } from "types/games"

export type DataTableColumnData = {
  id: DataTableColumnKeys
  label: string
  minWidth?: number
  width?: number
  align?: "right" | "left" | "center"
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

type DataTableColumnKeys =
  | "photo"
  | "name"
  | "rating"
  | "platform"
  | "screenshots"
  | "lastPlay"
  | "status"
  | "playTime"
  | "actions"
