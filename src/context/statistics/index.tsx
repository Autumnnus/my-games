import { useQuery } from "@tanstack/react-query"
import axios, { type AxiosResponse } from "axios"
import { createContext, useContext, useState } from "react"

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
  selectedUser?: string | undefined
  setSelectedUser: (userId: string) => void
}

export type StatisticsPageContextProps = AppContextProps &
  StatisticsContextProps

export const statisticsPageDefaultValues: StatisticsPageContextProps = {
  ...appContextDefaultValues,
  translate: i18next.t,
  setSelectedUser: () => {}
}

const StatisticsPageContext = createContext(statisticsPageDefaultValues)

export function StatisticsPageContextProvider(props: {
  children: React.ReactNode | React.ReactNode[]
}) {
  const { translate, token, backendUrl, users } = useAppContext()
  const [selectedUser, setSelectedUser] = useState<string | undefined>(
    token?.id
  )

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
        .get(`${backendUrl}/api/statistics/${selectedUser}`)
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
        userStatisticsLoading,
        selectedUser,
        setSelectedUser
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
