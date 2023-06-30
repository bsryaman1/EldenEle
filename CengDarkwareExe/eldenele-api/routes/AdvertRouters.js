const router = require("express").Router();

const {
    getAllAdverts,
    getAdvert,
    getUsersAdverts,
    newAdvert,
    updateAdvert,
    deleteAdvert,
    uploadImage,
    getImage,
    createImage
  } = require("../controllers/AdvertController");

  router.get('/adverts', getAllAdverts);
  router.get('/adverts/:id', getAdvert);
  router.get('/adverts/user/:kullaniciId', getUsersAdverts);
  router.post('/adverts', newAdvert);
  router.put('/adverts/:id', updateAdvert);
  router.delete('/adverts/:id', deleteAdvert);
  router.post('/adverts/upload', uploadImage);
  router.get('/adverts/image/:id', getImage);
  router.post('/images', createImage);
  module.exports = router;