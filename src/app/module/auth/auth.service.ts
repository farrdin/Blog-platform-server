import config from '../../config'
import { IUser } from '../user/user.interface'
import bcrypt from 'bcrypt'
import { createToken } from './auth.utils'
import { UserModel } from '../user/user.model'
import AppError from '../../errors/appError'
import httpStatus from 'http-status'

const register = async (payload: IUser) => {
  const result = await UserModel.create(payload)

  return {
    _id: result._id,
    name: result.name,
    email: result.email,
  }
}

const login = async (payload: { email: string; password: string }) => {
  const user = await UserModel.findOne({ email: payload?.email }).select(
    '+password',
  )

  // check user
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User is not found !')
  }

  // check user block
  const userStatus = user?.isBlocked
  if (userStatus === true) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User is blocked')
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  )

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Password is not incorrect')
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  }

  //create token
  const token = createToken(
    jwtPayload,
    config.access_secret as string,
    config.access_expires as string,
  )

  return { token, user }
}

export const AuthService = {
  register,
  login,
}
