export function allowRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role_name)) {
      return res.status(403).json({ success: false, message: 'Permission denied' });
    }
    next();
  };
}
