/* ⬇************************** Importing Required Modules **************************⬇ */
const express = require("express");
const router = express.Router();
const { validateApiKey } = require("../middlewares/authMiddleware");
const { getAppData, getContacts, getAbout, getProductList } = require("../controllers/dataController");
const { apiBaseUrl } = require("../config/env");

/* ⬇************************** Helper Function for Handling Requests **************************⬇ */
const handleRequest = async (fetchFunction, routeName, res) => {
    try {
        const data = await fetchFunction();

        // If fetching productList, update image URLs
        if (routeName === "productList") {
            data.data.products.productsList = data.data.products.productsList.map((product) => ({
                ...product,
                images: product.images.map((img) => ({
                    image: `${apiBaseUrl}${img.image}`,
                })),
            }));
        }

        else if(routeName === "about"){
            data.data.aboutDetails= data.data.aboutDetails.map((about) => ({
                ...about,
                url: `${apiBaseUrl}${about.url}`
            }));
        }

        res.json(data);
    } catch (error) {
        console.error(`❌ Error in /${routeName} route:`, error.message);
        res.status(500).json({ error: `Failed to fetch ${routeName} data`, status: "F", data: null });
    }
};

/* ⬇************************** API Routes for Fetching Data **************************⬇ */
router.get("/appData", validateApiKey, (req, res) => handleRequest(getAppData, "appData", res));
router.get("/contacts", validateApiKey, (req, res) => handleRequest(getContacts, "contacts", res));
router.get("/about", validateApiKey, (req, res) => handleRequest(getAbout, "about", res));
router.get("/productList", validateApiKey, (req, res) => handleRequest(getProductList, "productList", res));

module.exports = router;
