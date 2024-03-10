import { Stack, Typography } from "@mui/joy"

import PageHeader from "@components/page_header"

import styles from "./styles"

export default function HomePageHeader() {
  return (
    <PageHeader sx={styles.content}>
      <Stack direction={"row"} alignItems={"center"} columnGap={1}>
        <Typography>asda</Typography>
      </Stack>
    </PageHeader>
  )
}
