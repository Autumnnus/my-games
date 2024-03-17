import { Box } from "@mui/material"
import type { RouteObject } from "react-router-dom"

import PageHeader from "@components/page_header"
import GamesNavigationLayout from "@layouts/games_navigation_layout"
import GamesPageLayout from "@layouts/games_page_layout"
import UsersPageLayout from "@layouts/users_page_layout"
import ErrorPage from "@pages/error"
import GamesPage from "@pages/main/games"
import UsersPage from "@pages/main/users"
import { GamesPageContextProvider } from "context/games"
import { UsersPageContextProvider } from "context/users"

const mainNavigation: RouteObject[] = [
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
          <UsersPageLayout
            HeaderComponent={() => <PageHeader />}
            ContextProvider={UsersPageContextProvider}
          >
            <UsersPage />
          </UsersPageLayout>
        )
      }
    ]
  }
]

export default mainNavigation
