import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import axios from "axios"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import DialogProvider from "@components/dialog_provider"
import useControlledForm from "@hooks/use_controlled_form"
import { showErrorToast, showSuccessToast } from "@utils/functions/toast"
import log from "@utils/log"
import { useAppContext } from "context/app_context"
import { useGamesPageContext } from "context/games"

type DeleteGameProps = {
  isDeleteGameDialogOpen?: boolean
  setIsDeleteGameDialogOpen?: () => void
}

export default function DeleteGame({
  isDeleteGameDialogOpen,
  setIsDeleteGameDialogOpen
}: DeleteGameProps) {
  const { translate, selectedGame, setGames } = useGamesPageContext()
  const { token } = useAppContext()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname.split("/")[1]
  const {
    formState: { isValid }
  } = useControlledForm({
    mode: "all"
  })

  function handleClose() {
    if (loading) {
      return
    }
    setIsDeleteGameDialogOpen?.()
  }

  async function onSubmit() {
    setLoading(true)
    await axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/games/delete/${selectedGame?._id}`,
        {
          headers: {
            Authorization: `Bearer: ${token?.access_token}`
          }
        }
      )
      .then(() => {
        log(`Game is deleted ${selectedGame?.name}`, selectedGame ?? "")
        showSuccessToast("The Game Edited Successfully")
        setGames?.((prev) =>
          prev.filter((game) => game._id !== selectedGame?._id)
        )
        path === "game" && navigate(`/games/${token?.data.id}`)
        handleClose()
      })
      .catch((error) => {
        console.error(error)
        showErrorToast("Game couldn't be deleted" + (error as Error).message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <DialogProvider
      title={translate("delete_game")}
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
      isOpen={!!isDeleteGameDialogOpen}
      setClose={handleClose}
      size="small"
    >
      <Stack justifyContent={"center"} alignItems={"center"} flex={1}>
        <Typography align="center">{translate("delete_game_text")}</Typography>
      </Stack>
    </DialogProvider>
  )
}
