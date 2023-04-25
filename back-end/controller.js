const { getCollection } = require('./service/DatabaseService')

const addNewVisitor = async (request, response) => {
    const collection = await getCollection("OfficeSignIn", "Visitors")
    const newVisitor = {
        name: request.body.name,
        company: request.body.company,
        signInTime: request.body.signInTime,
        signedIn: true
    }
    console.log("hello, world")
    console.dir(newVisitor)
    await collection.insertOne(newVisitor)
    
    response.status(200).json({
        message: "Successfully signed in visitor.",
        data: []
    })
}

module.exports = { addNewVisitor }