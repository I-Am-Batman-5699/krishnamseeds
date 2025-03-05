/* ⬇************************** Server Initialization **************************⬇ */
const express = require("express");
const cors = require("cors");
const { serverPort, nodeEnv, allowedOrigin } = require("./config/env");

const app = express();

/* ⬇************************** CORS Configuration **************************⬇ */
app.use(
  cors({
    // origin: "*",
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use(express.json());

/* ⬇************************** Importing Routes **************************⬇ */
const protectedRoutes = require("./routes/protectedRoutes");
const dataRoutes = require("./routes/dataRoutes");
const emailRoutes = require("./routes/emailRoutes");

/* ⬇************************** Using Routes **************************⬇ */
app.use("/products", express.static("assets/products/images"));
app.use("/images", express.static("public/images"));
app.use("/icons", express.static("public/icons"));
app.use("/api", protectedRoutes);
app.use("/api/data", dataRoutes);
app.use("/api/email", emailRoutes);

/* ⬇************************** Server Running Verification **************************⬇ */
app.get("/", (req, res) => {
  res.json({ message: `Server is running at port: ${serverPort}` });
});

/* ⬇************************** Start Server **************************⬇ */
app.listen(serverPort, () => {
  console.log(`🚀 Server started on port ${serverPort} (Env: ${nodeEnv})`);
  console.log(`✅ Allowed Origin: ${allowedOrigin}`);
});
