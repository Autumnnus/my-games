export type UsersData = {
  completedGameSize: number
  createdAt: Date
  email: string
  gameSize: number
  isVerified: boolean
  name: string
  password: string
  role: "admin" | "user"
  screenshotSize: number
  updatedAt: Date
  verificationExpire: Date
  verificationToken: string
  resetPasswordExpire: Date
  resetPasswordToken: string
  profileImage: string
  __v: number
  _id: string
}

export type EditUserDialogData = {
  email: string
  password: string
  profileImage: string
}
