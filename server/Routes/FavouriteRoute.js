const express = require("express");
const router = express.Router();
const {
  addToFavourite,
  deleteFavourite,
  getFavourite,
} = require("../Controllers/FavouriteController");

router.get("/get", getFavourite);
router.post("/add", addToFavourite);
router.delete("/delete/:id", deleteFavourite);

module.exports = router;
