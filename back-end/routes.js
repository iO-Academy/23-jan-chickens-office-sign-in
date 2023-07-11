const { addNewVisitor, getAdminAuthorization, getVisitorsBySignIn, signOutOneVisitorById, signOutAllVisitors, getVisitorsByName, destroyAdminAuthorization, optionControl, clearSessionStore, validateAdmin } = require('./controller.js')
const { restrictToAdmin } = require('./middleware/restrictToAdmin')

function routes(app) {
    app.post('/visitors', addNewVisitor)
    app.post('/verify', getAdminAuthorization)
    app.put('/visitors', restrictToAdmin, signOutAllVisitors)
    app.put('/visitors/:id', signOutOneVisitorById)
    app.get('/visitors/:name', getVisitorsByName)
    app.get('/visitors', restrictToAdmin, getVisitorsBySignIn)
    app.put('/admin/:id', restrictToAdmin, signOutOneVisitorById)
    app.get('/adminlogout', destroyAdminAuthorization)
    app.options("/*", optionControl)
    app.get('/clear', clearSessionStore)
}

module.exports = { routes }