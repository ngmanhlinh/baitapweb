// backend/index.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // Import hàm kết nối DB
const studentRoutes = require("./routes/studentRoutes"); // Import Routes

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối Database
connectDB();

// Sử dụng Routes
// Mọi đường dẫn bắt đầu bằng /api/students sẽ được xử lý bởi file studentRoutes
app.use("/api/students", studentRoutes);

// Chạy Server
app.listen(PORT, () => {
  console.log(`Server Backend đang chạy tại http://localhost:${PORT}`);
});
