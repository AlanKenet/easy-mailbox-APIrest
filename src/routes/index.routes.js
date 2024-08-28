import { Router } from 'express'

import { ping, stillAlive } from '../controllers/index.controller.js'

const router = Router()

router.get('/ping', ping)

router.get('/stillalive', stillAlive)

export default router
