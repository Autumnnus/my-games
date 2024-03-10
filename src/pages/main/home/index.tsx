import { Box, Stack, Typography } from "@mui/joy"

export default function DashboardPage() {
  return (
    <Stack flex={1} direction={"column"} rowGap={4} px={2}>
      <Stack direction={"row"} justifyContent={"space-between"} py={1}>
        <Stack>
          <Box>
            <b>Cemal</b>
          </Box>
          <Typography>
            {new Date().toLocaleDateString("tr-TR", {
              weekday: "long",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })}
          </Typography>
        </Stack>
        <Box
          sx={{ padding: 2, px: 4, borderRadius: 2, background: "white" }}
        ></Box>
      </Stack>
      <Stack
        direction={{ xs: "column", lg: "row" }}
        columnGap={4}
        rowGap={4}
        justifyContent={"space-between"}
      ></Stack>
      <Stack
        direction={{ xs: "column", lg: "row" }}
        columnGap={4}
        rowGap={4}
        justifyContent={"space-between"}
      ></Stack>
    </Stack>
  )
}
