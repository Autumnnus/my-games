import MoreVertIcon from "@mui/icons-material/MoreVert"
import { Avatar, Box, IconButton, Popover, Typography } from "@mui/material"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { useMemo, useState } from "react"

import {
  TABLE_HEADER_BACKGROUND_COLOR,
  TABLE_HEADER_COLOR,
  TABLE_ROW_BACKGROUND_COLOR
} from "@constants/colors"
import { useAppContext } from "context/app_context"
import { useUsersPageContext } from "context/users"

type Column = {
  id:
    | "profileImage"
    | "name"
    | "gameSize"
    | "completedGameSize"
    | "screenshootSize"
    | "actions"
  label: string
  minWidth?: number
  align?: "right"
  format?: (value: number) => string
}

function createData(
  profileImage: string,
  name: string,
  gameSize: number,
  completedGameSize: number,
  screenshootSize: number
) {
  return {
    profileImage,
    name,
    gameSize,
    completedGameSize,
    screenshootSize
  }
}

export default function UserDataTable() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const { users, translate } = useUsersPageContext()
  const { token } = useAppContext()
  const columns: ReadonlyArray<Column> = useMemo(
    () => [
      { id: "profileImage", label: "", minWidth: 50 },
      { id: "name", label: translate("member"), minWidth: 100 },
      {
        id: "gameSize",
        label: translate("games"),
        minWidth: 170,
        align: "right"
      },
      {
        id: "completedGameSize",
        label: translate("completed_games"),
        minWidth: 170,
        align: "right"
      },
      {
        id: "screenshootSize",
        label: translate("ss"),
        minWidth: 170,
        align: "right"
      },
      { id: "actions", label: "", minWidth: 50, align: "right" }
    ],
    [translate]
  )
  const rows = useMemo(() => {
    return users?.map((user) =>
      createData(
        user.profileImage,
        user.name,
        user.gameSize,
        user.completedGameSize,
        user.screenshootSize
      )
    )
  }, [users])

  const MemoizedColumns = useMemo(() => {
    return columns.map((column) => (
      <TableCell
        key={column.id}
        align={column.align}
        style={{
          minWidth: column.minWidth,
          backgroundColor: TABLE_HEADER_BACKGROUND_COLOR,
          color: TABLE_HEADER_COLOR,
          padding: "1rem 2rem 1rem 2rem",
          border: "none"
        }}
      >
        {column.label}
      </TableCell>
    ))
  }, [columns])

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  function handleDeleteUser() {
    setAnchorEl(null)
  }
  const MemoizedRows = useMemo(() => {
    return rows?.map((row, index) => {
      return (
        <TableRow key={index} hover role="checkbox" tabIndex={-1}>
          {columns.map((column) => {
            const value = row[column.id as keyof typeof row]
            return (
              <TableCell
                sx={{
                  color: "white",
                  p: "1rem 2rem",
                  borderBottom: "1px solid #666666"
                }}
                key={column.id}
                align={column.align}
              >
                {column.id === "profileImage" ? (
                  <Avatar
                    src={String(value)}
                    alt={String(value)}
                    sx={{ width: "60px", height: "60px" }}
                  />
                ) : column.id === "actions" && token?.data.role === "admin" ? (
                  <>
                    <IconButton
                      onClick={(event) => {
                        handleClick(event)
                      }}
                    >
                      <MoreVertIcon color="secondary" />
                    </IconButton>
                  </>
                ) : (
                  <Typography>{value}</Typography>
                )}
              </TableCell>
            )
          })}
        </TableRow>
      )
    })
  }, [rows, columns, token])

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: TABLE_ROW_BACKGROUND_COLOR
      }}
    >
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow sx={{ p: 2, borderBottom: "none" }}>
              {MemoizedColumns}
            </TableRow>
          </TableHead>
          <TableBody>{MemoizedRows}</TableBody>
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
