const express = require('express');
const {registerUser, loginUser, currentUser}=require('../Controllers/userControllers');
const ValidateTokenHandler = require('../middlewear/validateTokenHandler');

const router = express.Router();

router.post('/register',registerUser);

router.post('/login',loginUser);

router.get('/current',ValidateTokenHandler,currentUser)

module.exports= router;