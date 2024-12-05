const userModel = require("../Model/UserModel");

const getUser = async (req, res) => {
  try {
    const getUsers = await userModel.find({});
    if (!getUsers) {
      return res.status(400).send({
        status: false,
        message: "No users available",
      });
    }
    console.log(getUsers);
    return res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      data: getUsers,
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      message: "Error",
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User with the given id not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User deleted Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = {
  getUser,
  deleteUser,
};
