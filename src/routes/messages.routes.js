import { Router } from 'express'

import { getMessages, getMessage, createMessage, updateAllMessage, updateSomeInMessage, deleteMessage } from '../controllers/messages.controller.js'

const router = Router()

router.get('/messages', getMessages)
router.get('/messages/:id', getMessage)

router.post('/messages', createMessage)

router.put('/messages/:id', updateAllMessage)
router.patch('/messages/:id', updateSomeInMessage)

router.delete('/messages/:id', deleteMessage)

export default router
