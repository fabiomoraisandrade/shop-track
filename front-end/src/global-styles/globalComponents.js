import styled from 'styled-components';

export const MainTag = styled.main`
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  margin: auto;
  overflow-x: hidden;
  width: 100vw;
  background-color: whitesmoke;
  min-height: 100vh;
`;

export const HeaderContainer = styled.header`
  width: 100vw;
  height: 100px;
  margin-bottom: 50px;
`;

export const OrderListContainer = styled.section`
  width: 100vw;
  max-width: 1024px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex-wrap: wrap;
  align-items: center;
  padding: 10px;
  @media(min-width: 768px) {
    justify-content: space-around;
    flex-direction: row;
  }
`;