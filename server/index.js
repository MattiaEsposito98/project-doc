const express = require("express")
const app = express()
const cors = require('cors')
const port = process.env.Port || 3000
const doctorRouter = require('./routers/doctorRouter')
const errorsHandler = require('./middlewares/errorsHandler')
const notFound = require('./middlewares/notFound')

app.use(
  cors({
    origin: process.env.CORS_ORIGIN
  })
)

app.use(express.json())
app.use(express.static('pubblic'))


app.get('/', (req, res) => {
  res.send('Server is runninbg')
})

//Rotta
app.use('/api/doctors', doctorRouter)

//Middlewares per errori
app.use(errorsHandler)
app.use(notFound)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})