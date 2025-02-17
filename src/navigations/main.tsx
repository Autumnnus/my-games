import type { RouteObject } from "react-router-dom"

import AuthNavigationLayout from "@layouts/auth_navigation_layout"
import AuthPageLayout from "@layouts/auth_page_layout"
import GamesNavigationLayout from "@layouts/games_navigation_layout"
import GamesPageLayout from "@layouts/games_page_layout"
import HomePageLayout from "@layouts/home_page_layout"
import ProfilePageLayout from "@layouts/profile_page_layout"
import StatisticsNavigationLayout from "@layouts/statistics_navigation_layout"
import StatiscitsPageLayout from "@layouts/statistics_page_layout"
import UsersNavigationLayout from "@layouts/users_navigation_layout"
import UsersPageLayout from "@layouts/users_page_layout"
import ErrorPage from "@pages/error"
import AuthForgotPasswordPage from "@pages/main/auth/forgot_password"
import AuthLoginPage from "@pages/main/auth/login"
import AuthResetPasswordPage from "@pages/main/auth/reset_password"
import AuthSignUp from "@pages/main/auth/signup"
import GameDetailPage from "@pages/main/game_detail"
import GamesPage from "@pages/main/games"
import HomePage from "@pages/main/home"
import ProfilePage from "@pages/main/profile"
import StatisticsPage from "@pages/main/statistics"
import UsersPage from "@pages/main/users"
import { AuthForgotPasswordPageContextProvider } from "context/auth/forgot_password"
import { AuthLoginPageContextProvider } from "context/auth/login"
import { AuthResetPasswordPageContextProvider } from "context/auth/reset_password"
import { AuthSignUpPageContextProvider } from "context/auth/signup"
import { GamesPageContextProvider } from "context/games"
import { GameDetailPageContextProvider } from "context/games_detail"
import { ProfilePageContextProvider } from "context/profile"
import { StatisticsPageContextProvider } from "context/statistics"
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
          <HomePageLayout>
            <HomePage />
          </HomePageLayout>
        )
      },
      {
        path: "auth/login",
        element: (
          <AuthPageLayout ContextProvider={AuthLoginPageContextProvider}>
            <AuthLoginPage />
          </AuthPageLayout>
        )
      },
      {
        path: "auth/forgotPassword",
        element: (
          <AuthPageLayout
            ContextProvider={AuthForgotPasswordPageContextProvider}
          >
            <AuthForgotPasswordPage />
          </AuthPageLayout>
        )
      },
      {
        path: "auth/resetPassword",
        element: (
          <AuthPageLayout
            ContextProvider={AuthResetPasswordPageContextProvider}
          >
            <AuthResetPasswordPage />
          </AuthPageLayout>
        )
      },
      {
        path: "auth/signup",
        element: (
          <AuthPageLayout ContextProvider={AuthSignUpPageContextProvider}>
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
          <UsersPageLayout ContextProvider={UsersPageContextProvider}>
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
          <GamesPageLayout ContextProvider={GamesPageContextProvider}>
            <GamesPage />
          </GamesPageLayout>
        )
      },
      {
        path: "game/:id",
        element: (
          <GamesPageLayout ContextProvider={GameDetailPageContextProvider}>
            <GameDetailPage />
          </GamesPageLayout>
        )
      }
    ]
  },
  {
    path: "/",
    element: <StatisticsNavigationLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "statistics",
        element: (
          <StatiscitsPageLayout ContextProvider={StatisticsPageContextProvider}>
            <StatisticsPage />
          </StatiscitsPageLayout>
        )
      }
    ]
  },
  {
    path: "/",
    element: <GamesNavigationLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "profile/:id",
        element: (
          <ProfilePageLayout ContextProvider={ProfilePageContextProvider}>
            <ProfilePage />
          </ProfilePageLayout>
        )
      }
    ]
  }
]

export default mainNavigation
