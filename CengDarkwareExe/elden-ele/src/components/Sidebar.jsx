import React from "react";
import styled from "styled-components";

function Sidebar() {
  return (
    <SidebarContainer>
      <Categories>
        <CategoryItem>Emlak</CategoryItem>
        <CategoryItem>Vasıta</CategoryItem>
        <CategoryItem>Ev & Bahçe</CategoryItem>
        <CategoryItem>Elektronik</CategoryItem>
        <CategoryItem>Moda</CategoryItem>
        <CategoryItem>Yedek Paraça</CategoryItem>
        <CategoryItem>İkinci El</CategoryItem>
      </Categories>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  flex: 0 0 15%;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
  
`;

const Categories = styled.ul`
  list-style: inside;
  padding: 0;
  padding-left: 1rem;
`;

const CategoryItem = styled.li`
  padding: 0.7rem 0;
  cursor: pointer;

  &:hover {
    color: #a89d37;
    list-style-position: outside;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export default Sidebar;