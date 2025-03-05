const axios = require("axios");

const BASE_URL = "http://localhost:5699/api/data";
const API_KEY = "Krishnam-@2024-#Seeds-$Vikas";

const testGetRequest = async (endpoint) => {
    try {
        const response = await axios.get(`${BASE_URL}/${endpoint}`, {
            headers: { "krishnam-auth": API_KEY, "authorization": `Bearer ${API_KEY}` }
        });
        console.log(`✅ ${endpoint} - Success:`, response.data);
    } catch (error) {
        console.error(`❌ ${endpoint} - Error:`, error.response ? error.response.data : error.message);
    }
};

// Function to run all tests
const runTests = async () => {
    console.log("🔹 Running API tests...");

    await testGetRequest("appData");
    await testGetRequest("contacts");
    await testGetRequest("about");
    await testGetRequest("productList");

    console.log("✅ All tests completed!");
};

runTests();