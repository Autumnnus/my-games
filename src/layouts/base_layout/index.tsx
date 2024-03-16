import Box from "@mui/material/Box"

import { AppContextProvider } from "context/app_context"

import styles from "./styles"

export default function BaseLayout({
  children
}: {
  children: JSX.Element | JSX.Element[]
}) {
  return (
    <AppContextProvider>
      <Box sx={styles.container}>{children}</Box>
    </AppContextProvider>
  )
}
