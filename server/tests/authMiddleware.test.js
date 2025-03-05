require("dotenv").config();
const request = require("supertest");
const express = require("express");
const { validateApiKey, validateCredentials } = require("../middlewares/authMiddleware");

const app = express();

/* ✅ Test Route for API Key Validation */
app.get("/test-api-key", validateApiKey, (req, res) => {
    res.json({ message: "API Key validated successfully!" });
});

/* ✅ Test Route for Credentials Validation */
app.get("/test-credentials", validateCredentials, (req, res) => {
    res.json({ message: "Credentials validated successfully!" });
});

describe("🔍 Auth Middleware Tests", () => {
    const validApiKey = process.env.SERVER_SECRET_KEY;
    const validAuthToken = `Bearer ${process.env.SERVER_AUTH_TOKEN}`;

    /* ✅ Test API Key Validation */
    test("❌ Should fail without API Key", async () => {
        const res = await request(app).get("/test-api-key");
        expect(res.status).toBe(403);
        expect(res.body.error).toBe("Unauthorized Access: Invalid API Key");
    });

    test("✅ Should pass with valid API Key", async () => {
        const res = await request(app)
            .get("/test-api-key")
            .set("krishnam-auth", validApiKey);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("API Key validated successfully!");
    });

    /* ✅ Test Credentials Validation */
    test("❌ Should fail without API Key & Auth Token", async () => {
        const res = await request(app).get("/test-credentials");
        expect(res.status).toBe(403);
        expect(res.body.error).toBe("Unauthorized Access: Invalid API Key");
    });

    test("❌ Should fail with valid API Key but missing Auth Token", async () => {
        const res = await request(app)
            .get("/test-credentials")
            .set("krishnam-auth", validApiKey);
        expect(res.status).toBe(401);
        expect(res.body.error).toBe("Unauthorized Access: Invalid Credentials");
    });

    test("✅ Should pass with valid API Key & Auth Token", async () => {
        const res = await request(app)
            .get("/test-credentials")
            .set("krishnam-auth", validApiKey)
            .set("authorization", validAuthToken);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Credentials validated successfully!");
    });
});