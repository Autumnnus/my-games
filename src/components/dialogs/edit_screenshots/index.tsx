import { Avatar, Stack, Typography } from "@mui/material"
import axios, { type AxiosResponse } from "axios"
import { useCallback, useEffect, useMemo, useState } from "react"
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

export default function EditScreenShot() {
  const {
    translate,
    setScreenShots,
    screenshotControl,
    screenshotHandleSubmit,
    screenshotIsValid,
    screenshotReset,
    isEditScreenshotDialogOpen,
    setIsEditScreenshotDialogOpen,
    selectedSS,
    setScreenshotValue,
    screenshotTrigger,
    backendUrl
  } = useGameDetailPageContext()
  const { token } = useAppContext()
  const { id } = useParams()
  const type = useWatch({ control: screenshotControl, name: "type" })
  const url = useWatch({ control: screenshotControl, name: "url" })
  const allowedUploadS3ImageFeature = useMemo(
    () => token?.role === "admin" || token?.role === "vip",
    [token?.role]
  )

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    screenshotReset?.({
      name: selectedSS?.name,
      url: selectedSS?.url,
      type: selectedSS?.type
    })
  }, [screenshotReset, selectedSS])

  function handleClose() {
    if (loading) {
      return
    }
    setIsEditScreenshotDialogOpen?.()
    screenshotReset?.()
  }
  async function onSubmit(data: Screenshot) {
    setLoading(true)
    const requestData = {
      name: data.name,
      url: data.url,
      type: ScreenshotType.Text
    }
    const url = `${backendUrl}/api/screenshot/edit/${id}/${selectedSS?._id}`
    if (type === ScreenshotType.Image) {
      const formData = new FormData()
      selectedImage ? formData.append("file", selectedImage) : undefined
      formData.append("type", ScreenshotType.Image)
      formData.append("name", data.name)
      axios
        .put(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer: ${token?.access_token}`
          }
        })
        .then((res: AxiosResponse<{ data: Screenshot }>) => {
          log(`${data.url} is added: `, data)
          screenshotReset?.()
          showSuccessToast("Screenshot is added")
          const responseData = res.data.data
          setScreenShots?.((prev) => {
            const updatedScreenshots = prev.map((game) => {
              if (game._id === responseData._id) {
                return {
                  _id: responseData._id,
                  name: responseData.name,
                  url: responseData.url,
                  type: responseData.type,
                  images: responseData.images,
                  game: responseData.game,
                  createdAt: responseData.createdAt,
                  updatedAt: responseData.updatedAt,
                  user: responseData.user,
                  key: responseData.key
                }
              }
              return game
            })
            return updatedScreenshots
          })
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
    } else if (type === ScreenshotType.Text && data.url) {
      await axios
        .put(url, requestData, {
          headers: {
            Authorization: `Bearer: ${token?.access_token}`
          }
        })
        .then((res: AxiosResponse<{ data: Screenshot }>) => {
          log(`${data.url} is added: `, data)
          screenshotReset?.()
          showSuccessToast("Screenshot is added")
          const responseData = res.data.data
          setScreenShots?.((prev) => {
            const updatedScreenshots = prev.map((game) => {
              if (game._id === responseData._id) {
                return {
                  _id: responseData._id,
                  name: responseData.name,
                  url: responseData.url,
                  type: responseData.type,
                  images: responseData.images,
                  game: responseData.game,
                  createdAt: responseData.createdAt,
                  updatedAt: responseData.updatedAt,
                  user: responseData.user,
                  key: responseData.key
                }
              }
              return game
            })
            return updatedScreenshots
          })
          handleClose()
        })
        .catch((error: AxiosErrorMessage) => {
          console.error(error)
          showErrorToast(
            "Screenshot couldn't be edited" + error.response?.data.message
          )
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      showErrorToast("Please fill the required fields")
      setLoading(false)
    }
  }

  const [selectedImage, setSelectedImage] = useState<File>({} as File)
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || [])
      setSelectedImage(files[0])
      setScreenshotValue?.("images", files)
      screenshotTrigger?.("images")
    },
    [screenshotTrigger, setScreenshotValue]
  )

  const memorizedTypeInput = useMemo(() => {
    if (type === ScreenshotType.Image) {
      return (
        <input
          type="file"
          disabled={loading}
          accept="image/*"
          onChange={handleFileChange}
        />
      )
    } else {
      return (
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
      )
    }
  }, [type, loading, handleFileChange, screenshotControl, translate, url])

  return (
    <DialogProvider
      title={translate("edit_screenshot")}
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
      isOpen={!!isEditScreenshotDialogOpen}
      setClose={handleClose}
      size="large"
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
        <TextInput<Screenshot>
          type="text"
          name="name"
          control={screenshotControl}
          label={translate("screenshot_name")}
          placeholder={translate("screenshot_name")}
          disabled={loading}
        />
        {memorizedTypeInput}
      </>
    </DialogProvider>
  )
}
