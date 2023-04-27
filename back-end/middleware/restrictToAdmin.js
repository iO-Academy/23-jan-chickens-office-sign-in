const express = require('express')

const restrictToAdmin = (request, response, next) => {
  // Check if session contains admin session ID 
  // chatGPT says we can get the adminSessionId 
  // stored in monogo session store from request.body.adminSessionId
  if (request.session && request.session.adminSessionID) {
    request.session.cookie.maxAge = 300000
    // If condition is met, allow access to admin page
    request.session.expires = 300000
    console.log('restrictToAdmin passed')
    next()
  } else {
    console.log('restrictToAdmin failed')
    // If condition is not met, send error response
    //  error response
  }
}

module.exports = { restrictToAdmin }
