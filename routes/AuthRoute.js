const { Router } = require('express');
const { check } = require('express-validator');
const { login, register, logout } = require('../controllers/AuthController');
const { emailExists, idCardExists } = require('../helpers/db-validator');
const { validateFields } = require('../middlewares/field-validator');

const router = Router();

router.post('/login',[
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
],login );


router.post('/register',[
    check('name', 'firstName is required').not().isEmpty(),
    check('lastName', 'lastName is required').not().isEmpty(),
    check('ci', 'The ci must be 10 numbers').isNumeric(),  
    check('ci', 'The ci must be 10 numbers').isLength({min:10}),  
    check('ci').custom( idCardExists ),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom( emailExists ),   
    validateFields
], register );



module.exports = router;