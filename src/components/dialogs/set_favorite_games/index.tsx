import Stack from "@mui/material/Stack"
import axios, { type AxiosResponse } from "axios"
import { useState } from "react"
import { useParams } from "react-router-dom"

import AsyncCreatableInput from "@components/async-creatable-input"
import DialogProvider from "@components/dialog_provider"
import { showErrorToast, showSuccessToast } from "@utils/functions/toast"
import { useProfilePageContext } from "context/profile"
import { AxiosErrorMessage } from "types/axios"
import {
  FavoriteGamesData,
  FavoriteGamesDialogData,
  GamesData
} from "types/games"

export default function SetFavoriteGames() {
  const {
    translate,
    reset,
    handleSubmit,
    isValid,
    control,
    backendUrl,
    token,
    setFavoriteGames,
    isFavoriteGamesDialogOpen,
    setIsFavoriteGamesDialogOpen
  } = useProfilePageContext()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  function handleClose() {
    if (loading) {
      return
    }
    setIsFavoriteGamesDialogOpen?.()
    reset?.()
  }

  async function onSubmit(data: FavoriteGamesDialogData) {
    setLoading(true)
    await axios
      .post(`${backendUrl}/api/games/setFavoriteGames`, data, {
        headers: {
          Authorization: `Bearer: ${token?.access_token}`
        }
      })
      .then((res: AxiosResponse<{ data: FavoriteGamesData[] }>) => {
        reset?.()
        showSuccessToast("Favorite games added")
        setFavoriteGames?.(res.data.data)
        handleClose()
      })
      .catch((error: AxiosErrorMessage) => {
        console.error(error)
        showErrorToast(
          "Game couldn't be added: " + error.response?.data.message
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }

  async function fetchUserGames(search: string) {
    let games: {
      value: string
      label: string
    }[] = []
    await axios
      .get(`${backendUrl}/api/games/user/${id}?search=${search}`, {
        headers: {
          Authorization: `Bearer: ${token?.access_token}`
        }
      })
      .then((res: AxiosResponse<{ data: GamesData[] }>) => {
        games = res.data.data
          ?.map((doc) => {
            if (!doc) return undefined
            return {
              value: doc._id,
              label: doc.name
            }
          })
          .filter(
            (
              doc
            ): doc is {
              value: string
              label: string
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
        label: game.label
      })),
      hasMore: false
    }
  }

  return (
    <DialogProvider
      title={translate("set_favorite_games")}
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
      isOpen={!!isFavoriteGamesDialogOpen}
      setClose={handleClose}
      size="large"
    >
      <Stack spacing={2}>
        <AsyncCreatableInput<FavoriteGamesDialogData>
          label={translate("first_game")}
          control={control}
          loadOptions={fetchUserGames}
          name="first_game"
          required
        />
        <AsyncCreatableInput<FavoriteGamesDialogData>
          label={translate("second_game")}
          control={control}
          loadOptions={fetchUserGames}
          name="second_game"
          required
        />
        <AsyncCreatableInput<FavoriteGamesDialogData>
          label={translate("third_game")}
          control={control}
          loadOptions={fetchUserGames}
          name="third_game"
          required
        />
      </Stack>
    </DialogProvider>
  )
}
