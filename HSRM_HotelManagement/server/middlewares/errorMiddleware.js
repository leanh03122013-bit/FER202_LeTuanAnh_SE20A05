export function errorMiddleware(err, req, res, next) {
  console.error('❌ Server error:', err);
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
}
