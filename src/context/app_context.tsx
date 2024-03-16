import type { TFunction } from "i18next"
import React, { createContext, useContext } from "react"

import useTranslate from "@hooks/use_translate"
import i18next from "@utils/localization"

export type AppContextProps = {
  translate: TFunction<"translation", undefined>
}

export const appContextDefaultValues: AppContextProps = {
  translate: i18next.t
}

const AppContext = createContext(appContextDefaultValues)

export function AppContextProvider(props: {
  children: React.ReactNode | React.ReactNode[]
}) {
  const { translate } = useTranslate()

  return (
    <AppContext.Provider
      value={{
        ...appContextDefaultValues,
        translate
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
