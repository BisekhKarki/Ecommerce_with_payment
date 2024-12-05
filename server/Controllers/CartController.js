const cartModel = require("../Model/CartModel");

// Get Cart Items
const getCartItems = async (req, res) => {
  try {
    const getCart = await cartModel.find({});
    if (!getCart) {
      return res.status(400).json({
        success: false,
        message: "No products available",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cart Items retrieved successfully",
      data: getCart,
    });
  } catch (error) {
    return res.status(400).json({
      success: true,
      message: "Cart items not retrieved successfully",
      data: getCart,
    });
  }
};

// Add cart items
const addCartItem = async (req, res) => {
  const {
    productName,
    productPrice,
    productImage,
    productCode,
    Discount,
    status,
    category,
  } = req.body;
  try {
    const checkQuantity = await cartModel.findOne({ productName });
    if (checkQuantity) {
      checkQuantity.quantity += 1;
      await checkQuantity.save();
      return res.status(200).json({
        success: true,
        message: "Product Added to cart successfully",
      });
    }

    const add = new cartModel({
      productName,
      productPrice,
      productImage,
      productCode,
      Discount,
      status,
      category,
      quantity: 1,
    });

    await add.save();
    return res.status(200).json({
      success: true,
      message: "Added to cart successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

const increaseQuantity = async (req, res) => {
  // const { id } = req.params;
  const { id, quantity } = req.body;
  try {
    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid quantity provided",
      });
    }

    const updatedProduct = await cartModel.findByIdAndUpdate(
      id,
      {
        quantity,
      },
      {
        new: true,
      }
    );

    if (!updatedProduct) {
      return res.status(400).json({
        success: false,
        message: "Product not found in the cart",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product Quantity updated successfully",
      updated: updatedProduct,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

const decreaseQuantity = async (req, res) => {
  const { id, quantity } = req.body;
  try {
    if (quantity < 1) {
      await cartModel.findByIdAndDelete(id);
      return res.status(200).json({
        success: false,
        message: "Product removed successfully",
      });
    }

    const updatedProduct = await cartModel.findByIdAndUpdate(
      id,
      {
        quantity,
      },
      {
        new: true,
      }
    );

    if (!updatedProduct) {
      return res.status(400).json({
        success: false,
        message: "Product not found in the cart",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product Quantity updated successfully",
      updated: updatedProduct,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    await cartModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Cart Item deleted successfully",
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error,
    });
  }
};

module.exports = {
  addCartItem,
  getCartItems,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
};
