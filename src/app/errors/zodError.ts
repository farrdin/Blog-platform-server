import { ZodError, ZodIssue } from 'zod'
import { TErrorSources, TGenericErrorResponse } from './errorType'

const zodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    }
  })

  const statusCode = 400

  return {
    statusCode,
    message: 'Validation Error from Zod',
    errorSources,
  }
}

export default zodError
