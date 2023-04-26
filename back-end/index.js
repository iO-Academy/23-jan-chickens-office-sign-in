const { routes } = require('./Routes.js')
const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')

const session = require('express-session')
const { store } = require('./service/DatabaseService')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
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