const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    name: { type: String, required: true },
    age: {
      type: Number,
      required: true,
      min: [1, "Tuổi phải lớn hơn 0"], // MỚI: Validation của MongoDB
    },
    class: { type: String, required: true },
  },
  { collection: "students" }
);

module.exports = mongoose.model("Student", studentSchema);
