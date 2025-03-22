const errorHandler = (err, req, res, next) => {
  console.log(err.stack);
  res.status(statusCode).json({
    message: err.message,
  });
};

module.exports = errorHandler;
