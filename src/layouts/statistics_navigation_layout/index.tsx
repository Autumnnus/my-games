import Box from "@mui/material/Box"
import { Outlet } from "react-router-dom"

import BaseLayout from "@layouts/base_layout"
import { StatisticsPageContextProvider } from "context/statistics"

import styles from "./styles"

export default function StatisticsNavigationLayout() {
  return (
    <BaseLayout>
      <StatisticsPageContextProvider>
        <Box sx={styles.contextContainer}>
          <Box sx={styles.contentAreaContainer}>
            <Outlet />
          </Box>
        </Box>
      </StatisticsPageContextProvider>
    </BaseLayout>
  )
}
