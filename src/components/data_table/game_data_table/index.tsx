import { Avatar } from "@mui/material"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import { ChangeEvent, useMemo, useState } from "react"

import useTranslate from "@hooks/use_translate"
import { GamesContextProps } from "context/games"

type Column = {
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

function createData(
  photo: string,
  game: string,
  score: number,
  platform: string,
  ss: number,
  lastPlayed: string,
  status: string
) {
  return { photo, game, score, platform, ss, lastPlayed, status }
}

export default function GameDataTable({ games }: GamesContextProps) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const { translate } = useTranslate()
  console.log(translate("game"))

  const rows = games?.map((game) =>
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

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const memoizedColumns = useMemo(() => {
    return columns.map((column) => (
      <TableCell
        key={column.id}
        align={column.align}
        style={{
          minWidth: column.minWidth,
          backgroundColor: "#374151",
          color: "#9ca3af",
          padding: "1rem 2rem 1rem 2rem"
        }}
      >
        {column.label}
      </TableCell>
    ))
  }, [])

  const memoizedRows = useMemo(() => {
    return rows
      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row, index) => {
        return (
          <TableRow key={index} hover role="checkbox" tabIndex={-1}>
            {columns.map((column) => {
              const value = row[column.id]
              return (
                <TableCell
                  sx={{ color: "white", py: "1rem", px: "2rem" }}
                  key={column.id}
                  align={column.align}
                >
                  {column.id === "photo" ? (
                    <Avatar src={String(value)} alt={String(value)} />
                  ) : (
                    value
                  )}
                </TableCell>
              )
            })}
          </TableRow>
        )
      })
  }, [rows, page, rowsPerPage])

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
            <TableRow sx={{ p: 2 }}>{memoizedColumns}</TableRow>
          </TableHead>
          <TableBody>{memoizedRows}</TableBody>
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
