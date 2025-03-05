const winston = require("winston");
const path = require("path");

// Define log file path
const logFilePath = path.join(__dirname, "../logs/app.log");

// Create a logger instance
const logger = winston.createLogger({
    level: "info", // Log only 'info' and above (e.g., warn, error)
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console({ // Log to console
            format: winston.format.colorize(),
        }),
        new winston.transports.File({ filename: logFilePath }) // Log to file
    ],
});

// Export logger
module.exports = logger;
