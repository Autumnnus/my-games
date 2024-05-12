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
import { useLocation, useNavigate, useParams } from "react-router-dom"
import * as yup from "yup"

import useControlledForm from "@hooks/use_controlled_form"
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
  games: GamesData[]
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
  isDirty?: boolean
  order?: string
  sortBy?: string
  setOrder?: Dispatch<SetStateAction<string | undefined>>
  setSortBy?: Dispatch<SetStateAction<string | undefined>>
}

export type GamesPageContextProps = AppContextProps & GamesContextProps

export const gamesPageDefaultValues: GamesPageContextProps = {
  ...appContextDefaultValues,
  translate: i18next.t,
  control: {} as Control<DialogGameData>,
  games: []
}

const GamesPageContext = createContext(gamesPageDefaultValues)

export function GamesPageContextProvider(props: {
  children: React.ReactNode | React.ReactNode[]
}) {
  const { translate } = useAppContext()
  const { id } = useParams()
  const [isAddGameDialogOpen, setIsAddGameDialogOpen] = useToggle()
  const [isEditGameDialogOpen, setIsEditGameDialogOpen] = useToggle()
  const [isDeleteGameDialogOpen, setIsDeleteGameDialogOpen] = useToggle()
  const [games, setGames] = useState<GamesData[]>([])
  const [selectedGame, setSelectedGame] = useState<DialogGameData | null>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const [order, setOrder] = useState<string | undefined>(
    location.search.split("order=")[1]?.split("&")[0]
  )
  const [sortBy, setSortBy] = useState<string | undefined>(
    location.search.split("sortBy=")[1]?.split("&")[0]
  )
  useEffect(() => {
    console.log(order, "context")
    let url = `${process.env.REACT_APP_API_URL}/api/games/user/${id}`
    if (sortBy && order) {
      url += `?sortBy=${sortBy}&order=${order}`
      navigate(`?sortBy=${sortBy}&order=${order}`)
    }
    axios
      .get(url)
      .then((res: AxiosResponse<{ data: GamesData[] }>) => {
        setGames(res.data.data)
      })
      .catch((err) => {
        showErrorToast("Database Fethcing Error")
        console.error(err)
      })
  }, [id, order, sortBy])
  const schema = yup
    .object({
      name: yup
        .string()
        .max(
          160,
          translate("max_length_error", {
            name: translate("game_name"),
            value: 160
          })
        )
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
        .transform((value, originalValue): number | undefined => {
          if (
            typeof originalValue === "string" &&
            originalValue.trim() === ""
          ) {
            return undefined
          }
          return value
        })
        .min(0, translate("rating_min_error", { value: 0 }))
        .max(10, translate("rating_max_error", { value: 10 })),
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
        .min(0, translate("rating_min_error", { value: 0 }))
        .max(999999, translate("rating_max_error", { value: 999999 }))
        .required(
          translate("input_is_required", { name: translate("game_play_time") })
        )
    })
    .required()
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, isDirty }
  } = useControlledForm<DialogGameData>({
    resolver: yupResolver(schema) as unknown as Resolver<DialogGameData>,
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
        isValid,
        isDirty,
        order,
        sortBy,
        setOrder,
        setSortBy
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
