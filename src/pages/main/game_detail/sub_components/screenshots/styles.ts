import type { SxProps } from "@mui/material"

import { Screenshot } from "types/screenshot"

const iconButton = (
  hoveredItemId: string | null,
  clickedItemId: string | null,
  item: Screenshot
): SxProps => ({
  position: "absolute",
  top: 3,
  right: 3,
  display:
    hoveredItemId === item._id || clickedItemId === item._id ? "block" : "none"
})

const screenshot: SxProps = {
  objectFit: "fill",
  position: "relative",
  width: "100%",
  cursor: "pointer",
  height: "100%"
}

export default { iconButton, screenshot }
