/* ⬇************************** Importing Required Modules **************************⬇ */
const fs = require("fs").promises;
const path = require("path");

/**
 * Helper function to read JSON data from a file.
 * @param {string} fileName - The JSON file name (without extension).
 * @returns {Promise<Object>} - Parsed JSON data or error response.
 */
const readJsonFile = async (fileName) => {
    try {
        const filePath = path.join(__dirname, `../model/json/${fileName}.json`);
        const rawData = await fs.readFile(filePath, "utf8");

        try {
            const parsedData = JSON.parse(rawData);
            return { data: parsedData, status: "S", message: `${fileName} data fetched successfully` };
        }
        catch (jsonError) {
            console.error(`❌ Error parsing JSON in /${fileName}:`, jsonError.message);
            return { error: `Invalid JSON format in /${fileName}`, status: "F", data: null };
        }

    }
    catch (error) {
        console.error(`❌ Error reading /${fileName}:`, error.message);
        return { error: `Failed to read /${fileName}`, status: "F", data: null };
    }
};

/* ⬇************************** Exporting Functions **************************⬇ */
module.exports = {
    getAppData: () => readJsonFile("appData"),
    getContacts: () => readJsonFile("contacts"),
    getAbout: () => readJsonFile("about"),
    getProductList: () => readJsonFile("productList"),
};
