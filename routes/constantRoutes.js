const express = require("express");

// Router instance
const constantRouter = express.Router();


constantRouter.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is up and running 🚀",
  });
});


constantRouter.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Health check passed ✅",
  });
});

module.exports = constantRouter;
