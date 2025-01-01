import { Router } from 'express'
import { UserRoutes } from '../module/user/user.route'
import AuthRouter from '../module/auth/auth.route'
import blogRouter from '../module/blog/blog.route'
import adminRouter from '../module/admin/admin.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/admin',
    route: adminRouter,
  },
  {
    path: '/blogs',
    route: blogRouter,
  },
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
