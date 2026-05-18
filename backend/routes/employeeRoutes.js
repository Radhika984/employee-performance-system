const express = require("express");
const router = express.Router();

const Employee =
require("../models/Employee");


// Add Employee
router.post("/", async (req, res) => {

  try {

    const employee =
      new Employee(req.body);

    await employee.save();

    res.json(employee);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


// Get All Employees
router.get("/", async (req, res) => {

  const employees =
    await Employee.find();

  res.json(employees);

});


// Search by department
router.get("/search", async (req, res) => {

  const department =
    req.query.department;

  const employees =
    await Employee.find({
      department
    });

  res.json(employees);

});

module.exports = router;