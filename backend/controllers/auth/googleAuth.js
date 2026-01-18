// GET /api/auth/google?role=student|educator
export const googleAuth = (req, res, next) => {
  const { role } = req.query;

  if (!["student", "educator"].includes(role)) {
    return res.status(400).send("Invalid role");
  }
  
  // store role temporarily in session
  req.session.oauthRole = role;
  next();
};
