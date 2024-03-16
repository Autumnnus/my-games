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

import {
  TABLE_HEADER_BACKGROUND_COLOR,
  TABLE_HEADER_COLOR,
  TABLE_ROW_BACKGROUND_COLOR
} from "@constants/colors"
import useTranslate from "@hooks/use_translate"
import { GamesContextProps } from "context/games"

type Column = {
  id:
    | "photo"
    | "game"
    | "score"
    | "platform"
    | "ss"
    | "lastPlayed"
    | "status"
    | "totalPlay"
  label: string
  minWidth?: number
  align?: "right"
  format?: (value: number) => string
}

function createData(
  photo: string,
  game: string,
  score: number,
  platform: string,
  ss: number,
  totalPlay: number,
  lastPlayed: string,
  status: string
) {
  return { photo, game, score, platform, ss, totalPlay, lastPlayed, status }
}

export default function GameDataTable({ games }: GamesContextProps) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const { translate } = useTranslate()

  const columns: ReadonlyArray<Column> = useMemo(
    () => [
      { id: "photo", label: "", minWidth: 50 },
      { id: "game", label: translate("game"), minWidth: 100 },
      { id: "score", label: translate("score"), minWidth: 170, align: "right" },
      {
        id: "platform",
        label: translate("platform"),
        minWidth: 170,
        align: "right"
      },
      { id: "ss", label: translate("ss"), minWidth: 170, align: "right" },
      {
        id: "totalPlay",
        label: translate("total_play"),
        minWidth: 170,
        align: "right"
      },
      {
        id: "lastPlayed",
        label: translate("last_played"),
        minWidth: 170,
        align: "right"
      },
      {
        id: "status",
        label: translate("status"),
        minWidth: 170,
        align: "right"
      }
    ],
    [translate]
  )
  const rows = useMemo(() => {
    return games?.map((game) =>
      createData(
        game.gamePhoto,
        game.gameName,
        game.gameScore,
        game.gamePlatform,
        game.screenshots.length,
        game.gameTotalTime,
        game.gameDate,
        game.gameStatus
      )
    )
  }, [games])

  const MemoizedColumns = useMemo(() => {
    return columns.map((column) => (
      <TableCell
        key={column.id}
        align={column.align}
        style={{
          minWidth: column.minWidth,
          backgroundColor: TABLE_HEADER_BACKGROUND_COLOR,
          color: TABLE_HEADER_COLOR,
          padding: "1rem 2rem 1rem 2rem"
        }}
      >
        {column.label}
      </TableCell>
    ))
  }, [columns])

  const MemoizedRows = useMemo(() => {
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
                    <Avatar
                      src={String(value)}
                      alt={String(value)}
                      sx={{ width: "60px", height: "60px" }}
                    />
                  ) : (
                    value
                  )}
                </TableCell>
              )
            })}
          </TableRow>
        )
      })
  }, [rows, page, rowsPerPage, columns])

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
            <TableRow sx={{ p: 2 }}>{MemoizedColumns}</TableRow>
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
