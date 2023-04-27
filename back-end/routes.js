const express = require('express')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express()
const { addNewVisitor, getAdminAuthorization, getVisitorsBySignIn } = require('./controller.js')
const { restrictToAdmin } = require('./middleware/restrictToAdmin')

function routes(app) {
    app.post('/visitors', addNewVisitor)
    app.post('/verify', getAdminAuthorization)
    //app.get('/visitors', restrictToAdmin) //adminPageRoute
    app.get('/visitors', getVisitorsBySignIn)
}

module.exports = { routes }