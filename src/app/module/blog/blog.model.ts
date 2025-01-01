import { model, Schema } from 'mongoose'
import { IBlog } from './blog.interface'

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, required: true },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
)

export const BlogModel = model<IBlog>('Blogs', BlogSchema)
