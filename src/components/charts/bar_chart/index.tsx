import { Box, CircularProgress, Stack } from "@mui/material"
import { BarChart } from "@mui/x-charts"

import { formatedPlaytime } from "@utils/functions/formatedPlayTime"
import { limitChartData } from "@utils/functions/limitChartData"
import { useStatisticsPageContext } from "context/statistics"
import { StatisticData } from "types/statistics"

type StatisticBarChartProps = {
  allData?: StatisticData[] | undefined
  userData?: StatisticData[] | undefined
  type: "playtime" | "count"
  allowTranslate?: boolean
  limit: number
}

export default function StatisticBarChart({
  allData,
  userData,
  type,
  allowTranslate,
  limit
}: StatisticBarChartProps) {
  const {
    translate,
    userStatisticsLoading,
    allStatisticsLoading,
    selectedUser,
    users
  } = useStatisticsPageContext()

  const userName = users.find((user) => user._id === selectedUser)?.name

  if (userStatisticsLoading || allStatisticsLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%"
        }}
        height={300}
      >
        <CircularProgress size={80} />
      </Box>
    )
  }

  if (!allData || !userData) {
    return <Box sx={{ height: 300 }} />
  }

  const limitedAllData = limitChartData(allData, limit)
  const limitedUserData = limitChartData(userData, limit)

  return (
    <Stack sx={{ width: "100%" }}>
      <BarChart
        dataset={
          limitedAllData.map((allItem, index) => ({
            label: allowTranslate ? translate(allItem._id) : allItem._id,
            all: type === "playtime" ? allItem?.playTime : allItem?.count,
            user:
              type === "playtime"
                ? limitedUserData[index]?.playTime
                : limitedUserData[index]?.count
          })) || []
        }
        xAxis={[
          {
            scaleType: "band",
            dataKey: "label",
            label:
              type === "playtime"
                ? translate("by_playtime")
                : translate("by_count")
          }
        ]}
        series={[
          {
            dataKey: "all",
            label: translate("all_users"),
            color: "#8884d8",
            valueFormatter: (value: number | null) =>
              value !== null
                ? type === "playtime"
                  ? formatedPlaytime(value, translate)
                  : value.toString()
                : ""
          },
          {
            dataKey: "user",
            label: userName,
            color: "#82ca9d",
            valueFormatter: (value: number | null) =>
              value !== null
                ? type === "playtime"
                  ? formatedPlaytime(value, translate)
                  : value.toString()
                : ""
          }
        ]}
        height={300}
      />
    </Stack>
  )
}
