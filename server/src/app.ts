import express from 'express'
import path from 'path'
import { router } from './routes'

const app = express()

app.use(express.json())
app.use(router)
app.use('/icons', express.static(path.resolve(__dirname, '..', 'assets')))

export { app }
