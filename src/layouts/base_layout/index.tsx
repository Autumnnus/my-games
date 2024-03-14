import Box from "@mui/material/Box"

import { AppContextProvider } from "context/app_context"

import styles from "./styles"

export default function BaseLayout({
  children,
  bgColor
}: {
  children: JSX.Element | JSX.Element[]
  bgColor?: "primary" | "secondary"
}) {
  return (
    <AppContextProvider>
      <Box sx={styles.container(bgColor)}>{children}</Box>
    </AppContextProvider>
  )
}
