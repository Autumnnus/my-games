import { Box } from "@mui/material"
import type { RouteObject } from "react-router-dom"

import PageHeader from "@components/page_header"
import AuthNavigationLayout from "@layouts/auth_navigation_layout"
import AuthPageLayout from "@layouts/auth_page_layout"
import GamesNavigationLayout from "@layouts/games_navigation_layout"
import GamesPageLayout from "@layouts/games_page_layout"
import UsersNavigationLayout from "@layouts/users_navigation_layout"
import UsersPageLayout from "@layouts/users_page_layout"
import ErrorPage from "@pages/error"
import AuthLoginPage from "@pages/main/auth/login"
import AuthSignUp from "@pages/main/auth/signup"
import GamesPage from "@pages/main/games"
import UsersPage from "@pages/main/users"
import { AuthLoginPageContextProvider } from "context/auth/login"
import { AuthSignUpPageContextProvider } from "context/auth/signup"
import { GamesPageContextProvider } from "context/games"
import { UsersPageContextProvider } from "context/users"

const mainNavigation: RouteObject[] = [
  {
    path: "/",
    element: <AuthNavigationLayout />,
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
        path: "auth/login",
        element: (
          <AuthPageLayout
            HeaderComponent={() => <PageHeader />}
            ContextProvider={AuthLoginPageContextProvider}
          >
            <AuthLoginPage />
          </AuthPageLayout>
        )
      },
      {
        path: "auth/signup",
        element: (
          <AuthPageLayout
            HeaderComponent={() => <PageHeader />}
            ContextProvider={AuthSignUpPageContextProvider}
          >
            <AuthSignUp />
          </AuthPageLayout>
        )
      }
    ]
  },
  {
    path: "/",
    element: <UsersNavigationLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "users",
        element: (
          <UsersPageLayout
            HeaderComponent={() => <PageHeader />}
            ContextProvider={UsersPageContextProvider}
          >
            <UsersPage />
          </UsersPageLayout>
        ),
        errorElement: <ErrorPage />
      }
    ]
  },
  {
    path: "/",
    element: <GamesNavigationLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "games/:id",
        element: (
          <GamesPageLayout
            HeaderComponent={() => <PageHeader />}
            ContextProvider={GamesPageContextProvider}
          >
            <GamesPage />
          </GamesPageLayout>
        )
      }
    ]
  }
]

export default mainNavigation
