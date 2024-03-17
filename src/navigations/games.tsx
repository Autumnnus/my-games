import { Box } from "@mui/material"
import type { RouteObject } from "react-router-dom"

import PageHeader from "@components/page_header"
import GamesNavigationLayout from "@layouts/games_navigation_layout"
import GamesPageLayout from "@layouts/games_page_layout"
import ErrorPage from "@pages/error"
import GamesPage from "@pages/main/games"
import { GamesPageContextProvider } from "context/games"

const gamesNavigation: RouteObject[] = [
  {
    path: "/",
    element: <GamesNavigationLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <GamesPageLayout
            HeaderComponent={() => <PageHeader />}
            ContextProvider={GamesPageContextProvider}
          >
            <Box />
          </GamesPageLayout>
        )
      },
      {
        path: "games",
        element: (
          <GamesPageLayout
            HeaderComponent={() => <PageHeader />}
            ContextProvider={GamesPageContextProvider}
          >
            <GamesPage />
          </GamesPageLayout>
        )
      },
      {
        path: "users",
        element: (
          <GamesPageLayout
            HeaderComponent={() => <PageHeader />}
            ContextProvider={GamesPageContextProvider}
          >
            <Box />
          </GamesPageLayout>
        )
      }
    ]
  }
]

export default gamesNavigation
