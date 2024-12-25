import { LineChart } from "@mui/x-charts/LineChart"

import { StatisticData } from "types/statistics"

type StatisticLineChartProps = {
  allData?: StatisticData[] | undefined
  userData?: StatisticData[] | undefined
}

export default function StatisticLineChart({
  allData,
  userData
}: StatisticLineChartProps) {
  const counts = allData?.map((item) => item.count) || []
  const xAxisData = Array.from(
    { length: counts.length },
    (_, index) => index + 1
  )
  if (!allData || !userData) {
    return null
  }
  return (
    <LineChart
      xAxis={[
        {
          data: xAxisData,
          label: "Platforms"
        }
      ]}
      // yAxis={[{ data: data?.map((item) => item._id) }]}
      series={[
        {
          data: allData?.map((item) => item.count)
        },
        {
          data: userData?.map((item) => item.playTime)
        }
      ]}
      width={500}
      height={300}
    />
  )
}
