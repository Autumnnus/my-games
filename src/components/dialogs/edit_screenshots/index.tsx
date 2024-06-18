import axios, { type AxiosResponse } from "axios"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useWatch } from "react-hook-form"
import { useParams } from "react-router-dom"

import DialogProvider from "@components/dialog_provider"
import TextInput from "@components/text_input"
import { showErrorToast, showSuccessToast } from "@utils/functions/toast"
import log from "@utils/log"
import { useAppContext } from "context/app_context"
import { useGameDetailPageContext } from "context/games_detail"
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
    screenshotTrigger
  } = useGameDetailPageContext()
  const { token } = useAppContext()
  const { id } = useParams()
  const type = useWatch({ control: screenshotControl, name: "type" })

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    screenshotReset?.({
      name: selectedSS?.name,
      url: selectedSS?.url
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
      url: data.url
    }
    await axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/games/${id}/editSS/${selectedSS?._id}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer: ${token?.access_token}`
          }
        }
      )
      .then((res: AxiosResponse<{ data: Screenshot }>) => {
        log(`${data.url} is added: `, data)
        screenshotReset?.()
        showSuccessToast("Screenshot is added")
        const responseData = res.data.data
        setScreenShots?.((prev) => {
          const updatedScreenshotIndex = prev.findIndex(
            (game) => game._id === responseData._id
          )
          const updateScreenshot = [...prev]
          if (updatedScreenshotIndex !== -1) {
            updateScreenshot[updatedScreenshotIndex] = {
              _id: responseData._id,
              name: responseData.name,
              url: responseData.url,
              type: responseData.type,
              images: responseData.images
            }
          }
          return updateScreenshot
        })
        handleClose()
      })
      .catch((error) => {
        console.error(error)
        showErrorToast(
          "Screenshot couldn't be edited" + (error as Error).message
        )
      })
      .finally(() => {
        setLoading(false)
      })
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

  console.log(selectedImages)
  const memorizedTypeInput = useMemo(() => {
    if (type === ScreenshotType.Image) {
      return (
        <input
          type="file"
          multiple
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
          required
          disabled={loading}
        />
      )
    }
  }, [type, handleFileChange, screenshotControl, translate, loading])

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
