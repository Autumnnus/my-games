import type { SxProps } from "@mui/material"

import { INPUT_LABEL_BLUR, PRIMARY } from "@constants/colors"

const container: SxProps = {
  width: "100%"
}

const labelContainer = (isFocus: boolean): SxProps => {
  return {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: isFocus ? PRIMARY : INPUT_LABEL_BLUR
  }
}

export default { labelContainer, container }
