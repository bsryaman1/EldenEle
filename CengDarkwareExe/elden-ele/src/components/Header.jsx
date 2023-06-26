import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo2.png";

export default function Header() {
  const links = [
    { name: "Ana sayfa", link: "/" },
    { name: "Profil", link: "/profile" },
  ];

  return (
    <StyledHeader>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      <div className="buttons">
        {links.map((link, index) => (
          <LinkButton key={index} to={link.link}>
            {link.name}
          </LinkButton>
        ))}
      </div>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  padding: 0 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  .logo {
    img {
      height: 7rem;
      transition: transform 0.5s;
    }

    img:hover {
      transform: rotate(360deg);
    }
  }

  .buttons {
    display: flex;
    gap: 1rem;
  }
`;

const LinkButton = styled(Link)`
  padding: 0.5rem 1rem;
  background-color: #e6cc00;
  border: none;
  cursor: pointer;
  color: white;
  border-radius: 0.5rem;
  border: 2px solid #c8a2c8;
  font-weight: bolder;
  font-size: 1.05rem;
  margin-left: 1rem;
  &:hover {
    color: #c8a2c8;
  }
`;
