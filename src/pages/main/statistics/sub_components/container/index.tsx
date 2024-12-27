import { Slider, Stack, Typography } from "@mui/material"

import { TABLE_ROW_BACKGROUND_COLOR } from "@constants/colors"

type StatisticsCardContainerProps = {
  children: React.ReactNode
  maxSliderValue: number
  setLimit: (value: number) => void
  label: string
}

export default function StatisticsCardContainer({
  children,
  maxSliderValue,
  setLimit,
  label
}: StatisticsCardContainerProps) {
  return (
    <Stack
      sx={{
        bgcolor: TABLE_ROW_BACKGROUND_COLOR,
        borderRadius: 1.5,
        padding: 2,
        gap: 2,
        boxShadow: 1,
        alignItems: "center"
      }}
    >
      <Stack alignItems={"center"}>
        <Typography>{label}</Typography>
        <Slider
          size="small"
          max={maxSliderValue}
          valueLabelDisplay="auto"
          defaultValue={12}
          sx={{ width: 300 }}
          onChange={(_, value) => setLimit(value as number)}
        />
      </Stack>
      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          width: "100%"
        }}
      >
        {children}
      </Stack>
    </Stack>
  )
}
