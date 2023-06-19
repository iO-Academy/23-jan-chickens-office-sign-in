const { routes } = require('./routes.js')
const express = require('express')
const app = express()
const port = 3002
const session = require('express-session')
const { store } = require('./service/DatabaseService');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('trust proxy', 1)
app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "http://localhost:3000")// update to match the domain you will make the request from
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS")
  response.header('Access-Control-Allow-Credentials', 'true')
  next();
})
app.use(session({
  name: 'authorized',
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: store,
  rolling: true,
  cookie: {
    maxAge: 300000, // e.g., 5 minutes
    httpOnly: false,
    sameSite: 'strict',
    secure: false
  }
}
))

routes(app)

app.listen(port)