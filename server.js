const express = require(`express`)
const app = express()
const PORT = 8000
const cors = require(`cors`)
app.use(cors())

const userRoute = require(`./routes/user.route`)
const auth = require(`./routes/auth.route`)
const attendanceRoute = require(`./routes/attendance.route`)

app.use(`/api/users`, userRoute)
app.use(`/api/auth/login`, auth)
app.use(`/api/attendance`, attendanceRoute)

app.listen(PORT, () => {
    console.log(`Server of School Library runs on port ${PORT}`)
})
