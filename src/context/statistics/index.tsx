import { useQuery } from "@tanstack/react-query"
import axios, { type AxiosResponse } from "axios"
import { createContext, useContext } from "react"

import { showErrorToast } from "@utils/functions/toast"
import i18next from "@utils/localization"
import { AxiosErrorMessage } from "types/axios"
import { StatisticsResponse } from "types/statistics"

import {
  AppContextProps,
  appContextDefaultValues,
  useAppContext
} from "../app_context"

export type StatisticsContextProps = {
  allStatistics?: StatisticsResponse | null | undefined
  allStatisticsLoading?: boolean
  userStatistics?: StatisticsResponse | null | undefined
  userStatisticsLoading?: boolean
}

export type StatisticsPageContextProps = AppContextProps &
  StatisticsContextProps

export const statisticsPageDefaultValues: StatisticsPageContextProps = {
  ...appContextDefaultValues,
  translate: i18next.t
}

const StatisticsPageContext = createContext(statisticsPageDefaultValues)

export function StatisticsPageContextProvider(props: {
  children: React.ReactNode | React.ReactNode[]
}) {
  const { translate, token, backendUrl, users } = useAppContext()

  const { data: allStatistics, isLoading: allStatisticsLoading } = useQuery({
    queryKey: ["all-statistics"],
    queryFn: async () => {
      const response = axios
        .get(`${backendUrl}/api/statistics`)
        .then((response: AxiosResponse<StatisticsResponse>) => {
          return response.data
        })
        .catch((error: AxiosErrorMessage) => {
          console.error(error)
          showErrorToast(error.message)
          return null
        })

      return response
    }
  })
  const { data: userStatistics, isLoading: userStatisticsLoading } = useQuery({
    queryKey: ["user-statistics"],
    queryFn: async () => {
      const response = axios
        .get(`${backendUrl}/api/statistics/661400f4b4ade3d661e4d847`)
        .then((response: AxiosResponse<StatisticsResponse>) => {
          return response.data
        })
        .catch((error: AxiosErrorMessage) => {
          console.error(error)
          showErrorToast(error.message)
          return null
        })

      return response
    }
  })

  return (
    <StatisticsPageContext.Provider
      value={{
        ...statisticsPageDefaultValues,
        translate,
        token,
        backendUrl,
        users,
        allStatistics,
        allStatisticsLoading,
        userStatistics,
        userStatisticsLoading
      }}
    >
      {props.children}
    </StatisticsPageContext.Provider>
  )
}

export function useStatisticsPageContext() {
  const context = useContext(StatisticsPageContext)
  if (context === undefined) {
    throw new Error("StatisticsPage Context Error")
  }
  return context
}
