const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const StripePayment = async (req, res) => {
  const { id, amount, name } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: name,
              description: `Payment for product ID: ${id}`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/successfull",
      cancel_url: "http://localhost:3000/unsuccessfull",
    });

    if (name === "Cart payment") {
      await cartModel.deleteMany({});
    }
    return res.status(200).json({
      id: session.id,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: error,
    });
  }
};

module.exports = { StripePayment };
