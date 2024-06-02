import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward"
import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Pagination,
  Typography
} from "@mui/material"
import { useState } from "react"

import { useGameDetailPageContext } from "context/games_detail"

const screenshotsPerPage = 15

export default function Screenshots() {
  const { translate, screenShots } = useGameDetailPageContext()
  const [currentPage, setCurrentPage] = useState<number>(1)
  if (!screenShots) return null
  const pageCount = Math.ceil(screenShots.length / screenshotsPerPage)
  const startIndex = (currentPage - 1) * screenshotsPerPage
  const currentScreenshots = screenShots.slice(
    startIndex,
    startIndex + screenshotsPerPage
  )
  function handlePageChange(_: unknown, value: number) {
    setCurrentPage(value)
  }
  if (!currentScreenshots.length) return null

  return (
    <Box>
      <Typography variant="h4">{`${translate("screenshots")} (${screenShots.length})`}</Typography>
      <ImageList cols={5} gap={8}>
        {currentScreenshots.map((item) => (
          <ImageListItem key={item._id}>
            <Box
              component={"img"}
              src={item.url}
              alt={item.name}
              sx={{
                width: "240px",
                height: "135px",
                objectFit: "cover"
              }}
            />
            <ImageListItemBar
              title={item.name}
              sx={{ display: item.name ? "block" : "none" }}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.name}`}
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
