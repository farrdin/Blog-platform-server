import Express, { Application, Request, Response } from 'express'
import cors from 'cors'

const app: Application = Express()

//parser
app.use(Express.json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('Blog-Platform Server is running!')
})

export default app
