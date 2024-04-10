import { Box } from "@mui/material"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"

export default function AuthInputSide({
  children
}: {
  children?: React.ReactNode
}) {
  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {children}
      </Box>
    </Grid>
  )
}
