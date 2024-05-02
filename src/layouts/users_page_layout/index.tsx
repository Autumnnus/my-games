import Box from "@mui/material/Box"

import PageHeader from "@components/page_header"

export default function UsersPageLayout({
  children,
  ContextProvider
}: {
  children: JSX.Element | JSX.Element[]
  ContextProvider: (props: {
    children: JSX.Element | JSX.Element[]
  }) => JSX.Element
}) {
  return (
    <ContextProvider>
      <PageHeader />
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
        {children}
      </Box>
    </ContextProvider>
  )
}
