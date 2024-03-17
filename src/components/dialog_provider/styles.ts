import type { SxProps } from "@mui/material"

const dialogDivider: SxProps = {
  opacity: 0.5
}

const dialogPaperProps: SxProps = {
  borderRadius: 3.2
}

const dialogTitle: SxProps = {
  fontSize: "1rem",
  textAlign: "center",
  padding: "0.8rem 0rem 0.5rem 0rem"
}

const dialogContent: SxProps = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  gap: 2,
  py: "2rem"
}

const dialogActions: SxProps = {
  display: "flex",
  flexDirection: "row",
  justifyContent: {
    xs: "center",
    sm: "space-between"
  },
  alignItems: "center",
  py: "1rem",
  px: "1.2rem"
}

export default {
  dialogDivider,
  dialogPaperProps,
  dialogTitle,
  dialogContent,
  dialogActions
}
