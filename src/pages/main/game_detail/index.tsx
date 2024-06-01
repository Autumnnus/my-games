import { Box, Stack, Typography } from "@mui/material"

import Button from "@components/button"
import AddGame from "@components/dialogs/add_game"
import DeleteGame from "@components/dialogs/delete_game"
import EditGame from "@components/dialogs/edit_game"
import { useGameDetailPageContext } from "context/games/games_detail"

export default function GameDetailPage() {
  const { game, translate } = useGameDetailPageContext()
  return (
    <Box px={10} py={5}>
      <Stack>
        <Stack direction={"row"} gap={2}>
          <Box
            component={"img"}
            src={game?.photo}
            sx={{
              width: "20rem",
              height: "24rem",
              objectFit: "cover",
              borderRadius: 2
            }}
          />
          <Stack direction={"row"}>
            <Stack direction={"row"} gap={2}>
              <Typography variant="h3">{game?.name}</Typography>
              <Box gap={1}>
                <Button>{translate("edit_game")}</Button>
                <Button>{translate("delete_game")}</Button>
                <Button>{translate("add_ss")}</Button>
              </Box>
            </Stack>
            <Stack direction={"row"} gap={2}>
              <Typography variant="h3">{game?.name}</Typography>
              <Box gap={1}>
                <Button>{translate("edit_game")}</Button>
                <Button>{translate("delete_game")}</Button>
                <Button>{translate("add_ss")}</Button>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <AddGame />
      <EditGame />
      <DeleteGame />
    </Box>
  )
}
