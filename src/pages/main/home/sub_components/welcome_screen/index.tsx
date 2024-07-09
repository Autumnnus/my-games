import { Stack, Typography } from "@mui/material"

export const WelcomeScreen = ({ image }: { image: string }) => {
  return (
    <Stack
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        scrollSnapAlign: "start",
        overflow: "hidden",
        p: 1
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: "#fff",
          textShadow: "20px 20px 30px #000",
          textAlign: "center",
          fontSize: {
            xs: "3rem",
            md: "4rem"
          }
        }}
      >
        My Games e Hoşgeldiniz
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#fff",
          textShadow: "50px 50px 30px  #000",
          textAlign: "center",
          fontSize: {
            xs: "1rem",
            md: "1.5rem"
          }
        }}
      >
        Tüm kullanıcılar oynadıkları oyunlarının verilerini özgürce tutup
        saklayabildiği istatistik websitedir.
      </Typography>
    </Stack>
  )
}
