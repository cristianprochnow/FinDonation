import express from 'express'
import path from 'path'
import * as dotenv from 'dotenv'
import cors from 'cors'

import { router } from './routes'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

app.use('/icons', express.static(path.resolve(__dirname, '..', 'assets')))
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

export { app }
