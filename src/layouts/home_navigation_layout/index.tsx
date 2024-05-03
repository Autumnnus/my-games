import Box from "@mui/material/Box"
import { Outlet } from "react-router-dom"

import BaseLayout from "@layouts/base_layout"

import styles from "./styles"

export default function HomeNavigationLayout() {
  return (
    <BaseLayout>
      <Box sx={styles.contextContainer}>
        <Box sx={styles.contentAreaContainer}>
          <Outlet />
        </Box>
      </Box>
    </BaseLayout>
  )
}
