const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
router.get("/showCart", ProductController.showCart);
router.get("/apiCart/", ProductController.apiCart);
router.post("/addToCart/:id", ProductController.addToCart);
router.get("/product/:slug", ProductController.detailProduct);
router.get("/", ProductController.showHome);

module.exports = router;