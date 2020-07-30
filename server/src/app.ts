import express from 'express'
import path from 'path'

const app = express()

app.use(express.json())
app.use('/categories/icons', express.static(path.resolve(__dirname, '..', 'assets')))

export { app }
