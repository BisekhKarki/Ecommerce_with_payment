const mongoose = require("mongoose");

const cart = new mongoose.Schema(
  {
    productName: {
      type: String,
    },
    productPrice: {
      type: String,
    },
    productImage: {
      type: String,
      required: true,
    },
    productCode: {
      type: String,
    },
    Discount: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const cartModel = mongoose.models.cart || mongoose.model("Cart", cart);

module.exports = cartModel;
