import { model, Schema } from 'mongoose'
import { IUser } from './user.interface'
import config from '../../config'
import bcrypt from 'bcrypt'

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is Required'],
    },
    email: {
      type: String,
      required: [true, 'Email is Required'],
      lowercase: true,
      validate: {
        validator: function (email: string) {
          return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)
        },
        message: '{email} is not a valid email',
      },
      unique: true,
      immutable: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: '{VALUE} is not valid, please provide a valid role',
      },
      default: 'user',
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this

  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt))
  next()
})

UserSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

export const UserModel = model<IUser>('Users', UserSchema)
