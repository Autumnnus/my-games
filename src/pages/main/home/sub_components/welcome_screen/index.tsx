import { Stack, Typography } from "@mui/material"

import styles from "./styles"

export function WelcomeScreen({ image }: { image: string }) {
  return (
    <Stack sx={styles.container(image)}>
      <Typography variant="h1" sx={styles.heading}>
        My Games e Hoşgeldiniz
      </Typography>
      <Typography variant="body1" sx={styles.body}>
        Tüm kullanıcılar oynadıkları oyunlarının verilerini özgürce tutup
        saklayabildiği istatistik websitedir.
      </Typography>
    </Stack>
  )
}
