import { useCheckLogin } from "../hooks";
import { CustomerHeader, ProductList } from "../components";
import { MainTag } from "../global-styles/globalComponents";

const CustomerPage = () => {
  useCheckLogin();

  return (
    <MainTag>
      <CustomerHeader />
      <ProductList />
    </MainTag>
  );
};

export default CustomerPage;
