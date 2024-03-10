import type { RouteObject } from "react-router-dom"

import MainLayout from "@layouts/main_layout"
import ErrorPage from "@pages/error"
import { GamesPage } from "@pages/main/games"
import HomePage from "@pages/main/home"
import HomePageHeader from "@pages/main/home/header"

const mainNavigation: RouteObject[] = [
  {
    path: "/",
    element: (
      <MainLayout HeaderComponent={HomePageHeader}>
        <HomePage />
      </MainLayout>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: "/users",
    element: (
      <MainLayout HeaderComponent={HomePageHeader}>
        <GamesPage />
      </MainLayout>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: "/games",
    element: (
      <MainLayout HeaderComponent={HomePageHeader}>
        <GamesPage />
      </MainLayout>
    ),
    errorElement: <ErrorPage />
  }
]

export default mainNavigation
