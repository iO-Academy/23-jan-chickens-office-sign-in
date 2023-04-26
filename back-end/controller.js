const express = require('express')
const session = require('express-session')
const { getCollection, store } = require('./service/DatabaseService')
const { v4: uuidv4 } = require('uuid')

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

const getAdminAuthorization = async (request, response) => {
    const loginInput = request.body.passcode
    if (loginInput === '1234') { 
        
        //generate a random id
        const sessionId = uuidv4()

        // Store the sessionId in MongoDB, 
        // using `store` from DataBaseService.js
        await store.set(sessionId, { admin: true })

        // Set the sessionId in the session object
        request.session.adminSessionId = sessionId;
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
  
module.exports = { addNewVisitor, getAdminAuthorization }