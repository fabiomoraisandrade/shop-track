import { useCheckLogin } from "../hooks";
import { CustomerHeader, ProductForm } from "../components";
import { MainTag } from "../global-styles/globalComponents";

const CustomerPage = () => {
  useCheckLogin();

  return (
    <MainTag>
      <CustomerHeader />
      <ProductForm />
    </MainTag>
  );
};

export default CustomerPage;
