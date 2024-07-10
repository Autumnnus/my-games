import { Stack, Typography } from "@mui/material"

export const HomeFooter = () => {
  return (
    <Stack
      sx={{
        height: "12vh",
        flexDirection: "row",
        scrollSnapAlign: "end",
        justifyContent: "space-around"
      }}
    >
      <Typography
        color="textSecondary"
        variant="subtitle1"
        sx={{
          fontSize: {
            xs: "0.8rem",
            md: "1rem"
          },
          p: 1,
          textAlign: "center"
        }}
      >
        {`My Games. Open source Full-Stack Project by Vector | ${new Date().getFullYear()}`}
      </Typography>
    </Stack>
  )
}
