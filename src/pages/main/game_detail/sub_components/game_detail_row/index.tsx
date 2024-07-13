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
  const stringfied = useMemo(() => {
    if (!content) {
      return ""
    }
    return String(content)
  }, [content])
  const memorizedContent = useMemo(() => {
    if (title === "lastPlay") {
      return (
        <Box component="span" sx={{ color: "gray" }}>
          {new Date(stringfied).toLocaleDateString()}
        </Box>
      )
    }
    if (title === "rating") {
      return (
        <>
          {!content ? (
            <Box component="span" sx={{ color: "gray" }}>
              {translate("not_rated")}
            </Box>
          ) : (
            <Box component="span" sx={{ color: "gray" }}>
              {stringfied}/10
            </Box>
          )}
        </>
      )
    }
    if (title === "platform") {
      return (
        <Box
          component="span"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            color: "gray",
            gap: 1
          }}
        >
          {translate(stringfied)}
          <PlatformIcon platform={content as Platform} />
        </Box>
      )
    }
    return (
      <Box component="span" sx={{ color: "gray" }}>
        {capitalizeFirstLetter(stringfied)}
      </Box>
    )
  }, [content, stringfied, title, translate])
  return (
    <Stack direction={"row"} gap={0.5}>
      <Typography>
        <Box component="span" sx={{ fontWeight: "bold", mr: 1 }}>
          {translate(title)}:
        </Box>
        {memorizedContent}
      </Typography>
    </Stack>
  )
}
