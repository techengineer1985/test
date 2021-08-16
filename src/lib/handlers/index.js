/********************************
  // handleApiSuccess():
  - handle the success of an API request.
  - customization params: (statusCode, message, data)
********************************/

const handleApiSuccess = (res, statusCode, message, data) => {
  return res.status(statusCode || 200).json({
    message,
    body: Array.isArray(data)
      ? [...data]
      : data._doc
        ? { ...data._doc }
        : { ...data }
  });
};

/********************************
  // handleApiError():
  - handle the fail of an API request.
  - customization params: (statusCode, errorMessage:error )
********************************/

const handleApiError = (res, statusCode, body) => {
  return res.status(statusCode || 500).json({ ...body });
};

/********************************
  // ModalError:
********************************/

class ModalError extends Error {
  constructor(statusCode, code = "default error", message, ...params) {
    super(...params);
    this.name = "ModalError";
    this.statusCode = statusCode; // a custom status code depending on the nature of the error
    this.message = message; // a custom messsage to be passed
    this.code = code; // a custom error code - could be a string
    this.date = Date.now(); // a timestamp of when the error occurred
  }
}

const errorHandler = ModalError;

module.exports = { handleApiSuccess, handleApiError, errorHandler };
