import Box from "@mui/material/Box"

import PageHeader from "@components/page_header"

export default function HomePageLayout({
  children
}: {
  children: JSX.Element | JSX.Element[]
}) {
  return (
    <>
      <PageHeader />
      <Box
        sx={(theme) => ({
          width: "100%",
          flex: 1,
          flexGrow: 1,
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
          }),
          marginLeft: 0,
          p: 0
        })}
      >
        {children}
      </Box>
    </>
  )
}
