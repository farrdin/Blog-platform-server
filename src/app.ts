import Express, { Application, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import router from './app/routes'
import cors from 'cors'
import { globalError } from './app/middlewares/globalError'
import notFound from './app/middlewares/notFound'

const app: Application = Express()

//parser
app.use(Express.json())
app.use(cookieParser())
app.use(cors())

// App Api Routes
app.use('/api', router)
app.get('/', (req: Request, res: Response) => {
  res.send('Blog-Platform Server is running!')
})

// Default Handler
app.use(globalError)

//Not Found
app.use(notFound)

export default app
