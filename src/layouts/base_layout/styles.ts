import type { SxProps } from "@mui/material"

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
  minWidth: "750px",
  background: bgColor === "secondary" ? MAIN_PAGE_BG : "white"
})

export default {
  container
}
