import { createContext, useContext } from "react"

import i18next from "@utils/localization"

import {
  AppContextProps,
  appContextDefaultValues,
  useAppContext
} from "../app_context"

export type AuthPageContextProps = AppContextProps

export const authPageDefaultValues: AuthPageContextProps = {
  ...appContextDefaultValues,
  translate: i18next.t
}

const AuthPageContext = createContext(authPageDefaultValues)

export function AuthPageContextProvider(props: {
  children: React.ReactNode | React.ReactNode[]
}) {
  const { translate } = useAppContext()

  return (
    <AuthPageContext.Provider
      value={{
        ...authPageDefaultValues,
        translate
      }}
    >
      {props.children}
    </AuthPageContext.Provider>
  )
}

export function useAuthPageContext() {
  const context = useContext(AuthPageContext)
  if (context === undefined) {
    throw new Error("AuthPage Context Error")
  }
  return context
}
