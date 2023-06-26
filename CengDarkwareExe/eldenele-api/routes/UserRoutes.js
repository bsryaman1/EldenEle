const {
    addToFav,
    getFavAds,
    removeFromLikedAds,
  } = require("../controllers/UserController");
  
  const router = require("express").Router();
  
  router.post("/add", addToFav);
  router.get("/liked/:email", getFavAds);
  router.put("/remove", removeFromLikedAds);
  
  module.exports = router;