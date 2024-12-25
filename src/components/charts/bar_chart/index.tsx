import { Stack } from "@mui/material"
import { BarChart } from "@mui/x-charts"

import useTranslate from "@hooks/use_translate"
import { StatisticData } from "types/statistics"

type StatisticBarChartProps = {
  allData?: StatisticData[] | undefined
  userData?: StatisticData[] | undefined
  type: "playtime" | "count"
  allowTranslate?: boolean
}

// function limitData(
//   data: StatisticData[] | undefined,
//   type: "playtime" | "count"
// ) {
//   if (!data || data.length <= 10) {
//     return data || []
//   }

//   const firstNine = data.slice(0, 9)
//   const othersTotal = data.slice(9).reduce((acc, curr) => {
//     return acc + (type === "playtime" ? curr.playTime : curr.count)
//   }, 0)

//   return [
//     ...firstNine,
//     {
//       _id: "others",
//       playTime: type === "playtime" ? othersTotal : 0,
//       count: type === "count" ? othersTotal : 0
//     }
//   ]
// }

const limitData = (
  data: StatisticData[] | undefined,
  type: "playtime" | "count"
) => {
  if (!data || data.length <= 10) {
    return data || []
  }

  const firstNine = data.slice(0, 9)
  const totalValue = data.reduce((acc, curr) => {
    return acc + (type === "playtime" ? curr.playTime : curr.count)
  }, 0)
  const othersValue =
    totalValue -
    firstNine.reduce((acc, curr) => {
      return acc + (type === "playtime" ? curr.playTime : curr.count)
    }, 0)

  return [
    ...firstNine,
    {
      _id: "others",
      playTime: type === "playtime" ? (othersValue / totalValue) * 100 : 0,
      count: type === "count" ? (othersValue / totalValue) * 100 : 0
    }
  ]
}

export default function StatisticBarChart({
  allData,
  userData,
  type,
  allowTranslate
}: StatisticBarChartProps) {
  const { translate } = useTranslate()

  if (!allData || !userData) {
    return null
  }
  const limitedAllData = limitData(allData, type)
  const limitedUserData = limitData(userData, type)
  console.log("limitedAllData", limitedAllData)
  console.log("limitedUserData", limitedUserData)
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
            valueFormatter: (value: number | null) =>
              value !== null
                ? type === "playtime"
                  ? `${value.toFixed(2)}%`
                  : value.toString()
                : ""
          },
          {
            dataKey: "user",
            label: translate("you"),
            valueFormatter: (value: number | null) =>
              value !== null
                ? type === "playtime"
                  ? `${value.toFixed(2)}%`
                  : value.toString()
                : ""
          }
        ]}
        height={300}
      />
    </Stack>
  )
}
