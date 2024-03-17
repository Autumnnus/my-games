import { yupResolver } from "@hookform/resolvers/yup"
import Stack from "@mui/material/Stack"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"

import AutoCompleteInput from "@components/auto_complete"
import DialogProvider from "@components/dialog_provider"
import TextInput from "@components/text_input"
import useTranslate from "@hooks/use_translate"
import { gameNameLabel } from "@utils/arrays/gameNameLabel"
import sleep from "@utils/functions/sleep"
import log from "@utils/log"
import { DialogGameData } from "types/games"

export default function AddGame({
  isOpen,
  setClose
}: {
  isOpen?: boolean
  setClose?: () => void
}) {
  const { translate } = useTranslate()
  const randomNumber = Math.floor(Math.random() * gameNameLabel.length)

  const schema = yup
    .object({
      gameName: yup
        .string()
        .required(
          translate("input_is_required", { name: translate("game_name") })
        ),
      gamePhoto: yup.string(),
      gameDate: yup
        .string()
        .required(
          translate("input_is_required", { name: translate("last_play_date") })
        ),
      gamePlatform: yup
        .string()
        .required(
          translate("input_is_required", { name: translate("platform") })
        ),
      gameReview: yup.string(),
      gameScore: yup
        .number()
        .typeError(
          translate("input_is_required", { name: translate("game_total_play") })
        )
        .required(translate("input_is_required", { name: translate("score") })),
      gameStatus: yup
        .string()
        .required(
          translate("input_is_required", { name: translate("game_status") })
        ),
      gameTotalTime: yup
        .number()
        .typeError(
          translate("input_is_required", { name: translate("game_total_play") })
        )
        .required(
          translate("input_is_required", { name: translate("game_total_play") })
        )
    })
    .required()

  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid }
  } = useForm<DialogGameData>({
    resolver: yupResolver(schema),
    mode: "all"
  })

  function handleClose() {
    if (loading) {
      return
    }
    setClose?.()
    reset()
  }

  async function onSubmit(data: DialogGameData) {
    setLoading(true)
    await sleep(3000)
    log(`${data.gameName} is added: `, data)
    setLoading(false)
    handleClose()
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
        onClick: handleSubmit(onSubmit),
        loading: loading,
        disabled: !isValid
      }}
      isOpen={!!isOpen}
      setClose={handleClose}
      size="large"
    >
      <Stack spacing={2}>
        <TextInput<DialogGameData>
          type="text"
          name="gameName"
          control={control}
          label={translate("game_name")}
          placeholder={gameNameLabel[randomNumber]}
          disabled={loading}
          required
        />
        <TextInput<DialogGameData>
          type="text"
          name="gamePhoto"
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
            name="gameTotalTime"
            control={control}
            label={translate("game_total_play")}
            placeholder={"23.5"}
            disabled={loading}
            required
          />
          <AutoCompleteInput<DialogGameData>
            type="text"
            name="gamePlatform"
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
              { label: "EA Games", value: "eAGames" },
              { label: "Ubisoft", value: "ubisoft" },
              { label: "Torrent", value: "torrent" },
              { label: "Playstation", value: "playstation" },
              { label: "Xbox Series", value: "xboxSeries" },
              { label: "Nintendo", value: "nintendo" },
              { label: "Mobile", value: "mobile" },
              {
                label: translate("other_platforms"),
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
            name="gameScore"
            control={control}
            label={translate("score")}
            placeholder={"8.6"}
            disabled={loading}
            required
          />
          <AutoCompleteInput<DialogGameData>
            name="gameStatus"
            control={control}
            label={translate("game_status")}
            placeholder={translate("required_input_placeholder", {
              name: translate("game_status")
            })}
            selectOptions={[
              { label: translate("completed"), value: "completed" },
              { label: translate("abondoned"), value: "abondoned" },
              { label: translate("to_be_completed"), value: "toBeCompleted" },
              { label: translate("active_playing"), value: "activePlaying" }
            ]}
            disabled={loading}
            required
          />
        </Stack>
        <TextInput<DialogGameData>
          type="date"
          name="gameDate"
          control={control}
          label={translate("last_play_date")}
          disabled={loading}
          required
        />
        <TextInput<DialogGameData>
          multiline
          rows={4}
          name="gameReview"
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
