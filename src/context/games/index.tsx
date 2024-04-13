import { yupResolver } from "@hookform/resolvers/yup"
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
import type {
  Control,
  Resolver,
  UseFormHandleSubmit,
  UseFormReset
} from "react-hook-form"
import { useForm } from "react-hook-form"
import { useLocation } from "react-router-dom"
import * as yup from "yup"

import useToggle from "@hooks/use_toggle"
import { showErrorToast } from "@utils/functions/toast"
import i18next from "@utils/localization"
import { DialogGameData, GamesData } from "types/games"

import {
  AppContextProps,
  appContextDefaultValues,
  useAppContext
} from "../app_context"

export type GamesContextProps = {
  games?: GamesData[]
  setGames?: Dispatch<SetStateAction<GamesData[]>>
  isAddGameDialogOpen?: boolean
  setIsAddGameDialogOpen?: () => void
  isEditGameDialogOpen?: boolean
  setIsEditGameDialogOpen?: () => void
  isDeleteGameDialogOpen?: boolean
  setIsDeleteGameDialogOpen?: () => void
  selectedGame?: DialogGameData | null
  setSelectedGame?: Dispatch<SetStateAction<DialogGameData | null>>
  control: Control<DialogGameData>
  handleSubmit?: UseFormHandleSubmit<DialogGameData>
  reset?: UseFormReset<DialogGameData>
  isValid?: boolean
}

export type GamesPageContextProps = AppContextProps & GamesContextProps

export const gamesPageDefaultValues: GamesPageContextProps = {
  ...appContextDefaultValues,
  translate: i18next.t,
  control: {} as Control<DialogGameData>
}

const GamesPageContext = createContext(gamesPageDefaultValues)

export function GamesPageContextProvider(props: {
  children: React.ReactNode | React.ReactNode[]
}) {
  const { translate } = useAppContext()
  const location = useLocation()
  const id = location.pathname.split("/").pop()
  const [isAddGameDialogOpen, setIsAddGameDialogOpen] = useToggle()
  const [isEditGameDialogOpen, setIsEditGameDialogOpen] = useToggle()
  const [isDeleteGameDialogOpen, setIsDeleteGameDialogOpen] = useToggle()
  const [games, setGames] = useState<GamesData[]>([])
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/games/user/${id}`)
      .then((res: AxiosResponse<{ data: GamesData[] }>) => {
        setGames(res.data.data)
      })
      .catch((err) => {
        showErrorToast("Database Fethcing Error")
        console.error(err)
      })
  }, [id])
  const [selectedGame, setSelectedGame] = useState<DialogGameData | null>(null)
  const schema = yup
    .object({
      name: yup
        .string()
        .required(
          translate("input_is_required", { name: translate("game_name") })
        ),
      photo: yup.string(),
      lastPlay: yup
        .string()
        .required(
          translate("input_is_required", { name: translate("last_play_date") })
        ),
      platform: yup
        .string()
        .required(
          translate("input_is_required", { name: translate("platform") })
        ),
      review: yup.string(),
      rating: yup
        .number()
        .typeError(
          translate("input_is_required", { name: translate("game_play_time") })
        )
        .required(
          translate("input_is_required", { name: translate("rating") })
        ),
      status: yup
        .string()
        .required(
          translate("input_is_required", { name: translate("game_status") })
        ),
      playTime: yup
        .number()
        .typeError(
          translate("input_is_required", { name: translate("game_play_time") })
        )
        .required(
          translate("input_is_required", { name: translate("game_play_time") })
        )
    })
    .required()
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid }
  } = useForm<DialogGameData>({
    resolver: yupResolver(schema) as Resolver<DialogGameData>,
    mode: "all"
  })
  return (
    <GamesPageContext.Provider
      value={{
        ...gamesPageDefaultValues,
        translate,
        games,
        setGames,
        isAddGameDialogOpen,
        setIsAddGameDialogOpen,
        isEditGameDialogOpen,
        setIsEditGameDialogOpen,
        isDeleteGameDialogOpen,
        setIsDeleteGameDialogOpen,
        selectedGame,
        setSelectedGame,
        control,
        handleSubmit,
        reset,
        isValid
      }}
    >
      {props.children}
    </GamesPageContext.Provider>
  )
}

export function useGamesPageContext() {
  const context = useContext(GamesPageContext)
  if (context === undefined) {
    throw new Error("GamesPage Context Error")
  }
  return context
}
