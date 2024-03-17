import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import { Box, IconButton, Stack, Typography } from "@mui/material"

import GameDataTable from "@components/data_table/game_data_table"
import AddGame from "@components/dialogs/add_game"
import SearchBar from "@components/search_bar"
import {
  TABLE_HEADER_COLOR,
  TABLE_ROW_BACKGROUND_COLOR
} from "@constants/colors"
import { useGamesPageContext } from "context/games"

export default function GamesPage() {
  const { games, isAddGameDialogOpen, setIsAddGameDialogOpen } =
    useGamesPageContext()
  return (
    <Box px={5} py={2}>
      <TableHeader />
      <GameDataTable games={games} />
      <AddGame isOpen={isAddGameDialogOpen} setClose={setIsAddGameDialogOpen} />
    </Box>
  )
}

function TableHeader() {
  const { translate, setIsAddGameDialogOpen } = useGamesPageContext()
  return (
    <Stack
      spacing={2}
      direction="row"
      justifyContent="space-between"
      sx={{ backgroundColor: TABLE_ROW_BACKGROUND_COLOR, p: 2 }}
    >
      <Stack justifyContent={"space-around"}>
        <Typography fontSize={24} fontWeight="bold" color={"white"}>
          {translate("games")}
        </Typography>
        <Typography color={TABLE_HEADER_COLOR} variant="body2">
          {translate("all_played_games_from_user", {
            user: "Vector"
          })}
        </Typography>
      </Stack>
      <Stack direction={"row"} alignItems={"center"} gap={1}>
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
