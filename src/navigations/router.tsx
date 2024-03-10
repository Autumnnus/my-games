import type { RouteObject } from "react-router-dom"
import { createBrowserRouter } from "react-router-dom"

import mainNavigation from "@navigations/main"

const router: RouteObject[] = []

router.push(...mainNavigation)

export default createBrowserRouter(router)
