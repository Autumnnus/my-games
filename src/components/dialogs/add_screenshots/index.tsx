import { Avatar, Box, Stack, Typography } from "@mui/material"
import axios, { type AxiosResponse } from "axios"
import { useCallback, useMemo, useState } from "react"
import { useWatch } from "react-hook-form"
import { useParams } from "react-router-dom"

import ControlledSwitch from "@components/controlled_switch"
import DialogProvider from "@components/dialog_provider"
import TextInput from "@components/text_input"
import { showErrorToast, showSuccessToast } from "@utils/functions/toast"
import log from "@utils/log"
import { useAppContext } from "context/app_context"
import { useGameDetailPageContext } from "context/games_detail"
import { AxiosErrorMessage } from "types/axios"
import { Screenshot, ScreenshotType } from "types/screenshot"

export default function AddScreenShot() {
  const {
    translate,
    setScreenShots,
    screenshotControl,
    screenshotHandleSubmit,
    screenshotIsValid,
    screenshotReset,
    isAddScreenshotDialogOpen,
    setIsAddScreenshotDialogOpen,
    setScreenshotValue,
    screenshotTrigger,
    backendUrl
  } = useGameDetailPageContext()
  const { token } = useAppContext()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const type = useWatch({ control: screenshotControl, name: "type" })
  const url = useWatch({ control: screenshotControl, name: "url" })
  const allowedUploadS3ImageFeature = useMemo(
    () => token?.role === "admin" || token?.role === "vip",
    [token?.role]
  )

  function handleClose() {
    if (loading) {
      return
    }
    setIsAddScreenshotDialogOpen?.()
    screenshotReset?.({
      name: "",
      url: "",
      type: ScreenshotType.Text
    })
    setSelectedImages([])
  }
  async function onSubmit(data: Screenshot) {
    setLoading(true)
    if (data.images && type === ScreenshotType.Image) {
      const formData = new FormData()
      selectedImages.forEach((file) => {
        formData.append("file", file)
      })
      formData.append("type", ScreenshotType.Image)
      axios
        .post(`${backendUrl}/api/screenshot/add/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer: ${token?.access_token}`
          }
        })
        .then((res: AxiosResponse<{ data: Screenshot }>) => {
          log(`${data.url} is added: `, data)
          showSuccessToast("Screenshot is added")
          const responseData = res.data.data as unknown as Screenshot[]
          setScreenShots?.((prev) => {
            const existingScreenshots = prev ?? []
            const screenshotMap = new Map(
              existingScreenshots.map((screenshot) => [
                screenshot._id,
                screenshot
              ])
            )
            responseData.forEach((newScreenshot) => {
              screenshotMap.set(newScreenshot._id, newScreenshot)
            })
            return Array.from(screenshotMap.values()).reverse()
          })
          handleClose()
        })
        .catch((error: AxiosErrorMessage) => {
          console.error(error)
          showErrorToast(
            "Screenshot couldn't be added: " + error.response?.data.message
          )
        })
        .finally(() => {
          setLoading(false)
        })
    } else if (type === ScreenshotType.Text && data.url) {
      const requestData = {
        name: data.name,
        url: data.url,
        type: ScreenshotType.Text
      }
      await axios
        .post(`${backendUrl}/api/screenshot/add/${id}`, requestData, {
          headers: {
            Authorization: `Bearer: ${token?.access_token}`
          }
        })
        .then((res: AxiosResponse<{ data: Screenshot }>) => {
          log(`${data.url} is added: `, data)
          screenshotReset?.()
          showSuccessToast("Screenshot is added")
          setScreenShots?.((prev) => [res.data.data, ...(prev ?? [])])
          handleClose()
        })
        .catch((error: AxiosErrorMessage) => {
          console.error(error)
          showErrorToast(
            "Screenshot couldn't be added" + error.response?.data.message
          )
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
      showErrorToast("Please select image or url")
    }
  }

  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || [])
      setSelectedImages(files)
      setScreenshotValue?.("images", files)
      screenshotTrigger?.("images")
    },
    [screenshotTrigger, setScreenshotValue]
  )
  const memorizedTypeInput = useMemo(() => {
    if (type === ScreenshotType.Image) {
      return (
        <>
          <Typography
            variant="body1"
            color={selectedImages.length > 50 ? "error" : "inherit"}
          >
            {translate("select_screenshots")}
            {selectedImages.length > 0 &&
              ` (${selectedImages.length} /50 ${translate("selected")})`}
          </Typography>
          <input
            type="file"
            disabled={loading}
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
        </>
      )
    } else {
      return (
        <>
          <TextInput<Screenshot>
            type="text"
            name="name"
            control={screenshotControl}
            label={translate("screenshot_name")}
            placeholder={translate("screenshot_name")}
            disabled={loading}
          />
          <TextInput<Screenshot>
            type="text"
            name="url"
            control={screenshotControl}
            label={translate("screenshot_url")}
            placeholder={
              "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg"
            }
            TextLeft={
              url && (
                <Avatar
                  variant="square"
                  sx={{ width: "40px", height: "40px" }}
                  src={url}
                />
              )
            }
            required
            disabled={loading}
          />
        </>
      )
    }
  }, [
    type,
    selectedImages.length,
    translate,
    loading,
    handleFileChange,
    screenshotControl,
    url
  ])
  return (
    <DialogProvider
      title={translate("add_screenshot")}
      leftButton={{
        text: translate("cancel"),
        color: "secondary",
        onClick: handleClose,
        disabled: loading
      }}
      rightButton={{
        text: translate("save"),
        color: "primary",
        onClick: screenshotHandleSubmit?.(onSubmit),
        loading: loading,
        disabled: !screenshotIsValid
      }}
      isOpen={!!isAddScreenshotDialogOpen}
      setClose={handleClose}
      size="medium"
    >
      <>
        <Stack direction={"row"} justifyContent={"flex-end"}>
          <Typography
            sx={{ opacity: allowedUploadS3ImageFeature ? 1 : 0.3 }}
            variant="body1"
          >
            {translate("switch_upload_type")}
          </Typography>
          <ControlledSwitch<Screenshot>
            color="success"
            disabled={loading || !allowedUploadS3ImageFeature}
            control={screenshotControl}
            name="type"
            value={type !== ScreenshotType.Image}
            checked={type === ScreenshotType.Image}
            onChange={() => {
              setScreenshotValue?.(
                "type",
                type === ScreenshotType.Image
                  ? ScreenshotType.Text
                  : ScreenshotType.Image
              )
              screenshotTrigger?.("type")
            }}
          />
        </Stack>
        <Stack
          sx={{
            display: selectedImages.length > 0 ? "flex" : "none",
            flexDirection: "row",
            overflowX: "auto"
          }}
        >
          {selectedImages
            .map((image) => (
              <Box
                component={"img"}
                key={image.name}
                sx={{
                  width: "150px",
                  height: "150px",
                  objectFit: "fill"
                }}
                src={URL.createObjectURL(image)}
                alt={image.name}
              />
            ))
            .reverse()}
        </Stack>
        {memorizedTypeInput}
      </>
    </DialogProvider>
  )
}
