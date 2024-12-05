const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cartModel = require("../Model/CartModel");

const khalti = async (req, res) => {
  const { id, name } = req.body;
  try {
    const response = await fetch(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      {
        method: "POST",
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          return_url: "http://localhost:3000/successfull",
          website_url: "http://localhost:3000/successfull",
          amount: 1000,
          purchase_order_id: id,
          purchase_order_name: name,
        }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      if (name === "Cart payment") {
        await cartModel.deleteMany({});
      }
      return res.status(200).json({
        success: true,
        message: data.payment_url,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Payment Method Failed",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};
module.exports = { khalti };
