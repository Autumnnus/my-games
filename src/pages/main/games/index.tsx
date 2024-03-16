import { Box } from "@mui/material"

import GameDataTable from "@components/data_table/game_data_table"
import { useGamesPageContext } from "context/games"

export const GamesPage = () => {
  const { games } = useGamesPageContext()
  return (
    <Box px={5} py={2}>
      <GameDataTable games={games} />
    </Box>
  )
}
