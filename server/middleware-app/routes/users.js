var express = require('express');
var router = express.Router();

const {
  userLogin,
  getUser,
  registerUser,
} = require('../controllers/userControllers');

//imported middleware to check JWT toke and password
const { checkJWTToken } = require('./middleware');

//post request
router.post('/login', userLogin);
router.post('/register', registerUser);

//get request
router.get('/', checkJWTToken, getUser);

module.exports = router;

//put request
// router.put(
//   '/changePassword',
//   checkJWTToken,
//   changePasswordVerification,
//   changePassword
// );
