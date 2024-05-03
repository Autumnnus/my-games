import { Avatar, Box, Stack, Typography } from "@mui/material"

import { useProfilePageContext } from "context/profile"

type gameData = {
  name: string
  rating: number
}

export default function ProfilePage() {
  const { profile, translate } = useProfilePageContext()
  const games = {
    firstGame: {
      name: "Baldur's Gate 3",
      rating: 10
    },
    secondGame: {
      name: "Elden Ring",
      rating: 9.8
    },
    thirdGame: {
      name: "The Legend of Zelda: Tears of the Kingdom",
      rating: 9.7
    }
  }
  return (
    <Stack
      sx={{
        px: 5,
        py: 2
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
      <Stack alignItems={"center"}>
        <h1>ALPHA - UNDER PROGRESS</h1>
        <h2>Favorite Games</h2>
      </Stack>
      <Stack direction={"row"} justifyContent={"center"} gap={5}>
        <Card
          firstGame={games.firstGame}
          secondGame={games.secondGame}
          thirdGame={games.thirdGame}
        />
      </Stack>
    </Stack>
  )
}

function Card({
  firstGame,
  secondGame,
  thirdGame
}: {
  firstGame: gameData
  secondGame: gameData
  thirdGame: gameData
}) {
  return (
    <Stack direction={"row"} justifyContent={"center"} gap={5}>
      {[firstGame, secondGame, thirdGame].map((game: gameData, index) => (
        <Stack
          sx={{
            width: 300,
            height: 500,
            gap: 1
          }}
          key={index}
        >
          <Box
            component={"img"}
            src="https://i.pinimg.com/736x/3f/67/87/3f67879f186cfacff6aa3969e76c7cc3.jpg"
            sx={{
              width: 300,
              height: 500
            }}
          />
          <Typography textAlign={"center"} variant="h5">
            {game.name}
          </Typography>
          <Typography textAlign={"center"} variant="h6">
            {game.rating}/10
          </Typography>
        </Stack>
      ))}
    </Stack>
  )
}
