const productModel = require("../Model/ProductModel");

// Get all the products
const getProduct = async (req, res) => {
  try {
    const findAllProduct = await productModel.find({});
    if (!findAllProduct) {
      return res.status(400).json({
        success: false,
        message: "No products available",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      data: findAllProduct,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error",
    });
  }
};

// Get Item by the Id
const getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const findItem = await productModel.findById(id);
    if (!findItem) {
      return res.status(400).json({
        success: false,
        message: "Item with the given id not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      data: findItem,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error",
    });
  }
};

// Add the products to the database
const addProduct = async (req, res) => {
  console.log(req.body);
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
    const newProduct = new productModel({
      productName,
      productPrice,
      productImage,
      productCode,
      Discount,
      status,
      category,
    });

    await newProduct.save();

    return res.status(200).json({
      success: true,
      message: "Product Added successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

const editProduct = async (req, res) => {
  const {
    productName,
    productPrice,
    productImage,
    productCode,
    Discount,
    status,
    category,
  } = req.body;
  const { id } = req.params;

  try {
    const data = {
      productName,
      productPrice,
      productImage,
      productCode,
      Discount,
      status,
      category,
    };
    const findById = await productModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (findById) {
      return res.status(200).json({
        success: true,
        message: "Product updated successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Product not updated",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error",
    });
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const findItem = await productModel.findByIdAndDelete(id);
    if (!findItem) {
      return res.status(400).json({
        success: false,
        message: "Item with the given id not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Products deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = {
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
  getItemById,
};
