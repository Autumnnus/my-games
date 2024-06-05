import { Fade, Modal } from "@mui/material"

import { useGameDetailPageContext } from "context/games_detail"

export default function PreviewScreenShot() {
  const { setIsPreviewScreenshotOpen, selectedSS, isPreviewScreenshotOpen } =
    useGameDetailPageContext()
  return (
    <Modal
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
          backgroundcolor: "red"
        }
      }}
      open={!!isPreviewScreenshotOpen}
      onClose={setIsPreviewScreenshotOpen}
      closeAfterTransition
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade
        in={!!isPreviewScreenshotOpen}
        timeout={500}
        style={{ outline: "none" }}
      >
        <img
          src={selectedSS?.url}
          alt={selectedSS?.name}
          style={{ maxHeight: "90%", maxWidth: "90%" }}
        />
      </Fade>
    </Modal>
  )
}
