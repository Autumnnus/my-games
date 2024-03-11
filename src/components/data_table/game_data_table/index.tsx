/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Avatar } from "@mui/material"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import * as React from "react"

import { games } from "@components/data_table/game_data_table/dummy"

interface Column {
  id: "photo" | "game" | "score" | "platform" | "ss" | "lastPlayed" | "status"
  label: string
  minWidth?: number
  align?: "right"
  format?: (value: number) => string
}

const columns: ReadonlyArray<Column> = [
  { id: "photo", label: "", minWidth: 50 },
  { id: "game", label: "Oyun", minWidth: 100 },
  {
    id: "score",
    label: "Score",
    minWidth: 170,
    align: "right"
  },
  {
    id: "platform",
    label: "Platform",
    minWidth: 170,
    align: "right"
  },
  {
    id: "ss",
    label: "Ekran Görüntüleri",
    minWidth: 170,
    align: "right"
  },
  {
    id: "lastPlayed",
    label: "Son Oynama",
    minWidth: 170,
    align: "right"
  },
  {
    id: "status",
    label: "Durum",
    minWidth: 170,
    align: "right"
  }
]

interface Data {
  photo: string
  game: string
  score: number
  platform: string
  ss: number
  lastPlayed: string
  status: string
}

function createData(
  photo: string,
  game: string,
  score: number,
  platform: string,
  ss: number,
  lastPlayed: string,
  status: string
): Data {
  return { photo, game, score, platform, ss, lastPlayed, status }
}

const rows = games.map((game) =>
  createData(
    game.gamePhoto,
    game.gameName,
    game.gameScore,
    game.gamePlatform,
    game.screenshots.length,
    game.gameDate,
    game.gameStatus
  )
)
// createData(
//   "India",
//   "IN",
//   1324171354,
//   "platform",
//   3287263,
//   "lastPlayed",
//   "status"
// ),
// createData(
//   "India",
//   "IN",
//   1324171354,
//   "platform",
//   3287263,
//   "lastPlayed",
//   "status"
// )

export default function GameDataTable() {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#1f2937"
      }}
    >
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "#374151",
                    color: "#9ca3af"
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell
                          sx={{ color: "white" }}
                          key={column.id}
                          align={column.align}
                        >
                          {column.id === "photo" ? (
                            <Avatar src={String(value)} alt="" />
                          ) : (
                            value
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
