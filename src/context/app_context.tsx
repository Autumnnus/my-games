import type { TFunction } from "i18next"
import React, { createContext, useContext, useState } from "react"

import useTranslate from "@hooks/use_translate"
import i18next from "@utils/localization"
import { UsersData } from "types/users"

type TokenData = {
  email: string
  id: string
  name: string
  isVerified: boolean
  role: UsersData["role"]
}

export type AppContextProps = {
  translate: TFunction<"translation", undefined>
  token?: {
    access_token: string
    data: TokenData
  }
  setToken?: React.Dispatch<
    React.SetStateAction<
      | {
          access_token: string
          data: TokenData
        }
      | undefined
    >
  >
  backendUrl?: string
}

export const appContextDefaultValues: AppContextProps = {
  translate: i18next.t
}

const AppContext = createContext(appContextDefaultValues)

export function AppContextProvider(props: {
  children: React.ReactNode | React.ReactNode[]
}) {
  const { translate } = useTranslate()
  const [token, setToken] = useState<AppContextProps["token"]>(() => {
    const storedToken = localStorage.getItem("my-games-user")
    return storedToken
      ? (JSON.parse(storedToken) as AppContextProps["token"])
      : undefined
  })
  const backendUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://my-games-8c0fcafba242.herokuapp.com"
  return (
    <AppContext.Provider
      value={{
        ...appContextDefaultValues,
        translate,
        token,
        setToken,
        backendUrl
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("App Context Error")
  }
  return context
}
