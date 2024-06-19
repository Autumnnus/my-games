export type Screenshot = {
  _id: string
  name: string
  url: string
  type: ScreenshotType
  images: File[]
  key?: string
  user: string
  game: string
  createdAt: Date
  updatedAt: Date
}

export enum ScreenshotType {
  Text = "text",
  Image = "image"
}
