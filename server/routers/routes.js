import express from 'express'
import Search from '../models/main.js'
const router = express.Router()

router.get('/', async (req, res) => {
  const data = await Search.find()
  res.send(data)
})

export default router
