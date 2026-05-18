const express = require("express");
const router = express.Router();

const Employee =
require("../models/Employee");

router.post("/recommend", async (req, res) => {

  try {

    const employees =
      await Employee.find();

    const results = employees.map(emp => {

      let recommendation = "";

      if (emp.performanceScore >= 85) {

        recommendation =
          "Promotion Recommended";

      }

      else if (emp.performanceScore >= 60) {

        recommendation =
          "Training Suggested";

      }

      else {

        recommendation =
          "Needs Improvement";

      }

      return {

        name: emp.name,

        department: emp.department,

        performanceScore:
          emp.performanceScore,

        recommendation

      };

    });

    res.json(results);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

module.exports = router;