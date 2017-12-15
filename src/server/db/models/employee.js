const { INTEGER, ENUM, STRING } = require('sequelize');
const db = require('../db');

const Employee = db.define('employee', {
  candidate_id: {
    type: INTEGER,
    unique: true,
    allowNull: false,
  },
  communication_score: {
    type: INTEGER,
    allowNull: false,
  },
  coding_score: {
    type: INTEGER,
    allowNull: false,
  },
  title: {
    type: ENUM,
    values: ['active', 'pending', 'deleted']
    }
});

module.exports = Employee;
