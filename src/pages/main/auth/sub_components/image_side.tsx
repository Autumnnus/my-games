import Grid from "@mui/material/Grid"
import axios, { type AxiosResponse } from "axios"
import { useEffect, useState } from "react"

import { showErrorToast } from "@utils/functions/toast"
import { AxiosErrorMessage } from "types/axios"
import { Screenshot } from "types/screenshot"

const url = `${process.env.REACT_APP_API_URL}/api/screenshot/get/random`
export default function AuthImageSide() {
  const [image, setImage] = useState<string>()
  useEffect(() => {
    axios
      .get(url)
      .then((res: AxiosResponse<{ data: Screenshot }>) => {
        setImage(res.data.data.url)
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
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundColor: (t) =>
          t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    />
  )
}
