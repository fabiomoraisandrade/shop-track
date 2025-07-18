import styled from "styled-components";
import { FiClock } from "react-icons/fi";
import { BsFillCheckCircleFill } from "react-icons/bs";

export const CardContainer = styled.div`
  height: 150px;
  width: 100%;
  border-radius: 6px;
  background-color: #ffff;
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.6);
  display: flex;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  @media (min-width: 768px) {
    height: 150px;
    width: 450px;
    display: flex;
  }
`;

export const OrderContainer = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background-color: #c81b78;
  color: white;
  border-radius: 6px 0 0 6px;
  p {
    font-weight: 800;
  }
`;

export const OrderDetails = styled.div`
  width: 75%;
  height: 100%;
`;

export const DetailsTop = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export const StatusContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  text-align: center;
  P {
    font-weight: 800;
    color: ${(props) => (props.status === "Pendente" ? "#93032E" : "#71B340")};
  }
`;

export const ClockIcon = styled(FiClock)`
  width: 20px;
  height: 20px;
  padding: 2px;
  border-radius: 3px;
  color: white;
  background-color: #93032e;
`;

export const CheckIcon = styled(BsFillCheckCircleFill)`
  width: 20px;
  height: 20px;
  padding: 2px;
  border-radius: 3px;
  color: white;
  background-color: #71b340;
`;

export const NumericInfo = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 0 6px 6px 0;
  text-align: center;
  span {
    font-weight: 800;
    color: #c81b78;
  }
`;

export const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: end;
  padding-right: 5%;
`;
