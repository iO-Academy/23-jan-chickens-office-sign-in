const { routes } = require('./routes.js')
const express = require('express')
const app = express()
const port = 3006
//const cors = require('cors')

//const hostname = '127.0.0.1';

const session = require('express-session')
const { store } = require('./service/DatabaseService');
//const { request } = require('http');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// const allowedOrigins = ['*'];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// }
// app.use(cors(corsOptions))
// app.use((request, response, next) => {
//     response.header('Access-Control-Allow-Credentials', 'true')
//     next()
// })
// app.use((request, response, next) => {
//     response.header('Access-Control-Expose-Headers', 'Set-Cookie')
//     next()
// })  
//   app.use(function(request, response, next) {
//     response.header("Referrer-Policy", "same-origin")
//     next()
// })
app.set('trust proxy', 1)
app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "http://localhost:3002")// update to match the domain you will make the request from
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS")
  response.header('Access-Control-Allow-Credentials', 'true')
  next();
});
  
app.use(session({
    name: 'authorized',
    secret: 'your-secret-key', 
    resave: false,// FALSE
    saveUninitialized: false,//FALSE
    store: store, 
    rolling: true,
    cookie: {
        maxAge: 300000, // e.g., 5 minutes
        httpOnly: false,
        sameSite: 'strict',// MUST BE 'STRICT'
        secure: false
    }
}

))

app.use((request, res, next) => {//debugging
  console.log("req.method: " + request.method)
  console.dir("request.session app.use: " + JSON.stringify(request.session))
  console.log(request.sessionID)
  next()
})

routes(app)

app.listen(port)