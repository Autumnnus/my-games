import MoreVertIcon from "@mui/icons-material/MoreVert"
import { Avatar, Box, IconButton, Popover, Typography } from "@mui/material"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import { ChangeEvent, useMemo, useState } from "react"

import {
  TABLE_HEADER_BACKGROUND_COLOR,
  TABLE_HEADER_COLOR,
  TABLE_ROW_BACKGROUND_COLOR
} from "@constants/colors"
import useTranslate from "@hooks/use_translate"
import { UsersContextProps } from "context/users"

type Column = {
  id: "photo" | "user" | "games" | "completedGames" | "ss" | "actions"
  label: string
  minWidth?: number
  align?: "right"
  format?: (value: number) => string
}

function createData(
  photo: string,
  user: string,
  games: number,
  completedGames: number,
  ss: number
) {
  return {
    photo,
    user,
    games,
    completedGames,
    ss
  }
}

export default function UserDataTable({ users }: UsersContextProps) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const { translate } = useTranslate()

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const columns: ReadonlyArray<Column> = useMemo(
    () => [
      { id: "photo", label: "", minWidth: 50 },
      { id: "user", label: translate("member"), minWidth: 100 },
      { id: "games", label: translate("games"), minWidth: 170, align: "right" },
      {
        id: "completedGames",
        label: translate("completed_games"),
        minWidth: 170,
        align: "right"
      },
      { id: "ss", label: translate("ss"), minWidth: 170, align: "right" },
      { id: "actions", label: "", minWidth: 50, align: "right" }
    ],
    [translate]
  )
  const rows = useMemo(() => {
    return users?.map((user) => createData(user.photoUrl, user.name, 0, 0, 0))
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

  function handleEditGame() {
    setAnchorEl(null)
  }

  function handleDeleteGame() {
    setAnchorEl(null)
  }

  const MemoizedRows = useMemo(() => {
    return rows
      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row, index) => {
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
                  {column.id === "photo" ? (
                    <Avatar
                      src={String(value)}
                      alt={String(value)}
                      sx={{ width: "60px", height: "60px" }}
                    />
                  ) : column.id === "actions" ? (
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
                        "&:hover": {
                          background: "#F1F1F1"
                        }
                      }}
                      onClick={() => {
                        console.log(row) //TODO fix this
                        handleEditGame()
                      }}
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
                      onClick={handleDeleteGame}
                    >
                      {translate("delete")}
                    </Box>
                  </Popover>
                </TableCell>
              )
            })}
          </TableRow>
        )
      })
  }, [rows, page, rowsPerPage, columns, anchorEl, translate])

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
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
