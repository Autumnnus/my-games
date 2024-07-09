import type { SxProps } from "@mui/material"

const container = (image: string): SxProps => ({
  height: "100vh",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  scrollSnapAlign: "start",
  overflow: "hidden",
  p: 1
})

const heading: SxProps = {
  color: "#fff",
  textShadow: "5px 10px 10px #000000bf,-3px 10px 12px #000000bf",
  textAlign: "center",
  fontSize: {
    xs: "3rem",
    md: "4rem"
  }
}

const body: SxProps = {
  color: "#fff",
  textShadow: "5px 10px 10px #000000bf,-3px 10px 12px #000000bf",
  textAlign: "center",
  fontSize: {
    xs: "1rem",
    md: "1.5rem"
  }
}

export default { container, heading, body }
