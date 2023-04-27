const { getCollection, store } = require('./service/DatabaseService')

const signOutAllVisitors = async (request, response) => {
    try {
        const collection = await getCollection("OfficeSignIn", "Visitors")
        await collection.updateMany(
            { signedIn: true },
            { $set: { signedIn: false } }
        )    
        return response.status(200).json({
            message: "Successfully signed out all visitors.",
            data: []
        })
    } catch(error) {
        return response.status(500).json({
            message: "Unexpected error",
            data: []
        })
    }
}

module.exports = { signOutAllVisitors }