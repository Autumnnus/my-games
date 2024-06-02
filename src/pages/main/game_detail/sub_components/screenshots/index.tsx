import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Pagination,
  Popover,
  Typography
} from "@mui/material"
import { useState } from "react"

import { useGameDetailPageContext } from "context/games_detail"
import { Screenshot } from "types/games"

const screenshotsPerPage = 15

export default function Screenshots() {
  const {
    translate,
    screenShots,
    anchorEl,
    setAnchorEl,
    handleClosePopover,
    setIsDeleteScreenshotDialogOpen,
    setIsEditScreenshotDialogOpen,
    setSelectedSS
  } = useGameDetailPageContext()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [hover, setHover] = useState(false)
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
  function handleClick(
    event: React.MouseEvent<HTMLButtonElement>,
    item: Screenshot
  ) {
    setAnchorEl?.(event.currentTarget)
    setSelectedSS?.(item)
  }

  if (!currentScreenshots.length) return null

  return (
    <Box>
      <Typography variant="h4">{`${translate("screenshots")} (${screenShots.length})`}</Typography>
      <ImageList cols={5} gap={8}>
        {currentScreenshots.map((item) => (
          <ImageListItem
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
            key={item._id}
          >
            <Box
              component={"img"}
              src={item.url}
              alt={item.name}
              sx={{ objectFit: "fill", position: "relative" }}
            />
            <IconButton
              onPointerEnter={() => setHover(true)}
              onClick={(event) => handleClick(event, item)}
              sx={{
                position: "absolute",
                top: 3,
                right: 3,
                display: hover ? "block" : "none"
              }}
            >
              <MoreVertIcon />
            </IconButton>
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
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        sx={{
          "& > *": {
            borderRadius: 2.3,
            boxShadow: "0px 3px 6px #00000029"
          }
        }}
      >
        <Box
          sx={{
            padding: 1,
            pr: 4,
            cursor: "pointer",
            color: "#fff",
            "&:hover": {
              background: "#F1F1F1",
              color: "#000"
            }
          }}
          onClick={() => {
            setIsEditScreenshotDialogOpen?.()
            handleClosePopover?.()
          }}
        >
          {translate("edit")}
        </Box>
        <Box
          sx={{
            padding: 1,
            pr: 4,
            cursor: "pointer",
            color: "red",
            "&:hover": {
              background: "#F1F1F1"
            }
          }}
          onClick={() => {
            setIsDeleteScreenshotDialogOpen?.()
            handleClosePopover?.()
          }}
        >
          {translate("delete")}
        </Box>
      </Popover>
    </Box>
  )
}
