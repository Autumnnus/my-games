import { yupResolver } from "@hookform/resolvers/yup"
import type { AxiosResponse } from "axios"
import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { Control, UseFormHandleSubmit, UseFormReset } from "react-hook-form"
import { useParams } from "react-router-dom"
import * as yup from "yup"

import useControlledForm from "@hooks/use_controlled_form"
import useToggle from "@hooks/use_toggle"
import { showErrorToast } from "@utils/functions/toast"
import i18next from "@utils/localization"
import { AxiosErrorMessage } from "types/axios"
import { FavoriteGamesData, FavoriteGamesDialogData } from "types/games"
import { UsersData } from "types/users"

import {
  AppContextProps,
  appContextDefaultValues,
  useAppContext
} from "../app_context"

export type ProfileContextProps = {
  profile?: UsersData
  favoriteGames?: FavoriteGamesData[]
  setFavoriteGames?: React.Dispatch<React.SetStateAction<FavoriteGamesData[]>>
  control: Control<FavoriteGamesDialogData>
  handleSubmit?: UseFormHandleSubmit<FavoriteGamesDialogData>
  reset?: UseFormReset<FavoriteGamesDialogData>
  isValid?: boolean
  isDirty?: boolean
  isFavoriteGamesDialogOpen?: boolean
  setIsFavoriteGamesDialogOpen?: () => void
}

export type ProfilePageContextProps = AppContextProps & ProfileContextProps

export const profilePageDefaultValues: ProfilePageContextProps = {
  ...appContextDefaultValues,
  translate: i18next.t,
  control: {} as Control<FavoriteGamesDialogData>
}

const ProfilePageContext = createContext(profilePageDefaultValues)

export function ProfilePageContextProvider(props: {
  children: React.ReactNode | React.ReactNode[]
}) {
  const { translate, token, backendUrl } = useAppContext()
  const { id } = useParams()
  const [profile, setProfile] = useState<UsersData>()
  const [isFavoriteGamesDialogOpen, setIsFavoriteGamesDialogOpen] = useToggle()
  const [favoriteGames, setFavoriteGames] = useState<FavoriteGamesData[]>([])
  useEffect(() => {
    axios
      .get(`${backendUrl}/api/users/${id}`)
      .then((res: AxiosResponse<{ data: UsersData }>) => {
        setProfile(res.data.data)
      })
      .catch((error: AxiosErrorMessage) => {
        console.error(error)
        showErrorToast(
          "Database Fetching Error: " + error.response?.data.message
        )
      })
    axios
      .get(`${backendUrl}/api/games/getFavoriteGames/${id}`)
      .then((res: AxiosResponse<{ data: FavoriteGamesData[] }>) => {
        setFavoriteGames(res.data.data)
      })
      .catch((error: AxiosErrorMessage) => {
        console.error(error)
        showErrorToast(
          "Database Fetching Error: " + error.response?.data.message
        )
      })
  }, [backendUrl, id])

  const schema = yup
    .object({
      first_game: yup
        .string()
        .required(
          translate("input_is_required", { name: translate("game_name") })
        ),
      second_game: yup
        .string()
        .required(
          translate("input_is_required", { name: translate("game_name") })
        ),
      third_game: yup
        .string()
        .required(
          translate("input_is_required", { name: translate("game_name") })
        )
    })
    .required()
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, isDirty }
  } = useControlledForm<FavoriteGamesDialogData>({
    resolver: yupResolver(schema),
    mode: "all"
  })

  return (
    <ProfilePageContext.Provider
      value={{
        ...profilePageDefaultValues,
        translate,
        token,
        profile,
        backendUrl,
        favoriteGames,
        setFavoriteGames,
        control,
        handleSubmit,
        reset,
        isValid,
        isDirty,
        isFavoriteGamesDialogOpen,
        setIsFavoriteGamesDialogOpen
      }}
    >
      {props.children}
    </ProfilePageContext.Provider>
  )
}

export function useProfilePageContext() {
  const context = useContext(ProfilePageContext)
  if (context === undefined) {
    throw new Error("ProfilePage Context Error")
  }
  return context
}
