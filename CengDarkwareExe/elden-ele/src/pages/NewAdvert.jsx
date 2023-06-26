import React, { useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Footer from "../components/Footer";


function NewAdvert() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState("");
    const [images, setImages] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [category, setCategory] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
      };
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

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const fileTypes = ["image/jpeg"];

        const selectedImages = files.filter((file) => fileTypes.includes(file.type));

        if (selectedImages.length > 6) {
            setErrorMessage("En fazla 6 adet görsel yükleyebilirsiniz.");
        } else {
            setImages(selectedImages);
            setErrorMessage("");
        }
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };
 
    const handleSubmit = (e) => {
        e.preventDefault();
        const newAdvert = {
            title: title,
            description: description,
            price: price,
            status: status,
        };

        // Görsel yükleme işlemleri
        if (images.length === 0) {
            setErrorMessage("En az bir görsel yüklemelisiniz.");
            return;
        }

        console.log(newAdvert);

        // API işlemleri burada gerçekleştirilecek

        alert("İlan başarıyla kaydedildi.");

        setTitle("");
        setDescription("");
        setPrice("");
        setStatus("");
        setImages([]);
        setErrorMessage("");
        setCategory("");
    };

    return (
        <Container>
        <div className="container"> 
        <Navbar isScrolled={isScrolled}/> 
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
                                <input type="number" id="odaSayisi" />
                            </div>

                            <div>
                                <label htmlFor="binaYasi">Bina Yaşı:</label>
                                <input type="number" id="binaYasi" />
                            </div>

                            <div>
                                <label htmlFor="katSayisi">Kat Sayısı:</label>
                                <input type="number" id="katSayisi" />
                            </div>

                            <div>
                                <label htmlFor="isitma">Isıtma:</label>
                                <input type="text" id="isitma" />
                            </div>

                            <div>
                                <label htmlFor="banyoSayisi">Banyo Sayısı:</label>
                                <input type="number" id="banyoSayisi" />
                            </div>

                            <div>
                                <label htmlFor="balkon">Balkon:</label>
                                <select id="balkon">
                                    <option value="evet">Evet</option>
                                    <option value="hayir">Hayır</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="esyali">Eşyalı:</label>
                                <select id="esyali">
                                    <option value="evet">Evet</option>
                                    <option value="hayir">Hayır</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="siteIcerisinde">Site İçerisinde:</label>
                                <select id="siteIcerisinde">
                                    <option value="evet">Evet</option>
                                    <option value="hayir">Hayır</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="aidatBilgileri">Aidat Bilgileri:</label>
                                <input type="text" id="aidatBilgileri" />
                            </div>
                        </PropertyContainer>
                    )}

                    {category === 'Vasita' && (
                            <PropertyContainer>
                            <div>
                                <label htmlFor="marka">Marka:</label>
                                <input type="text" id="marka" />
                            </div>

                            <div>
                                <label htmlFor="seri">Seri:</label>
                                <input type="text" id="seri" />
                            </div>

                            <div>
                                <label htmlFor="model">Model:</label>
                                <input type="text" id="model" />
                            </div>

                            <div>
                                <label htmlFor="yil">Yıl:</label>
                                <input type="number" id="yil" />
                            </div>

                            <div>
                                <label htmlFor="vites">Vites:</label>
                                <input type="text" id="vites" />
                            </div>

                            <div>
                                <label htmlFor="agirhasarkayit">Ağır Hasar Kayıtlı:</label>
                                <select id="agirhasarkayit">
                                    <option value="evet">Evet</option>
                                    <option value="hayir">Hayır</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="kasatipi">Kasa Tipi:</label>
                                <input type="text" id="kasatipi" />
                            </div>

                            <div>
                                <label htmlFor="motorgucu">Motor Gücü:</label>
                                <input type="text" id="motorgucu" />
                            </div>

                            <div>
                                <label htmlFor="motorhacmi">Motor Hacmi:</label>
                                <input type="text" id="motorhacmi" />
                            </div>

                            <div>
                                <label htmlFor="renk">Renk:</label>
                                <input type="text" id="renk" />
                            </div>

                            <div>
                                <label htmlFor="durumu">Durumu:</label>
                                <select id="durumu">
                                    <option value="sifir">Sıfır</option>
                                    <option value="ikinciel">İkinci El</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="garanti">Garanti:</label>
                                <select id="garanti">
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
                                <input type="text" id="malzeme" />
                            </div>

                            <div>
                                <label htmlFor="turu">Türü:</label>
                                <input type="text" id="turu" />
                            </div>

                            <div>
                                <label htmlFor="marka">Marka:</label>
                                <input type="text" id="marka" />
                            </div>

                            <div>
                                <label htmlFor="renk">Renk:</label>
                                <input type="text" id="renk" />
                            </div>

                            <div>
                                <label htmlFor="durumu">Durumu:</label>
                                <select id="durumu">
                                    <option value="sifir">Sıfır</option>
                                    <option value="ikinciel">İkinci El</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="garanti">Garanti:</label>
                                <select id="garanti">
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
                        <input type="text" id="marka" />
                        </div>

                        <div>
                        <label htmlFor="model">Model:</label>
                        <input type="text" id="model" />
                        </div>

                        <div>
                        <label htmlFor="turu">Türü:</label>
                        <select id="turu">
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
                        <input type="text" id="renk" />
                        </div>

                        <div>
                        <label htmlFor="garanti">Garanti:</label>
                        <select id="garanti">
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
                        <input type="text" id="marka" />
                        </div>

                        <div>
                        <label htmlFor="turu">Türü:</label>
                        <select id="turu">
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
                        <input type="text" id="renk" />
                        </div>

                        <div>
                        <label htmlFor="tarz">Tarz:</label>
                        <select id="tarz">
                            <option value="casual">Günlük</option>
                            <option value="chic">Şık</option>
                            <option value="sport">Spor</option>
                        </select>
                        </div>

                        <div>
                        <label htmlFor="malzeme">Malzeme:</label>
                        <input type="text" id="malzeme" />
                        </div>
                    </PropertyContainer>
                    )}

                    {category === 'YedekParca' && (
                    <PropertyContainer>
                        <div>
                        <label htmlFor="marka">Marka:</label>
                        <input type="text" id="marka" />
                        </div>

                        <div>
                        <label htmlFor="model">Model:</label>
                        <input type="text" id="model" />
                        </div>

                        <div>
                        <label htmlFor="parcaAdi">Parça Adı:</label>
                        <input type="text" id="parcaAdi" />
                        </div>

                        <div>
                        <label htmlFor="parcaNumarasi">Parça Numarası:</label>
                        <input type="text" id="parcaNumarasi" />
                        </div>

                        <div>
                        <label htmlFor="durumu">Durumu:</label>
                        <select id="durumu">
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
                        <input type="text" id="marka" />
                        </div>

                        <div>
                        <label htmlFor="model">Model:</label>
                        <input type="text" id="model" />
                        </div>

                        <div>
                        <label htmlFor="durumu">Durumu:</label>
                        <select id="durumu">
                            <option value="iyi">İyi</option>
                            <option value="orta">Orta</option>
                            <option value="kotu">Kötü</option>
                        </select>
                        </div>

                        <div>
                        <label htmlFor="takas">Takas:</label>
                        <select id="takas">
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
                        multiple accept="image/jpeg"
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
            
        
        <Footer/>
        
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
