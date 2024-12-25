import type { SxProps } from "@mui/material"

const container: SxProps = {
  minWidth: { xs: "100%", sm: "33rem" },
  background: "white",
  display: "flex",
  flex: 1,
  borderRadius: 3,
  //maxHeight: "30rem",
  minHeight: "5rem",
  border: "1px solid #E6E6E6",
  py: 1
}

const barChart: SxProps = {
  "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
    stroke: "#959595",
    strokeWidth: 0.4
  },
  "& .MuiChartsAxis-left .MuiChartsAxis-line": {
    stroke: "#959595",
    strokeWidth: 0.4
  },
  "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
    fill: "#959595"
  },
  "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
    fill: "#959595"
  },
  "& .MuiChartsAxis-bottom .MuiChartsAxis-tick": {
    stroke: "#959595"
  },
  "& .MuiChartsAxis-left .MuiChartsAxis-tick": {
    stroke: "#959595"
  },
  pl: 1
}

const card: SxProps = { px: 2, mb: 2, ml: 2, flexDirection: "row" }

const titleDivider: SxProps = {
  borderRight: 1,
  borderColor: "divider",
  pr: { xs: 1, md: 4 }
}

export default { container, barChart, card, titleDivider }
