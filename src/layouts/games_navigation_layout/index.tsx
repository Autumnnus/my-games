import Box from "@mui/material/Box"
import { Outlet } from "react-router-dom"

import BaseLayout from "@layouts/base_layout"
import { GamesPageContextProvider } from "context/games"

import styles from "./styles"

export default function GamesNavigationLayout() {
  return (
    <BaseLayout>
      <GamesPageContextProvider>
        <Box sx={styles.contextContainer}>
          <Box sx={styles.contentAreaContainer}>
            <Outlet />
          </Box>
        </Box>
      </GamesPageContextProvider>
    </BaseLayout>
  )
}
