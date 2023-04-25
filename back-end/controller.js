const { getCollection } = require('./service/DatabaseService')

const addNewVisitor = async (request, response) => {
    try {
        const collection = await getCollection("OfficeSignIn", "Visitors")
        const name = request.body.name
        const signInTime = request.body.signInTime
        if (name && signInTime && name.length<100) {
            const newVisitor = {
                name: request.body.name,
                signInTime: request.body.signInTime,
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
    } catch(error) {
        return response.status(500).json({
            message: "Unexpected error",
            data: []
        })
    }
}

module.exports = { addNewVisitor }