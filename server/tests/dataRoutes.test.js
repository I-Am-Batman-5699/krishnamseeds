require("dotenv").config();
const request = require("supertest");
const express = require("express");
const dataRoutes = require("../routes/dataRoutes");
const { validateApiKey } = require("../middlewares/authMiddleware");

// Mock Express App
const app = express();
app.use(express.json());
app.use("/data", dataRoutes);

describe("🔍 Data Routes Tests", () => {
    const validApiKey = process.env.SERVER_SECRET_KEY;

    /* ✅ Test /appData Route */
    test("❌ Should fail without API Key", async () => {
        const res = await request(app).get("/data/appData");
        expect(res.status).toBe(403);
        expect(res.body.error).toBe("Unauthorized Access: Missing API Key");
    });

    test("✅ Should pass with valid API Key for /appData", async () => {
        const res = await request(app)
            .get("/data/appData")
            .set("krishnam-auth", validApiKey);
        expect(res.status).toBe(200);
        expect(res.body.status).toBe("S");
        expect(res.body.data).toBeDefined();
    });

    /* ✅ Test /contacts Route */
    test("✅ Should pass with valid API Key for /contacts", async () => {
        const res = await request(app)
            .get("/data/contacts")
            .set("krishnam-auth", validApiKey);
        expect(res.status).toBe(200);
        expect(res.body.status).toBe("S");
        expect(res.body.data).toBeDefined();
    });

    /* ✅ Test /about Route */
    test("✅ Should pass with valid API Key for /about", async () => {
        const res = await request(app)
            .get("/data/about")
            .set("krishnam-auth", validApiKey);
        expect(res.status).toBe(200);
        expect(res.body.status).toBe("S");
        expect(res.body.data).toBeDefined();
    });

    /* ✅ Test /productList Route */
    test("✅ Should pass with valid API Key for /productList", async () => {
        const res = await request(app)
            .get("/data/productList")
            .set("krishnam-auth", validApiKey);
        expect(res.status).toBe(200);
        expect(res.body.status).toBe("S");
        expect(res.body.data).toBeDefined();
    });

    /* ✅ Test Non-Existing Route */
    test("❌ Should return 404 for non-existing route", async () => {
        const res = await request(app)
            .get("/data/nonExistingRoute")
            .set("krishnam-auth", validApiKey);
        expect(res.status).toBe(404);
    });
});
