export enum Platform {
  Steam = "steam",
  EpicGames = "epicGames",
  Ubisoft = "ubisoft",
  XboxPc = "xboxPc",
  EaGames = "eaGames",
  Torrent = "torrent",
  Playstation = "playstation",
  XboxSeries = "xboxSeries",
  Nintendo = "nintendo",
  Mobile = "mobile",
  OtherPlatforms = "otherPlatforms"
}

export enum Status {
  Completed = "completed",
  Abandoned = "abandoned",
  ToBeCompleted = "toBeCompleted",
  ActivePlaying = "activePlaying"
}

export type NameId = {
  name: string
  id: number
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
  screenshotSize: number
  createdAt: Date
  firstFinished?: Date
  isFavorite?: boolean
  igdb?: {
    id: number
    name: string
    cover: {
      id: number
      url: string
      game: string
    }
    summary: string
    slug: string
    involved_companies: {
      company: {
        id: number
        name: string
      }
      developer: boolean
      publisher: boolean
      id: number
      _id: string
    }[]
    developers: {
      id: number
      name: string
    }[]
    publishers: {
      id: number
      name: string
    }[]
    genres: {
      id: number
      name: string
    }[]
    player_perspectives: {
      id: number
      name: string
    }[]
    game_modes: {
      id: number
      name: string
    }[]
    themes: {
      id: number
      name: string
    }[]
    release_dates: {
      id: number
      date: number
    }[]
  }
}

export type DialogGameData = Omit<
  GamesData,
  "userId" | "screenshotSize" | "createdAt"
>
export type FavoriteGamesData = {
  _id: string
  name: string
  rating?: number
  photo?: string
}
export type FavoriteGamesDialogData = {
  first_game: string
  second_game: string
  third_game: string
}

type Cover = {
  id: number
  url: string
  game: string
}

type ReleaseDate = {
  id: number
  date: number
}

type InvolvedCompany = {
  company: {
    name: string
    id: number
  }
  developer: boolean
  publisher: boolean
}

export type IGDBGamesData = {
  id: number
  aggregated_rating: number
  aggregated_rating_count: number
  name: string
  cover: Cover
  summary: string
  slug: string
  developers: NameId[]
  publishers: NameId[]
  genres: NameId[]
  player_perspectives: NameId[]
  game_modes: NameId[]
  themes: NameId[]
  release_dates: ReleaseDate[]
}

export type IGDBGamesResponse = {
  id: number
  aggregated_rating: number
  aggregated_rating_count: number
  name: string
  cover: Cover
  summary: string
  slug: string
  involved_companies?: InvolvedCompany[]
  genres: NameId[]
  player_perspectives: NameId[]
  game_modes: NameId[]
  themes: NameId[]
  release_dates: ReleaseDate[]
}
export type IGDBCoverData = {
  game: number
  id: number
  url: string
  image_id: string
  checksum: string
}
