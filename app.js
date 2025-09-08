const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const errorHandler = require("./middlewares/errorMiddleware");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Server is Running !");
});
app.use(errorHandler);

module.exports = app;
