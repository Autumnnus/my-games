import type { SxProps } from "@mui/joy/styles/types"

import { MAIN_PAGE_BG } from "../../constants/colors"

const container: (bgColor?: "primary" | "secondary") => SxProps = (
  bgColor?: "primary" | "secondary"
) => ({
  position: "relative",
  display: "flex",
  flex: 1,
  width: "100vw",
  height: "100vh",
  maxHeight: "100vh",
  minWidth: "375px",
  background: bgColor === "secondary" ? MAIN_PAGE_BG : "white"
})

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
