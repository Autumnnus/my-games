import Box from "@mui/material/Box"
import { Outlet } from "react-router-dom"

import BaseLayout from "@layouts/base_layout"
import { ProfilePageContextProvider } from "context/profile"

import styles from "./styles"

export default function ProfileNavigationLayout() {
  return (
    <BaseLayout>
      <ProfilePageContextProvider>
        <Box sx={styles.contextContainer}>
          <Box sx={styles.contentAreaContainer}>
            <Outlet />
          </Box>
        </Box>
      </ProfilePageContextProvider>
    </BaseLayout>
  )
}
