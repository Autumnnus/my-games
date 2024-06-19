import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import axios from "axios"
import { useState } from "react"
import { useParams } from "react-router-dom"

import DialogProvider from "@components/dialog_provider"
import useControlledForm from "@hooks/use_controlled_form"
import { showErrorToast, showSuccessToast } from "@utils/functions/toast"
import log from "@utils/log"
import { useAppContext } from "context/app_context"
import { useGameDetailPageContext } from "context/games_detail"

export default function DeleteScreenshot() {
  const {
    translate,
    selectedSS,
    isDeleteScreenshotDialogOpen,
    setIsDeleteScreenshotDialogOpen,
    setScreenShots
  } = useGameDetailPageContext()
  const { token } = useAppContext()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)

  const {
    formState: { isValid }
  } = useControlledForm({
    mode: "all"
  })

  function handleClose() {
    if (loading) {
      return
    }
    setIsDeleteScreenshotDialogOpen?.()
  }

  async function onSubmit() {
    setLoading(true)
    await axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/screenshot/delete/${id}/${selectedSS?._id}`,
        {
          headers: {
            Authorization: `Bearer: ${token?.access_token}`
          }
        }
      )
      .then(() => {
        log(`Screenshot is deleted ${selectedSS?.name}`, selectedSS ?? "")
        showSuccessToast("The Screenshot Deleted Successfully")
        setScreenShots?.((prev) =>
          prev.filter((item) => item._id !== selectedSS?._id)
        )
        handleClose()
      })
      .catch((error) => {
        console.error(error)
        showErrorToast(
          "Screenshot couldn't be deleted" + (error as Error).message
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <DialogProvider
      title={translate("delete_screenshot")}
      leftButton={{
        text: translate("cancel"),
        color: "secondary",
        onClick: handleClose,
        disabled: loading
      }}
      rightButton={{
        text: translate("delete"),
        color: "error",
        onClick: onSubmit,
        loading: loading,
        disabled: !isValid
      }}
      isOpen={!!isDeleteScreenshotDialogOpen}
      setClose={handleClose}
      size="small"
    >
      <Stack justifyContent={"center"} alignItems={"center"} flex={1}>
        <Typography align="center">
          {translate("delete_screenshot_text")}
        </Typography>
      </Stack>
    </DialogProvider>
  )
}
