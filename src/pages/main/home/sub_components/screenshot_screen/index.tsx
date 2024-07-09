import { Box, Stack, Typography } from "@mui/material"

export const ScreenshotScreen = () => {
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
      <Stack
        sx={{
          width: {
            xs: "100%",
            md: "50%"
          },
          justifyContent: "center",
          gap: 2,
          alignItems: "center",
          p: 1
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: "#fff",
            textAlign: "center",
            fontSize: {
              xs: "2rem",
              md: "3rem"
            }
          }}
        >
          Ekran görüntülerinizi saklayın
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#fff",
            textAlign: "center",
            fontSize: {
              xs: "0.8rem",
              md: "1rem"
            }
          }}
        >
          Steam dışında bir oyun oynayıp ekran görüntülerinizi saklamakta
          sıkıntı mı çekiyorsunuz? Artık bu projede ekran görüntülerinizi her
          oyun için saklayabilirsiniz.
        </Typography>
      </Stack>
    </Stack>
  )
}
