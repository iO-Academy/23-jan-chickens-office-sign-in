const { routes } = require('./Routes.js')
const express = require('express')
const app = express()
const port = 3001
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

routes(app) 

app.listen(port)