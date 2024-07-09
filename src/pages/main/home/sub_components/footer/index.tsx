import { Stack, Typography } from "@mui/material"

import Link from "@components/link"

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
      <Typography color="textSecondary" variant="subtitle1" align="center">
        {`My Games. Open source Full-Stack Project by Vector | ${new Date().getFullYear()}`}
      </Typography>
      <Stack gap={1} direction={"row"}>
        <Link
          href="https://github.com/VectortheGreat/my-games-v2"
          style={{ textDecoration: "none" }}
          target="_blank"
        >
          Frontend
        </Link>
        <Link
          href="https://github.com/VectortheGreat/my-games-backend"
          style={{ textDecoration: "none" }}
          target="_blank"
        >
          Backend
        </Link>
      </Stack>
    </Stack>
  )
}
