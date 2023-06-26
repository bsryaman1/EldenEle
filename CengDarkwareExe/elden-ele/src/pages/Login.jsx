import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { sendPasswordResetEmail, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import BackgroundImage from "../components/BackgroundImage";
import { firebaseAuth } from "../utils/firebase-config";
import { Link } from "react-router-dom"


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error.code);
      setError("Mail ya da şifre yanlış!");
    }
  };

  const changePassword = async (email) => {
    try {
      await sendPasswordResetEmail(firebaseAuth, email);
      setError("Şifre sıfırlama e-postası gönderildi.");
      // Şifre sıfırlama e-postası başarıyla gönderildiğinde yapılacak işlemler
    } catch (error) {
      console.log(error.code)
      setError("Şifre sıfırlama e-postası gönderilirken bir hata oluştu", error);
      // Hata durumunda yapılacak işlemler
    }
  };
  
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if(currentUser) { 
      navigate("/")
    } else {
      <alert> Mail ya da Şifre yanlıştır</alert>
    }
  });

  
  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Giriş Yap</h3>
            </div>
              <div className="container flex column">
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                placeholder="Şifre"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
               <>
               {error && (
                 <alert style={{ padding: "1em", margin: "auto " }}>
                    {error}
                </alert>
               )}
              <div className="buttons" style={{ display: "flex", justifyContent: "space-between" }}>
               <button onClick={()=> changePassword(email)}>Şifremi Unuttum</button>
               <button onClick={handleLogin}>Giriş Yap</button>
               </div>
              </>
                <div className="hesap">
                  <p>Hesabınız yok mu? Hemen oluşturun </p>
                  <Link className="link" to={"/signup"}> Kayıt Ol </Link>
                </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    grid-template-rows: 15vh 85vh;
     .form-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .form {
        padding: 5rem;
        background-color: #000000b0;
        width: 43vw;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        color: white;
        margin-top: 3%;
        .hesap{
            color: white;
            margin-top: auto;
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            .link{
                color: #ffe600;
                &:hover {
                color: #e6cc00;
                list-style-position: outside;
                box-shadow:rgba(0, 0, 0, 1);
                    }
                }
           }
        .title {
          text-align: center;
        }
        .container {
          display: flex;
          flex-direction: column;
          padding: 1rem;
          gap: 1.5rem;

          input {
            padding: 0.5rem;
            width: 75%;
            margin: auto;
            font-size: 0.9rem;
            border-radius: 0.5rem 1rem ;
          }
          button {
            justify-content: space-between;
            padding: 0.5rem;
            background-color: #e6cc00;
            border: none;
            width: 35%;
            margin: auto;
            cursor: pointer;
            color: white;
            border-radius: 0.3rem;
            font-weight: bolder;
            font-size: 1rem;
            &:hover {
            color: #a89d37;
            list-style-position: outside;
            box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.5);
            }
          }
        }
      }
    }
  }
`;

export default Login;