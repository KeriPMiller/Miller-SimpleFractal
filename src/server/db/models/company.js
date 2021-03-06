const { INTEGER, DECIMAL } = require('sequelize');
const db = require('../db');

const Company = db.define('company', {
  company_id: {
    type: INTEGER,
    unique: true,
    allowNull: false,
  },
  fractal_index: {
    type: DECIMAL(4, 3),
  }
});

module.exports = Company;
