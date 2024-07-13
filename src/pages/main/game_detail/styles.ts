import type { SxProps } from "@mui/material"

const tagRow = (isVisible: boolean): SxProps => ({
  display: isVisible ? "flex" : "none",
  width: {
    xs: "100%",
    sm: "calc(33.33% - 8px)"
  }
})

const tagsRow: SxProps = {
  flexDirection: {
    xs: "column",
    sm: "row"
  },
  gap: 1,
  justifyContent: "space-around"
}

export default { tagRow, tagsRow }
