const favourite = require("../Model/FavouriteModel");

const getFavourite = async (req, res) => {
  try {
    const getFav = await favourite.find({});
    if (!getFav) {
      return res.status(400).json({
        success: false,
        message: "No items found",
      });
    }
    return res.status(200).json({
      success: true,
      message: getFav,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

const addToFavourite = async (req, res) => {
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
    const checkItem = await favourite.findOne({ productName });
    if (checkItem) {
      return res.status(200).json({
        success: false,
        message: "Item already added to the favourite",
      });
    }

    const value = new favourite({
      productName,
      productPrice,
      productImage,
      productCode,
      Discount,
      status,
      category,
    });

    await value.save();
    return res.status(200).json({
      success: true,
      message: "Item added to the favourite",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

const deleteFavourite = async (req, res) => {
  const { id } = req.params;
  try {
    await favourite.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Favourite Item deleted successfully",
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error,
    });
  }
};

module.exports = { getFavourite, addToFavourite, deleteFavourite };
