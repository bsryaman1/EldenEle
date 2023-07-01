import React, { useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Footer from "../components/Footer";
import axios from "axios";

function NewAdvert() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState("");
    const [images, setImages] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [category, setCategory] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const [car, setCar] = useState({
        marka: "",
        seri: "",
        model: "",
        yil: "",
        vites: "",
        agirhasarkayit: "",
        kasatipi: "",
        motorgucu: "",
        motorhacmi: "",
        renk: "",
        durumu: "",
        garanti: "",
    });
    const [residence, setResidence] = useState({
        odaSayisi: "",
        binaYasi: "",
        katSayisi: "",
        isitma: "",
        banyoSayisi: "",
        balkon: "",
        esyali: "",
        siteIcerisinde: "",
        aidatBilgileri: "",
    });
    const [elektronik, setElektronik] = useState({
        marka: "",
        model: "",
        turu: "",
        renk: "",
        garanti: "",
    });
    const [moda, setModa] = useState({
        marka: "",
        turu: "",
        renk: "",
        tarz: "",
        malzeme: "",
    });
    const [yedekParca, setYedekParca] = useState({
        marka: "",
        model: "",
        parcaAdi: "",
        parcaNumarasi: "",
        durumu: "",
    });
    const [homeAndGarden, setHomeAndGarden] = useState({
        malzeme: "",
        turu: "",
        marka: "",
        renk: "",
        durumu: "",
        garanti: "",
    });
    const [ikinciEl, setIkinciEl] = useState({
        marka: "",
        model: "",
        durumu: "",
        takas: "",
    });

    //Ekran kaydırma yakalama;
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    //CommonField Handles;
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleImageChange = async (req, res) => {
        try {
          const files = Array.from(req.files);
          const fileTypes = ['image/jpeg'];
      
          const selectedImages = files.filter((file) =>
            fileTypes.includes(file.mimetype)
          );
      
          if (selectedImages.length > 6) {
            return res.status(400).json({
              error: 'En fazla 6 adet görsel yükleyebilirsiniz.',
            });
          }
      
          const uploadedImages = [];
          for (const image of selectedImages) {
            const { filename, mimetype, buffer } = image;
      
            const uploadedImage = new Image({
              filename,
              contentType: mimetype,
            });
      
            const savedImage = await uploadedImage.save();
            uploadedImages.push(savedImage);
            console.log('Image başarıyla yüklendi:', savedImage);
          }
      
          res.json({
            message: 'Görseller başarıyla yüklendi',
            images: uploadedImages,
          });
        } catch (error) {
          console.log('Image yükleme hatası:', error);
          res.status(500).json({ error: 'Görsel yükleme işleminde bir hata oluştu' });
        }
      };
    
      const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    //Form alanları değiştiğinde çalışan Handle, form alanları doldurulurken çağrılır
    const handleFieldChange = (e) => {
        const { name, value } = e.target;

        switch (category) {
            case "İkinciEl" || "IkinciEl":
                setIkinciEl((prev) => ({
                    ...prev,
                    [name]: value,
                }));
                break;

            case "YedekParca":
                setYedekParca((prev) => ({
                    ...prev,
                    [name]: value,
                }));
                break;

            case "Moda":
                setModa((prev) => ({
                    ...prev,
                    [name]: value,
                }));
                break;

            case "Elektronik":
                setElektronik((prev) => ({
                    ...prev,
                    [name]: value,
                }));
                break;

            case "EvBahce":
                setHomeAndGarden((prev) => ({
                    ...prev,
                    [name]: value,
                }));
                break;

            case "Vasita" || "Vasıta":
                setCar((prevCar) => ({
                    ...prevCar,
                    [name]: value,
                }));
                break;

            case "Emlak" || "emlak":
                setResidence((prevRes) => ({
                    ...prevRes,
                    [name]: value,
                }));
                break;

            default:
                console.log("Geçersiz kategori");
        }
    };

    //Form değiştirmek için çağrılan Handle,form gönderildiği anda çağrılır
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Görsel yükleme işlemleri
        if (images.length === 0) {
            setErrorMessage("En az bir görsel yüklemelisiniz.");
            return;
        }

        const commonFields = {
            title: title,
            description: description,
            price: price,
            status: status,
            categoryName: category,
            images: images
        };

        try {
            switch (category) {
                case "Vasita" || "Vasıta":
                    const newCarAdvert = {
                        ...commonFields,
                        marka: car.marka,
                        seri: car.seri,
                        model: car.model,
                        yil: car.yil,
                        vites: car.vites,
                        agirhasarkayit: car.agirhasarkayit,
                        kasatipi: car.kasatipi,
                        motorgucu: car.motorgucu,
                        motorhacmi: car.motorhacmi,
                        renk: car.renk,
                        durumu: car.durumu,
                        garanti: car.garanti
                    };
                    const carResponse = await axios.post("http://localhost:5000/adverts", newCarAdvert);
                    console.log(carResponse.data);
                    break;
                    

                case "Emlak" || "emlak":
                    const newResidenceAdvert = {
                        ...commonFields,
                        odaSayisi: residence.odaSayisi,
                        binaYasi: residence.binaYasi,
                        katSayisi: residence.katSayisi,
                        isitma: residence.isitma,
                        banyoSayisi: residence.banyoSayisi,
                        balkon: residence.balkon,
                        esyali: residence.esyali,
                        siteIcerisinde: residence.siteIcerisinde,
                        aidatBilgileri: residence.aidatBilgileri
                    };
                    const residenceResponse = await axios.post("http://localhost:5000/adverts", newResidenceAdvert);
                    console.log(residenceResponse.data);
                    break;


                case "Elektronik":
                    const newElektronikAdvert = {
                        ...commonFields,
                        marka: elektronik.marka,
                        model: elektronik.model,
                        turu: elektronik.turu,
                        renk: elektronik.renk,
                        garanti: elektronik.garanti
                    };
                    const elektronikResponse = await axios.post("http://localhost:5000/adverts", newElektronikAdvert);
                    console.log(elektronikResponse.data);
                    break;

                case "Moda":
                    const newModaAdvert = {
                        ...commonFields,
                        marka: moda.marka,
                        turu: moda.turu,
                        renk: moda.renk,
                        tarz: moda.tarz,
                        malzeme: moda.malzeme
                    };
                    const fashionResponse = await axios.post("http://localhost:5000/adverts", newModaAdvert);
                    console.log(fashionResponse.data);
                    break;

                case "YedekParca":
                    const newYedekParca = {
                        ...commonFields,
                        marka: yedekParca.marka,
                        model: yedekParca.model,
                        parcaAdi: yedekParca.parcaAdi,
                        parcaNumarasi: yedekParca.parcaNumarasi,
                        durumu: yedekParca.durumu
                    };
                    const sparePartResponse = await axios.post("http://localhost:5000/adverts", newYedekParca);
                    console.log(sparePartResponse.data);
                    break;

                case "EvBahce":
                    const newHomeAndGardenAdvert = {
                        ...commonFields,
                        malzeme: homeAndGarden.malzeme,
                        turu: homeAndGarden.turu,
                        marka: homeAndGarden.marka,
                        renk: homeAndGarden.renk,
                        durumu: homeAndGarden.durumu,
                        garanti: homeAndGarden.garanti
                    };
                    const homeAndGardenResponse = await axios.post("http://localhost:5000/adverts", newHomeAndGardenAdvert);
                    console.log(homeAndGardenResponse.data);
                    break;

                case "İkinciEl" || "IkinciEl":
                    const newIkinciEl = {
                        ...commonFields,
                        marka: ikinciEl.marka,
                        model: ikinciEl.model,
                        durumu: ikinciEl.durumu,
                        takas: ikinciEl.takas,
                    };
                    const secondHandResponse = await axios.post("http://localhost:5000/adverts", newIkinciEl);
                    console.log(secondHandResponse.data);
                    break;

                    default:
                        console.log("Geçersiz kategori");
            }
            alert("İlan başarıyla kaydedildi.");

            setTitle("");
            setDescription("");
            setPrice("");
            setStatus("");
            setImages([]);
            setErrorMessage("");
            setCategory("");

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <div className="container">
                <Navbar isScrolled={isScrolled} />
                <Content>
                    <h1 className="custom-title">Hadi Ürününü Satalım!</h1>

                    <style>
                        {`
                    .input-field {
                        background-color: #f2f2f2;
                        color: #333;
                        padding: 10px;
                        border-radius: 5px;
                        border: none;
                        width: 100%;
                    }
                    .input-field::placeholder {
                        color: #999;
                    }
                    .custom-title {
                        background-color: white;
                        color: #e6cc00;
                        padding: 10px;
                        border-radius: 5px;
                        border: none;
                        width: 100%;
                        margin: 0;
                        font-size: 24px;
                        font-weight: bold;
                    }
                    .image-upload {
                        margin-bottom: 10px;
                        color: #999;
                    }
                `}
                    </style>
                    <Form onSubmit={handleSubmit}>

                        <label htmlFor="title">Başlık:</label>
                        <input
                            className="input-field"
                            type="text"
                            id="title"
                            value={title}
                            placeholder="Ürün Başlığı"
                            onChange={handleTitleChange}
                        />

                        <label htmlFor="category">İlan Türü:</label>
                        <select id="category"
                            className="input-field"
                            value={category}
                            onChange={handleCategoryChange}
                        >
                            <option value="">Seçiniz</option>
                            <option value="Emlak">Emlak</option>
                            <option value="Vasita">Vasıta</option>
                            <option value="EvBahce">Ev & Bahçe</option>
                            <option value="Elektronik">Elektronik</option>
                            <option value="Moda">Moda</option>
                            <option value="YedekParca">Yedek Parça</option>
                            <option value="İkinciEl">İkinci El</option>
                        </select>

                        {category === 'Emlak' && (
                            <PropertyContainer>
                                <div>
                                    <label htmlFor="odaSayisi">Oda Sayısı:</label>
                                    <input
                                        type="number"
                                        id="odaSayisi"
                                        name="residence"
                                        value={residence.odaSayisi}
                                        onChange={handleFieldChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="binaYasi">Bina Yaşı:</label>
                                    <input
                                        type="number"
                                        id="binaYasi"
                                        name="residence"
                                        value={residence.binaYasi}
                                        onChange={handleFieldChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="katSayisi">Kat Sayısı:</label>
                                    <input
                                        type="number"
                                        id="katSayisi"
                                        name="residence"
                                        value={residence.katSayisi}
                                        onChange={handleFieldChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="isitma">Isıtma:</label>
                                    <input
                                        type="text"
                                        id="isitma"
                                        name="residence"
                                        value={residence.isitma}
                                        onChange={handleFieldChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="banyoSayisi">Banyo Sayısı:</label>
                                    <input
                                        type="number"
                                        id="banyoSayisi"
                                        name="residence"
                                        value={residence.banyoSayisi}
                                        onChange={handleFieldChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="balkon">Balkon:</label>
                                    <select id="balkon"
                                        name="residence"
                                        value={residence.balkon}
                                        onChange={handleFieldChange}>
                                        <option value="evet">Evet</option>
                                        <option value="hayir">Hayır</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="esyali">Eşyalı:</label>
                                    <select id="esyali"
                                        name="residence"
                                        value={residence.esyali}
                                        onChange={handleFieldChange}>
                                        <option value="evet">Evet</option>
                                        <option value="hayir">Hayır</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="siteIcerisinde">Site İçerisinde:</label>
                                    <select id="siteIcerisinde"
                                        name="residence"
                                        value={residence.siteIcerisinde}
                                        onChange={handleFieldChange}>
                                        <option value="evet">Evet</option>
                                        <option value="hayir">Hayır</option>
                                    </select>
                                </div>


                                <div>
                                    <label htmlFor="aidatBilgileri">Aidat Bilgileri:</label>
                                    <input
                                        type="text"
                                        id="aidatBilgileri"
                                        name="residence"
                                        value={residence.aidatBilgileri}
                                        onChange={handleFieldChange}
                                    />
                                </div>
                            </PropertyContainer>
                        )}

                        {category === 'Vasita' && (
                            <PropertyContainer>
                                <div>
                                    <label htmlFor="marka">Marka:</label>
                                    <input
                                        type="text"
                                        id="marka"
                                        name="marka"
                                        value={car.marka}
                                        onChange={handleFieldChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="seri">Seri:</label>
                                    <input
                                        type="text"
                                        id="seri"
                                        name="seri"
                                        value={car.seri}
                                        onChange={handleFieldChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="model">Model:</label>
                                    <input
                                        type="text"
                                        id="model"
                                        name="model"
                                        value={car.model}
                                        onChange={handleFieldChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="yil">Yıl:</label>
                                    <input
                                        type="number"
                                        id="yil"
                                        name="yil"
                                        value={car.yil}
                                        onChange={handleFieldChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="vites">Vites:</label>
                                    <input
                                        type="text"
                                        id="vites"
                                        name="vites"
                                        value={car.vites}
                                        onChange={handleFieldChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="agirhasarkayit">Ağır Hasar Kayıtlı:</label>
                                    <select
                                        id="agirhasarkayit"
                                        name="agirhasarkayit"
                                        value={car.agirhasarkayit}
                                        onChange={handleFieldChange}
                                    >
                                        <option value="evet">Evet</option>
                                        <option value="hayir">Hayır</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="kasatipi">Kasa Tipi:</label>
                                    <input
                                        type="text"
                                        id="kasatipi"
                                        name="kasatipi"
                                        value={car.kasatipi}
                                        onChange={handleFieldChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="motorgucu">Motor Gücü:</label>
                                    <input
                                        type="text"
                                        id="motorgucu"
                                        name="motorgucu"
                                        value={car.motorgucu}
                                        onChange={handleFieldChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="motorhacmi">Motor Hacmi:</label>
                                    <input
                                        type="text"
                                        id="motorhacmi"
                                        name="motorhacmi"
                                        value={car.motorhacmi}
                                        onChange={handleFieldChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="renk">Renk:</label>
                                    <input
                                        type="text"
                                        id="renk"
                                        name="renk"
                                        value={car.renk}
                                        onChange={handleFieldChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="durumu">Durumu:</label>
                                    <select
                                        id="durumu"
                                        name="durumu"
                                        value={car.durumu}
                                        onChange={handleFieldChange}
                                    >
                                        <option value="sifir">Sıfır</option>
                                        <option value="ikinciel">İkinci El</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="garanti">Garanti:</label>
                                    <select
                                        id="garanti"
                                        name="garanti"
                                        value={car.garanti}
                                        onChange={handleFieldChange}
                                    >
                                        <option value="evet">Evet</option>
                                        <option value="hayir">Hayır</option>
                                    </select>
                                </div>

                            </PropertyContainer>
                        )}

                        {category === 'EvBahce' && (
                            <PropertyContainer>
                                <div>
                                    <label htmlFor="malzeme">Malzeme:</label>
                                    <input
                                        type="text"
                                        name="malzeme"
                                        value={homeAndGarden.malzeme}
                                        onChange={handleFieldChange}
                                        id="malzeme"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="turu">Türü:</label>
                                    <input
                                        type="text"
                                        name="turu"
                                        value={homeAndGarden.turu}
                                        onChange={handleFieldChange}
                                        id="turu"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="marka">Marka:</label>
                                    <input
                                        type="text"
                                        id="marka"
                                        name="marka"
                                        value={homeAndGarden.marka}
                                        onChange={handleFieldChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="renk">Renk:</label>
                                    <input
                                        type="text"
                                        name="renk"
                                        value={homeAndGarden.renk}
                                        onChange={handleFieldChange}
                                        id="renk"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="durumu">Durumu:</label>
                                    <select
                                        name="durumu"
                                        value={homeAndGarden.durumu}
                                        onChange={handleFieldChange}
                                        id="durumu"
                                    >
                                        <option value="sifir">Sıfır</option>
                                        <option value="ikinciel">İkinci El</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="garanti">Garanti:</label>
                                    <select
                                        name="garanti"
                                        value={homeAndGarden.garanti}
                                        onChange={handleFieldChange}
                                        id="garanti"
                                    >
                                        <option value="evet">Evet</option>
                                        <option value="hayir">Hayır</option>
                                    </select>
                                </div>

                            </PropertyContainer>
                        )}

                        {category === 'Elektronik' && (
                            <PropertyContainer>
                                <div>
                                    <label htmlFor="marka">Marka:</label>
                                    <input
                                        type="text"
                                        name="marka"
                                        value={elektronik.marka}
                                        onChange={handleFieldChange}
                                        id="marka"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="model">Model:</label>
                                    <input
                                        type="text"
                                        name="model"
                                        value={elektronik.model}
                                        onChange={handleFieldChange}
                                        id="model"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="turu">Türü:</label>
                                    <select
                                        name="turu"
                                        value={elektronik.turu}
                                        onChange={handleFieldChange}
                                        id="turu"
                                    >
                                        <option value="tablet">Tablet</option>
                                        <option value="telefon">Telefon</option>
                                        <option value="beyazEsya">Beyaz Eşya</option>
                                        <option value="televizyon">Televizyon</option>
                                        <option value="bilgisayar">Bilgisayar</option>
                                        <option value="diger">Diğer</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="renk">Renk:</label>
                                    <input
                                        type="text"
                                        name="renk"
                                        value={elektronik.renk}
                                        onChange={handleFieldChange}
                                        id="renk"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="garanti">Garanti:</label>
                                    <select
                                        name="garanti"
                                        value={elektronik.garanti}
                                        onChange={handleFieldChange}
                                        id="garanti"
                                    >
                                        <option value="evet">Evet</option>
                                        <option value="hayir">Hayır</option>
                                    </select>
                                </div>
                            </PropertyContainer>
                        )}

                        {category === 'Moda' && (
                            <PropertyContainer>
                                <div>
                                    <label htmlFor="marka">Marka:</label>
                                    <input
                                        type="text"
                                        name="marka"
                                        value={moda.marka}
                                        onChange={handleFieldChange}
                                        id="marka"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="turu">Türü:</label>
                                    <select
                                        name="turu"
                                        value={moda.turu}
                                        onChange={handleFieldChange}
                                        id="turu"
                                    >
                                        <option value="ustGiyim">Üst Giyim</option>
                                        <option value="altGiyim">Alt Giyim</option>
                                        <option value="icGiyim">İç Giyim</option>
                                        <option value="ayakkabi">Ayakkabı</option>
                                        <option value="canta">Çanta</option>
                                        <option value="aksesuar">Aksesuar</option>
                                    </select>
                                </div>

                                <div>
                                <label htmlFor="renk">Renk:</label>
                                <input
                                    type="text"
                                    name="renk"
                                    value={moda.renk}
                                    onChange={handleFieldChange}
                                    id="renk"
                                />
                                </div>

                                <div>
                                    <label htmlFor="tarz">Tarz:</label>
                                    <select
                                        name="tarz"
                                        value={moda.tarz}
                                        onChange={handleFieldChange}
                                        id="tarz"
                                    >
                                        <option value="casual">Günlük</option>
                                        <option value="chic">Şık</option>
                                        <option value="sport">Spor</option>
                                    </select>
                                </div>

                                <div>
                                <label htmlFor="malzeme">Malzeme:</label>
                                <input
                                    type="text"
                                    name="malzeme"
                                    value={moda.malzeme}
                                    onChange={handleFieldChange}
                                    id="malzeme"
                                />
                                </div>
                            </PropertyContainer>
                        )}

                        {category === 'YedekParca' && (
                            <PropertyContainer>
                                <div>
                                <label htmlFor="marka">Marka:</label>
                                <input
                                    type="text"
                                    name="marka"
                                    value={yedekParca.marka}
                                    onChange={handleFieldChange}
                                    id="marka"
                                />
                                </div>

                                <div>
                                <label htmlFor="model">Model:</label>
                                <input
                                    type="text"
                                    name="model"
                                    value={yedekParca.model}
                                    onChange={handleFieldChange}
                                    id="model"
                                />
                                </div>

                                <div>
                                <label htmlFor="parcaAdi">Parça Adı:</label>
                                <input
                                    type="text"
                                    name="parcaAdi"
                                    value={yedekParca.parcaAdi}
                                    onChange={handleFieldChange}
                                    id="parcaAdi"
                                />
                                </div>

                                <div>
                                <label htmlFor="parcaNumarasi">Parça Numarası:</label>
                                <input
                                    type="text"
                                    name="parcaNumarasi"
                                    value={yedekParca.parcaNumarasi}
                                    onChange={handleFieldChange}
                                    id="parcaNumarasi"
                                />
                                </div>

                                <div>
                                    <label htmlFor="durumu">Durumu:</label>
                                    <select
                                        name="durumu"
                                        value={yedekParca.durumu}
                                        onChange={handleFieldChange}
                                        id="durumu"
                                    >
                                        <option value="yeni">Yeni</option>
                                        <option value="ikinciel">İkinci El</option>
                                    </select>
                                </div>
                            </PropertyContainer>
                        )}

                        {category === 'İkinciEl' && (
                            <PropertyContainer>
                                <div>
                                <label htmlFor="marka">Marka:</label>
                                <input
                                    type="text"
                                    name="marka"
                                    value={ikinciEl.marka}
                                    onChange={handleFieldChange}
                                    id="marka"
                                />
                                </div>

                                <div>
                                <label htmlFor="model">Model:</label>
                                <input
                                    type="text"
                                    name="model"
                                    value={ikinciEl.model}
                                    onChange={handleFieldChange}
                                    id="model"
                                />
                                </div>

                                <div>
                                    <label htmlFor="durumu">Durumu:</label>
                                    <select
                                        name="durumu"
                                        value={ikinciEl.durumu}
                                        onChange={handleFieldChange}
                                        id="durumu"
                                    >
                                        <option value="iyi">İyi</option>
                                        <option value="orta">Orta</option>
                                        <option value="kotu">Kötü</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="takas">Takas:</label>
                                    <select
                                        name="takas"
                                        value={ikinciEl.takas}
                                        onChange={handleFieldChange}
                                        id="takas"
                                    >
                                        <option value="evet">Evet</option>
                                        <option value="hayir">Hayır</option>
                                    </select>
                                </div>
                            </PropertyContainer>
                        )}

                        <label htmlFor="description">Açıklama:</label>
                        <textarea
                            className="input-field"
                            id="description"
                            value={description}
                            onChange={handleDescriptionChange}
                            placeholder="Bu alana ürününü detaylı bir şekilde anlatan metni girmelisin. Ne kadar detayları iyi açıklarsan, ürünün o kadar kolay satılır."
                        ></textarea>

                        <label htmlFor="price">Fiyat:</label>
                        <input
                            className="input-field"
                            type="number"
                            id="price"
                            value={price}
                            onChange={handlePriceChange}
                            placeholder="Ürün Fiyatı"
                        />

                        <label htmlFor="status">Durum:</label>
                        <select id="status"
                            value={status}
                            onChange={handleStatusChange}
                            className="input-field"
                        >
                            <option value="">Seçiniz</option>
                            <option value="yeni">Yeni</option>
                            <option value="iyiDurumda">İyi Durumda</option>
                            <option value="azKullanilmis">Az Kullanılmış</option>
                            <option value="cokKullanilmis">Çok Kullanılmış</option>
                        </select>

                        <label htmlFor="images">Görseller:</label>
                        <div className="image-upload">
                            En fazla 6 ürün fotoğrafı ekleyiniz
                        </div>
                        <input
                            type="file"
                            id="images"
                            multiple 
                            accept="image/jpeg"
                            onChange={handleImageChange}
                        />
                        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                        {images.length > 0 && (
                            <ImagePreview>
                                {images.map((image, index) => (
                                    <div key={index}>
                                        <img src={URL.createObjectURL(image)} alt={`Image ${index + 1}`} />
                                    </div>
                                ))}
                            </ImagePreview>
                        )}

                        <button type="submit">İlanı Ekle</button>

                    </Form>
                </Content>
                <Footer />
            </div>
        </Container>
    );
}
const Container = styled.div`
  display: flex;
  padding-left: 100px;
  padding-right: 100px;
`;

const Content = styled.div`
  flex: 1;
  padding: 1rem;
  margin-top: 6rem;
  color: black;
`;

const PropertyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  margin: 0 auto;
  max-width: 400px;
  text-align: center;
  border: 1px solid #c8a2c8;
  border-radius: 10px;
  padding: 10px;
  background-color: #e6cc00;
  transition: border-color 0.3s;

  &:hover {
    border-color: #a26ca2;
  }
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem; //formlar arası boşluk

  label {
    font-weight: bold; //kalın font
  }

  input,
  textarea,
  select {
    padding: 0.5rem;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #e6cc00;
    color: white;
    border: none;
    cursor: pointer;
    font-weight: bold;
    font-size: 1rem;
    margin: 0 auto;
    display: block;
    width: fit-content;
    border-radius: 0.2rem;
    border: 2px solid #c8a2c8;
    
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

const ImagePreview = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
`;


export default NewAdvert;
