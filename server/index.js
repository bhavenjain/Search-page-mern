import dotenv from 'dotenv'
import path from 'path'
dotenv.config({
  path: path.resolve(path.resolve(), './config.env')
})

import express from 'express'
import Routers from './routers/routes.js'
import cors from 'cors'
// import './middleware/ej.js'

// Initilise app
const app = express()
import './db/connection.js'

app.use(cors())
app.use(Routers)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server started on Port: ${PORT}`)
})
