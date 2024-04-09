import axios, { type AxiosResponse } from "axios"
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState
} from "react"

import i18next from "@utils/localization"
import { UsersData } from "types/users"

import {
  AppContextProps,
  appContextDefaultValues,
  useAppContext
} from "../app_context"

export type UsersContextProps = {
  users?: UsersData[]
  setUsers?: Dispatch<SetStateAction<UsersData[]>>
}

export type UsersPageContextProps = AppContextProps & UsersContextProps

export const usersPageDefaultValues: UsersPageContextProps = {
  ...appContextDefaultValues,
  translate: i18next.t
}

const UsersPageContext = createContext(usersPageDefaultValues)

export function UsersPageContextProvider(props: {
  children: React.ReactNode | React.ReactNode[]
}) {
  const { translate } = useAppContext()
  const [users, setUsers] = useState<UsersData[]>([])
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/users`)
      .then((res: AxiosResponse<{ data: UsersData[] }>) => {
        const data = res.data.data
        setUsers(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  console.log(users)
  return (
    <UsersPageContext.Provider
      value={{
        ...usersPageDefaultValues,
        translate,
        users,
        setUsers
      }}
    >
      {props.children}
    </UsersPageContext.Provider>
  )
}

export function useUsersPageContext() {
  const context = useContext(UsersPageContext)
  if (context === undefined) {
    throw new Error("UsersPage Context Error")
  }
  return context
}
