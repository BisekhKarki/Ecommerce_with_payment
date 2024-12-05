const mongoose = require("mongoose");

const favourite = new mongoose.Schema(
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

const favouriteModel =
  mongoose.models.favourite || mongoose.model("Favourite", favourite);

module.exports = favouriteModel;
