const {
  INTEGER,
  ENUM,
  STRING,
  VIRTUAL
} = require('sequelize');
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
    values: ['Engineer', 'Senior Engineer']
  }
}, {
  getterMethods: {
    score: function() {
      return this.communication_score + this.coding_score
    }
  }
});

module.exports = Employee;
