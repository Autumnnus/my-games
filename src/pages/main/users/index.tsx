import { Box } from "@mui/material"

import UserDataTable from "@components/data_table/user_data_table"
import EditUser from "@components/dialogs/edit_user"

export default function UsersPage() {
  return (
    <Box
      sx={{
        px: {
          xs: 2,
          sm: 5
        },
        py: 2
      }}
    >
      <UserDataTable />
      <EditUser />
    </Box>
  )
}
