import type { SxProps } from "@mui/material"

const container = (
  imagePosition: "left" | "right",
  image: string
): SxProps => ({
  height: "100vh",
  flexDirection: imagePosition === "left" ? "row-reverse" : "row",
  scrollSnapAlign: "start",
  backgroundImage: {
    xs: `url(${image})`,
    md: "url()"
  }
})

const imageBox = (image: string): SxProps => ({
  height: "100vh",
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  width: "50%",
  display: {
    xs: "none",
    md: "flex"
  },
  p: 1,
  alignItems: "center"
})

const textContainer: SxProps = {
  width: {
    xs: "100%",
    md: "50%"
  },
  justifyContent: "center",
  gap: 2,
  p: 1,
  alignItems: "center"
}

const heading: SxProps = {
  color: "#fff",
  fontSize: {
    xs: "2rem",
    md: "3rem"
  },
  textShadow: {
    xs: "5px 10px 10px #000000bf,-3px 10px 12px #000000bf",
    md: "0px 0px 0px #000000bf,0px 0px 0px #000000bf"
  },
  textAlign: "center"
}

const body: SxProps = {
  color: "#fff",
  fontSize: {
    xs: "0.8rem",
    md: "1rem"
  },
  textShadow: {
    xs: "5px 10px 10px #000000bf,-3px 10px 12px #000000bf",
    md: "0px 0px 0px #000000bf,0px 0px 0px #000000bf"
  },
  textAlign: "center"
}

export default { container, imageBox, textContainer, heading, body }
