const Company = require('./company');
const Employee = require('./employee');

Employee.belongsTo(Company);
Company.hasMany(Employee, {
  foreignKey:'company_id',
  targetKey: 'company_id',
  constraints: false,
});

module.exports = {
  Company,
  Employee
}
