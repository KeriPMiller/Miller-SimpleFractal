const Company = require('./company');
const Employee = require('./employee');

Company.hasMany(Employee, {
  foreignKey:'company_id',
  targetKey: 'company_id',
  constraints: false,
  as: 'Moola'
});

module.exports = {
  Company,
  Employee
}
