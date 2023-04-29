const express = require('express')

const restrictToAdmin = (request, response, next) => {
  if (request.session) {
    next()
  } else {
  }
}

module.exports = { restrictToAdmin }
