import { CssBaseline, ThemeProvider } from "@mui/joy"
import { Suspense } from "react"
import { RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import theme from "./constants/theme"
import router from "./navigations/router"

function App() {
  return (
    <Suspense fallback="loading">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
        <ToastContainer />
      </ThemeProvider>
    </Suspense>
  )
}

export default App
