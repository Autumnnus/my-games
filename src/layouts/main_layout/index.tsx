import { Box } from "@mui/material"

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
      {/* <Box>
        {HeaderComponent ? <HeaderComponent /> : <></>}
        <Stack direction={"row"} alignItems={"center"} columnGap={1}>
          {children}
        </Stack>
      </Box>
      {RightDrawer ? <RightDrawer /> : <></>} */}
      <Box>
        {LeftDrawer ? <LeftDrawer /> : <></>}
        {HeaderComponent ? <HeaderComponent /> : <></>}
        <Box>
          <Box>{children}</Box>
        </Box>
      </Box>
      {RightDrawer ? <RightDrawer /> : <></>}
    </>
  )
}
