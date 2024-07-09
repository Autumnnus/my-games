import { Box } from "@mui/material"
import axios, { type AxiosResponse } from "axios"
import { useEffect, useState } from "react"

import { DataTableScreen } from "@pages/main/home/sub_components/data_table_screen"
import { HomeFooter } from "@pages/main/home/sub_components/footer"
import { ScreenshotScreen } from "@pages/main/home/sub_components/screenshot_screen"
import { WelcomeScreen } from "@pages/main/home/sub_components/welcome_screen"
import { useAppContext } from "context/app_context"
import { AxiosErrorMessage } from "types/axios"
import { Screenshot } from "types/screenshot"

export default function HomePage() {
  const { backendUrl } = useAppContext()
  const [image, setImage] = useState<string>()
  const url = `${backendUrl}/api/screenshot/get/random`
  useEffect(() => {
    axios
      .get(url)
      .then((res: AxiosResponse<{ data: Screenshot }>) => {
        setImage(res.data.data.url)
      })
      .catch((error: AxiosErrorMessage) => {
        console.error(error)
        setImage("https://i.imgur.com/Jj1rFT8.png")
      })
  }, [])
  return (
    <Box
      sx={{
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth"
      }}
    >
      <WelcomeScreen image={image || ""} />
      <DataTableScreen />
      <ScreenshotScreen />
      <HomeFooter />
    </Box>
  )
}
