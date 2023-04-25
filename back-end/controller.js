const { getCollection } = require('./service/DatabaseService')

const addNewVisitor = async (request, response) => {
    const collection = await getCollection("OfficeSignIn", "Visitors")
    //let newVisitor
    if (request.body.name && request.body.signInTime) {
        const newVisitor = {
            name: request.body.name,
            signInTime: request.body.signInTime,
            signedIn: true
        }
        if (request.body.company) {
            console.log("company detected")
            newVisitor['company'] = request.body.company
        }
        console.log("name AND signInTime detected")
        await collection.insertOne(newVisitor)
        return response.status(200).json({
            message: "Successfully signed in visitor.",
            data: []
        })
    } else {
        console.log("name and/or signInTime not detected")
        return response.status(400).json({
            message: "Invalid data provided",
            data: []
        })
    }
    console.dir("newVisitor: " + JSON.stringify(newVisitor))
    //await collection.insertOne(newVisitor)
    console.dir("request.body: " + JSON.stringify(request.body))
}

module.exports = { addNewVisitor }