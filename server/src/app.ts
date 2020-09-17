import express from 'express'
import path from 'path'
import * as dotenv from 'dotenv'

import { router } from './routes'

dotenv.config()

const app = express()

app.use(express.json())
app.use(router)
app.use('/icons', express.static(path.resolve(__dirname, '..', 'assets')))

export { app }
