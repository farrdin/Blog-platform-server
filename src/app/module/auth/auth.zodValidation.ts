import { z } from 'zod'

const loginZodValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email must be provided and must be a string',
      })
      .email(),
    password: z.string({ required_error: 'Password is required' }),
  }),
})

export const AuthValidation = {
  loginZodValidationSchema,
}
