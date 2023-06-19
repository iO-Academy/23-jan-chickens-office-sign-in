const { getCollection, store } = require('./service/DatabaseService')
const { ObjectId } = require('mongodb')
const crypto = require('crypto')

// const { profanity } = require('@2toad/profanity').profanity
var profanity = require('@2toad/profanity').profanity;



const addNewVisitor = async (request, response) => {
    try {
        const collection = await getCollection("OfficeSignIn", "Visitors")
        const name = profanity.censor(request.body.name)

        // if (profanity.exists(name)) {
        //     name = profanity.censor(name)
        // }
        //profanity.censor(name)

        const signInTime = request.body.signInTime
        const signInDate = request.body.signInDate
        if (name && signInTime && signInDate && name.length < 100) {
            const newVisitor = {
                name: name,
                signInDate: signInDate,
                signInTime: signInTime,
                signedIn: true
            }
            if (request.body.company) {
                newVisitor['company'] = profanity.censor(request.body.company)
                // newVisitor['company'] = request.body.company
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
    try {
        const collection = await getCollection("OfficeSignIn", "Admin")
        const loginInput = request.body.passcode
        const data = await collection.findOne({ hash: { $exists: true } })
        const loginHash = crypto.pbkdf2Sync(loginInput, data.salt,
            1000, 64, `sha512`).toString(`hex`);
        console.log("data.hash: " + data.hash)
        console.log("loginHash: " + loginHash)
        if (loginHash == data.hash) {
            response.setHeader('access-control-expose-headers', 'Set-Cookie')
            request.session.authorised = true
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
    } catch (error) {
        return response.status(500).json({
            message: "Unexpected error",
            data: []
        })
    }
}

// const getAdminAuthorization = async (request, response) => {
//     const loginInput = request.body.passcode
//     if (loginInput === '1234') {
//         response.setHeader('access-control-expose-headers', 'Set-Cookie')
//         request.session.authorised = true
//         response.status(200).json(
//             {
//                 message: 'Authorization successful',
//                 data: []
//             })
//     } else {
//         response.status(401).json(
//             {
//                 message: 'Authorization failed',
//                 data: []
//             })
//     }
// }

const getVisitorsBySignIn = async (request, response) => {
    try {
        if (request.query.signedIn === "true" || request.query.signedIn === "false") {
            const signedInBool = request.query.signedIn === "true" ? true : false
            const collection = await getCollection("OfficeSignIn", "Visitors")
            if (Object.keys(request.query).length == 1) {
                let data = await collection.find({ signedIn: signedInBool }).toArray()
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
        bulkSignOutDate = request.body.signOutDate
        bulkSignOutTime = request.body.signOutTime
        await collection.updateMany(
            { signedIn: true },
            {
                $set: { signedIn: false, signOutDate: bulkSignOutDate, signOutTime: bulkSignOutTime }
            }
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
    try {
        const collection = await getCollection("OfficeSignIn", "Visitors")
        visitorSignOutDate = request.body.signOutDate
        visitorSignOutTime = request.body.signOutTime
        const visitorId = request.params.id
        await collection.updateOne(
            { _id: new ObjectId(visitorId) },
            {
                $set: {
                    signedIn: false,
                    signOutDate: visitorSignOutDate,
                    signOutTime: visitorSignOutTime,

                }
            }
        )
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
    try {
        const collection = await getCollection("OfficeSignIn", "Visitors")
        const name = request.params.name
        let data = await collection.find({ name: new RegExp("^" + name + "$", "i"), signedIn: true }).toArray()
        if (data.length) {
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

const destroyAdminAuthorization = async (request, response) => {
    request.session.destroy()
    store.all((error, sessions) => { sessions.forEach((session) => console.dir(session)) })
    response.status(200).send()
}

const optionControl = async (request, response) => {
    response.status(200).send()
}

const clearSessionStore = async (request, response) => {
    store.clear((error) => {
        console.log("Session store cleared")
    })
    store.all((error, sessions) => { sessions.forEach((session) => console.dir(session)) })
    return response.status(200).json({
        message: 'Session store cleared.',
        data: []
    })
}

module.exports = { addNewVisitor, getAdminAuthorization, getVisitorsBySignIn, signOutOneVisitorById, signOutAllVisitors, getVisitorsByName, destroyAdminAuthorization, optionControl, clearSessionStore }