import express from 'express'
import { addFighter, getAllFighters, getOneFighter } from '../controllers/fighter.controller.js'
import { login, logout, register } from '../controllers/user.controller.js'

const router = express.Router()

router.post('/', login)

router.post('/api/register', register)

router.post('/api/fighters', addFighter)

router.get('/api/fighters', getAllFighters)

router.get('/api/fighters/:id', getOneFighter)

router.get('/api/logout', logout)

export default router