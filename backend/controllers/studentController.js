// backend/controllers/studentController.js
const Student = require("../models/Student"); // Import Model

// 1. Lấy danh sách
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Thêm mới
exports.createStudent = async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 3. Cập nhật
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedStudent)
      return res.status(404).json({ error: "Không tìm thấy" });
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 4. Xóa
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Student.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Không tìm thấy" });
    res.json({ message: "Đã xóa", id: deleted._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
