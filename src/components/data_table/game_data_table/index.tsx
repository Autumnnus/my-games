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
import { ChangeEvent, useCallback, useMemo, useState } from "react"

import {
  TABLE_HEADER_BACKGROUND_COLOR,
  TABLE_HEADER_COLOR,
  TABLE_ROW_BACKGROUND_COLOR
} from "@constants/colors"
import useTranslate from "@hooks/use_translate"
import { useGamesPageContext } from "context/games"

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
    (
      event: React.MouseEvent<HTMLButtonElement>,
      row: {
        photo: string
        name: string
        rating: number
        platform: string
        screenshots: number
        playTime: number
        lastPlay: string
        status: string
        _id: string
        gameReview?: string
      }
    ) => {
      setAnchorEl(event.currentTarget)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
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
                      <IconButton onClick={(event) => handleClick(event, row)}>
                        <MoreVertIcon color="secondary" />
                      </IconButton>
                    </>
                  ) : column.id === "status" || column.id === "platform" ? (
                    <Typography>{translate(value as string)}</Typography>
                  ) : column.id === "lastPlay" ? (
                    <Typography>
                      {value && new Date(value).toLocaleDateString()}
                    </Typography>
                  ) : (
                    <Typography>{value}</Typography>
                  )}
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
