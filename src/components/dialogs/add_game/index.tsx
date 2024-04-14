import Stack from "@mui/material/Stack"
import axios from "axios"
import { useState } from "react"

import AutoCompleteInput from "@components/auto_complete"
import DialogProvider from "@components/dialog_provider"
import TextInput from "@components/text_input"
import { gameNameLabel } from "@utils/arrays/gameNameLabel"
import sleep from "@utils/functions/sleep"
import { showErrorToast, showSuccessToast } from "@utils/functions/toast"
import log from "@utils/log"
import { useAppContext } from "context/app_context"
import { useGamesPageContext } from "context/games"
import { DialogGameData, GamesData } from "types/games"

export default function AddGame() {
  const {
    translate,
    reset,
    handleSubmit,
    isValid,
    control,
    setGames,
    setIsAddGameDialogOpen,
    isAddGameDialogOpen
  } = useGamesPageContext()
  const { token } = useAppContext()

  const [randomNumber, setRandomNumber] = useState<number>(
    Math.floor(Math.random() * gameNameLabel.length)
  )

  const [loading, setLoading] = useState(false)

  function handleClose() {
    if (loading) {
      return
    }
    setIsAddGameDialogOpen?.()
    reset?.()
    setRandomNumber(Math.floor(Math.random() * gameNameLabel.length))
  }

  async function onSubmit(data: DialogGameData) {
    try {
      setLoading(true)
      await sleep(1000)
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/games/addNewGame`, data, {
          headers: {
            Authorization: `Bearer: ${token?.access_token}`
          }
        })
        .then(() => {
          log(`${data.name} is added: `, data)
          reset?.()
          showSuccessToast("Game Added")
        })
      log(`${data.name} is added: `, data)
      showSuccessToast("The Game Added Successfully")
      reset?.()
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/games/user/${token?.data.id}`
      )
      setGames?.((response.data as { data: GamesData[] }).data)
      handleClose()
    } catch (error) {
      console.error(error)
      showErrorToast("Game couldn't be edited" + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogProvider
      title={translate("add_new_game")}
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
        disabled: !isValid
      }}
      isOpen={!!isAddGameDialogOpen}
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
        <TextInput<DialogGameData>
          type="text"
          name="photo"
          control={control}
          label={translate("game_photo_url")}
          placeholder={
            "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg"
          }
          disabled={loading}
        />
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
              { label: "Steam", value: "steam" },
              { label: "Epic Games", value: "epicGames" },
              { label: "Ubisoft", value: "ubisoft" },
              { label: "Xbox(Pc)", value: "xboxPc" },
              { label: "EA Games", value: "eaGames" },
              { label: "Ubisoft", value: "ubisoft" },
              { label: "Torrent", value: "torrent" },
              { label: "Playstation", value: "playstation" },
              { label: "Xbox Series", value: "xboxSeries" },
              { label: "Nintendo", value: "nintendo" },
              { label: "Mobile", value: "mobile" },
              {
                label: translate("otherPlatforms"),
                value: "otherPlatforms"
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
              { label: translate("completed"), value: "completed" },
              { label: translate("abondoned"), value: "abondoned" },
              { label: translate("toBeCompleted"), value: "toBeCompleted" },
              { label: translate("activePlaying"), value: "activePlaying" }
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
