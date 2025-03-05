// routes/protectedRoutes.js
const express = require("express");
const router = express.Router();
const {validateApiKey, validateCredentials} = require("../middlewares/authMiddleware");

// ✅ Checks if protected routing works with valid credentials
router.get("/protected", validateApiKey, (req, res) => {
    console.log(`✅ Protected route accessed by: ${req.ip}`);
    res.json({ message: "You have accessed a protected route!" });
});


module.exports = router;