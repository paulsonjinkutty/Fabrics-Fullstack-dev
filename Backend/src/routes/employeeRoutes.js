const express = require("express");

const router = express.Router();

const {
    getEmployee,
    getEmployeeById
} = require("../controllers/employeeController");

router.get("/", getEmployee);
router.get("/:id", getEmployeeById);

module.exports = router;