import { Stack } from "@mui/joy"

export default function PageHeader({
  children
}: {
  children: JSX.Element | JSX.Element[]
}) {
  return (
    <Stack
      alignItems={"center"}
      direction={"row"}
      flexGrow={1}
      p={2}
      sx={{
        minWidth: "min-content",
        backgroundColor: "gray"
      }}
    >
      {children}
    </Stack>
  )
}
