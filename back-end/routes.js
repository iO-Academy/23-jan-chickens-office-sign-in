const express = require('express')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express()
const { addNewVisitor, getAdminAuthorization, getVisitorsBySignIn, signOutOneVisitorById, signOutAllVisitors, getVisitorsByName } = require('./controller.js')
const { restrictToAdmin } = require('./middleware/restrictToAdmin')

function routes(app) {
    app.post('/visitors', addNewVisitor)
    app.post('/verify', getAdminAuthorization)
    app.put('/visitors', signOutAllVisitors)
    app.put('/visitors/{id}', signOutOneVisitorById)
    app.get('/visitors/:name', getVisitorsByName)
    app.get('/visitors', restrictToAdmin, getVisitorsBySignIn)
}

module.exports = { routes }