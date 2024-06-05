import { Box, Popover, Stack, Typography } from "@mui/material"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableContainer from "@mui/material/TableContainer"

import { UserDataTableBody } from "@components/data_table/user_data_table/sub_components/table_body"
import { UserDataTableTitle } from "@components/data_table/user_data_table/sub_components/table_titles"
import { TABLE_ROW_BACKGROUND_COLOR } from "@constants/colors"
import { useUsersPageContext } from "context/users"

export default function UserDataTable() {
  const { anchorEl, translate, setAnchorEl, setIsEditUserDialogOpen } =
    useUsersPageContext()
  function handleClose() {
    setAnchorEl?.(null)
  }
  function handleEditUser() {
    setIsEditUserDialogOpen?.()
    setAnchorEl?.(null)
  }
  function handleDeleteUser() {
    setAnchorEl?.(null)
  }
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
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        sx={{
          "& > *": {
            borderRadius: 2.3,
            boxShadow: "0px 3px 6px #00000029"
          }
        }}
      >
        <Box
          sx={{
            padding: 1,
            pr: 9,
            cursor: "pointer",
            color: "white",
            "&:hover": {
              background: "#F1F1F1",
              color: "black"
            }
          }}
          onClick={handleEditUser}
        >
          {translate("edit")}
        </Box>
        <Box
          sx={{
            padding: 1,
            pr: 9,
            cursor: "pointer",
            color: "red",
            "&:hover": {
              background: "#F1F1F1"
            }
          }}
          onClick={handleDeleteUser}
        >
          {translate("delete")}
        </Box>
      </Popover>
    </Paper>
  )
}

function TableHeader() {
  const { translate } = useUsersPageContext()

  return (
    <Stack
      spacing={2}
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
    </Stack>
  )
}
