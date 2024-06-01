import type { AxiosResponse } from "axios"
import axios from "axios"
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState
} from "react"
import { useNavigate, useParams } from "react-router-dom"

import useToggle from "@hooks/use_toggle"
import { showErrorToast } from "@utils/functions/toast"
import i18next from "@utils/localization"
import { useGamesPageContext } from "context/games"
import { GamesData } from "types/games"

import {
  AppContextProps,
  appContextDefaultValues,
  useAppContext
} from "../../app_context"

export type GameDetailContextProps = {
  game: GamesData | null
  setGame?: Dispatch<SetStateAction<GameDetailContextProps["game"]>>
  isAddGameDialogOpen?: boolean
  setIsAddGameDialogOpen?: () => void
  isEditGameDialogOpen?: boolean
  setIsEditGameDialogOpen?: () => void
  isDeleteGameDialogOpen?: boolean
  setIsDeleteGameDialogOpen?: () => void
}

export type GameDetailPageContextProps = AppContextProps &
  GameDetailContextProps

export const gameDetailPageDefaultValues: GameDetailPageContextProps = {
  ...appContextDefaultValues,
  translate: i18next.t,
  game: null
}

const GameDetailPageContext = createContext(gameDetailPageDefaultValues)

export function GameDetailPageContextProvider(props: {
  children: React.ReactNode | React.ReactNode[]
}) {
  const { translate } = useAppContext()
  const gamesPageDefaultValues = useGamesPageContext()
  const { id } = useParams()
  const [isAddGameDialogOpen, setIsAddGameDialogOpen] = useToggle()
  const [isEditGameDialogOpen, setIsEditGameDialogOpen] = useToggle()
  const [isDeleteGameDialogOpen, setIsDeleteGameDialogOpen] = useToggle()
  const [game, setGame] = useState<GamesData | null>(null)
  const navigate = useNavigate()
  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/api/games/game/${id}`
    axios
      .get(url)
      .then((res: AxiosResponse<{ data: GamesData }>) => {
        setGame(res.data.data)
        console.log(res.data.data, "data")
      })
      .catch((err) => {
        showErrorToast("Error Fetching Game Detail Data")
        console.error(err)
      })
  }, [id, navigate])
  return (
    <GameDetailPageContext.Provider
      value={{
        ...gameDetailPageDefaultValues,
        ...gamesPageDefaultValues,
        translate,
        game,
        setGame,
        isAddGameDialogOpen,
        setIsAddGameDialogOpen,
        isEditGameDialogOpen,
        setIsEditGameDialogOpen,
        isDeleteGameDialogOpen,
        setIsDeleteGameDialogOpen
      }}
    >
      {props.children}
    </GameDetailPageContext.Provider>
  )
}

export function useGameDetailPageContext() {
  const context = useContext(GameDetailPageContext)
  if (context === undefined) {
    throw new Error("GameDetailPage Context Error")
  }
  return context
}
