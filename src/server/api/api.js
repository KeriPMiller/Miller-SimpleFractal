'use strict'

const api = require('express').Router()
const db = require('../db')

// company api routes
api.use('/company', require('./company'))

// employee api routes
api.use('/employee', require('./employee'))

// Error Handeling
api.use(function( req, res, next) {
  res.status(404).end()
})

module.exports = api
