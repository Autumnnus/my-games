import { Box, CircularProgress } from "@mui/material"
import { useMemo } from "react"

type LoadingScreenProps = {
  loading: boolean
  children: React.ReactNode
  size?: number
}

export default function LoadingScreen({
  loading,
  children,
  size
}: LoadingScreenProps) {
  const MemorizedComponent = useMemo(() => {
    if (loading) {
      return (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <CircularProgress size={size} />
        </Box>
      )
    }
    return <>{children}</>
  }, [loading, children])
  return <Box sx={{ height: "100%" }}>{MemorizedComponent}</Box>
}
