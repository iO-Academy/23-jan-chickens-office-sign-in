const express = require('express')

const signOutAllVisitors = async (request, response) => {
    try {
        await collection.updateMany(
            { signedIn: true },
            { $set: { signedIn: false } }
        )    
    } catch(error) {
        return response.status(500).json({
            message: "Unexpected error",
            data: []
        })
    }
}

module.exports = { signOutAllVisitors }