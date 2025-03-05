require("dotenv").config();

/* ✅ List of Required Environment Variables */
const requiredEnvVars = [
    "SERVER_PORT",
    "NODE_ENV",
    "SERVER_EMAIL_SERVICEID",
    "SERVER_EMAIL_TEMPLATEID",
    "SERVER_EMAIL_PUBLICKEY",
    "SERVER_ALLOWED_ORIGIN_PROD",
    "SERVER_ALLOWED_ORIGIN_DEV",
    "SERVER_SECRET_KEY",
    "API_BASE_URL_DEV",
    "API_BASE_URL_PROD",
    "SERVER_EMAIL_USER",
    "SERVER_EMAIL_PASS",
    "SERVER_EMAIL_TO"
];

/* ✅ Validate Required Environment Variables */
requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
        console.error(`❌ Missing required environment variable: ${key}`);
        process.exit(1);
    }
});

/* ✅ Export Environment Variables */
module.exports = {
    serverPort: process.env.SERVER_PORT || 5699, // Default to 5699 if not set
    nodeEnv: process.env.NODE_ENV || "development",
    emailServerServiceId: process.env.SERVER_SERVICEID,
    emailServerTemplateId: process.env.SERVER_TEMPLATEID,
    emailServerPublicKey: process.env.SERVER_PUBLICKEY,
    emailUser: process.env.SERVER_EMAIL_USER,
    emailPassword: process.env.SERVER_EMAIL_PASS,
    emailTo: process.env.SERVER_EMAIL_TO,
    allowedOriginProd: process.env.SERVER_ALLOWED_ORIGIN_PROD,
    allowedOriginDev: process.env.SERVER_ALLOWED_ORIGIN_DEV,
    serverSecretKey: process.env.SERVER_SECRET_KEY,
    apiBaseUrl: process.env.NODE_ENV === "development" ? process.env.API_BASE_URL_DEV : process.env.API_BASE_URL_PROD,
    allowedOrigin: process.env.NODE_ENV === "development" ? process.env.SERVER_ALLOWED_ORIGIN_DEV : process.env.SERVER_ALLOWED_ORIGIN_PROD
};
