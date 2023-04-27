const { getCollection, store } = require('./service/DatabaseService')
const { ObjectId } = require('mongodb')
const { v4: uuidv4 } = require('uuid')

const addNewVisitor = async (request, response) => {
    try {
        const collection = await getCollection("OfficeSignIn", "Visitors")
        const name = request.body.name
        const signInTime = request.body.signInTime
        const date = request.body.date
        if (name && signInTime && date && name.length < 100) {
            const newVisitor = {
                name: name,
                date: date,
                signInTime: signInTime,
                signedIn: true
            }
            if (request.body.company) {
                newVisitor['company'] = request.body.company
            }
            await collection.insertOne(newVisitor)
            return response.status(200).json({
                message: "Successfully signed in visitor.",
                data: []
            })
        } else {
            return response.status(400).json({
                message: "Invalid data provided",
                data: []
            })
        }
    } catch (error) {
        return response.status(500).json({
            message: "Unexpected error",
            data: []
        })
    }
}

const getAdminAuthorization = async (request, response) => {
    const loginInput = request.body.passcode
    console.log(request.body.passcode)
    if (loginInput === '1234') {

        //generate a random id
        const sessionId = uuidv4()
        console.log("sessionId: " + sessionId)
        // Store the sessionId in MongoDB, 
        // using `store` from DataBaseService.js
        await store.set(sessionId, { admin: true })

        // Set the sessionId in the session object
        request.session['adminSessionId'] = sessionId
        // console.dir("request.session: " + JSON.stringify(request.session))
        response.setHeader('access-control-expose-headers', 'Set-Cookie');
        response.cookie('authorized', sessionId, {
            maxAge: 900000,
            secure: false
        })
        //log what's in the store
        store.all((error, sessions) => {
            sessions.forEach((element) => console.log("session: " + JSON.stringify(element)))
        })
        response.status(200).json(
            {
                message: 'Authorization successful',
                data: []
            })
    } else {
        response.status(401).json(
            {
                message: 'Authorization failed',
                data: []
            })
    }
}

const getVisitorsBySignIn = async (request, response) => {
    try {
        if (request.query.signedIn === "true" || request.query.signedIn === "false") {
            const signedInBool = request.query.signedIn === "true" ? true : false
            const collection = await getCollection("OfficeSignIn", "Visitors")

            if (Object.keys(request.query).length == 1) {
                let data = await collection.find({ signedIn: { $in: [signedInBool] } }).toArray()
                return response.status(200).json({
                    message: "Successfully retrieved visitors",
                    data: data
                })
            }
        } else {
            return response.status(400).json({
                message: "Bad data type provided.",
                data: []
            })
        }
    } catch (error) {
        return response.status(500).json({
            message: "Unexpected error",
            data: []
        })
    }
}

const signOutAllVisitors = async (request, response) => {
    try {
        const collection = await getCollection("OfficeSignIn", "Visitors")
        await collection.updateOne(
            { signedIn: true },
            { $set: { signedIn: false } }
        )
        return response.status(200).json({
            message: "Successfully signed out visitors.",
            data: []
        })
    } catch (error) {
        return response.status(500).json({
            message: "Unexpected error",
            data: []
        })
    }
}


const signOutOneVisitorById = async (request, response) => {
    console.log('before try')
    try {
        const collection = await getCollection("OfficeSignIn", "Visitors")
        const visitorId = request.params.id
        console.log(JSON.stringify(request.params))
        await collection.updateOne(
            { _id: new ObjectId(visitorId) },
            { $set: { signedIn: false } }
        )
        console.log('before return')
        return response.status(200).json({
            message: "Successfully signed out visitor.",
            data: []
        })
    } catch (error) {
        return response.status(500).json({
            message: "Unexpected error",
            data: []
        })
    }
}

const getVisitorsByName = async (request, response) => {
    console.log("before try")
    try {
        const collection = await getCollection("OfficeSignIn", "Visitors")
        console.log("request.params: ")
        console.dir(request.params)
        console.log("request.params.name: ")
        console.dir(request.params.name)
        const name = request.params.name
        let data = await collection.find( {name: name, signedIn: true} ).toArray()
        console.log(typeof data)
        console.log(data.length)
        if(data.length) {
        return response.status(200).json({
            message: "Successfully retrieved visitors by name.",
            data: data
        })
    } else {
        return response.status(404).json({
            message: "Unknown name provided.",
            data: []
        })
    }
    } catch (error) {
        return response.status(500).json({
            message: "Unexpected error",
            data: []
        })
    }

}

module.exports = { addNewVisitor, getAdminAuthorization, getVisitorsBySignIn, signOutOneVisitorById, signOutAllVisitors, getVisitorsByName }


// getVisitorsByName
// method: get
// URL: /visitors
// Query parameters: name=[string]
// Example: /visitors?name=BIll
// Success response:
// Code: 200
// Content
// {
// message: "Successfully retrieved visitors by name.",
// data: [
// {...},
// {...}
// ]
// }
// Error response:
// Code: 500
// Content
// {
// message: "Unexpected error.",
// data: []
// }
// Code: 404
// {
// message: "Unknown name provided.",
// data: []
// }














