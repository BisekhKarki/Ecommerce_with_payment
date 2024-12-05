const express = require("express");
const router = express.Router();
const { khalti } = require("../Payment/Khalti");
const { StripePayment } = require("../Payment/Stripe");

router.post("/khalti", khalti);
router.post("/create-checkout-session", StripePayment);

module.exports = router;
