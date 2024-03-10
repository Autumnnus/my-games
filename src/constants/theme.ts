import { createTheme } from "@mui/material/styles"

import { PRIMARY } from "./colors"

const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY
    },
    secondary: {
      main: "#E8E8E8"
    },
    text: {
      primary: "#000000"
    }
  },
  spacing: 8,
  shape: {
    borderRadius: 4
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: "bold",
      boxShadow: "none",
      borderRadius: 1.6
    },
    fontFamily: "Poppins, sans-serif"
  }
})

export default theme
