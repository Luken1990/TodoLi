let jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userSchema');

const checkJWTToken = asyncHandler(async (req, res, next) => {
  let token;
  if (
    //make sure its a bear token
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //get token from the header: ['bearer', 'token`]
      token = req.headers.authorization.split(' ')[1];
      //verify the token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      //retrieve user from the id in the token / -password so it won't include the password
      req.user = await User.findById(decodedToken.id).select('-password');
      next();
    } catch (error) {
      console.log(error);
      //401 - unauthorized access
      res.status(401);
      throw new Error('unauthorized access');
    }
  }

  //if no token is present throw error
  if (!token) {
    res.status(401);
    throw new Error('unauthorized: no token');
  }
});

//check content type if content json call next function 
//else return error
const checkContentType = (req, res, next) => {
  if (req.headers['content-type'] === 'application/json') {
    next();
  } else {
    res.status(406);
    throw new Error('Not Acceptable content type only JSON');
  }
};

module.exports = {
  checkJWTToken,
  checkContentType
};




//arrow function with three parameter, request, response, next
//if new password equals confirmed password and new password length is more than or equals 6
//new user password equals new password
// const changePasswordVerification = (req, res, next) => {
//   if (
//     req.body.newPassword == req.body.confirmedPassword &&
//     req.body.newPassword.length >= 6
//   ) {
//     req.newUserPassword = req.body.newPassword;
//     next();
//   } else if (req.body.newPassword < 6) {
//     res.send({ message: 'Please enter six or more characters' });
//     next();
//   } else {
//     res.send({
//       message: 'Confirmation password and new password does not match',
//     });
//     next();
//   }
// };
