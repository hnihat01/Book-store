const express = require('express');
const {body}=require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();
router.put('/signup', [
    body('email').isEmail()
    .withMessage('enter valid email')
    .custom((value, {req})=>{
        return UserActivation.findOne({email:value})
        .then(userDoc=>{
            return Promise('email adress alredy exists')
        })
    }).normalizeEmail(),
    body('password').trim().isLength({min:5}),
    body('name').trim().not().isEmpty()

],authController.signup);

router.post('/login', authController.login); 
module.exports = router;