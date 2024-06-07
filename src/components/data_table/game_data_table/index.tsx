import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import { Box, IconButton, Popover, Stack, Typography } from "@mui/material"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableContainer from "@mui/material/TableContainer"
import TablePagination from "@mui/material/TablePagination"
import axios, { type AxiosResponse } from "axios"
import { ChangeEvent, useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { GameDataTableBody } from "@components/data_table/game_data_table/sub_components/table_body"
import { GameDataTableTitle } from "@components/data_table/game_data_table/sub_components/table_titles"
import Loading from "@components/loading"
import SearchBar from "@components/search_bar"
import {
  TABLE_HEADER_BACKGROUND_COLOR,
  TABLE_HEADER_COLOR,
  TABLE_ROW_BACKGROUND_COLOR
} from "@constants/colors"
import { showErrorToast } from "@utils/functions/toast"
import { useGamesPageContext } from "context/games"
import { GamesData } from "types/games"

export default function GameDataTable() {
  const {
    translate,
    setIsEditGameDialogOpen,
    setIsDeleteGameDialogOpen,
    setAnchorEl,
    anchorEl,
    rows,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage
  } = useGamesPageContext()

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage?.(newPage)
  }
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage?.(+event.target.value)
    localStorage.setItem("rowsPerPage", event.target.value)
    setPage?.(0)
  }

  function handleClose() {
    setAnchorEl?.(null)
  }

  const handleEditGame = useCallback(() => {
    setAnchorEl?.(null)
    setIsEditGameDialogOpen?.()
  }, [setAnchorEl, setIsEditGameDialogOpen])

  const handleDeleteGame = useCallback(() => {
    setAnchorEl?.(null)
    setIsDeleteGameDialogOpen?.()
  }, [setAnchorEl, setIsDeleteGameDialogOpen])
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
          <GameDataTableTitle />
          <GameDataTableBody />
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
            color: "#fff",
            "&:hover": {
              background: "#F1F1F1",
              color: "#000"
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
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={rows?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          ".MuiTablePagination-toolbar": {
            color: "#fff",
            bgcolor: TABLE_HEADER_BACKGROUND_COLOR
          },
          ".MuiList-root-MuiMenu-list": {
            color: "#fff"
          }
        }}
        SelectProps={{
          MenuProps: {
            sx: {
              ".MuiPaper-root": {
                color: "#fff"
              }
            }
          }
        }}
      />
    </Paper>
  )
}

function TableHeader() {
  const { translate, setIsAddGameDialogOpen, reset, setGames } =
    useGamesPageContext()
  const { id } = useParams()
  const navigate = useNavigate()
  function handleAddGame() {
    reset?.({
      name: ""
    })
    setIsAddGameDialogOpen?.()
  }
  const queryParams = new URLSearchParams()
  const handleSearch = (search: string) => {
    if (search) queryParams.append("search", search)
    const queryString = queryParams.toString()
    const url = `${process.env.REACT_APP_API_URL}/api/games/user/${id}${queryString ? `?${queryString}` : ""}`
    navigate(`?${queryString}`)
    axios
      .get(url)
      .then((res: AxiosResponse<{ data: GamesData[] }>) => {
        setGames?.(res.data.data)
      })
      .catch((err) => {
        showErrorToast("Database Fetching Error")
        console.error(err)
      })
  }
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
          {translate("games")}
        </Typography>
        <Typography color={TABLE_HEADER_COLOR} variant="body2">
          {translate("all_played_games_by_user", {
            user: "xcz"
          })}
        </Typography>
      </Stack>
      <Stack
        direction={"row"}
        alignItems={"center"}
        gap={1}
        sx={{
          justifyContent: {
            xs: "center",
            sm: "flex-end"
          }
        }}
      >
        <IconButton onClick={handleAddGame}>
          <AddCircleOutlineIcon
            sx={{ width: "40px", height: "40px", color: "white" }}
          />
        </IconButton>
        <SearchBar onClick={(search: string) => handleSearch(search)} />
      </Stack>
    </Stack>
  )
}
