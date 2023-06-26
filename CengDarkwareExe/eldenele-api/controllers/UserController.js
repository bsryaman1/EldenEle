const User = require("../models/UserModel");

module.exports.getFavAds = async (req, res) => {
  try {
    const { email } = req.params;
    const user =  await User.findOne({ email });
    if (user) {
      return res.json({ msg: "success", favAds: user.favoriteAds });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error fetching ads." });
  }
};

module.exports.addToFav = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { favoriteAds } = user;
      const adsAlreadyLiked = favoriteAds.find(({ id }) => id === data.id);
      if (!adsAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            favoriteAds: [...user.favoriteAds, data],
          },
          { new: true }
        );
      } else return res.json({ msg: "Ad already added to the liked list." });
    } else await User.create({ email, favoriteAds: [data] });
    return res.json({ msg: "Ad successfully added to liked list." });
  } catch (error) {
    return res.json({ msg: "Error adding ad to the liked list" });
  }
};

module.exports.removeFromLikedAds = async (req, res) => {
  try {
    const { email, adId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { favoriteAds } = user;
      const adIndex = favoriteAds.findIndex(({ id }) => id === adId);
      if (!adId) {
        res.status(400).send({ msg: "Ad not found." });
      }
      favoriteAds.splice(adIndex, 1);
      await User.findByIdAndUpdate(
        user._id,
        {
         favoriteAds,
        },
        { new: true }
      );
      return res.json({ msg: "Ad successfully removed.",ads: favoriteAds });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error removing ad to the liked list" });
  }
};