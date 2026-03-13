import express from "express";
import dontenv from "dotenv";
import cors from "cors";
import requestLogger from "./middlewares/requestLogger.js";
import ConnectToDB from "./config/connectDB.js";

import userRoutes from "./Routes/userRoutes.js";
import courseRoutes from "./Routes/courseRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import studentRoutes from "./Routes/studentRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
dontenv.config();
app.use(requestLogger);

ConnectToDB();

const PORT = process.env.PORT || 8000;

// testing route
app.get("/", (req, res) => res.json({
    success: true,
    message: "LMS By Hassaan API working Well."
}));

// user auth related routes
app.use("/api/auth", userRoutes);

// course routes
app.use("/api/course", courseRoutes);

// Admin routes
app.use("/api/admin", adminRoutes);

// Student routes
app.use("/api/student", studentRoutes);

app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
