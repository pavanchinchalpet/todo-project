const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const bearer = req.headers.authorization?.split(" ")[1];
  const cookieToken = req.cookies?.token;
  const token = bearer || cookieToken;
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
