import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Switch,
  Typography
} from "@mui/material"
import Stack from "@mui/material/Stack"
import axios, { type AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { useWatch } from "react-hook-form"

import AsyncCreatableInput from "@components/async-creatable-input"
import AutoCompleteInput from "@components/auto_complete"
import DialogProvider from "@components/dialog_provider"
import TextInput from "@components/text_input"
import { TABLE_HEADER_BACKGROUND_COLOR } from "@constants/colors"
import { gameNameLabel } from "@utils/arrays/gameNameLabel"
import { convertUnixTimestamp } from "@utils/functions/convertUnixTimestamp"
import { showErrorToast, showSuccessToast } from "@utils/functions/toast"
import log from "@utils/log"
import { useAppContext } from "context/app_context"
import { useGamesPageContext } from "context/games"
import { AxiosErrorMessage } from "types/axios"
import {
  DialogGameData,
  GamesData,
  IGDBGamesData,
  IGDBGamesResponse
} from "types/games"

type EditGameProps = {
  isEditGameDialogOpen?: boolean
  setIsEditGameDialogOpen?: () => void
}

export default function EditGame({
  isEditGameDialogOpen,
  setIsEditGameDialogOpen
}: EditGameProps) {
  const {
    translate,
    reset,
    handleSubmit,
    control,
    isValid,
    selectedGame,
    isDirty,
    setGames,
    platformSelectOptions,
    statusSelectOptions,
    backendUrl,
    setValue,
    trigger
  } = useGamesPageContext()
  const { token } = useAppContext()
  const imageSrc = useWatch({ control, name: "photo" })
  const [isIGDBAPIOpen, setIsIGDBAPIOpen] = useState(true)
  const [selectedGameData, setSelectedGameData] =
    useState<IGDBGamesData | null>()
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
            playTime: selectedGame.playTime,
            igdb: selectedGame.igdb
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
    setSelectedGameData(null)
  }

  useEffect(() => {
    setValue?.(
      "photo",
      selectedGameData?.cover?.url?.replace("t_thumb", "t_1080p") || ""
    )
    trigger?.("photo")
    setValue?.("igdb", selectedGameData || undefined)
  }, [selectedGameData])

  async function onSubmit(data: DialogGameData) {
    setLoading(true)
    await axios
      .put(`${backendUrl}/api/games/edit/${selectedGame?._id}`, data, {
        headers: {
          Authorization: `Bearer: ${token?.access_token}`
        }
      })
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
              screenshotSize: responseData.screenshotSize,
              igdb: responseData.igdb,
              firstFinished: responseData.firstFinished
            }
          }
          return updatedGames
        })
        handleClose()
        log(`${data.name} is edited: `, data)
      })
      .catch((error: AxiosErrorMessage) => {
        console.error(error)
        showErrorToast("Game couldn't be edited" + error.response?.data.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  async function fetchIGDBGames(search: string) {
    let games: { value: string; label: string; additional: IGDBGamesData }[] =
      []
    await axios
      .get(`${backendUrl}/api/igdb?search=${search}`, {
        headers: {
          Authorization: `Bearer: ${token?.access_token}`
        }
      })
      .then((res: AxiosResponse<{ data: IGDBGamesResponse[] }>) => {
        games = res.data.data
          ?.map((doc) => {
            if (!doc) return undefined
            const { involved_companies, ...rest } = doc
            return {
              value: doc.name,
              label: doc.name,
              additional: {
                ...rest,
                publishers:
                  involved_companies
                    ?.filter((company) => company.publisher === true)
                    ?.map((company) => ({
                      name: company.company.name,
                      id: company.company.id
                    })) || [],
                developers:
                  involved_companies
                    ?.filter((company) => company.developer === true)
                    ?.map((company) => ({
                      name: company.company.name,
                      id: company.company.id
                    })) || []
              }
            }
          })
          .filter(
            (
              doc
            ): doc is {
              value: string
              label: string
              additional: IGDBGamesData
            } => Boolean(doc)
          )
      })
      .catch((error: AxiosErrorMessage) => {
        console.error(error)
        showErrorToast(
          "Game couldn't be added: " + error.response?.data.message
        )
      })
    return {
      options: games.map((game) => ({
        value: game.value,
        label: game.label,
        additional: game.additional
      })),
      hasMore: false
    }
  }

  const gameName = useWatch({ control, name: "name" })

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
        <Box sx={{ display: !isIGDBAPIOpen ? "none" : "block" }}>
          <AsyncCreatableInput<DialogGameData>
            label={translate("game_name")}
            control={control}
            loadOptions={fetchIGDBGames}
            setSelectedGameData={setSelectedGameData}
            name="name"
            defaultValue={{
              value: gameName,
              label: gameName
            }}
            TitleRight={
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {translate("use_igdb_api")}
                </Typography>
                <Switch
                  checked={isIGDBAPIOpen}
                  onChange={(event) => setIsIGDBAPIOpen(event.target.checked)}
                />
              </Stack>
            }
            required
          />
        </Box>
        <Box sx={{ display: isIGDBAPIOpen ? "none" : "block" }}>
          <TextInput<DialogGameData>
            type="text"
            name="name"
            control={control}
            label={translate("game_name")}
            placeholder={gameNameLabel[randomNumber]}
            disabled={loading}
            TitleRight={
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {translate("use_igdb_api")}
                </Typography>
                <Switch
                  checked={isIGDBAPIOpen}
                  onChange={(event) => setIsIGDBAPIOpen(event.target.checked)}
                />
              </Stack>
            }
            required
          />
        </Box>
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
            selectOptions={platformSelectOptions}
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
            selectOptions={statusSelectOptions}
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
        {selectedGameData && (
          <div>
            <Typography textAlign={"center"} variant="body1">
              {selectedGameData.name} {translate("game_details")}
            </Typography>
            <Accordion sx={{ bgcolor: TABLE_HEADER_BACKGROUND_COLOR }}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>{translate("info")}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <AccordionGameDetailSection
                  label={translate("summary")}
                  content={selectedGameData.summary}
                />
                <AccordionGameDetailSection
                  label={translate("release_date")}
                  content={convertUnixTimestamp(
                    selectedGameData.release_dates?.[0].date
                  )}
                />
                {selectedGameData.aggregated_rating && (
                  <AccordionGameDetailSection
                    label={translate("rating")}
                    content={selectedGameData.aggregated_rating?.toFixed(2)}
                  />
                )}
                <AccordionGameDetailSection
                  label={translate("developers")}
                  content={selectedGameData.developers
                    ?.map((item) => item.name)
                    .join(", ")}
                />
                <AccordionGameDetailSection
                  label={translate("publishers")}
                  content={selectedGameData.publishers
                    ?.map((item) => item.name)
                    .join(", ")}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ bgcolor: TABLE_HEADER_BACKGROUND_COLOR }}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>{translate("tags")}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <AccordionTagsSection
                  label={translate("genres")}
                  data={selectedGameData.genres}
                />
                <AccordionTagsSection
                  label={translate("themes")}
                  data={selectedGameData.themes}
                />
                <AccordionTagsSection
                  label={translate("player_perspectives")}
                  data={selectedGameData.player_perspectives}
                />
                <AccordionTagsSection
                  label={translate("game_modes")}
                  data={selectedGameData.game_modes}
                />
              </AccordionDetails>
            </Accordion>
          </div>
        )}
      </Stack>
    </DialogProvider>
  )
}

type AccordionGameDetailSectionProps = {
  label: string
  content: string
}

type AccordionTagsSectionProps = {
  label: string
  data: { name: string }[]
}

const AccordionGameDetailSection = ({
  label,
  content
}: AccordionGameDetailSectionProps) =>
  content ? (
    <Box>
      <Typography component={"span"} sx={{ color: "#ff3030" }}>
        -{label}:
      </Typography>
      <Typography component={"span"} sx={{ marginLeft: 1 }}>
        {content}
      </Typography>
    </Box>
  ) : null

const AccordionTagsSection = ({ label, data }: AccordionTagsSectionProps) =>
  data?.length ? (
    <Box>
      <Typography component={"span"} sx={{ color: "#ff3030" }}>
        -{label}:
      </Typography>
      <Typography component={"span"} sx={{ marginLeft: 1 }}>
        {data.map((item) => item.name).join(", ")}
      </Typography>
    </Box>
  ) : null
