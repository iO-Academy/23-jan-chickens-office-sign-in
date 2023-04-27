const { routes } = require('./Routes.js')
const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')

const session = require('express-session')
const { store } = require('./service/DatabaseService')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const allowedOrigins = ['http://localhost:3002'];
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

    secret: 'your-secret-key', // replace with your own secret key
    resave: false,
    saveUninitialized: false,
    store: store, // Use MongoDBStore as the session store
    expires: 10,// session expires after 50 minutes
    cookie: {
        maxAge: 3000000, // session timeout in milliseconds, e.g., 50 minutes
        httpOnly: false
    }
}

))

routes(app)

app.listen(port)