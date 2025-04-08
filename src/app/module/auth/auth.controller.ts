import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AuthService } from './auth.service'

const register = catchAsync(async (req, res) => {
  const result = await AuthService.register(req.body)

  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  })
})

const login = catchAsync(async (req, res) => {
  const result = await AuthService.login(req.body)

  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: httpStatus.OK,
    data: {
      token: result?.token,
    },
  })
})

export const AuthControllers = {
  register,
  login,
}
