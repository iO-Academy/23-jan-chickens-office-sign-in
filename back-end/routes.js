const express = require('express')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express()
const { addNewVisitor, getAdminAuthorization } = require('./controller.js')

function routes(app) {
    app.post('/visitors', addNewVisitor)
    app.post('/login', getAdminAuthorization)
}

module.exports = { routes }