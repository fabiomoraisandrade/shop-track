import { HeaderContainer } from "../../global-styles/globalComponents";
import { Flex, NavList, RedirectButton, AdminIconLogo } from "./styles";
import { useHeader } from "../../hooks";

const AdmHeader = () => {
  const { logout, user } = useHeader();

  return (
    <HeaderContainer>
      <Flex>
        <AdminIconLogo />
        <NavList>
          <RedirectButton
            data-testid="customer_products__element-navbar-link-orders"
            type="button"
          >
            Gerenciar Usuários
          </RedirectButton>
          <RedirectButton
            data-testid="customer_products__element-navbar-user-full-name"
            type="button"
          >
            {user}
          </RedirectButton>
          <RedirectButton
            data-testid="customer_products__element-navbar-link-logout"
            type="button"
            onClick={() => logout()}
          >
            Sair
          </RedirectButton>
        </NavList>
      </Flex>
    </HeaderContainer>
  );
};

export default AdmHeader;
