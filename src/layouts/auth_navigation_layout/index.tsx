import Box from "@mui/material/Box"
import { Outlet } from "react-router-dom"

import BaseLayout from "@layouts/base_layout"
import { AuthPageContextProvider } from "context/auth"

import styles from "./styles"

export default function AuthNavigationLayout() {
  return (
    <BaseLayout>
      <AuthPageContextProvider>
        <Box sx={styles.contextContainer}>
          <Box sx={styles.contentAreaContainer}>
            <Outlet />
          </Box>
        </Box>
      </AuthPageContextProvider>
    </BaseLayout>
  )
}
