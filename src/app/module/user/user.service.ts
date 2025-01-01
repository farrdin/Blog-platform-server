import { IUser } from './user.interface'
import { UserModel } from './user.model'

// create user service
const createUser = async (payload: IUser): Promise<IUser> => {
  const result = await UserModel.create(payload)
  return result
}

// get user service
const getUser = async () => {
  const result = await UserModel.find()
  return result
}

// get single user service
const getSingleUser = async (id: string) => {
  const result = await UserModel.findById(id)
  return result
}

export const userService = {
  createUser,
  getUser,
  getSingleUser,
}
