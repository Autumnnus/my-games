import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward"
import CreateIcon from "@mui/icons-material/Create"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual"
import {
  Box,
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Pagination,
  Stack,
  Typography
} from "@mui/material"
import { useMemo, useState } from "react"

import PlatformIcon from "@assets/platform_icons"
import DeleteGame from "@components/dialogs/delete_game"
import EditGame from "@components/dialogs/edit_game"
import { useGameDetailPageContext } from "context/games_detail"
import { GamesData, Platform } from "types/games"

export default function GameDetailPage() {
  const {
    game,
    isEditGameDialogOpen,
    isDeleteGameDialogOpen,
    setIsEditGameDialogOpen,
    setIsDeleteGameDialogOpen
  } = useGameDetailPageContext()
  if (!game) return null

  return (
    <Box px={10} py={5}>
      <Stack>
        <Stack direction={"row"} gap={3}>
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
          <Stack direction={"column"} gap={2}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={2}
            >
              <Typography variant="h3">{game?.name}</Typography>
              <Stack direction={"row"} gap={1}>
                <Button variant="contained">
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
              <DetailRows title="platform" content={game.platform} />
              <DetailRows title="rating" content={game.rating} />
              <DetailRows title="status" content={game.status} />
              <DetailRows title="playTime" content={game.playTime} />
              <DetailRows title="lastPlay" content={game.lastPlay} />
              <DetailRows title="review" content={game.review} />
            </Stack>
          </Stack>
        </Stack>
        <Screenshots game={game} />
      </Stack>
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

type DetailRowsProps = {
  title: keyof GamesData
  content: GamesData[keyof GamesData]
}

function DetailRows({ title, content }: DetailRowsProps) {
  const { translate } = useGameDetailPageContext()
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  const stringfied = useMemo(() => String(content), [content])
  const memorizedContent = useMemo(() => {
    if (title === "lastPlay") {
      return new Date(stringfied).toLocaleDateString()
    }
    return capitalizeFirstLetter(stringfied)
  }, [stringfied, title])
  return (
    <Stack direction={"row"} gap={0.5}>
      <Typography>
        <Box component="span" sx={{ fontWeight: "bold", mr: 1 }}>
          {translate(title)}:
        </Box>
        <Box component="span" sx={{ color: "gray" }}>
          {memorizedContent}
          {title === "platform" && (
            <PlatformIcon platform={content as Platform} />
          )}
        </Box>
      </Typography>
    </Stack>
  )
}

const screenshotsPerPage = 15
function Screenshots({ game }: { game: GamesData }) {
  const { translate } = useGameDetailPageContext()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const pageCount = Math.ceil(game.screenshots.length / screenshotsPerPage)
  const startIndex = (currentPage - 1) * screenshotsPerPage
  const currentScreenshots = game.screenshots.slice(
    startIndex,
    startIndex + screenshotsPerPage
  )
  function handlePageChange(_: unknown, value: number) {
    setCurrentPage(value)
  }
  if (!currentScreenshots.length) return null

  return (
    <Box>
      <Typography variant="h4">{`${translate("screenshots")} (${game.screenshots.length})`}</Typography>
      <ImageList cols={5} gap={8}>
        {currentScreenshots.map((item) => (
          <ImageListItem key={item._id}>
            <img src={item.ssUrl} alt={item.ssName} />
            <ImageListItemBar
              title={item.ssName}
              sx={{ display: item.ssName ? "block" : "none" }}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.ssName}`}
                >
                  <ArrowOutwardIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        color="standard"
      />
    </Box>
  )
}
