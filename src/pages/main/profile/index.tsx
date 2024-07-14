import EditIcon from "@mui/icons-material/Edit"
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material"

import Button from "@components/button"
import SetFavoriteGames from "@components/dialogs/set_favorite_games"
import { useProfilePageContext } from "context/profile"
import { FavoriteGamesData } from "types/games"
export default function ProfilePage() {
  const { profile, translate, favoriteGames, setIsFavoriteGamesDialogOpen } =
    useProfilePageContext()
  return (
    <Stack
      sx={{
        px: 5,
        py: 2,
        gap: 1
      }}
    >
      <Stack
        sx={{
          alignItems: "center",
          px: 5,
          py: 2
        }}
        spacing={2}
      >
        <Avatar
          variant="square"
          src={profile?.profileImage}
          sx={{
            width: 300,
            height: 300
          }}
        />
        <Typography variant="h4">{profile?.name}</Typography>
      </Stack>
      <Stack direction={"row"} justifyContent={"center"} gap={5}>
        <Stack alignItems={"center"} gap={1}>
          <Typography variant="h6">{translate("games")}</Typography>
          <Typography variant="h6">{profile?.gameSize}</Typography>
        </Stack>
        <Stack alignItems={"center"} gap={1}>
          <Typography variant="h6">{translate("completed_games")}</Typography>
          <Typography variant="h6">{profile?.completedGameSize}</Typography>
        </Stack>
        <Stack alignItems={"center"} gap={1}>
          <Typography variant="h6">{translate("screenshots")}</Typography>
          <Typography variant="h6">{profile?.screenshotSize || 0}</Typography>
        </Stack>
      </Stack>
      <Stack alignItems={"center"} gap={2}>
        <Stack direction={"row"} justifyContent={"center"} gap={5}>
          <Typography variant="h4">{translate("favorite_games")}</Typography>
          <IconButton onClick={() => setIsFavoriteGamesDialogOpen?.()}>
            <EditIcon />
          </IconButton>
        </Stack>
        {favoriteGames?.length && favoriteGames.length > 0 ? (
          <Stack direction={"row"} justifyContent={"center"} gap={5}>
            <Card favoriteGames={favoriteGames} />
          </Stack>
        ) : (
          <Button onClick={() => setIsFavoriteGamesDialogOpen?.()}>
            {translate("set_favorite_games")}
          </Button>
        )}
      </Stack>
      <SetFavoriteGames />
    </Stack>
  )
}

function Card({ favoriteGames }: { favoriteGames: FavoriteGamesData[] }) {
  const { translate } = useProfilePageContext()
  return (
    <Stack
      sx={{
        height: "100%",
        flexDirection: {
          xs: "column",
          md: "row"
        },
        justifyContent: "center",
        gap: 5
      }}
    >
      {favoriteGames.map((game) => (
        <Stack
          sx={{
            width: 300,
            gap: 1
          }}
          key={game._id}
        >
          <Box
            component={"img"}
            src={game?.photo || ""}
            sx={{
              width: 300,
              height: 500
            }}
          />
          <Typography textAlign={"center"} variant="h5">
            {game.name}
          </Typography>
          <Typography textAlign={"center"} variant="h6">
            {game.rating ? `${game.rating}/10` : translate("not_rated")}
          </Typography>
        </Stack>
      ))}
    </Stack>
  )
}
