const express = require("express");
const router = express.Router();
const {
  addCartItem,
  getCartItems,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
} = require("../Controllers/CartController");

router.post("/add", addCartItem);
router.get("/get", getCartItems);
router.patch("/increase/:id", increaseQuantity);
router.patch("/decrease/:id", decreaseQuantity);
router.delete("/delete/:id", deleteItem);

module.exports = router;
