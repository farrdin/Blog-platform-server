import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { adminService } from './admin.service'
import httpStatus from 'http-status'

// block user controller
const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params
  await adminService.blockUser(userId)

  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: httpStatus.OK,
    data: undefined,
  })
})

// delete blog controller
const deleteBlog = catchAsync(async (req, res) => {
  await adminService.deleteBlog(req.params.id)

  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: httpStatus.OK,
    data: undefined,
  })
})

export const adminController = {
  blockUser,
  deleteBlog,
}
