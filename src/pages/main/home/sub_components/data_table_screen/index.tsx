import { Box, Stack, Typography } from "@mui/material"

export const DataTableScreen = () => {
  return (
    <Stack
      sx={{
        height: "100vh",
        flexDirection: "row",
        scrollSnapAlign: "start",
        backgroundImage: {
          xs: "url(https://i.imgur.com/Jj1rFT8.png)",
          md: "url()"
        }
      }}
    >
      <Stack
        sx={{
          width: {
            xs: "100%",
            md: "50%"
          },
          justifyContent: "center",
          gap: 2,
          p: 1,
          alignItems: "center"
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: "#fff",
            fontSize: {
              xs: "2rem",
              md: "3rem"
            },
            textAlign: "center"
          }}
        >
          Oyunlarınızın Verilerini Tutun
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#fff",
            fontSize: {
              xs: "0.8rem",
              md: "1rem"
            },
            textAlign: "center"
          }}
        >
          Oynadığınız tüm oyunlar hakkında detaylıca veri tutabilir ve
          tuttuğunuz verileri tablo halinde görebilir ve sıralayabilirsiniz.
        </Typography>
      </Stack>
      <Box
        sx={{
          height: "100vh",
          backgroundImage: "url(https://i.imgur.com/Jj1rFT8.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "50%",
          display: {
            xs: "none",
            md: "flex"
          },
          p: 1
        }}
      />
    </Stack>
  )
}
