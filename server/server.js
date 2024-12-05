const express = require("express");
const app = express();
const PORT = 4000;
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = require("./Database/dbConnect");
const product = require("./Routes/ProductRoutes");
const path = require("path");
const user = require("./Routes/UsersRoute");
const payment = require("./Routes/PaymentRouter");
const cart = require("./Routes/CartRouter");
const fav = require("./Routes/FavouriteRoute");

app.use(express.json());
app.use(cors());

// Database connection
dbConnect();

// Middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routers
app.use("/api/products", product);
app.use("/api/details", user);
app.use("/api/payment", payment);
app.use("/api/cart", cart);
app.use("/api/favourite", fav);

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(PORT, () => {
  console.log(`Server running at port:${PORT}`);
});
