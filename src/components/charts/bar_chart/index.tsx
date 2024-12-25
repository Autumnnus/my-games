import { Stack } from "@mui/material"
import { BarChart } from "@mui/x-charts"

import useTranslate from "@hooks/use_translate"
import { formatedPlaytime } from "@utils/functions/formatedPlayTime"
import { StatisticData } from "types/statistics"

type StatisticBarChartProps = {
  allData?: StatisticData[] | undefined
  userData?: StatisticData[] | undefined
  type: "playtime" | "count"
}

export default function StatisticBarChart({
  allData,
  userData,
  type
}: StatisticBarChartProps) {
  const { translate } = useTranslate()

  if (!allData || !userData) {
    return null
  }

  return (
    <Stack sx={{ width: "100%" }}>
      <BarChart
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
    </Stack>
  )
}
