const { getCollection } = require('./service/DatabaseService')

const addNewVisitor = async (request, response) => {
    const collection = await getCollection("OfficeSignIn", "Visitors")
    const newVisitor = {
        name: request.body.name,
        company: request.body.company,
        signInTime: request.body.signInTime,
        signedIn: true
    }
    //request.body.company ? newVisitor[company] = 
    //Object.keys(request.body).forEach(())
    console.log("hello, world")
    console.dir(newVisitor)
    await collection.insertOne(newVisitor)
    console.dir("request.body: " + JSON.stringify(request.body))
    
    response.status(200).json({
        message: "Successfully signed in visitor.",
        data: []
    })
}

module.exports = { addNewVisitor }