import styled from 'styled-components';
import { FaUserShield } from 'react-icons/fa';

export const Flex = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0 10px;
  align-items: center;
  background-color: #0000;
  box-shadow: 2px 3px 10px gray;
  @media(min-width: 768px) {
    padding: 0 50px;
  }
`;

export const NavList = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    width: 100%;
    position: relative;
    @media(min-width: 768px) {
      justify-content: flex-start;
      width: 100%;
      gap: 50px;
      button:nth-last-child(1) {
        position: absolute;
        right: 50px;
      }
    }
`;

export const AdminIconLogo = styled(FaUserShield)`
  width: 40px;
  height: 40px;
  margin: 10px 0;
  color: #FF5733;

  @media(min-width: 768px) {
    width: 50px;
    height: 50px;
    margin-right: 10%;
  }
`;

export const RedirectButton = styled.button`
  position: relative;
  border: none;
  background-color: transparent;
  font-size: 12px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  padding: 5px;
  cursor: pointer;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
  
  &:hover {
    margin-bottom: -1px;
    border-bottom: 1px solid black;
  }
  @media(min-width: 768px) {
    font-size: 15px;
  }
`;

export const customerLogo = styled.img``;
