const express = require('express')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express()
const { addNewVisitor, getAdminAuthorization } = require('./controller.js')
const { restrictToAdmin } = require('./middleware/restrictToAdmin')

function routes(app) {
    app.post('/visitors', addNewVisitor)
    app.post('/verify', getAdminAuthorization)
    app.get('/visitors', restrictToAdmin) //adminPageRoute
}

module.exports = { routes }