import type { SxProps } from "@mui/material"

const popoverPrimaryOption: SxProps = {
  padding: 1,
  pr: 4,
  cursor: "pointer",
  color: "#fff",
  "&:hover": {
    background: "#F1F1F1",
    color: "#000"
  }
}
const popoverErrorOption: SxProps = {
  padding: 1,
  pr: 4,
  cursor: "pointer",
  color: "red",
  "&:hover": {
    background: "#F1F1F1"
  }
}

export default { popoverErrorOption, popoverPrimaryOption }
