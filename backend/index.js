const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Student = require("./student");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/student_db")
  .then(() => console.log("--- Đã kết nối MongoDB thành công ---"))
  .catch((err) => console.error("Lỗi kết nối:", err));

// API 1: Lấy danh sách (Đã làm ở bài 1)
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// === MỚI: API 2: Thêm học sinh mới [cite: 96-104] ===
app.post("/api/students", async (req, res) => {
  try {
    // Nhận dữ liệu từ Frontend gửi lên (nằm trong req.body)
    const newStudent = await Student.create(req.body);

    // Trả về dữ liệu vừa tạo kèm mã 201 (Created)
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/api/students/:id", async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ đường dẫn
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      req.body, // Dữ liệu mới cần update
      { new: true } // Tùy chọn này để trả về dữ liệu MỚI sau khi sửa
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: "Không tìm thấy học sinh" });
    }

    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ... (code cũ giữ nguyên)

// === MỚI: API 4: Xóa học sinh [cite: 240-251] ===
app.delete("/api/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ error: "Không tìm thấy học sinh để xóa" });
    }

    res.json({ message: "Đã xóa thành công", id: deletedStudent._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// app.listen ... (giữ nguyên ở cuối)
app.listen(PORT, () => {
  console.log(`Server Backend đang chạy tại http://localhost:${PORT}`);
});
