import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { userService } from './user.service'
import httpStatus from 'http-status'

// create user
const createUser = catchAsync(async (req, res) => {
  const payload = req.body

  const result = await userService.createUser(payload)

  sendResponse(res, {
    success: true,
    message: 'User created successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  })
})

// get all user
const getUser = catchAsync(async (req, res) => {
  const result = await userService.getUser()

  sendResponse(res, {
    success: true,
    message: 'Getting all user successfully',
    statusCode: httpStatus.OK,
    data: result,
  })
})

// get single user by id
const getSingleUser = catchAsync(async (req, res) => {
  const result = await userService.getSingleUser(req.params.id)

  sendResponse(res, {
    success: true,
    message: 'Getting all user successfully',
    statusCode: httpStatus.OK,
    data: result,
  })
})

export const UserController = {
  createUser,
  getUser,
  getSingleUser,
}
