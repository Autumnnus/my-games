import type { AxiosResponse } from "axios"
import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import type { Control } from "react-hook-form"
import { useParams } from "react-router-dom"

import { showErrorToast } from "@utils/functions/toast"
import i18next from "@utils/localization"
import { DialogGameData } from "types/games"
import { UsersData } from "types/users"

import {
  AppContextProps,
  appContextDefaultValues,
  useAppContext
} from "../app_context"

export type ProfileContextProps = {
  control?: Control<DialogGameData>
}

export type GamesPageContextProps = AppContextProps & ProfileContextProps

export const gamesPageDefaultValues: GamesPageContextProps = {
  ...appContextDefaultValues,
  translate: i18next.t
}

const GamesPageContext = createContext(gamesPageDefaultValues)

export function ProfilePageContextProvider(props: {
  children: React.ReactNode | React.ReactNode[]
}) {
  const { translate } = useAppContext()
  const { id } = useParams()
  const [profile, setProfile] = useState<UsersData[]>([])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/users/${id}`)
      .then((res: AxiosResponse<{ data: UsersData[] }>) => {
        setProfile(res.data.data)
      })
      .catch((err) => {
        showErrorToast("Database Fethcing Error")
        console.error(err)
      })
  }, [id])
  console.log(profile)

  return (
    <GamesPageContext.Provider
      value={{
        ...gamesPageDefaultValues,
        translate
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
