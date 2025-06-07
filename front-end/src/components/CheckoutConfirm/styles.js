import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import { GrMapLocation } from 'react-icons/gr';

export const ConfirmContainer = styled.section`
  width: 100%;
  margin: 40px auto;
  padding: 10px;
  display: flex;
  flex-flow: column nowrap;
  @media(min-width: 768px) {
    max-width: 1024px;
    overflow-x: auto;
  }
`;

export const PaperDiv = styled(Paper)`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 50px;
  padding: 50px 10px;

  @media(min-width: 768px) {
    padding: 60px;
    gap: 40px;
  }
`;

export const MapIcon = styled(GrMapLocation)`
  width: 40px;
  height: 40px;
  padding: 6px;
  background-color: #F5CC00;
  border-radius: 8px;
  transform: translateY(-10px);
  margin-bottom: -30px;

  @media(min-width: 768px) {
    width: 50px;
    height: 50px;
    padding: 8px;
    transform: translateY(-10px);
    margin-bottom: -30px;
  }
`;

export const Label = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 16px;
  font-weight: 600;
  gap: 10px;
  input {
    width: 100%;
    height: 40px;
    ::placeholder {
      padding-left: 10px;
    }
  }
  @media(min-width: 768px) {
    width: 30%;
  }
`;

export const ConfirmButton = styled.button`
  border-radius: 6px;
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  font-weight: 300;
  letter-spacing: 0px;
  border: none;
  padding: 10px;
  width: 100%;
  height: 50px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s ease, color 0.3s ease;

  background-color: ${({ disabled }) => (disabled ? "#e0e0e0" : "#ED2757")};
  color: ${({ disabled }) => (disabled ? "#7a7a7a" : "white")};

  @media(min-width: 768px) {
    width: 40%;
    letter-spacing: 2px;
  }
`;

export const H1 = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 25px;
  margin-bottom: 40px;
  @media(min-width: 950px) {
    margin-bottom: 10px;
  }
`;

export const IconWrapper = styled.div`
  position: relative;
  margin-top: -30px;
  z-index: 1;
`;