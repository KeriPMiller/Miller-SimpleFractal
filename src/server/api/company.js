const router = require('express').Router();
const {
  Company,
  Employee
} = require('../db/models');
module.exports = router;

// GET all companies
router.get('/', (req, res, next) => {
  Company.findAll({
      include: [{
        model: Employee      }]
    })
    .then(companies => res.json(companies))
    .catch(next);
});

//  GET api/company/:company_id
router.get('/:companyId', (req, res, next) => {
  Company.find({
      where: {company_id: req.params.companyId}
    })
    .then(company => res.json(company))
    .catch(next);
})

// POST /api/company
router.post('/', (req, res, next) => {
  Company.create(req.body)
    .then(company => res.status(201).json(company))
    .catch(next);
});
