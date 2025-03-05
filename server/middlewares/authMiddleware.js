const bcrypt = require("bcrypt");
const { serverSecretKey } = require("../config/env");

/* ✅ Middleware to validate API key */
const validateApiKey = async (req, res, next) => {
    const apiKey = req.headers["krishnam-auth"];
    
    if (!apiKey) {
        return res.status(403).json({ error: "Unauthorized Access: Missing API Key" });
    }

    const isMatch = await bcrypt.compare(apiKey, serverSecretKey);
    if (!isMatch) {
        return res.status(403).json({ error: "Unauthorized Access: Invalid API Key" });
    }

    next();
};

/* ✅ Middleware to validate API key and additional credentials */
const validateCredentials = async (req, res, next) => {
    const apiKey = req.headers["krishnam-auth"];
    const authToken = req.headers["authorization"]?.replace("Bearer ", "");

    if (!apiKey || !authToken) {
        return res.status(403).json({ error: "Unauthorized Access: Missing Credentials" });
    }

    const isApiKeyMatch = await bcrypt.compare(apiKey, serverSecretKey);
    const isAuthTokenMatch = await bcrypt.compare(authToken, serverSecretKey);

    if (!isApiKeyMatch || !isAuthTokenMatch) {
        return res.status(401).json({ error: "Unauthorized Access: Invalid Credentials" });
    }

    next();
};

module.exports = { validateApiKey, validateCredentials };
