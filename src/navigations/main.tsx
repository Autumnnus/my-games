import type { RouteObject } from "react-router-dom"

import PageHeader from "@components/page_header"
import MainLayout from "@layouts/main_layout"
import ErrorPage from "@pages/error"
import { GamesPage } from "@pages/main/games"
import HomePage from "@pages/main/home"
import UsersPage from "@pages/main/users"

const mainNavigation: RouteObject[] = [
  {
    path: "/",
    element: (
      <MainLayout HeaderComponent={() => <PageHeader />}>
        <HomePage />
      </MainLayout>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: "/users",
    element: (
      <MainLayout HeaderComponent={() => <PageHeader />}>
        <UsersPage />
      </MainLayout>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: "/games",
    element: (
      <MainLayout HeaderComponent={() => <PageHeader />}>
        <GamesPage />
      </MainLayout>
    ),
    errorElement: <ErrorPage />
  }
]

export default mainNavigation
