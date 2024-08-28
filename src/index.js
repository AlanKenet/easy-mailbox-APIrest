import express from 'express'

import messagesRoutes from './routes/messages.routes.js'
import indexRoutes from './routes/index.routes.js'

const app = express()

app.use(express.json())

app.use(indexRoutes)
app.use('/api', messagesRoutes)

app.use((req, res, next) => {
  res.status(404).json({
    message: 'endpoint not found'
  })
})

app.listen(5656)
console.log('Server running on port 5656')
