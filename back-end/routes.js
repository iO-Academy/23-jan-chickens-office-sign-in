const express = require('express')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express()
const { addNewVisitor, getAdminAuthorization, getVisitorsBySignIn, signOutOneVisitorById, signOutAllVisitors, getVisitorsByName, destroyAdminAuthorization, optionControl, clearSessionStore } = require('./controller.js')
const { restrictToAdmin } = require('./middleware/restrictToAdmin')
const { store } = require('./service/DatabaseService')

function routes(app) {
    app.post('/visitors', addNewVisitor)
    app.post('/verify', getAdminAuthorization)
    app.put('/visitors', restrictToAdmin, signOutAllVisitors)
    app.put('/visitors/:id', signOutOneVisitorById)
    app.get('/visitors/:name', getVisitorsByName)
    app.get('/visitors', restrictToAdmin, getVisitorsBySignIn)
    app.get('/adminlogout', destroyAdminAuthorization)
    app.options("/*", optionControl)
    app.get('/clear', clearSessionStore)
}

module.exports = { routes }