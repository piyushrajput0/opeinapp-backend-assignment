const express= require('express');
const router= express.Router();
const {authUser,loginPage}= require('../controllers/loginControllers');


router.route('/')
.get(loginPage)
.post(authUser);


module.exports = router;
