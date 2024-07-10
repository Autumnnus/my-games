import { Stack, Typography } from "@mui/material"

import useTranslate from "@hooks/use_translate"

import styles from "./styles"

export function WelcomeScreen({ image }: { image: string }) {
  const { translate } = useTranslate()
  return (
    <Stack sx={styles.container(image)}>
      <Typography variant="h1" sx={styles.heading}>
        {translate("welcome_to_my_games")}
      </Typography>
      <Typography variant="body1" sx={styles.body}>
        {translate("welcome_to_my_games_description")}
      </Typography>
    </Stack>
  )
}
