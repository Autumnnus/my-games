import Grid from "@mui/material/Grid"
import axios, { type AxiosResponse } from "axios"
import { useEffect, useState } from "react"

import { showErrorToast } from "@utils/functions/toast"
import { useAppContext } from "context/app_context"
import { AxiosErrorMessage } from "types/axios"
import { Screenshot } from "types/screenshot"

import styles from "./styles"

export default function AuthImageSide() {
  const { backendUrl } = useAppContext()
  const [image, setImage] = useState<string>()
  const url = `${backendUrl}/api/screenshot/get/random/1`
  useEffect(() => {
    axios
      .get(url)
      .then((res: AxiosResponse<{ data: Screenshot[] }>) => {
        setImage(res.data.data[0].url)
      })
      .catch((error: AxiosErrorMessage) => {
        console.error(error)
        showErrorToast(
          "Database Fetching Error: " + error.response?.data.message
        )
      })
  }, [])
  return (
    <Grid
      item
      xs={false}
      sm={4}
      md={7}
      sx={{
        ...styles.imageSideContainer(image),
        backgroundColor: (t) =>
          t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]
      }}
    />
  )
}
