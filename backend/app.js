const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const errorHandler = require("./middlewares/errorMiddleware");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const userRoutes = require("./routes/user.routes");

dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL || "https://lmss-evgd.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Server is Running !");
});
app.use(errorHandler);

module.exports = app;
