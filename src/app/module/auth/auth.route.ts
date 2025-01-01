import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidation } from '../user/user.zodValidation'
import { AuthControllers } from './auth.controller'
import { AuthValidation } from './auth.zodValidation'

const AuthRouter = Router()

AuthRouter.post(
  '/register',
  validateRequest(UserValidation.UserZodValidationSchema),
  AuthControllers.register,
)
AuthRouter.post(
  '/login',
  validateRequest(AuthValidation.loginZodValidationSchema),
  AuthControllers.login,
)

export default AuthRouter
