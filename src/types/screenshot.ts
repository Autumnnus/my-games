export type Screenshot = {
  _id: string
  name: string
  url: string
  type: ScreenshotType
  images: File[]
}

export enum ScreenshotType {
  Text = "text",
  Image = "image"
}
