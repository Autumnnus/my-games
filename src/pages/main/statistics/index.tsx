import { Stack } from "@mui/material"

import StatisticBarChart from "@components/charts/bar_chart"
import StatisticLineChart from "@components/charts/line_chart"
import { useStatisticsPageContext } from "context/statistics"

export default function StatisticsPage() {
  const { allStatistics, userStatistics, translate } =
    useStatisticsPageContext()
  console.log("allStatistics", allStatistics)
  console.log("userStatistics", userStatistics)
  return (
    <Stack p={2}>
      <Stack direction="row" spacing={2} width={"100%"}>
        <StatisticBarChart
          allData={allStatistics?.data?.statistics?.platformStats}
          userData={userStatistics?.data?.statistics?.platformStats}
          type="playtime"
          label={translate("platforms_by_playtime")}
        />
        <StatisticBarChart
          allData={allStatistics?.data?.statistics?.platformStats}
          userData={userStatistics?.data?.statistics?.platformStats}
          type="count"
          label={translate("platforms_by_count")}
        />
      </Stack>
      <StatisticLineChart
        allData={allStatistics?.data?.statistics?.platformStats}
        userData={userStatistics?.data?.statistics?.platformStats}
      />
    </Stack>
  )
}
