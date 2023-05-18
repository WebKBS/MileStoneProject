const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");

router.get("/products", productsController.getAllProduct);

router.get("/products/:id", productsController.getProductDetails);

module.exports = router;
