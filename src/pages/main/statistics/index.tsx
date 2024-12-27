import { Autocomplete, Stack, TextField } from "@mui/material"
import { useQueryClient } from "@tanstack/react-query"
import { useMemo, useState } from "react"

import StatisticBarChart from "@components/charts/bar_chart"
import StatisticLineChart from "@components/charts/line_chart"
import { TABLE_ROW_BACKGROUND_COLOR } from "@constants/colors"
import StatisticsCardContainer from "@pages/main/statistics/sub_components/container"
import { useStatisticsPageContext } from "context/statistics"

export default function StatisticsPage() {
  const {
    allStatistics,
    userStatistics,
    translate,
    users,
    setSelectedUser,
    selectedUser
  } = useStatisticsPageContext()
  const queryClient = useQueryClient()
  const [limit, setLimit] = useState(12)
  const userName = users.find((user) => user._id === selectedUser)?.name

  const maxSliderValues = useMemo(
    () => ({
      platformStats:
        allStatistics?.data?.statistics?.platformStats?.length || 0,
      statusStats: allStatistics?.data?.statistics?.statusStats?.length || 0,
      genreStats: allStatistics?.data?.statistics?.genreStats?.length || 0,
      developerStats: Math.min(
        allStatistics?.data?.statistics?.developerStats?.length || 0,
        50
      ),
      publisherStats: Math.min(
        allStatistics?.data?.statistics?.publisherStats?.length || 0,
        50
      ),
      gameModeStats:
        allStatistics?.data?.statistics?.gameModeStats?.length || 0,
      ratingStats: allStatistics?.data?.statistics?.ratingStats?.length || 0,
      themeStats: allStatistics?.data?.statistics?.themeStats?.length || 0,
      releaseYearStats:
        allStatistics?.data?.statistics?.releaseYearStats?.length || 0,
      playerPerspectiveStats:
        allStatistics?.data?.statistics?.playerPerspectiveStats?.length || 0
    }),
    [allStatistics]
  )

  function handleChangeInput(value: {
    label: string | undefined
    id: string | undefined
  }) {
    setSelectedUser(value?.id || "")
    setTimeout(() => {
      queryClient.invalidateQueries({
        queryKey: ["user-statistics"]
      })
    }, 100)
  }

  return (
    <Stack p={2} gap={5}>
      <Stack bgcolor={TABLE_ROW_BACKGROUND_COLOR} p={2}>
        <Autocomplete
          disablePortal
          disableClearable
          options={
            users?.map((user) => ({
              id: user._id,
              label: user.name
            })) || []
          }
          sx={{ width: 300, color: "white" }}
          onChange={(_, value) => handleChangeInput(value)}
          defaultValue={{
            label: userName,
            id: selectedUser
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ "& input::placeholder": { color: "#ffffff" } }}
              label={translate("users")}
            />
          )}
        />
      </Stack>
      <StatisticsCardContainer
        setLimit={setLimit}
        maxSliderValue={maxSliderValues.platformStats}
        label={translate("platforms")}
      >
        <StatisticBarChart
          allData={allStatistics?.data?.statistics?.platformStats}
          userData={userStatistics?.data?.statistics?.platformStats}
          type="playtime"
          allowTranslate
          limit={limit}
        />
        <StatisticBarChart
          allData={allStatistics?.data?.statistics?.platformStats}
          userData={userStatistics?.data?.statistics?.platformStats}
          type="count"
          limit={limit}
          allowTranslate
        />
      </StatisticsCardContainer>
      <StatisticsCardContainer
        setLimit={setLimit}
        maxSliderValue={maxSliderValues.statusStats}
        label={translate("status")}
      >
        <StatisticBarChart
          allData={allStatistics?.data?.statistics?.statusStats}
          userData={userStatistics?.data?.statistics?.statusStats}
          type="playtime"
          limit={limit}
          allowTranslate
        />
        <StatisticBarChart
          allData={allStatistics?.data?.statistics?.statusStats}
          userData={userStatistics?.data?.statistics?.statusStats}
          type="count"
          limit={limit}
          allowTranslate
        />
      </StatisticsCardContainer>
      <StatisticsCardContainer
        setLimit={setLimit}
        maxSliderValue={maxSliderValues.genreStats}
        label={translate("genres")}
      >
        <StatisticBarChart
          allData={allStatistics?.data?.statistics?.genreStats}
          userData={userStatistics?.data?.statistics?.genreStats}
          limit={limit}
          type="playtime"
        />
        <StatisticLineChart
          allData={allStatistics?.data?.statistics?.genreStats}
          userData={userStatistics?.data?.statistics?.genreStats}
          limit={limit}
          type="count"
        />
      </StatisticsCardContainer>
      <StatisticsCardContainer
        setLimit={setLimit}
        maxSliderValue={maxSliderValues.releaseYearStats}
        label={translate("first_release_years")}
      >
        <StatisticLineChart
          allData={allStatistics?.data?.statistics?.releaseYearStats}
          userData={userStatistics?.data?.statistics?.releaseYearStats}
          limit={limit}
          type="playtime"
        />
        <StatisticLineChart
          allData={allStatistics?.data?.statistics?.releaseYearStats}
          userData={userStatistics?.data?.statistics?.releaseYearStats}
          limit={limit}
          type="count"
        />
      </StatisticsCardContainer>
      <StatisticsCardContainer
        setLimit={setLimit}
        maxSliderValue={maxSliderValues.gameModeStats}
        label={translate("game_modes")}
      >
        <StatisticBarChart
          allData={allStatistics?.data?.statistics?.gameModeStats}
          userData={userStatistics?.data?.statistics?.gameModeStats}
          limit={limit}
          type="playtime"
        />
        <StatisticLineChart
          allData={allStatistics?.data?.statistics?.gameModeStats}
          userData={userStatistics?.data?.statistics?.gameModeStats}
          limit={limit}
          type="count"
        />
      </StatisticsCardContainer>
      <StatisticsCardContainer
        setLimit={setLimit}
        maxSliderValue={maxSliderValues.ratingStats}
        label={translate("ratings")}
      >
        <StatisticLineChart
          allData={allStatistics?.data?.statistics?.ratingStats}
          userData={userStatistics?.data?.statistics?.ratingStats}
          limit={limit}
          type="playtime"
        />
        <StatisticLineChart
          allData={allStatistics?.data?.statistics?.ratingStats}
          userData={userStatistics?.data?.statistics?.ratingStats}
          limit={limit}
          type="count"
        />
      </StatisticsCardContainer>
      <StatisticsCardContainer
        setLimit={setLimit}
        maxSliderValue={maxSliderValues.themeStats}
        label={translate("themes")}
      >
        <StatisticBarChart
          allData={allStatistics?.data?.statistics?.themeStats}
          userData={userStatistics?.data?.statistics?.themeStats}
          limit={limit}
          type="playtime"
        />
        <StatisticLineChart
          allData={allStatistics?.data?.statistics?.themeStats}
          userData={userStatistics?.data?.statistics?.themeStats}
          limit={limit}
          type="count"
        />
      </StatisticsCardContainer>
      <StatisticsCardContainer
        setLimit={setLimit}
        maxSliderValue={maxSliderValues.playerPerspectiveStats}
        label={translate("player_perspectives")}
      >
        <StatisticBarChart
          allData={allStatistics?.data?.statistics?.playerPerspectiveStats}
          userData={userStatistics?.data?.statistics?.playerPerspectiveStats}
          limit={limit}
          type="playtime"
        />
        <StatisticLineChart
          allData={allStatistics?.data?.statistics?.playerPerspectiveStats}
          userData={userStatistics?.data?.statistics?.playerPerspectiveStats}
          limit={limit}
          type="count"
        />
      </StatisticsCardContainer>
      <StatisticsCardContainer
        setLimit={setLimit}
        maxSliderValue={maxSliderValues.publisherStats}
        label={translate("publishers")}
      >
        <StatisticBarChart
          allData={allStatistics?.data?.statistics?.publisherStats}
          userData={userStatistics?.data?.statistics?.publisherStats}
          limit={limit}
          type="playtime"
        />
        <StatisticLineChart
          allData={allStatistics?.data?.statistics?.publisherStats}
          userData={userStatistics?.data?.statistics?.publisherStats}
          limit={limit}
          type="count"
        />
      </StatisticsCardContainer>
      <StatisticsCardContainer
        setLimit={setLimit}
        maxSliderValue={maxSliderValues.developerStats}
        label={translate("developers")}
      >
        <StatisticBarChart
          allData={allStatistics?.data?.statistics?.developerStats}
          userData={userStatistics?.data?.statistics?.developerStats}
          limit={limit}
          type="playtime"
        />
        <StatisticLineChart
          allData={allStatistics?.data?.statistics?.developerStats}
          userData={userStatistics?.data?.statistics?.developerStats}
          limit={limit}
          type="count"
        />
      </StatisticsCardContainer>
    </Stack>
  )
}
