const express = require("express");

const adminController = require("../controllers/admin.controller");

const router = express.Router();

// 경로 /admin/products
router.get("/products", adminController.getProducts);

router.get("/products/new", adminController.getNewProduct);

module.exports = router;
