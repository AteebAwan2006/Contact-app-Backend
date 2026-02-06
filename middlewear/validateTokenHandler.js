const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const ValidateTokenHandler = asyncHandler(async (req, res, next) => {
  console.log("🔐 Hello from token validator");

  const authHeader = req.headers.authorization || req.headers.Authorization;

  // 1️ Check if header exists and starts with Bearer
  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];
    console.log("🪙 Token received:", token);

    // 2️ Verify token
    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
      if (err) {
        console.log(" Invalid token:", err.message);
        res.status(401);
        throw new Error("User is not authorized (Invalid token)");
      }

      // 3️ Attach user data to request
      req.user = { id: decoded.id }; // ✅ Correct key
      console.log("✅ User verified:", req.user);

      next(); // proceed to controller
    });
  } else {
    res.status(401);
    throw new Error("User is not authorized or token is missing");
  }
});

module.exports = ValidateTokenHandler;
