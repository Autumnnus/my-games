import { Box } from "@mui/material"

import GameDataTable from "@components/data_table/game_data_table"

export const GamesPage = () => {
  return (
    <Box px={5} py={2}>
      <GameDataTable />
    </Box>
  )
}
