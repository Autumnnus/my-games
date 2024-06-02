import { Box, Stack, Typography } from "@mui/material"
import { useMemo } from "react"

import PlatformIcon from "@assets/platform_icons"
import { useGameDetailPageContext } from "context/games_detail"
import { GamesData, Platform } from "types/games"

type DetailRowsProps = {
  title: keyof GamesData
  content: GamesData[keyof GamesData]
}

export default function GameDetailRow({ title, content }: DetailRowsProps) {
  const { translate } = useGameDetailPageContext()
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  const stringfied = useMemo(() => String(content), [content])
  const memorizedContent = useMemo(() => {
    if (title === "lastPlay") {
      return new Date(stringfied).toLocaleDateString()
    }
    return capitalizeFirstLetter(stringfied)
  }, [stringfied, title])
  return (
    <Stack direction={"row"} gap={0.5}>
      <Typography>
        <Box component="span" sx={{ fontWeight: "bold", mr: 1 }}>
          {translate(title)}:
        </Box>
        <Box component="span" sx={{ color: "gray" }}>
          {memorizedContent}
          {title === "platform" && (
            <PlatformIcon platform={content as Platform} />
          )}
        </Box>
      </Typography>
    </Stack>
  )
}
