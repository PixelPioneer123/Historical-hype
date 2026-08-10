export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "You must be logged in." });
    }
    if (req.user.role !== role) {
      return res.status(403).json({ error: `Only ${role} accounts can do this.` });
    }
    next();
  };
}
