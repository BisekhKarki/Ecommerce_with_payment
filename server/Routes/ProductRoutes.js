const express = require("express");
const router = express.Router();
const path = require("path");
const {
  addProduct,
  editProduct,
  deleteProduct,
  getProduct,
  getItemById,
} = require("../Controllers/ProductsController.js");

router.get("/list", getProduct);
router.get("/item/:id", getItemById);
router.post("/add", addProduct);
router.post("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
