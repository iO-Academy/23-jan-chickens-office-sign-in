const express = require('express')
const app = express()
const { addNewVisitor } = require('./controller.js')

 function routes(app) {
    app.post('/visitors', addNewVisitor)
}

module.exports = { routes }