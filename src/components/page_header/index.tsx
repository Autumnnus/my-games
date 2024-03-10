import { Box, Container } from "@mui/joy"
import type { SxProps } from "@mui/joy/styles/types"

export default function PageHeader(props: {
  backgroundColor?: "primary" | "secondary"
  sx?: SxProps
  children: JSX.Element | JSX.Element[]
  isLeftPanelOpen?: boolean
}) {
  return (
    <Box>
      <Container>
        <Box
          {...props}
          sx={{
            width: "100%",
            display: "flex",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            ...props?.sx
          }}
        />
      </Container>
    </Box>
  )
}
