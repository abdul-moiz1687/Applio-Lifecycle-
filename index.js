const helmet = require("helmet");
const express = require('express')
const cors = require("cors");
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require("./routes/userRoutes");
const applianceRoutes = require("./routes/applianceRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
const adminRoutes = require("./routes/adminRoutes");

connectDB()

const app= express()

app.use(helmet());

app.use(
  cors({
    origin: [
  "http://localhost:5173",
   "http://localhost:5174",
  "https://applio-lifecycle.vercel.app",
        "https://applio-admin.vercel.app",
]
  })
);

app.use(express.json())

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/appliances", applianceRoutes);
app.use("/api/appliances", serviceRoutes);

app.use(errorMiddleware);

app.listen(4000,()=>{
    console.log("Server is running on port 5000")
})