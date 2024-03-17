import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
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

  const [users, setUsers] = useState([
    {
      createdAt: {
        seconds: 1709844598,
        nanoseconds: 265000000
      },
      email: "prostochasy@gmail.com",
      name: "Vector",
      photoUrl:
        "https://i.pinimg.com/736x/3f/67/87/3f67879f186cfacff6aa3969e76c7cc3.jpg",
      role: "admin",
      uid: "TalXJ5g1FSZYyfMwg0wasE7vokg1"
    },
    {
      createdAt: {
        seconds: 1709844598,
        nanoseconds: 265000000
      },
      email: "aaa@testmq.com",
      name: "Vecky",
      photoUrl:
        "https://i.pinimg.com/736x/3f/67/87/3f67879f186cfacff6aa3969e76c7cc3.jpg",
      role: "admin",
      uid: "TalXJ5g1FSZYyfMwg0wasE7vokg1"
    }
  ])

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
