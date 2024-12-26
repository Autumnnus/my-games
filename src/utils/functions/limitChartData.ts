import { StatisticData } from "types/statistics"

export function limitChartData(
  data: StatisticData[] | undefined,
  limit: number
  //   type: "playtime" | "count",
) {
  if (!data || data.length <= limit) {
    return data || []
  }

  const limitedData = data.slice(0, limit - 1)
  //   const othersTotal = data.slice(limit - 1).reduce((acc, curr) => {
  //     return acc + (type === "playtime" ? curr.playTime : curr.count)
  //   }, 0)

  return [
    ...limitedData
    // {
    //   _id: translate("others"),
    //   playTime: type === "playtime" ? othersTotal : 0,
    //   count: type === "count" ? othersTotal : 0
    // }
  ]
}
