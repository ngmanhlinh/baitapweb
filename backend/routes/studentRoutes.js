// backend/routes/studentRoutes.js
const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// Định nghĩa các route
// Vì ở index.js ta sẽ quy định đường dẫn gốc là /api/students
// Nên ở đây chỉ cần gõ / hoặc /:id

router.get("/", studentController.getStudents);
router.post("/", studentController.createStudent);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);

module.exports = router;
