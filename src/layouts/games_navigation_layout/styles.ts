import type { SxProps } from "@mui/material"

const container = {
  position: "relative",
  display: "flex",
  flex: 1,
  width: "100vw",
  height: "100vh",
  maxHeight: "100vh"
}

const contextContainer: SxProps = {
  display: "flex",
  flexDirection: "row",
  flex: 1,
  overflow: "hidden"
}

const contentAreaContainer: SxProps = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  width: "100%",
  overflow: "hidden"
}

export default {
  container,
  contextContainer,
  contentAreaContainer
}
