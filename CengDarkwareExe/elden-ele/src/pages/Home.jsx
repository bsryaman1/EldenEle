import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/logo1.jpg";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import Image1 from "../assets/ilan1.jpg";
import Image2 from "../assets/ilan2.jpg";
import Image3 from "../assets/ilan3.jpg";
import Footer from "../components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";


function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setIsLoggedIn(true); 
      return isLoggedIn;
    }else
      setIsLoggedIn(false)
      return isLoggedIn;
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const cards = [

    {
      id: "1",
      title: "İlan 1",
      image: Image1,
      price: "100 TL",
    },
    {
      id: "2",
      title: "İlan 2",
      image: Image2,
      price: "200 TL",
    },
    {
      id: "3",
      title: "İlan 3",
      image: Image3,
      price: "300 TL",
    },
    {
      id: "4",
      title: "İlan 4",
      image: Image2,
      price: "400 TL",
    },
    {
      id: "5",
      title: "İlan 5",
      image: Image3,
      price: "500 TL",
    },
    {
      id: "6",
      title: "İlan 6",
      image: Image1,
      price: "600 TL",
    },
    {
      id: "7",
      title: "İlan 7",
      image: Image3,
      price: "700 TL",
    },
    {
      id: "8",
      title: "İlan 8",
      image: Image2,
      price: "800 TL",
    },

  ];

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img
          src={backgroundImage}
          alt="background"
          className="background-image"
        />
        <div className="container">
          <div className="logo"></div>
          <div className="buttons flex"></div>
        </div>
      </div>
      <MainContent>
      <ToastContainer />
        <Sidebar />
        <CardsContainer>
          {cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              image={card.image}
              price={card.price}
            />
          ))}
        </CardsContainer>
      </MainContent>
      <Footer/>
    </Container>
  );
}

const Container = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 1rem;
  
  .hero {
    position: relative;
    height: 90px;
    background-color: #005cbf;
    overflow: hidden;
    border-radius: 4px;
    
    .container {
      position: absolute;
      bottom: 1rem;
      left: 1rem;
      
      .logo {
        img {
          width: 200px;
        }
      }
      
      .buttons {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
        
        button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          background-color: #f5f5f5;
          color: #005cbf;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s;
          
          &:hover {
            background-color: #ddd;
          }
        }
      }
    }
  }
`;

const MainContent = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
`;

export default Home;