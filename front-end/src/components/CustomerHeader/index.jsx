import { HeaderContainer } from '../../global-styles/globalComponents';
import { Flex, NavList, RedirectButton, IconLogo } from './styles';
import { useHeader } from '../../hooks';

const CustomerHeader = () => {
  const { user, logout, navigate } = useHeader();

  return (
    <HeaderContainer>
      <Flex>
        <IconLogo data-testid="customer-header-logo-icon" />
        <NavList>
          <RedirectButton
            data-testid="customer_products__element-navbar-link-products"
            type="button"
            onClick={ () => navigate('/products') }
          >
            Produtos
          </RedirectButton>
          <RedirectButton
            data-testid="customer_products__element-navbar-link-orders"
            type="button"
            // onClick={ () => navigate('/customer/orders') }
          >
            Meus pedidos
          </RedirectButton>
          <RedirectButton
            data-testid="register_products__element-navbar-link-orders"
            type="button"
            onClick={ () => navigate('/products/register') }
          >
            Cadastrar produto
          </RedirectButton>
          <RedirectButton
            data-testid="customer_products__element-navbar-user-full-name"
            type="button"
            onClick={ () => navigate('/customer/products') }
          >
            { user }
          </RedirectButton>
          <RedirectButton
            data-testid="customer_products__element-navbar-link-logout"
            type="button"
            onClick={ logout }
          >
            Sair
          </RedirectButton>
        </NavList>
      </Flex>
    </HeaderContainer>
  );
};

export default CustomerHeader;
