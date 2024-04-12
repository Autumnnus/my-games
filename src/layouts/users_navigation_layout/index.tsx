import Box from "@mui/material/Box"
import { Outlet } from "react-router-dom"

import BaseLayout from "@layouts/base_layout"
import { UsersPageContextProvider } from "context/users"

import styles from "./styles"

export default function UsersNavigationLayout() {
  return (
    <BaseLayout>
      <UsersPageContextProvider>
        <Box sx={styles.contextContainer}>
          <Box sx={styles.contentAreaContainer}>
            <Outlet />
          </Box>
        </Box>
      </UsersPageContextProvider>
    </BaseLayout>
  )
}
