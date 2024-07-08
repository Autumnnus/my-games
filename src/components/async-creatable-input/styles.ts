import type { SxProps } from "@mui/material"

import { PRIMARY } from "@constants/colors"

const container: SxProps = {
  width: "100%"
}

const labelContainer = (isFocus: boolean): SxProps => {
  return {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: isFocus ? PRIMARY : "#fff"
  }
}

export default { labelContainer, container }
