import { BlogModel } from "../blog/blog.model"
import { UserModel } from "../user/user.model"


// block user service
const blockUser = async (userId: string) => {
  const user = await UserModel.findById(userId)
  if (!user) {
    throw new Error('User not found')
  }

  const result = await UserModel.findByIdAndUpdate(userId, { isBlocked: true })
  return result
}

// delete blog service
const deleteBlog = async (id: string) => {
  const result = BlogModel.findByIdAndDelete(id)
  return result
}

export const adminService = {
  blockUser,
  deleteBlog,
}
