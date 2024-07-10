import { Box, Stack, Typography } from "@mui/material"

import styles from "./styles"

type HomeScreenLayoutProps = {
  image: string
  heading: string
  body: string
  imagePosition?: "left" | "right"
}

export function HomeScreenLayout({
  image,
  heading,
  body,
  imagePosition = "left"
}: HomeScreenLayoutProps) {
  return (
    <Stack sx={styles.container(imagePosition, image)}>
      <Box sx={styles.imageBox(image)} />
      <Stack sx={styles.textContainer}>
        <Typography variant="h1" sx={styles.heading}>
          {heading}
        </Typography>
        <Typography variant="body1" sx={styles.body}>
          {body}
        </Typography>
      </Stack>
    </Stack>
  )
}
