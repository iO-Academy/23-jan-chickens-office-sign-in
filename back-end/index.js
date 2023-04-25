const { routes } = require('./Routes.js')
const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

routes(app)

app.listen(port)