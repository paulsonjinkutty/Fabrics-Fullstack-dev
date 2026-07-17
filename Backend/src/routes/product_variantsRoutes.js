const express = require("express");

const router = express.Router();
const {
    getProductVariants,
    getProductVariantById
} = require("../controllers/product_variantsController");

router.get("/", getProductVariants);
router.get("/:id", getProductVariantById);

module.exports = router;