import CreateIcon from "@mui/icons-material/Create"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual"
import { Box, Button, Skeleton, Stack, Typography } from "@mui/material"
import { useMemo } from "react"

import AddScreenShot from "@components/dialogs/add_screenshots"
import DeleteGame from "@components/dialogs/delete_game"
import DeleteScreenshot from "@components/dialogs/delete_screenshots"
import EditGame from "@components/dialogs/edit_game"
import EditScreenShot from "@components/dialogs/edit_screenshots"
import PreviewScreenShot from "@components/preview_screenshot"
import GameDetailRow from "@pages/main/game_detail/sub_components/game_detail_row"
import Screenshots from "@pages/main/game_detail/sub_components/screenshots"
import { useGameDetailPageContext } from "context/games_detail"
import { GamesData, NameId } from "types/games"

import styles from "./styles"

export default function GameDetailPage() {
  const {
    game,
    isEditGameDialogOpen,
    isDeleteGameDialogOpen,
    setIsEditGameDialogOpen,
    setIsDeleteGameDialogOpen
  } = useGameDetailPageContext()
  return (
    <Stack
      sx={{
        px: {
          xs: 4,
          sm: 10
        },
        py: 5,
        gap: 1.5
      }}
    >
      <GameDetailTitle game={game} />
      {game.igdb?.id && <IGDBGameDetail game={game} />}
      <Screenshots />
      <EditGame
        isEditGameDialogOpen={isEditGameDialogOpen}
        setIsEditGameDialogOpen={setIsEditGameDialogOpen}
      />
      <DeleteGame
        isDeleteGameDialogOpen={isDeleteGameDialogOpen}
        setIsDeleteGameDialogOpen={setIsDeleteGameDialogOpen}
      />
      <AddScreenShot />
      <EditScreenShot />
      <DeleteScreenshot />
      <PreviewScreenShot />
    </Stack>
  )
}

function GameDetailTitle({ game }: { game: GamesData }) {
  const {
    setIsEditGameDialogOpen,
    setIsDeleteGameDialogOpen,
    setIsAddScreenshotDialogOpen,
    token,
    loadingGameDetail
  } = useGameDetailPageContext()
  const isOwner = useMemo(
    () => game.userId === token?.id,
    [game.userId, token?.id]
  )
  return (
    <Stack
      sx={{
        flexDirection: {
          xs: "column",
          sm: "row"
        },
        gap: 3
      }}
    >
      {loadingGameDetail ? (
        <Skeleton
          variant="rectangular"
          width="20rem"
          height="24rem"
          sx={{ borderRadius: 2 }}
        />
      ) : (
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
      )}
      <Stack direction={"column"} gap={2}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={2}
        >
          {loadingGameDetail ? (
            <Skeleton variant="text" width="15rem" height="3rem" />
          ) : (
            <Typography variant="h3">{game?.name}</Typography>
          )}
          <Stack
            display={token && isOwner ? "flex" : "none"}
            direction={"row"}
            gap={1}
          >
            <Button onClick={setIsAddScreenshotDialogOpen} variant="contained">
              <PhotoSizeSelectActualIcon />
            </Button>
            <Button onClick={setIsEditGameDialogOpen} variant="contained">
              <CreateIcon />
            </Button>
            <Button
              onClick={setIsDeleteGameDialogOpen}
              color="error"
              variant="contained"
            >
              <DeleteForeverIcon />
            </Button>
          </Stack>
        </Stack>
        <Stack gap={2}>
          {loadingGameDetail ? (
            Array.from(new Array(6)).map((_, index) => (
              <Skeleton key={index} variant="text" width="100%" height="2rem" />
            ))
          ) : (
            <>
              <GameDetailRow title="platform" content={game.platform} />
              <GameDetailRow title="rating" content={game.rating} />
              <GameDetailRow title="status" content={game.status} />
              <GameDetailRow title="playTime" content={game.playTime} />
              <GameDetailRow title="lastPlay" content={game.lastPlay} />
              {game.review && (
                <GameDetailRow title="review" content={game.review} />
              )}
            </>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}
function IGDBGameDetail({ game }: { game: GamesData }) {
  const { translate } = useGameDetailPageContext()
  return (
    <Stack
      sx={{
        flexDirection: {
          xs: "column",
          sm: "row"
        },
        gap: 3
      }}
    >
      <Stack direction={"column"} gap={2} sx={{ width: "100%" }}>
        <Typography variant="h3">IGDB {translate("game_details")}</Typography>
        <Stack sx={styles.tagsRow}>
          <Stack sx={styles.tagRow((game?.igdb?.genres?.length || 0) > 0)}>
            <Tags
              title="genres"
              tags={
                game.igdb?.genres?.map((item) => ({
                  name: item.name,
                  id: item.id
                })) as NameId[]
              }
            />
          </Stack>
          <Stack sx={styles.tagRow((game?.igdb?.themes?.length || 0) > 0)}>
            <Tags
              title="themes"
              tags={
                game.igdb?.themes.map((item) => ({
                  name: item.name,
                  id: item.id
                })) as NameId[]
              }
            />
          </Stack>
          <Stack
            sx={styles.tagRow(
              (game?.igdb?.player_perspectives?.length || 0) > 0
            )}
          >
            <Tags
              title="player_perspectives"
              tags={
                game.igdb?.player_perspectives?.map((item) => ({
                  name: item.name,
                  id: item.id
                })) as NameId[]
              }
            />
          </Stack>
        </Stack>
        <Stack sx={styles.tagsRow}>
          <Stack sx={styles.tagRow((game?.igdb?.game_modes?.length || 0) > 0)}>
            <Tags
              title="game_modes"
              tags={
                game.igdb?.game_modes.map((item) => ({
                  name: item.name,
                  id: item.id
                })) as NameId[]
              }
            />
          </Stack>
          <Stack sx={styles.tagRow((game?.igdb?.developers?.length || 0) > 0)}>
            <Tags
              title="developers"
              tags={
                game.igdb?.developers.map((item) => ({
                  name: item.name,
                  id: item.id
                })) as NameId[]
              }
            />
          </Stack>
          <Stack sx={styles.tagRow((game?.igdb?.publishers?.length || 0) > 0)}>
            <Tags
              title="publishers"
              tags={
                game.igdb?.publishers.map((item) => ({
                  name: item.name,
                  id: item.id
                })) as NameId[]
              }
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

function Tags({ title, tags }: { title: string; tags: NameId[] }) {
  const { translate } = useGameDetailPageContext()
  return (
    <Stack>
      <Typography variant="body1">{translate(title)}</Typography>
      <Stack direction={"row"} flexWrap={"wrap"} gap={1}>
        {tags?.map((tag) => (
          <Typography
            key={tag.id}
            variant="body2"
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
              padding: "0.2rem 0.5rem",
              color: "gray"
            }}
          >
            {tag.name}
          </Typography>
        ))}
      </Stack>
    </Stack>
  )
}
