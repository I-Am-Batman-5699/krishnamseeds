const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
const path = require("path");
require("dotenv").config();

const { serverPort, nodeEnv, allowedOrigin } = require("./config/env");

const app = express();

/* ⬇************************** CORS Configuration **************************⬇ */
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use(express.json());

/* ⬇************************** Static File Serving **************************⬇ */
app.use("/products", express.static(path.join(__dirname, "assets/products/images")));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/icons", express.static(path.join(__dirname, "public/icons")));

/* ⬇************************** Importing Routes **************************⬇ */
const protectedRoutes = require("./routes/protectedRoutes");
const dataRoutes = require("./routes/dataRoutes");
const emailRoutes = require("./routes/emailRoutes");

/* ⬇************************** Using Routes **************************⬇ */
app.use("/api", protectedRoutes);
app.use("/api/data", dataRoutes);
app.use("/api/email", emailRoutes);

/* ⬇************************** Server Running Verification **************************⬇ */
app.get("/", (req, res) => {
  res.json({ message: `Server is running at port: ${serverPort}` });
});

/* ⬇************************** Export for Serverless Deployment **************************⬇ */
module.exports.handler = serverless(app);

/* ⬇************************** Start Server in Dev Mode **************************⬇ */
if (nodeEnv !== "production") {
  app.listen(serverPort, () => {
    console.log(`🚀 Server started on port ${serverPort} (Env: ${nodeEnv})`);
    console.log(`✅ Allowed Origin: ${allowedOrigin}`);
  });
}
