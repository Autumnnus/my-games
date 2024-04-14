import MoreVertIcon from "@mui/icons-material/MoreVert"
import {
  Avatar,
  Box,
  IconButton,
  Popover,
  Stack,
  Typography
} from "@mui/material"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import { ChangeEvent, useCallback, useMemo, useState } from "react"

import PlatformIcon from "@assets/platform_icons"
import {
  TABLE_HEADER_BACKGROUND_COLOR,
  TABLE_HEADER_COLOR,
  TABLE_ROW_BACKGROUND_COLOR
} from "@constants/colors"
import useTranslate from "@hooks/use_translate"
import ratingTableColor from "@utils/functions/ratingTableColor"
import { useGamesPageContext } from "context/games"
import { Platform } from "types/games"

type Column = {
  id:
    | "photo"
    | "name"
    | "rating"
    | "platform"
    | "screenshots"
    | "lastPlay"
    | "status"
    | "playTime"
    | "actions"
  label: string
  minWidth?: number
  align?: "right"
  format?: (value: number) => string
}

type RowData = {
  photo: string
  name: string
  rating: number
  platform:
    | "steam"
    | "epicGames"
    | "ubisoft"
    | "xboxPc"
    | "eaGames"
    | "torrent"
    | "playstation"
    | "xboxSeries"
    | "nintendo"
    | "mobile"
    | "otherPlatforms"
  screenshots: number
  playTime: number
  lastPlay: string
  status: "completed" | "abondoned" | "toBeCompleted" | "activePlaying"
  _id: string
  gameReview?: string
}

function createData(
  photo: string,
  name: string,
  rating: number,
  platform: string,
  screenshots: number,
  playTime: number,
  lastPlay: string,
  status: string,
  _id: string,
  review?: string
) {
  return {
    photo,
    name,
    rating,
    platform,
    screenshots,
    playTime,
    lastPlay,
    status,
    _id,
    review
  }
}

export default function GameDataTable() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const { translate } = useTranslate()
  const {
    games,
    setIsEditGameDialogOpen,
    setSelectedGame,
    setIsDeleteGameDialogOpen
  } = useGamesPageContext()

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
      { id: "name", label: translate("game"), minWidth: 100 },
      {
        id: "rating",
        label: translate("rating"),
        minWidth: 170,
        align: "right"
      },
      {
        id: "platform",
        label: translate("platform"),
        minWidth: 170,
        align: "right"
      },
      {
        id: "screenshots",
        label: translate("screenshots"),
        minWidth: 170,
        align: "right"
      },
      {
        id: "playTime",
        label: translate("play_time"),
        minWidth: 170,
        align: "right"
      },
      {
        id: "lastPlay",
        label: translate("last_played"),
        minWidth: 170,
        align: "right"
      },
      {
        id: "status",
        label: translate("status"),
        minWidth: 170,
        align: "right"
      },
      {
        id: "actions",
        label: "",
        align: "right"
      }
    ],
    [translate]
  )
  const rows = useMemo(() => {
    return games?.map((game) =>
      createData(
        game.photo,
        game.name,
        game.rating,
        game.platform,
        game.screenshots.length,
        game.playTime,
        game.lastPlay,
        game.status,
        game._id,
        game.review
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
          padding: "1rem 2rem 1rem 2rem",
          border: "none"
        }}
      >
        {column.label}
      </TableCell>
    ))
  }, [columns])

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, row: RowData) => {
      setAnchorEl(event.currentTarget)
      setSelectedGame?.(row)
    },
    [setSelectedGame]
  )

  function handleClose() {
    setAnchorEl(null)
  }

  const handleEditGame = useCallback(() => {
    setAnchorEl(null)
    setIsEditGameDialogOpen?.()
  }, [setIsEditGameDialogOpen])

  const handleDeleteGame = useCallback(() => {
    setAnchorEl(null)
    setIsDeleteGameDialogOpen?.()
  }, [setIsDeleteGameDialogOpen])

  const MemoizedRows = useMemo(() => {
    return rows
      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row, index) => {
        return (
          <TableRow key={index} hover role="checkbox" tabIndex={-1}>
            {columns.map((column) => {
              const value = row[column.id as keyof typeof row]
              let cellContent
              if (column.id === "photo") {
                cellContent = (
                  <Avatar
                    src={String(value)}
                    alt={String(value)}
                    sx={{ width: "60px", height: "60px" }}
                  />
                )
              } else if (column.id === "actions") {
                cellContent = (
                  <IconButton
                    onClick={(event) => handleClick(event, row as RowData)}
                  >
                    <MoreVertIcon color="secondary" />
                  </IconButton>
                )
              } else if (column.id === "status") {
                cellContent = (
                  <Typography
                    sx={{
                      color:
                        value === "toBeCompleted"
                          ? "#fde047"
                          : value === "abondoned"
                            ? "#991b1b"
                            : value === "completed"
                              ? "#16a34a"
                              : "#0ea5e9"
                    }}
                  >
                    {translate(value as string)}
                  </Typography>
                )
              } else if (column.id === "rating") {
                cellContent = (
                  <Typography
                    sx={{
                      color: ratingTableColor(value as number)
                    }}
                  >
                    {value}
                    {value ? "/10" : translate("not_rated")}
                  </Typography>
                )
              } else if (column.id === "lastPlay") {
                cellContent = (
                  <Typography sx={{ color: "#9ca3af" }}>
                    {column.id === "lastPlay" &&
                      value &&
                      new Date(value).toLocaleDateString()}
                  </Typography>
                )
              } else if (column.id === "platform") {
                cellContent = (
                  <Stack
                    direction={"row"}
                    justifyContent={"flex-end"}
                    alignItems={"center"}
                    gap={1}
                  >
                    <Typography sx={{ color: "#9ca3af" }}>
                      {column.id === "platform" && translate(value as string)}
                    </Typography>
                    <PlatformIcon platform={value as Platform} />
                  </Stack>
                )
              } else if (
                column.id === "playTime" ||
                column.id === "screenshots"
              ) {
                cellContent = (
                  <Typography sx={{ color: "#9ca3af" }}>{value}</Typography>
                )
              } else {
                cellContent = (
                  <Typography
                    sx={{ ":hover": { color: "#075985" }, cursor: "pointer" }}
                  >
                    {typeof value === "string" && value.length > 40
                      ? value.substring(0, 40) + "..."
                      : value}
                  </Typography>
                )
              }

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
                  {cellContent}
                </TableCell>
              )
            })}
          </TableRow>
        )
      })
  }, [rows, page, rowsPerPage, columns, translate, handleClick])

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
            "&:hover": {
              background: "#F1F1F1"
            }
          }}
          onClick={handleEditGame}
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
