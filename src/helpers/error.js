class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

/**
 * Global middleware
 * @param {*} err instance của AppError
 * @param {*} res response
 * @param {*} req request
 * @param {*} next dùng để chuyển tiếp các request sang middleware hoặc controller
 */
const handleErrors = (err, req, res, next) => {
  // Nếu err là instance (thuộc tính) của AppError tạo ra thì trả json cho client,
  // Nếu không sẽ overide AppError
  if (!(err instanceof AppError)) {
    err = new AppError(500, "Internal Server !");
  }
  const { message, statusCode } = err;
  res.status(statusCode).json({
    status: "error",
    message: message,
  });

  // Nếu có các middleware phía sau, gọi next() để có thể đi tới các middleware phía sau
  next();
};

module.exports = {
  AppError,
  handleErrors,
};
