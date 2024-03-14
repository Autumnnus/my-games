/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import i18next from "@utils/localization"
import { createContext, useContext } from "react"

import { appContextDefaultValues } from "../app_context"

export type GamesPageContextProps = object

export const gamesPageDefaultValues: GamesPageContextProps = {
  ...appContextDefaultValues
  //   translate: i18next.t
}

const GamesPageContext = createContext(gamesPageDefaultValues)

export function GamesPageContextProvider(props: {
  children: React.ReactNode | React.ReactNode[]
}) {
  //   const { translate, me } = useAppContext()

  return (
    <GamesPageContext.Provider
      value={{
        ...gamesPageDefaultValues
        // translate,
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
