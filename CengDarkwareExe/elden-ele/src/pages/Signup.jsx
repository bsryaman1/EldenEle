import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase-config";
import BackgroundImage from "../components/BackgroundImage";
import { Link } from "react-router-dom"

function Signup() {
    //const [showPassword, setShowPassword] = useState(false);
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            const { email, password } = formValues;
            await createUserWithEmailAndPassword(firebaseAuth, email, password);
        } catch (error) {
            console.log(error);
        }
    };

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) navigate("/");
    });

    return (
      <Container >
          <BackgroundImage />
          <div className="content">
              <Header login />
              <div className="body flex column a-center j-center">
                  <div className="text flex column a-center j-center">
                      <h1>EldenEle.</h1>
                      <h6>İSTEDİĞİNİ BULMAYA HAZIR MISIN?</h6>
                  </div>
                  <div className="form">
                      <input
                          type="email"
                          placeholder="Email"
                          onChange={(e) =>
                              setFormValues({
                                  ...formValues,
                                  [e.target.name]: e.target.value,
                              })
                          }
                          name="email"
                          value={formValues.email}
                      />
                      { (
                          <input
                              type="password"
                              placeholder="Şifre"
                              onChange={(e) =>
                                  setFormValues({
                                      ...formValues,
                                      [e.target.name]: e.target.value,
                                  })
                              }
                              name="password"
                              value={formValues.password}
                          />
                      )}
                      {<button onClick={handleSignIn}>Kayıt ol</button>}
                      <div className="hesap">
                        <p>Hesabınız var mı? </p>
                        <Link className="link" to={"/login"}> Giriş Yap </Link>
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
      background-color: rgba(0, 0, 0, 0.45);
      height: 100vh;
      width: 100vw;
      display: grid;
      grid-template-rows: 15vh 85vh;
      .body {
          gap: 1rem;
           grid-template-columns: 1fr;
           width: 100%;
           .hesap{
            color: white;
            margin-top: 3%;
            display: flex;
            justify-content: flex-start;
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
          .text {
              color: white;
              gap: 3rem;
              text-align: center;
              padding-bottom: 2rem ;
              h1 {
                padding: 0 25rem;
                color: #e6cc00;
                font-size: 8rem;
                transition: transform 0.2s ease-out;
                &:hover {
                    color: #ffe600;
                    list-style-position: outside;
                    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0);
                    transform: translateY(-5px);
                }
              }
              h6 {
                font-size: 1.6rem;
                margin: auto;
                padding-bottom: 1%;
              }
          }
          .form {
              width:100%;
              max-width: 27rem;
              margin: auto;
              gap: 1rem;
              input {
                  color: black;
                  border: none;
                  padding: 1.5rem;
                  border-radius: 1rem 2rem;
                  font-size: 1.2rem;
                  margin-bottom: 0.7rem;
                  border: 1.5px solid black;
                  &:focus {
                      outline: none;
            }
            width: 100%;
            
          }
          button {
            padding: 0.5rem 1.5rem;
            background-color: #e6cc00;
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 0.3rem;
            font-weight: bolder;
            font-size: 1.05rem;  
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            margin-top: 0.5rem;
            &:hover {
            color: #a89d37;
            list-style-position: outside;
            box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.5);
            }
          }
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #e6cc00;
          border: none;
          cursor: pointer;
          color: white;
          border-radius: 0.3rem;
          font-weight: bolder;
          font-size: 1.05rem;  
          //margin-top: 1rem;
          margin: auto;
          &:hover {
            color: #a89d37;
            list-style-position: outside;
            box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.5);
            }
        }
      }
    }
  `;

export default Signup;

