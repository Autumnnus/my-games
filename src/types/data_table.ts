import { Platform, Status } from "types/games"

export type DataTableColumnData = {
  id:
    | "photo"
    | "name"
    | "rating"
    | "platform"
    | "screenshots"
    | "lastPlay"
    | "status"
    | "playTime"
    | "actions"
  label: string
  minWidth?: number
  width?: number
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
