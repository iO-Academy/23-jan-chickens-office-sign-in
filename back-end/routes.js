const express = require('express')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express()
const { addNewVisitor, getAdminAuthorization, getVisitorsBySignIn, signOutOneVisitorById, signOutAllVisitors, getVisitorsByName } = require('./controller.js')
const { restrictToAdmin } = require('./middleware/restrictToAdmin')
const { store } = require('./service/DatabaseService')

function routes(app) {
    app.post('/visitors', addNewVisitor)
    app.post('/verify', getAdminAuthorization)
    app.put('/visitors', restrictToAdmin, signOutAllVisitors)
    app.put('/visitors/:id', signOutOneVisitorById)
    app.get('/visitors/:name', getVisitorsByName)
    app.get('/visitors', restrictToAdmin, getVisitorsBySignIn)
    app.get('/clear', async function(request, response) {
        store.clear((error) => {console.log("store cleared")})
        store.all((error, sessions) => {sessions.forEach((session) => console.dir(session))})
        return response.status(200).json({})
    })

    app.get('/logout', async function(req, res) {
        req.session.destroy(function(err) {
            console.log('Destroyed session')
         })
        res.redirect('/');
    });

    //app.options("/*", function(req, res, next){
        //res.header('Access-Control-Allow-Origin', '*');
        //res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        //res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
       // res.send(200);
      //});
}

module.exports = { routes }