const jwt = require("jsonwebtoken"); 

const authenticateUser = (req, res, next) => {
  // console.log("headers:", req.headers);
 
  const authorizationHeader = req.headers.authorization;
  // console.log(authorizationHeader, 'authorizationHeader')

  if (!authorizationHeader) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  const tokenParts = authorizationHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== "bearer") {
    return res
      .status(401)
      .json({ error: "Unauthorized - Invalid token format" });
  }

  const token = tokenParts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });
    req.userId = decoded.userId;
    req.tokenVersion = decoded.tokenVersion;
    // console.log(req.userId);
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};

module.exports = authenticateUser;