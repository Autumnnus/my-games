import { Stack } from "@mui/material"

import StatisticBarChart from "@components/charts/bar_chart"
import StatisticLineChart from "@components/charts/line_chart"
import { useStatisticsPageContext } from "context/statistics"

export default function StatisticsPage() {
  const { allStatistics, userStatistics } = useStatisticsPageContext()
  console.log("allStatistics", allStatistics)
  console.log("userStatistics", userStatistics)
  return (
    <Stack p={2}>
      <Stack direction="row" spacing={2} width={"100%"}>
        <StatisticBarChart
          allData={allStatistics?.data?.statistics?.platformStats}
          userData={userStatistics?.data?.statistics?.platformStats}
          type="playtime"
        />
        <StatisticLineChart
          allData={allStatistics?.data?.statistics?.platformStats}
          userData={userStatistics?.data?.statistics?.platformStats}
          type="count"
        />
      </Stack>
      <Stack direction="row" spacing={2} width={"100%"}>
        <StatisticBarChart
          allData={allStatistics?.data?.statistics?.statusStats}
          userData={userStatistics?.data?.statistics?.statusStats}
          type="playtime"
        />
        <StatisticLineChart
          allData={allStatistics?.data?.statistics?.statusStats}
          userData={userStatistics?.data?.statistics?.statusStats}
          type="count"
        />
      </Stack>
      <Stack direction="row" spacing={2} width={"100%"}>
        <StatisticBarChart
          allData={allStatistics?.data?.statistics?.genreStats}
          userData={userStatistics?.data?.statistics?.genreStats}
          type="playtime"
        />
        <StatisticLineChart
          allData={allStatistics?.data?.statistics?.genreStats}
          userData={userStatistics?.data?.statistics?.genreStats}
          type="count"
        />
      </Stack>
      <Stack direction="row" spacing={2} width={"100%"}>
        <StatisticBarChart
          allData={allStatistics?.data?.statistics?.genreStats}
          userData={userStatistics?.data?.statistics?.genreStats}
          type="playtime"
        />
        <StatisticLineChart
          allData={allStatistics?.data?.statistics?.genreStats}
          userData={userStatistics?.data?.statistics?.genreStats}
          type="count"
        />
      </Stack>
      <Stack direction="row" spacing={2} width={"100%"}>
        <StatisticBarChart
          allData={allStatistics?.data?.statistics?.publisherStats}
          userData={userStatistics?.data?.statistics?.publisherStats}
          type="playtime"
        />
        <StatisticLineChart
          allData={allStatistics?.data?.statistics?.publisherStats}
          userData={userStatistics?.data?.statistics?.publisherStats}
          type="count"
        />
      </Stack>
      <Stack direction="row" spacing={2} width={"100%"}>
        <StatisticBarChart
          allData={allStatistics?.data?.statistics?.developerStats}
          userData={userStatistics?.data?.statistics?.developerStats}
          type="playtime"
        />
        <StatisticLineChart
          allData={allStatistics?.data?.statistics?.developerStats}
          userData={userStatistics?.data?.statistics?.developerStats}
          type="count"
        />
      </Stack>
    </Stack>
  )
}
