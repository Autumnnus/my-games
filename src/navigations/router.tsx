import type { RouteObject } from "react-router-dom"
import { createBrowserRouter } from "react-router-dom"

import gamesNavigation from "@navigations/games"

const router: RouteObject[] = []

router.push(...gamesNavigation)

export default createBrowserRouter(router)
