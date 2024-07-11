import axios, { type AxiosResponse } from "axios"
import type { TFunction } from "i18next"
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from "react"

import useTranslate from "@hooks/use_translate"
import { showErrorToast } from "@utils/functions/toast"
import i18next from "@utils/localization"
import { AxiosErrorMessage } from "types/axios"
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
  users: UsersData[]
  setUsers?: Dispatch<SetStateAction<AppContextProps["users"]>>
}

export const appContextDefaultValues: AppContextProps = {
  translate: i18next.t,
  users: []
}

const AppContext = createContext(appContextDefaultValues)

export function AppContextProvider(props: {
  children: React.ReactNode | React.ReactNode[]
}) {
  const { translate } = useTranslate()
  const [users, setUsers] = useState<AppContextProps["users"]>(
    JSON.parse(localStorage.getItem("my-games-users") || "[]") as UsersData[]
  )
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
  useEffect(() => {
    axios
      .get(`${backendUrl}/api/users`)
      .then((res: AxiosResponse<{ data: UsersData[] }>) => {
        localStorage.setItem("my-games-users", JSON.stringify(res.data.data))
        setUsers?.(res.data.data)
      })
      .catch((error: AxiosErrorMessage) => {
        console.error(error)
        showErrorToast(
          "Database Fetching Error: " + error.response?.data.message
        )
      })
  }, [])
  return (
    <AppContext.Provider
      value={{
        ...appContextDefaultValues,
        translate,
        token,
        setToken,
        backendUrl,
        users,
        setUsers
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
