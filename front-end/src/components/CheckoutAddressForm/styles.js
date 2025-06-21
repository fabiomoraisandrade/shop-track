import styled from "styled-components";

export const Form = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  font-family: "Montserrat", sans-serif;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const Label = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: 600;
  gap: 10px;

  input {
    width: 100%;
    height: 40px;
    padding-left: 10px;
  }

  @media (min-width: 768px) {
    width: 48%;
  }
`;
