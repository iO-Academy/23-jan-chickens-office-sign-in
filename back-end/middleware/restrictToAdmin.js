const restrictToAdmin = (request, response, next) => {
  if (request.session.authorised) {
    next()
  } else {
    return response.status(401).send()
  }
}

module.exports = { restrictToAdmin }