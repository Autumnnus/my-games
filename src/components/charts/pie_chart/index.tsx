import { PieChart } from "@mui/x-charts"

import useTranslate from "@hooks/use_translate"
import { createRandomColor } from "@utils/functions/createRandomColor"
import { formatedPlaytime } from "@utils/functions/formatedPlayTime"
import { StatisticData } from "types/statistics"

type StatisticBarChartProps = {
  allData?: StatisticData[] | undefined
  userData?: StatisticData[] | undefined
  type: "playtime" | "count"
}

export default function StatisticPieChart({
  allData,
  userData,
  type
}: StatisticBarChartProps) {
  const { translate } = useTranslate()

  function limitData(
    data: StatisticData[] | undefined,
    type: "playtime" | "count",
    limit: number
  ) {
    if (!data || data.length <= limit) {
      return data || []
    }

    const limitedData = data.slice(0, limit - 1)
    const othersTotal = data.slice(limit - 1).reduce((acc, curr) => {
      return acc + (type === "playtime" ? curr.playTime : curr.count)
    }, 0)

    return [
      ...limitedData,
      {
        _id: translate("others"),
        playTime: type === "playtime" ? othersTotal : 0,
        count: type === "count" ? othersTotal : 0
      }
    ]
  }
  if (!allData || !userData) {
    return null
  }
  const limit = 9
  const limitedAllData = limitData(allData, type, limit)
  const limitedUserData = limitData(userData, type, limit)

  return (
    <PieChart
      dataset={
        limitedAllData.map((allItem, index) => ({
          label: allItem._id,
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
      slotProps={{
        legend: { hidden: true, direction: "row" }
      }}
      series={[
        {
          innerRadius: 0,
          outerRadius: 60,
          data: limitedAllData.map((allItem, index) => ({
            id: index,
            label: allItem._id,
            value: type === "playtime" ? allItem?.playTime : allItem?.count,
            color: createRandomColor()
          })),
          valueFormatter: (value) =>
            value.value !== null
              ? type === "playtime"
                ? formatedPlaytime(value.value, translate) + " (Global)"
                : value.value.toString() + " (Global)"
              : ""
        },
        {
          innerRadius: 80,
          outerRadius: 120,
          data: limitedUserData.map((allItem, index) => ({
            id: index,
            label: allItem._id,
            value: type === "playtime" ? allItem?.playTime : allItem?.count,
            color: createRandomColor()
          })),
          valueFormatter: (value) =>
            value.value !== null
              ? type === "playtime"
                ? formatedPlaytime(value.value, translate) + " (User)"
                : value.value.toString() + " (User)"
              : ""
        }
      ]}
      height={300}
      width={300}
    />
  )
}
