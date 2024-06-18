import { yupResolver } from "@hookform/resolvers/yup"
import type { AxiosResponse } from "axios"
import axios from "axios"
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
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
import { DataTableColumnData, DataTableRowData } from "types/data_table"
import { DialogGameData, GamesData, Platform, Status } from "types/games"

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
  columns: ReadonlyArray<DataTableColumnData>
  rows: ReadonlyArray<DataTableRowData>
  anchorEl?: HTMLButtonElement | null
  setAnchorEl?: Dispatch<SetStateAction<HTMLButtonElement | null>>
  page: number
  setPage?: Dispatch<SetStateAction<number>>
  rowsPerPage: number
  setRowsPerPage?: Dispatch<SetStateAction<number>>
  platformSelectOptions: {
    label: string
    value: Platform
    icon: Platform
  }[]
  statusSelectOptions: {
    label: string
    value: Status
  }[]
}

export type GamesPageContextProps = AppContextProps & GamesContextProps

export const gamesPageDefaultValues: GamesPageContextProps = {
  ...appContextDefaultValues,
  translate: i18next.t,
  control: {} as Control<DialogGameData>,
  games: [],
  columns: [],
  rows: [],
  page: 0,
  rowsPerPage: 25,
  platformSelectOptions: [],
  statusSelectOptions: []
}

const GamesPageContext = createContext(gamesPageDefaultValues)

export function GamesPageContextProvider(props: {
  children: React.ReactNode | React.ReactNode[]
}) {
  const { translate, token } = useAppContext()
  const { id } = useParams()
  const [isAddGameDialogOpen, setIsAddGameDialogOpen] = useToggle()
  const [isEditGameDialogOpen, setIsEditGameDialogOpen] = useToggle()
  const [isDeleteGameDialogOpen, setIsDeleteGameDialogOpen] = useToggle()
  const [games, setGames] = useState<GamesData[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(
    Number(localStorage.getItem("rowsPerPage")) || 25
  )
  const [selectedGame, setSelectedGame] = useState<DialogGameData | null>(null)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const [order, setOrder] = useState<string | undefined>(
    location.search.split("order=")[1]?.split("&")[0]
  )
  const [sortBy, setSortBy] = useState<string | undefined>(
    location.search.split("sortBy=")[1]?.split("&")[0]
  )
  const search = location.search.split("search=")[1]?.split("&")[0]
  useEffect(() => {
    const queryParams = new URLSearchParams()
    if (sortBy) queryParams.append("sortBy", sortBy)
    if (order) queryParams.append("order", order)
    if (search) queryParams.append("search", search)

    const queryString = queryParams.toString()
    const url = `${process.env.REACT_APP_API_URL}/api/games/user/${id}${queryString ? `?${queryString}` : ""}`
    navigate(`?${queryString}`)

    axios
      .get(url)
      .then((res: AxiosResponse<{ data: GamesData[] }>) => {
        setGames(res.data.data)
      })
      .catch((err) => {
        showErrorToast("Database Fetching Error")
        console.error(err)
      })
  }, [id, sortBy, order, search, navigate, setGames])
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
        .oneOf(Object.values(Platform))
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
        .oneOf(Object.values(Status))
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

  const columns: ReadonlyArray<DataTableColumnData> = useMemo(
    () => [
      { id: "photo", label: "", minWidth: 50 },
      { id: "name", label: translate("game"), width: 100 },
      {
        id: "rating",
        label: translate("rating"),
        minWidth: 170,
        align: "right"
      },
      {
        id: "platform",
        label: translate("platform"),
        minWidth: 170,
        align: "right"
      },
      {
        id: "screenshots",
        label: translate("screenshots"),
        minWidth: 170,
        align: "right"
      },
      {
        id: "playTime",
        label: translate("play_time"),
        minWidth: 170,
        align: "right"
      },
      {
        id: "lastPlay",
        label: translate("last_played"),
        minWidth: 170,
        align: "right"
      },
      {
        id: "status",
        label: translate("status"),
        minWidth: 170,
        align: "right"
      },
      {
        id: "actions",
        label: "",
        align: "right"
      }
    ],
    [translate]
  )
  const rows = useMemo(() => {
    return games.map((game) =>
      createData(
        game.photo,
        game.name,
        game.rating,
        game.platform,
        game.screenshots.length,
        game.playTime,
        game.lastPlay,
        game.status,
        game._id,
        game.review
      )
    )
  }, [games])

  const platformSelectOptions = [
    { label: "Steam", value: Platform.Steam, icon: Platform.Steam },
    {
      label: "Epic Games",
      value: Platform.EpicGames,
      icon: Platform.EpicGames
    },
    {
      label: "Ubisoft",
      value: Platform.Ubisoft,
      icon: Platform.Ubisoft
    },
    {
      label: "Xbox(Pc)",
      value: Platform.XboxPc,
      icon: Platform.XboxPc
    },
    {
      label: "EA Games",
      value: Platform.EaGames,
      icon: Platform.EaGames
    },
    {
      label: "Ubisoft",
      value: Platform.Ubisoft,
      icon: Platform.Ubisoft
    },
    {
      label: "Torrent",
      value: Platform.Torrent,
      icon: Platform.Torrent
    },
    {
      label: "Playstation",
      value: Platform.Playstation,
      icon: Platform.Playstation
    },
    {
      label: "Xbox Series",
      value: Platform.XboxSeries,
      icon: Platform.XboxSeries
    },
    {
      label: "Nintendo",
      value: Platform.XboxSeries,
      icon: Platform.XboxSeries
    },
    {
      label: "Mobile",
      value: Platform.Mobile,
      icon: Platform.Mobile
    },
    {
      label: translate("otherPlatforms"),
      value: Platform.OtherPlatforms,
      icon: Platform.OtherPlatforms
    }
  ]
  const statusSelectOptions = [
    { label: translate("completed"), value: Status.Completed },
    { label: translate("abandoned"), value: Status.Abandoned },
    {
      label: translate("toBeCompleted"),
      value: Status.ToBeCompleted
    },
    { label: translate("activePlaying"), value: Status.ActivePlaying }
  ]
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
        setSortBy,
        columns,
        rows,
        anchorEl,
        setAnchorEl,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        platformSelectOptions,
        statusSelectOptions,
        token
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

function createData(
  photo: string,
  name: string,
  rating: number,
  platform: Platform,
  screenshots: number,
  playTime: number,
  lastPlay: string,
  status: Status,
  _id: string,
  review: string // can be nullable
) {
  return {
    photo,
    name,
    rating,
    platform,
    screenshots,
    playTime,
    lastPlay,
    status,
    _id,
    review
  }
}
