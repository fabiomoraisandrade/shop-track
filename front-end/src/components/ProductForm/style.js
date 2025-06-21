import styled from "styled-components";

export const Main = styled.section`
  width: 100%;
  // height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const H1 = styled.h1`
  margin-top: 30px;
  font-size: 25px;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  max-width: 500px;
  background-color: #fff;
  box-shadow: 0px 0px 20px #404040;
  border-radius: 6px;
  position: relative;
  padding: 30px 20px;

  @media (min-width: 768px) {
    padding: 0 50px;
  }
`;

export const Input = styled.input`
  padding: 12px;
  margin: 5px 0px 15px 0px;
  font-size: 18px;
  width: 100%;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  width: 80%;
`;

export const BtnRegister = styled.button`
  width: 80%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  background-color: ${({ disabled }) => (disabled ? "#a6a4bd" : "#4B39FF")};
  color: #fff;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};

  ${({ disabled }) =>
    !disabled &&
    `&:hover {
            background-color: #22197d;
        }`};

  margin-bottom: 30px;

  @media (min-width: 768px) {
    height: 50px;
  }
`;

export const P = styled.p`
  color: red;
  font-size: 15px;
`;

export const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const TogglePasswordButton = styled.button`
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #333;
  display: flex;
  align-items: center;

  &:hover {
    color: #4b39ff;
  }
`;

export const HeaderContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const BackButton = styled.button`
  position: absolute;
  left: 0;
  background: none;
  border: none;
  color: #555;
  cursor: pointer;
  padding: 4px 8px;
  display: flex;
  align-items: center;

  &:hover {
    color: #000;
  }
`;

export const PreviewImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  border: 1px solid #ccc;
  border-radius: 8px;
`;
