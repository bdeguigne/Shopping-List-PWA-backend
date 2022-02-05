module.exports = function writeResponse(success, message, data) {
  return {
    success,
    message,
    data,
  };
};
