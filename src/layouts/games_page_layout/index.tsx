import { Container } from "@mui/material"
import Box from "@mui/material/Box"

export default function GamesPageLayout({
  children,
  HeaderComponent,
  ContextProvider
}: {
  children: JSX.Element | JSX.Element[]
  HeaderComponent: () => JSX.Element
  ContextProvider: (props: {
    children: JSX.Element | JSX.Element[]
  }) => JSX.Element
}) {
  return (
    <ContextProvider>
      <HeaderComponent />
      <Box
        sx={(theme) => ({
          width: "100%",
          overflow: "auto!important",
          flex: 1,
          flexGrow: 1,
          padding: theme.spacing(3),
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
          }),
          marginLeft: 0,
          p: 0
        })}
      >
        <Container>{children}</Container>
      </Box>
    </ContextProvider>
  )
}
