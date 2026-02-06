const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed ",
        Message: err.message,
        Stack: err.stack,
      });

      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorizes error ",
        Message: err.message,
        Stack: err.stack,
      });

      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found ",
        Message: err.message,
        Stack: err.stack,
      });

      break;
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden ",
        Message: err.message,
        Stack: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error ",
        Message: err.message,
        Stack: err.stack,
      });
    default:
      console.log("No error, all good!");
      break;
  }
};

module.exports = errorHandler;
