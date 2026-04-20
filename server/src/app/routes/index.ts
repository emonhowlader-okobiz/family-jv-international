import { Router } from "express"
import { AuthRoutes } from "../modules/auth/auth.routes"
import { UserRoutes } from "../modules/user/user.routes"
import { CategoryRoutes } from "../modules/category/category.routes"
import { ProductRoutes } from "../modules/product/product.routes"
import { QuoteRoutes } from "../modules/quote/quote.routes"
import { BannerRoutes } from "../modules/banner/banner.routes"
import { PartnerRoutes } from "../modules/partner/partner.routes"
import { ContentRoutes } from "../modules/content/content.routes"
import { DashboardRoutes } from "../modules/dashboard/dashboard.routes"

export const router = Router()

const moduleRoutes = [
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/users",
        route: UserRoutes
    },
    {
        path: "/categories",
        route: CategoryRoutes
    },
    {
        path: "/products",
        route: ProductRoutes
    },
    {
        path: "/quotes",
        route: QuoteRoutes
    },
    {
        path: "/banners",
        route: BannerRoutes
    },
    {
        path: "/partners",
        route: PartnerRoutes
    },
    {
        path: "/content",
        route: ContentRoutes
    },
    {
        path: "/dashboard",
        route: DashboardRoutes
    },
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})