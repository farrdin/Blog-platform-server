import { Types } from 'mongoose'
import { IBlog } from './blog.interface'
import { BlogModel } from './blog.model'
import QueryBuilder from '../../query/queryBuilder'

// create blog service
const createBlog = async (payload: IBlog): Promise<IBlog> => {
  const result = await BlogModel.create(payload)

  const populatedResult = (await BlogModel.findById(result._id).populate(
    'author',
    '_id email role',
  )) as IBlog

  return populatedResult
}

// update blog service
const updateBlog = async (
  blogId: string,
  authorId: string,
  updateData: Partial<IBlog>,
): Promise<IBlog> => {
  // check blog id
  if (!Types.ObjectId.isValid(blogId)) {
    throw new Error('Invalid Blog ID')
  }

  // check author id
  if (!Types.ObjectId.isValid(authorId)) {
    throw new Error('Invalid User ID')
  }

  const result = await BlogModel.findOneAndUpdate(
    { _id: blogId, author: authorId },
    { $set: updateData },
    { new: true },
  ).populate('author', '_id email role')

  if (!result) {
    throw new Error(
      'Blog not found or you are not authorized to update this blog',
    )
  }

  return result
}

// delete blog service
const deleteBlog = async (blogId: string, authorId: string): Promise<void> => {
  if (!Types.ObjectId.isValid(blogId)) {
    throw new Error('Invalid Blog ID')
  }

  const result = await BlogModel.findOneAndDelete({
    _id: blogId,
    author: authorId,
  })

  if (!result) {
    throw new Error('Blog not found or not authorized to delete this blog')
  }
}

// ger blogs with queries
const getBlogs = async (query: Record<string, unknown>) => {
  const searchableFields = ['title', 'content']

  const blogs = new QueryBuilder(BlogModel.find(), query)
    .search(searchableFields)
    .filter()
    .sort()

  const result = await blogs.exec()
  return result
}

export const blogService = {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
}
