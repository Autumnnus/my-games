import { LineChart } from "@mui/x-charts/LineChart"

import useTranslate from "@hooks/use_translate"
import { formatedPlaytime } from "@utils/functions/formatedPlayTime"
import { StatisticData } from "types/statistics"

type StatisticLineChartProps = {
  allData?: StatisticData[] | undefined
  userData?: StatisticData[] | undefined
  type: "playtime" | "count"
  allowTranslate?: boolean
}

function limitData(
  data: StatisticData[] | undefined,
  type: "playtime" | "count"
) {
  if (!data || data.length <= 10) {
    return data || []
  }

  const firstNine = data.slice(0, 9)
  const othersTotal = data.slice(9).reduce((acc, curr) => {
    return acc + (type === "playtime" ? curr.playTime : curr.count)
  }, 0)

  return [
    ...firstNine,
    {
      _id: "others",
      playTime: type === "playtime" ? othersTotal : 0,
      count: type === "count" ? othersTotal : 0
    }
  ]
}

export default function StatisticLineChart({
  allData,
  userData,
  type,
  allowTranslate
}: StatisticLineChartProps) {
  const { translate } = useTranslate()

  if (!allData || !userData) {
    return null
  }

  const limitedAllData = limitData(allData, type)
  const limitedUserData = limitData(userData, type)
  return (
    <LineChart
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
          stack: "total",
          area: true,
          valueFormatter: (value: number | null) =>
            value !== null
              ? type === "playtime"
                ? formatedPlaytime(value, translate)
                : value.toString()
              : ""
        },
        {
          dataKey: "user",
          label: translate("you"),
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
  )
}
