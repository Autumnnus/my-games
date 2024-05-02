import { Box } from "@mui/material"

import GameDataTable from "@components/data_table/game_data_table"
import AddGame from "@components/dialogs/add_game"
import DeleteGame from "@components/dialogs/delete_game"
import EditGame from "@components/dialogs/edit_game"

export default function GamesPage() {
  return (
    <Box px={5} py={2}>
      <GameDataTable />
      <AddGame />
      <EditGame />
      <DeleteGame />
    </Box>
  )
}
