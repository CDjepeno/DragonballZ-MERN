import express from 'express'
import { addFighter, deleteFighter, getAllFighters, getOneFighter, updateFighter } from '../controllers/fighter.controller.js'
import { login, logout, register } from '../controllers/user.controller.js'
import { auth } from '../auth/auth.js'

const router = express.Router()

router.post('/api/login', login)

router.post('/api/register', register)

router.post('/api/fighters',auth, addFighter)

router.get('/api/fighters',auth, getAllFighters)

router.get('/api/fighters/:id',auth, getOneFighter)

router.put('/api/fighters/:id',auth, updateFighter)

router.delete('/api/fighters/:id',auth, deleteFighter)

router.get('/api/logout',auth, logout)

export default router