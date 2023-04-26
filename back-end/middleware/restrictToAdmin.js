const express = require('express')

const restrictToAdmin = (request, response, next) => {
  // Check if session contains admin session ID 
  // chatGPT says we can get the adminSessionId 
  // stored in monogo session store from request.body.adminSessionId
  if (request.session && request.session.adminSessionID === request.body.adminSessionID) {
    // If condition is met, allow access to admin page
    next()
  } else {
    // If condition is not met, send error response
    //  error response
  }
}

export default restrictToAdmin
