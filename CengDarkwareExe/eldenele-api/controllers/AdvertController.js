const fs = require('fs');
const Advert = require('../models/AdvertModel');
const Vehicle = require("../models/category_Models/VehicleModel");
const Residence = require("../models/category_Models/ResidenceModel");
const Electronic = require("../models/category_Models/ElectronicModel");
const Fashion = require("../models/category_Models/FashionModel");
const HomeAndGarden = require("../models/category_Models/HomeAndGardenModel");
const SecondHand = require("../models/category_Models/SecondHandModel");
const SparePart = require("../models/category_Models/SparePartModel");
const Image = require("../models/ImageModel");
const mongoose = require('mongoose');

// Tüm ilanları getirme
const getAllAdverts = async (req, res) => {
  try {
    const adverts = await Advert.find({});
    res.json(adverts);
  } catch (error) {
    console.log(error);
    res.status(500).send('İlanlar alınırken bir hata oluştu.');
  }
};

// Belirli bir ilanı getirme
const getAdvert = async (req, res) => {
  try {
    const advert = await Advert.findById(req.params.id);
    res.json(advert);
  } catch (error) {
    console.log(error);
    res.status(500).send('İlan alınırken bir hata oluştu.');
  }
};

// Kullanıcının ilanlarını getirme
const getUsersAdverts = async (req, res) => {
  try {
    const kullaniciId = req.params.kullaniciId;
    const ilanlar = await Advert.find({ userId: kullaniciId });
    res.json(ilanlar);
  } catch (err) {
    console.error(err);
    res.status(500).send('İlanlar alınırken bir hata oluştu.');
  }
};

// Yeni ilan ekleme
const newAdvert = async (req, res) => {
  try {
    const { category, ...advertFields } = req.body;
    const { image } = req.body;
    advertFields.image = image;
    
    // Kategoriye göre ilgili modeli seçme
    let categoryModel;
    switch (category) {
      case 'vehicle':
        categoryModel = Vehicle;
        break;
      case 'residence':
        categoryModel = Residence;
        break;
      case 'electronic':
        categoryModel = Electronic;
        break;
      case 'fashion':
        categoryModel = Fashion;
        break;
      case 'homeandgarden':
        categoryModel = HomeAndGarden;
        break;
      case 'secondhand':
        categoryModel = SecondHand;
        break;
      case 'sparepart':
        categoryModel = SparePart;
        break;
      default:
        return res.status(400).json({ error: 'Geçersiz kategori' });
    }

    // İlgili resmi bul ve ilana ekle
    const foundImage = await Image.findOne({ name: image });
    if (!foundImage) {
      return res.status(400).json({ error: 'Resim bulunamadı' });
    }
    advertFields.image = foundImage._id;
    
    // İlanı kaydetme
    const newAdvert = new Advert(advertFields);
    const savedAdvert = await newAdvert.save();

    // İlgili kategori modeline ilanı bağlama
    const categoryFields = {
      advertId: savedAdvert._id,
      ...advertFields,
    };
    const newCategoryItem = new categoryModel(categoryFields);
    await newCategoryItem.save();

    res.json(savedAdvert);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
};

// İlan güncelleme
const updateAdvert = async (req, res) => {
  try {
    const { category, ...advertFields } = req.body;
    const { advertId } = req.params;

    // Kategoriye göre ilgili modeli seçme
    let categoryModel;
    switch (category) {
      case 'vehicle':
        categoryModel = Vehicle;
        break;
      case 'residence':
        categoryModel = Residence;
        break;
      case 'electronic':
        categoryModel = Electronic;
        break;
      case 'fashion':
        categoryModel = Fashion;
        break;
      case 'homeandgarden':
        categoryModel = HomeAndGarden;
        break;
      case 'secondhand':
        categoryModel = SecondHand;
        break;
      case 'sparepart':
        categoryModel = SparePart;
        break;
      default:
        return res.status(400).json({ error: 'Geçersiz kategori' });
    }

    // İlanı bulma ve güncelleme
    const existingAdvert = await Advert.findById(advertId);
    if (!existingAdvert) {
      return res.status(404).json({ error: 'İlan bulunamadı' });
    }

    // İlgili resmi bulma ve güncelleme
    const existingImage = await Image.findById(existingAdvert.image);
    if (!existingImage) {
      return res.status(400).json({ error: 'Resim bulunamadı' });
    }

    // Yeni resim verilerini alarak güncelleme yapma
    const { filename, path, mimetype } = req.file;
    existingImage.name = filename;
    existingImage.data = fs.readFileSync(path);
    existingImage.contentType = mimetype;
    await existingImage.save();

    // İlanı güncelleme
    existingAdvert.set(advertFields);
    existingAdvert.image = existingImage._id;
    const updatedAdvert = await existingAdvert.save();

    // İlgili kategori modelini güncelleme
    const categoryFields = {
      advertId: updatedAdvert._id,
      ...advertFields,
    };
    await categoryModel.findOneAndUpdate({ advertId }, categoryFields);

    res.json(updatedAdvert);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
};


// İlan silme
const deleteAdvert = async (req, res) => {
  try {
    const { advertId } = req.params;

    // İlanı silme
    await Advert.findByIdAndDelete(advertId);

    // İlgili kategori modelini silme
    await Vehicle.findOneAndDelete({ advertId });
    await Residence.findOneAndDelete({ advertId });
    await Electronic.findOneAndDelete({ advertId });
    await Fashion.findOneAndDelete({ advertId });
    await HomeAndGarden.findOneAndDelete({ advertId });
    await SecondHand.findOneAndDelete({ advertId });
    await SparePart.findOneAndDelete({ advertId });

    res.end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
};

// Image yükleme
const uploadImage = async (req, res) => {
  try {
    const { filename, path, mimetype } = req.file;

    const newPhoto = new Image({
      name: filename,
      data: fs.readFileSync(path),
      contentType: mimetype,
    });

    await newPhoto.save();

    console.log("Fotoğraf başarıyla kaydedildi.");
    res.status(200).json({ message: "Fotoğraf başarıyla kaydedildi." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Bir hata oluştu" });
  }
};

// Image çekme
const getImage = async (req, res) => {
  console.log("Image getirildi");
  try {
    const item = await Image.find();
    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createImage = async (req, res) => {
  try {
    const { filename, path, mimetype } = req.file;

    const newItem = new Item({
      name: filename,
      data: fs.readFileSync(path),
      contentType: mimetype,
    });

    await newItem.save();

    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Bir hata oluştu" });
  }
};

module.exports = {
  getAllAdverts,
  getImage,
  uploadImage,
  deleteAdvert,
  updateAdvert,
  newAdvert,
  getUsersAdverts,
  getAdvert,
  createImage
};

