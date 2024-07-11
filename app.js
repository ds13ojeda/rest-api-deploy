import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middleware/cors.js'

const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by') /*Saca la etiqueta x-powered, que indica la versión de express usada*/

app.get('/', (req, res) => {
  res.json({ message: 'Hola mundo' })
})

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})