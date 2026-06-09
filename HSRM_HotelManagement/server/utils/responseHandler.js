export const success = (res, data = null, message = 'Success', statusCode = 200) => {
  res.status(statusCode).json({ success: true, message, data });
};

export const error = (res, message = 'Internal Server Error', statusCode = 500) => {
  res.status(statusCode).json({ success: false, message });
};
