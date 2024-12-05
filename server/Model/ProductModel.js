const mongoose = require("mongoose");

const product = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

const productModel =
  mongoose.models.product || mongoose.model("Products", product);

module.exports = productModel;
