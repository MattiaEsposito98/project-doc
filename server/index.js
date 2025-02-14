const express = require("express")
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const boyd_parser = require("body-parser")
const sendMail = require("./Mailer/nodemailer")
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
  res.send('Server is running')
})

//Rotta
app.use('/api/doctors', doctorRouter)

//Email
app.post("/api/send-email", async (req, res) => {
  const { email, subject, message } = req.body;

  const result = await sendMail(email, subject, message);

  if (result.success) {
    res.status(200).json({ success: true, messageId: result.messageId });
  } else {
    res.status(500).json({ success: false, error: result.error });
  }
});


//Middlewares per errori
app.use(errorsHandler)
app.use(notFound)



app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})