const { routes } = require('./Routes.js')
const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')

const session = require('express-session')
const { store } = require('./service/DatabaseService')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const allowedOrigins = ['http://localhost:3000'];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Credentials', 'true')
    next()
})
app.use((request, response, next) => {
    response.header('Access-Control-Expose-Headers', 'Set-Cookie')
    next()
})  
  app.use(function(request, response, next) {
    response.header("Referrer-Policy", "same-origin")
    next()
})
  
app.use(session({

    secret: 'your-secret-key', 
    resave: false,
    saveUninitialized: false,
    store: store, 
    cookie: {
        maxAge: 300000, // e.g., 5 minutes
        httpOnly: false
    }
}

))

routes(app)

app.listen(port)