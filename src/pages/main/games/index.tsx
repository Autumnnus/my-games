import { Box } from "@mui/material"

import GameDataTable from "@components/data_table/game_data_table"
import AddGame from "@components/dialogs/add_game"
import DeleteGame from "@components/dialogs/delete_game"
import EditGame from "@components/dialogs/edit_game"
import { useGamesPageContext } from "context/games"

export default function GamesPage() {
  const {
    isAddGameDialogOpen,
    setIsAddGameDialogOpen,
    setIsEditGameDialogOpen,
    isEditGameDialogOpen,
    isDeleteGameDialogOpen,
    setIsDeleteGameDialogOpen
  } = useGamesPageContext()
  return (
    <Box px={5} py={2}>
      <GameDataTable />
      <AddGame
        isAddGameDialogOpen={isAddGameDialogOpen}
        setIsAddGameDialogOpen={setIsAddGameDialogOpen}
      />
      <EditGame
        isEditGameDialogOpen={isEditGameDialogOpen}
        setIsEditGameDialogOpen={setIsEditGameDialogOpen}
      />
      <DeleteGame
        isDeleteGameDialogOpen={isDeleteGameDialogOpen}
        setIsDeleteGameDialogOpen={setIsDeleteGameDialogOpen}
      />
    </Box>
  )
}
