import { Box, Stack, Typography } from "@mui/material"
import axios, { type AxiosResponse } from "axios"
import { useEffect, useState } from "react"

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
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          scrollSnapAlign: "start",
          overflow: "hidden"
        }}
      >
        <Typography
          variant="h1"
          sx={{ color: "#fff", textShadow: "20px 20px 30px #000" }}
        >
          My Games e Hoşgeldiniz
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#fff", textShadow: "50px 50px 30px  #000" }}
        >
          Tüm kullanıcılar oynadıkları oyunlarının verilerini özgürce tutup
          saklayabildiği istatistik websitedir.
        </Typography>
      </Stack>
      <Stack
        sx={{
          height: "100vh",
          direction: "row",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          scrollSnapAlign: "start"
        }}
      >
        <Box sx={{ height: "100vh", backgroundImage: `url(${image})` }}></Box>
        <Box>
          <Typography variant="h1" sx={{ color: "#fff" }}>
            My Games e Hoşgeldiniz
          </Typography>
          <Typography variant="body1" sx={{ color: "#fff" }}>
            Tüm kullanıcılar oynadıkları oyunlarının verilerini özgürce tutup
            saklayabildiği istatistik websitedir.
          </Typography>
        </Box>
      </Stack>
    </Box>
  )
}
