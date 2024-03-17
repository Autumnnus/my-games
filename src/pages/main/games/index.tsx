import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import { Box, IconButton, Stack, Typography } from "@mui/material"

import GameDataTable from "@components/data_table/game_data_table"
import AddGame from "@components/dialogs/add_game"
import EditGame from "@components/dialogs/edit_game"
import SearchBar from "@components/search_bar"
import {
  TABLE_HEADER_COLOR,
  TABLE_ROW_BACKGROUND_COLOR
} from "@constants/colors"
import { useGamesPageContext } from "context/games"

export default function GamesPage() {
  const {
    games,
    isAddGameDialogOpen,
    setIsAddGameDialogOpen,
    isEditGameDialogOpen,
    setIsEditGameDialogOpen,
    selectedGame,
    setSelectedGame
  } = useGamesPageContext()
  return (
    <Box px={5} py={2}>
      <TableHeader />
      <GameDataTable
        games={games}
        setSelectedGame={setSelectedGame}
        setIsEditGameDialogOpen={setIsEditGameDialogOpen}
      />
      <AddGame isOpen={isAddGameDialogOpen} setClose={setIsAddGameDialogOpen} />
      <EditGame
        isOpen={isEditGameDialogOpen}
        setClose={setIsEditGameDialogOpen}
        selectedGame={selectedGame}
      />
    </Box>
  )
}

function TableHeader() {
  const { translate, setIsAddGameDialogOpen } = useGamesPageContext()
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
            user: "Vector"
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
        <IconButton onClick={setIsAddGameDialogOpen}>
          <AddCircleOutlineIcon
            sx={{ width: "40px", height: "40px", color: "white" }}
          />
        </IconButton>
        <SearchBar translate={translate} />
      </Stack>
    </Stack>
  )
}
