const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, userPatch } = require('../controllers/UsersController');
const { validateFields } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.put('/',[        
    check('birthDate', 'birthDate is not date').optional(),    
    check('address', 'address is required').optional(),
    check('vaccine', 'address is required').optional(),
    check('vaccineState', 'vaccineState is required').optional().isBoolean(),   
    check('covidVaccine', 'vaccine').optional(),
    check('phone', 'phone must be number').optional().isNumeric(),
    check('phone', 'phone must have 10 numbers').optional().isLength({min:10}),
    check('vaccineDate', 'vaccineDate is not date').optional(),    
    check('vaccineDate', 'vaccineDate is not date').optional(),    
    check('dose', 'dose is not number').optional().isNumeric(),    
    validateFields,
    validateJWT
],userPatch );

router.get('/', getUsers);


module.exports = router;