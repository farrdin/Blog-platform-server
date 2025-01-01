import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { TUserRole } from '../module/user/user.interface'
import catchAsync from '../utils/catchAsync'
import config from '../config'
import { UserModel } from '../module/user/user.model'

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Invalid token format or missing token')
    }

    const token = authHeader.split(' ')[1]

    const decoded = jwt.verify(
      token,
      config.access_secret as string,
    ) as JwtPayload

    const { email, role } = decoded

    const user = await UserModel.findOne({ email })

    if (!user) {
      throw new Error('User is not found')
    }

    const userStatus = user?.isBlocked

    if (userStatus === true) {
      throw new Error('User is blocked')
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new Error('You are not authorized')
    }

    req.user = {
      _id: user._id,
      email: user.email,
      role: user.role,
    }
    next()
  })
}

export default auth
