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
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null)
  const [clickedItemId, setClickedItemId] = useState<string | null>(null)

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
    setClickedItemId(item._id)
  }

  if (!currentScreenshots.length) return null

  return (
    <Box>
      <Typography variant="h4">{`${translate("screenshots")} (${screenShots.length})`}</Typography>
      <ImageList cols={5} gap={8}>
        {currentScreenshots.map((item) => (
          <ImageListItem
            onPointerEnter={() => setHoveredItemId(item._id)}
            onPointerLeave={() => {
              if (clickedItemId !== item._id) {
                setHoveredItemId(null)
              }
            }}
            key={item._id}
          >
            <Box
              component={"img"}
              src={item.url}
              alt={item.name}
              sx={{
                objectFit: "fill",
                position: "relative",
                width: "100%",
                height: "100%"
              }}
            />
            <IconButton
              onPointerEnter={() => setHoveredItemId(item._id)}
              onClick={(event) => handleClick(event, item)}
              disableRipple
              sx={{
                position: "absolute",
                top: 3,
                right: 3,
                display:
                  hoveredItemId === item._id || clickedItemId === item._id
                    ? "block"
                    : "none"
              }}
            >
              <MoreVertIcon />
            </IconButton>
            <ImageListItemBar
              title={item.name}
              sx={{ display: item.name ? "block" : "none" }}
            />
          </ImageListItem>
        ))}
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => {
            handleClosePopover?.()
            setClickedItemId(null)
          }}
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
