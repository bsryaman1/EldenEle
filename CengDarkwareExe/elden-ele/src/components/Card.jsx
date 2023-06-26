import React, { useState } from "react";
import styled from "styled-components";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import axios from "axios";
import { BsCheck } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import URL from "../utils/FirebaseURL";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

export default function Card({ title, image, price, id, isLiked = false }) {
  const [email, setEmail] = useState(undefined);
  const [likedList, setLikedList] = useState([]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email);
    }
  });

  const addToList = async () => {
    try {
      const user = getAuth().currentUser;
      const uid = user.uid;
      // Kullanıcının mevcut verilerini al
      const response = await axios.get(`${URL}/${uid}/liked.json`);
      // Beğenilen ilanları içeren mevcut likedList'i al
      const likedAds = response.data?.likedList || {};
      // Eğer ilan zaten likedList içinde ise uyarı ve ve işlemi durdur
      if (likedAds.hasOwnProperty(id)) {
        toast.warning(`${id}. ilanı önceden beğenmişsinsiniz!`);
        return;
      }
      likedAds[id] = price;
      // Güncellenen verileri hazırla
      const updatedData = {
        email: email,
        likedList: likedAds,
      };
      await axios.put(`${URL}/${uid}/liked.json`, updatedData);
      setLikedList(likedAds);
      toast.success(`${id}. ilan favori ilanlara eklendi!`);
    } catch (error) {
      console.log(error);
    }
    return likedList;
  };

  const removeAdFromLiked = async (id) => {
    try {
      const user = getAuth().currentUser;
      const uid = user.uid;
      const response = await axios.get(`${URL}/${uid}/liked.json`);
      // Beğenilen ilanları içeren mevcut likedList'i al
      const likedList = response.data?.likedList || {};
      // Eğer ilan zaten likedList içinde ise uyarı ver ve işlemi durdur
      if (likedList.hasOwnProperty(id)) {
        delete likedList[id];
        const updatedData = {
          email: email,
          likedList: likedList,
        };
        await axios.put(`${URL}/${uid}/liked.json`, updatedData);
        const updatedLikedList = likedList.filter((adId) => adId !== id);
        setLikedList(updatedLikedList);
        toast.warning(`${id}. ilan favorilerden çıkarıldı!`);
      } else {
        toast.warning(`${id}. ilan favori ilanlardan çıkarılamadı!`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const linkStyle = {
    color: "inherit",
    textDecoration: "none",
  };

  return (
    <CardContainer>
      <Link to={`/ilan/${id}`} activeClassName="active-link">
        <CardImage src={image} alt={title} />
      </Link>
      <CardContent>
        <div className="card-content">
          <Link to={`/ilan/${id}`} style={linkStyle}>
            <CardTitle>{title}</CardTitle>
          </Link>
          <CardPrice>{price}</CardPrice>
          {isLiked ? (
            <BsCheck
              title="Remove from List"
              onClick={() => removeAdFromLiked(id)}
            />
          ) : (
            <AiOutlinePlus title="Add to my list" onClick={addToList} />
          )}
        </div>
      </CardContent>
    </CardContainer>
  );
}
const CardContainer = styled.div`
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1rem;
  .card-content {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    svg {
      font-size: 1.5rem;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      &:hover {
        color: #b8b8b8;
      }
    }
  }
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const CardPrice = styled.p`
  font-size: 1rem;
`;
