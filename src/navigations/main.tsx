import type { RouteObject } from "react-router-dom"

import MainLayout from "@layouts/main_layout"
import ErrorPage from "@pages/error"
import DashboardPage from "@pages/main/home"
import HomePageHeader from "@pages/main/home/header"

const mainNavigation: RouteObject[] = [
  {
    path: "/",
    element: (
      <MainLayout
        // bgColor="secondary"
        HeaderComponent={HomePageHeader}
        // ContextProvider={DashboardPageContextProvider}
      >
        <DashboardPage />
      </MainLayout>
    ),
    errorElement: <ErrorPage />
  }
]

export default mainNavigation
