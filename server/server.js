require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const errorHandler = require("./middleware/errorMiddleware");

const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const courseRoutes = require("./routes/courseRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/courses", courseRoutes);

// Error middleware LAST
app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});