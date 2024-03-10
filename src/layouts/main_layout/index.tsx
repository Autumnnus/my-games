import { Box, Container } from "@mui/joy"

import styles from "./styles"

type MainLayoutProps = {
  children: JSX.Element | JSX.Element[]
  HeaderComponent?: () => JSX.Element
  LeftDrawer?: () => JSX.Element
  RightDrawer?: () => JSX.Element
}

export default function MainLayout({
  children,
  HeaderComponent,
  LeftDrawer,
  RightDrawer
}: MainLayoutProps) {
  return (
    <>
      <Box sx={styles.contextContainer}>
        {LeftDrawer ? <LeftDrawer /> : <></>}
        <Box sx={styles.contentAreaContainer}>
          {HeaderComponent ? <HeaderComponent /> : <></>}
          <Box
            sx={(theme) => ({
              width: "100%",
              overflow: "auto!important",
              flex: 1,
              flexGrow: 1,
              padding: theme.spacing(3),
              // transition: theme.transitions.create("margin", {
              //   easing: theme.transitions.easing.sharp,
              //   duration: theme.transitions.duration.leavingScreen
              // }),
              marginLeft: 0,
              p: 0
            })}
          >
            <Container>{children}</Container>
          </Box>
        </Box>
      </Box>
      {RightDrawer ? <RightDrawer /> : <></>}
    </>
  )
}
