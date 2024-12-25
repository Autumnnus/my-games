import { LineChart } from "@mui/x-charts/LineChart"

import useTranslate from "@hooks/use_translate"
import { formatedPlaytime } from "@utils/functions/formatedPlayTime"
import { StatisticData } from "types/statistics"

type StatisticLineChartProps = {
  allData?: StatisticData[] | undefined
  userData?: StatisticData[] | undefined
  type: "playtime" | "count"
}

export default function StatisticLineChart({
  allData,
  userData,
  type
}: StatisticLineChartProps) {
  const { translate } = useTranslate()

  if (!allData || !userData) {
    return null
  }
  return (
    <LineChart
      dataset={
        allData?.map((allItem, index) => ({
          label: translate(allItem._id),
          all: type === "playtime" ? allItem?.playTime : allItem?.count,
          user:
            type === "playtime"
              ? userData[index]?.playTime
              : userData[index]?.count
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
