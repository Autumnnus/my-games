import { Stack, Typography } from "@mui/material"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableContainer from "@mui/material/TableContainer"

import Button from "@components/button"
import { UserDataTableBody } from "@components/data_table/user_data_table/sub_components/table_body"
import { UserDataTableTitle } from "@components/data_table/user_data_table/sub_components/table_titles"
import Loading from "@components/loading"
import { TABLE_ROW_BACKGROUND_COLOR } from "@constants/colors"
import { useUsersPageContext } from "context/users"

export default function UserDataTable() {
  const { rows } = useUsersPageContext()
  if (rows.length === 0) return <Loading />
  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden"
      }}
    >
      <TableHeader />
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <UserDataTableTitle />
          <UserDataTableBody />
        </Table>
      </TableContainer>
    </Paper>
  )
}

function TableHeader() {
  const { translate, setIsEditUserDialogOpen, token } = useUsersPageContext()
  function handleEditUser() {
    setIsEditUserDialogOpen?.()
  }
  return (
    <Stack
      spacing={2}
      direction={"row"}
      justifyContent="space-between"
      sx={{
        backgroundColor: TABLE_ROW_BACKGROUND_COLOR,
        p: 2,
        width: "100%",
        flexDirection: {
          xs: "column",
          sm: "row"
        }
      }}
    >
      <Stack
        justifyContent={"space-around"}
        sx={{
          alignItems: {
            xs: "center",
            sm: "flex-start"
          }
        }}
      >
        <Typography fontSize={24} fontWeight="bold" color={"white"}>
          {translate("all_members")}
        </Typography>
      </Stack>
      <Button
        sx={{ display: token ? "block" : "none" }}
        onClick={handleEditUser}
      >
        {translate("edit_profile")}
      </Button>
    </Stack>
  )
}
