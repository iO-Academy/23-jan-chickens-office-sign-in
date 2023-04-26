const mongoUrl = 'mongodb://root:password@localhost:27017'
const { MongoClient } = require('mongodb')
const express = require('express')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);

async function getCollection(db, collection) {
    const connection = await MongoClient.connect(mongoUrl)
    const result = connection.db(db).collection(collection)
    return result
}

const store = new MongoDBStore({
    uri: mongoUrl, // replace with your MongoDB connection URI
     collection: 'sessions' // name of the collection where session data will be stored
})

module.exports = { getCollection, store }