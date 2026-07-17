const express = require("express");

const router = express.Router();

const {
    getProduct,
    getProductById
} = require("../controllers/inventoryController");

router.get("/", getProduct);
router.get("/:id", getProductById);

module.exports = router;