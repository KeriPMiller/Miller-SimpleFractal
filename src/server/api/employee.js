const router = require('express').Router();
const { Employee } = require('../db/models');
module.exports = router;

// GET all employees
router.get('/', (req, res, next) => {
  Employee.findAll()
    .then(employees => res.json(employees))
    .catch(next);
});

//  GET api/employee/:candidate_id
router.get('/:candidate_id', (req, res, next) => {
  Company.find({
      where: {candidate_id: req.params.candidate_id}
    })
    .then(employee => res.json(employee))
    .catch(next);
});

// GET api/employee/company/:company_id
router.get('/company/:company_id', (req, res, next) => {
  Employee.findAll({where: {company_id: req.params.company_id}
  })
  .then(employees => res.json(employees))
  .catch(next);
});

// POST /api/employee
router.post('/', (req, res, next) => {
  Employee.create(req.body)
    .then(employee => res.status(201).json(employee))
    .catch(next);
});
