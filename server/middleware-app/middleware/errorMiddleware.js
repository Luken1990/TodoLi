const errorHandler = (err, req, res, next) => {
  //if status code is error from controller use controller status code
  //else status code is 500
  //send error message
  //return stack trace if environment is not in production
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
