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
import {
  Control,
  Resolver,
  UseFormHandleSubmit,
  UseFormReset,
  UseFormSetValue,
  UseFormTrigger
} from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import * as yup from "yup"

import useControlledForm from "@hooks/use_controlled_form"
import useToggle from "@hooks/use_toggle"
import { showErrorToast } from "@utils/functions/toast"
import i18next from "@utils/localization"
import { DialogGameData, GamesData, Platform, Status } from "types/games"
import { Screenshot, ScreenshotType } from "types/screenshot"

import {
  AppContextProps,
  appContextDefaultValues,
  useAppContext
} from "../app_context"

export type GameDetailContextProps = {
  game: GamesData
  setGame?: Dispatch<SetStateAction<GameDetailContextProps["game"]>>
  screenShots: Screenshot[]
  setScreenShots?: Dispatch<
    SetStateAction<GameDetailContextProps["screenShots"]>
  >
  isEditGameDialogOpen?: boolean
  setIsEditGameDialogOpen?: () => void
  isDeleteGameDialogOpen?: boolean
  setIsDeleteGameDialogOpen?: () => void
  isAddScreenshotDialogOpen?: boolean
  setIsAddScreenshotDialogOpen?: () => void
  isDeleteScreenshotDialogOpen?: boolean
  setIsDeleteScreenshotDialogOpen?: () => void
  isEditScreenshotDialogOpen?: boolean
  setIsEditScreenshotDialogOpen?: () => void
  control: Control<DialogGameData>
  handleSubmit?: UseFormHandleSubmit<DialogGameData>
  reset?: UseFormReset<DialogGameData>
  isValid?: boolean
  isDirty?: boolean
  screenshotControl: Control<Screenshot>
  screenshotHandleSubmit?: UseFormHandleSubmit<Screenshot>
  screenshotReset?: UseFormReset<Screenshot>
  screenshotIsValid?: boolean
  screenshotIsDirty?: boolean
  anchorEl: HTMLButtonElement | null
  setAnchorEl?: Dispatch<SetStateAction<HTMLButtonElement | null>>
  handleClosePopover?: () => void
  selectedSS?: Screenshot
  setSelectedSS?: Dispatch<SetStateAction<GameDetailContextProps["selectedSS"]>>
  isPreviewScreenshotOpen?: boolean
  setIsPreviewScreenshotOpen?: () => void
  setScreenshotValue?: UseFormSetValue<Screenshot>
  screenshotTrigger?: UseFormTrigger<Screenshot>
}

export type GameDetailPageContextProps = AppContextProps &
  GameDetailContextProps

export const gameDetailPageDefaultValues: GameDetailPageContextProps = {
  ...appContextDefaultValues,
  translate: i18next.t,
  control: {} as Control<DialogGameData>,
  screenshotControl: {} as Control<Screenshot>,
  game: {} as GamesData,
  screenShots: [],
  anchorEl: null
}

const GameDetailPageContext = createContext(gameDetailPageDefaultValues)

export function GameDetailPageContextProvider(props: {
  children: React.ReactNode | React.ReactNode[]
}) {
  const { translate, token } = useAppContext()
  const { id } = useParams()
  const [anchorEl, setAnchorEl] =
    useState<GameDetailContextProps["anchorEl"]>(null)
  const [selectedSS, setSelectedSS] =
    useState<GameDetailContextProps["selectedSS"]>()
  const [isEditGameDialogOpen, setIsEditGameDialogOpen] = useToggle()
  const [isPreviewScreenshotOpen, setIsPreviewScreenshotOpen] = useToggle()
  const [isDeleteGameDialogOpen, setIsDeleteGameDialogOpen] = useToggle()
  const [isAddScreenshotDialogOpen, setIsAddScreenshotDialogOpen] = useToggle()
  const [isEditScreenshotDialogOpen, setIsEditScreenshotDialogOpen] =
    useToggle()
  const [isDeleteScreenshotDialogOpen, setIsDeleteScreenshotDialogOpen] =
    useToggle()
  const [game, setGame] = useState<GameDetailContextProps["game"]>(
    {} as GamesData
  )
  const [screenShots, setScreenShots] = useState<
    GameDetailContextProps["screenShots"]
  >([])
  const navigate = useNavigate()
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
  const screenshotSchema = yup
    .object({
      name: yup.string(),
      type: yup
        .string()
        .oneOf(Object.values(ScreenshotType))
        .required(
          translate("input_is_required", { name: translate("screenshot_type") })
        ),
      url: yup.string().when("type", {
        is: (val: ScreenshotType) => val === ScreenshotType.Text,
        then: (schema) =>
          schema.required(
            translate("input_is_required", {
              name: translate("screenshot_url")
            })
          )
      }),
      images: yup
        .array()
        .of(yup.mixed())
        .when("type", {
          is: (val: ScreenshotType) => val === ScreenshotType.Image,
          then: (schema) =>
            schema
              .min(
                1,
                translate("min_length_error", {
                  name: translate("screenshot_images"),
                  value: 1
                })
              )
              .max(
                50,
                translate("max_length_error", {
                  name: translate("screenshot_images"),
                  value: 50
                })
              )
        })
    })
    .required()
  const {
    control: screenshotControl,
    handleSubmit: screenshotHandleSubmit,
    reset: screenshotReset,
    setValue: setScreenshotValue,
    trigger: screenshotTrigger,
    formState: { isValid: screenshotIsValid, isDirty: screenshotIsDirty }
  } = useControlledForm<Screenshot>({
    resolver: yupResolver(screenshotSchema) as unknown as Resolver<Screenshot>,
    mode: "all",
    defaultValues: {
      type: ScreenshotType.Text
    }
  })

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/api/games/game/${id}`
    axios
      .get(url)
      .then((res: AxiosResponse<{ data: GamesData }>) => {
        setGame(res.data.data)
        setScreenShots(res.data.data.screenshots)
      })
      .catch((err) => {
        showErrorToast("Error Fetching Game Detail Data")
        console.error(err)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new Error(err)
      })
  }, [id, navigate])

  function handleClosePopover() {
    setAnchorEl(null)
  }
  return (
    <GameDetailPageContext.Provider
      value={{
        ...gameDetailPageDefaultValues,
        translate,
        game,
        setGame,
        isEditGameDialogOpen,
        setIsEditGameDialogOpen,
        isDeleteGameDialogOpen,
        setIsDeleteGameDialogOpen,
        control,
        handleSubmit,
        reset,
        isValid,
        isDirty,
        screenshotControl,
        screenshotHandleSubmit,
        screenshotReset,
        screenshotIsValid,
        screenshotIsDirty,
        screenShots,
        setScreenShots,
        isAddScreenshotDialogOpen,
        setIsAddScreenshotDialogOpen,
        isDeleteScreenshotDialogOpen,
        setIsDeleteScreenshotDialogOpen,
        isEditScreenshotDialogOpen,
        setIsEditScreenshotDialogOpen,
        anchorEl,
        setAnchorEl,
        handleClosePopover,
        selectedSS,
        setSelectedSS,
        isPreviewScreenshotOpen,
        setIsPreviewScreenshotOpen,
        token,
        setScreenshotValue,
        screenshotTrigger
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
