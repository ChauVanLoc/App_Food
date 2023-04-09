module.exports = {
  successCode: (res, data, message, statusCode = 200) => {
    res.status(statusCode).send({ message, data });
  },
  failCode: (res, message, statusCode = 400) => {
    res.status(statusCode).send({ message, data: {} });
  },
  errorCode: (res, error, statusCode = 500) => {
    res.status(statusCode).send({ message: error.message });
  },
};
