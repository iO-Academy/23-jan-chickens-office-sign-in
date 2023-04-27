const express = require('express')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express()
const { addNewVisitor, getAdminAuthorization, getVisitorsBySignIn } = require('./controller.js')
const { restrictToAdmin } = require('./middleware/restrictToAdmin')
const { signOutAllVisitors } = require('./signOutAllVisitors.js');

function routes(app) {
    app.post('/visitors', addNewVisitor)
    app.post('/verify', getAdminAuthorization)
    app.put('/visitors', signOutAllVisitors)
    app.get('/visitors', getVisitorsBySignIn)
    // app.get('/visitors', restrictToAdmin, getVisitorsBySignIn)
    //app.get('/visitors', restrictToAdmin) //adminPageRoute
}

module.exports = { routes }