import mongoose from 'mongoose'
import config from './app/config'
import app from './app'
import { Server } from 'http'

let server: Server
async function main() {
  try {
    await mongoose.connect(config.mongouri as string)
    server = app.listen(config.port, () => {
      console.log(`Blog-Portal app Running on port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}
main()

process.on('unhandledRejection', () => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`)
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})
process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`)
  process.exit(1)
})