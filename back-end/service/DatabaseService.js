const mongoUrl = 'mongodb://root:password@localhost:27017'
const { MongoClient } = require('mongodb')

async function getCollection(db, collection) {
    const connection = await MongoClient.connect(mongoUrl)
    const result = connection.db(db).collection(collection)
    return result
}

module.exports = { getCollection }