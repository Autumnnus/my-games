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

import globalStyles from "@styles/globalStyles"
import { useGameDetailPageContext } from "context/games_detail"
import { Screenshot } from "types/screenshot"

import styles from "./styles"
const screenshotsPerPage = 10

export default function Screenshots() {
  const {
    translate,
    screenShots,
    anchorEl,
    setAnchorEl,
    handleClosePopover,
    setIsDeleteScreenshotDialogOpen,
    setIsEditScreenshotDialogOpen,
    setSelectedSS,
    setIsPreviewScreenshotOpen
  } = useGameDetailPageContext()

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null)
  const [clickedItemId, setClickedItemId] = useState<string | null>(null)

  const pageCount = Math.ceil(screenShots.length / screenshotsPerPage)

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
  function handleClickImage(item: Screenshot) {
    setIsPreviewScreenshotOpen?.()
    setSelectedSS?.(item)
  }
  const startIndex = (currentPage - 1) * screenshotsPerPage
  const currentScreenshots = screenShots.slice(
    startIndex,
    startIndex + screenshotsPerPage
  )

  return (
    <Box display={screenShots.length > 0 ? "block" : "none"}>
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
              onClick={() => handleClickImage(item)}
              sx={styles.screenshot}
            />
            <IconButton
              onPointerEnter={() => setHoveredItemId(item._id)}
              onClick={(event) => handleClick(event, item)}
              disableRipple
              sx={styles.iconButton(hoveredItemId, clickedItemId, item)}
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
            sx={globalStyles.popoverPrimaryOption}
            onClick={() => {
              setIsEditScreenshotDialogOpen?.()
              handleClosePopover?.()
            }}
          >
            {translate("edit")}
          </Box>
          <Box
            sx={globalStyles.popoverErrorOption}
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
