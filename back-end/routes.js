const express = require('express')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express()
const { addNewVisitor, getAdminAuthorization } = require('./controller.js');
const { default: restrictToAdmin } = require('./middleware/restrictToAdmin.js');
const { signOutAllVisitors } = require('./signOutAllVisitors.js');


function routes(app) {
    app.post('/visitors', addNewVisitor)
    app.post('/verify', getAdminAuthorization)
    app.put('/visitors', signOutAllVisitors)
    // app.get('/visitors', restrictToAdmin, getVisitorsBySignIn)
}

module.exports = { routes }