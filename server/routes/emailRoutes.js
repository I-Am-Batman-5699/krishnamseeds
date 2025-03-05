const express = require("express");
const { sendUserEmail } = require("../controllers/emailController");

const router = express.Router();

router.post("/send-email", sendUserEmail);

module.exports = router;