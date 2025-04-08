/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'

export const globalError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    statusCode,
    error: err,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  })
}
