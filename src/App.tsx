import { CssBaseline, ThemeProvider } from "@mui/material"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Suspense } from "react"
import { RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"
import theme from "./constants/theme"
import router from "./navigations/router"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback="loading">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
          <ToastContainer />
        </ThemeProvider>
      </Suspense>
    </QueryClientProvider>
  )
}

export default App
