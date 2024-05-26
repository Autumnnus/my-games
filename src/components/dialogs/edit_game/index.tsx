import { Avatar } from "@mui/material"
import Stack from "@mui/material/Stack"
import axios, { type AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { useWatch } from "react-hook-form"

import AutoCompleteInput from "@components/auto_complete"
import DialogProvider from "@components/dialog_provider"
import TextInput from "@components/text_input"
import { gameNameLabel } from "@utils/arrays/gameNameLabel"
import { showErrorToast, showSuccessToast } from "@utils/functions/toast"
import log from "@utils/log"
import { useAppContext } from "context/app_context"
import { useGamesPageContext } from "context/games"
import { DialogGameData, GamesData, Platform, Status } from "types/games"

export default function EditGame() {
  const {
    translate,
    reset,
    handleSubmit,
    control,
    isValid,
    isEditGameDialogOpen,
    selectedGame,
    setIsEditGameDialogOpen,
    isDirty,
    setGames
  } = useGamesPageContext()
  const { token } = useAppContext()
  const imageSrc = useWatch({ control, name: "photo" })
  const [randomNumber, setRandomNumber] = useState<number>(
    Math.floor(Math.random() * gameNameLabel.length)
  )
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    reset?.(
      selectedGame
        ? {
            name: selectedGame.name,
            photo: selectedGame.photo,
            lastPlay: selectedGame?.lastPlay.split("T")[0],
            platform: selectedGame.platform,
            review: selectedGame.review,
            rating: selectedGame.rating,
            status: selectedGame.status,
            playTime: selectedGame.playTime
          }
        : {}
    )
  }, [reset, selectedGame])
  function handleClose() {
    if (loading) {
      return
    }
    setIsEditGameDialogOpen?.()
    reset?.()
    setRandomNumber(Math.floor(Math.random() * gameNameLabel.length))
  }

  async function onSubmit(data: DialogGameData) {
    setLoading(true)
    await axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/games/editGame/${selectedGame?._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer: ${token?.access_token}`
          }
        }
      )
      .then((res: AxiosResponse<{ data: GamesData }>) => {
        reset?.()
        showSuccessToast(`${data.name} is Edited Successfully`)
        const responseData = res.data.data
        setGames?.((prev) => {
          const updatedGameIndex = prev.findIndex(
            (game) => game._id === responseData._id
          )
          const updatedGames = [...prev]
          if (updatedGameIndex !== -1) {
            updatedGames[updatedGameIndex] = {
              name: responseData.name,
              photo: responseData.photo,
              lastPlay: responseData.lastPlay,
              platform: responseData.platform,
              review: responseData.review,
              rating: responseData.rating,
              status: responseData.status,
              playTime: responseData.playTime,
              _id: responseData._id,
              createdAt: responseData.createdAt,
              userId: responseData.userId,
              screenshots: responseData.screenshots || []
            }
          }
          return updatedGames
        })
        handleClose()
        log(`${data.name} is edited: `, data)
      })
      .catch((error) => {
        console.error(error)
        showErrorToast("Game couldn't be edited" + (error as Error).message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <DialogProvider
      title={translate("edit_game")}
      leftButton={{
        text: translate("cancel"),
        color: "secondary",
        onClick: handleClose,
        disabled: loading
      }}
      rightButton={{
        text: translate("save"),
        color: "primary",
        onClick: handleSubmit?.(onSubmit),
        loading: loading,
        disabled: !isValid || !isDirty
      }}
      isOpen={!!isEditGameDialogOpen}
      setClose={handleClose}
      size="large"
    >
      <Stack spacing={2}>
        <TextInput<DialogGameData>
          type="text"
          name="name"
          control={control}
          label={translate("game_name")}
          placeholder={gameNameLabel[randomNumber]}
          disabled={loading}
          required
        />
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <TextInput<DialogGameData>
            type="text"
            name="photo"
            control={control}
            label={translate("game_photo_url")}
            placeholder={
              "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg"
            }
            TextLeft={
              imageSrc && (
                <Avatar sx={{ width: "40px", height: "40px" }} src={imageSrc} />
              )
            }
            disabled={loading}
          />
        </Stack>
        <Stack direction={"row"} gap={1}>
          <TextInput<DialogGameData>
            type="number"
            name="playTime"
            control={control}
            label={translate("game_play_time")}
            placeholder={"23.5"}
            disabled={loading}
            required
          />
          <AutoCompleteInput<DialogGameData>
            type="text"
            name="platform"
            control={control}
            label={translate("platform")}
            placeholder={translate("required_input_placeholder", {
              name: translate("platform")
            })}
            selectOptions={[
              { label: "Steam", value: Platform.Steam, icon: Platform.Steam },
              {
                label: "Epic Games",
                value: Platform.EpicGames,
                icon: Platform.EpicGames
              },
              {
                label: "Ubisoft",
                value: Platform.Ubisoft,
                icon: Platform.Ubisoft
              },
              {
                label: "Xbox(Pc)",
                value: Platform.XboxPc,
                icon: Platform.XboxPc
              },
              {
                label: "EA Games",
                value: Platform.EaGames,
                icon: Platform.EaGames
              },
              {
                label: "Ubisoft",
                value: Platform.Ubisoft,
                icon: Platform.Ubisoft
              },
              {
                label: "Torrent",
                value: Platform.Torrent,
                icon: Platform.Torrent
              },
              {
                label: "Playstation",
                value: Platform.Playstation,
                icon: Platform.Playstation
              },
              {
                label: "Xbox Series",
                value: Platform.XboxSeries,
                icon: Platform.XboxSeries
              },
              {
                label: "Nintendo",
                value: Platform.XboxSeries,
                icon: Platform.XboxSeries
              },
              {
                label: "Mobile",
                value: Platform.Mobile,
                icon: Platform.Mobile
              },
              {
                label: translate("otherPlatforms"),
                value: Platform.OtherPlatforms,
                icon: Platform.OtherPlatforms
              }
            ]}
            disabled={loading}
            required
          />
        </Stack>
        <Stack direction={"row"} gap={1}>
          <TextInput<DialogGameData>
            type="number"
            name="rating"
            control={control}
            label={translate("rating")}
            placeholder={"8.6"}
            disabled={loading}
          />
          <AutoCompleteInput<DialogGameData>
            name="status"
            control={control}
            label={translate("game_status")}
            placeholder={translate("required_input_placeholder", {
              name: translate("game_status")
            })}
            selectOptions={[
              { label: translate("completed"), value: Status.Completed },
              { label: translate("abondoned"), value: Status.Abandoned },
              {
                label: translate("toBeCompleted"),
                value: Status.ToBeCompleted
              },
              { label: translate("activePlaying"), value: Status.ActivePlaying }
            ]}
            disabled={loading}
            required
          />
        </Stack>
        <TextInput<DialogGameData>
          type="date"
          name="lastPlay"
          control={control}
          label={translate("last_play_date")}
          disabled={loading}
          required
        />
        <TextInput<DialogGameData>
          multiline
          rows={4}
          name="review"
          control={control}
          label={translate("game_review")}
          placeholder={translate("optional_input_placeholder", {
            name: translate("game_review")
          })}
          disabled={loading}
        />
      </Stack>
    </DialogProvider>
  )
}
