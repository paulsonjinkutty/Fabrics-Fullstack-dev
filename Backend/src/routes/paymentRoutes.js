const express = require("express");

const router = express.Router();

const {
    getPayments,
    getPaymentById
} = require("../controllers/paymentController");

router.get("/", getPayments);
router.get("/:id", getPaymentById);

module.exports = router;