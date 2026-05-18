const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  department: String,

  skills: [String],

  performanceScore: {
    type: Number,
    required: true
  },

  experience: Number

});

module.exports =
mongoose.model("Employee", EmployeeSchema);