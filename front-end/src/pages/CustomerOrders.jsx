import { useCheckLogin } from "../hooks";
import { CustomerHeader, CustomerOrdersList } from "../components";
import { MainTag } from "../global-styles/globalComponents";

const CustomerOrders = () => {
  useCheckLogin();

  return (
    <MainTag>
      <CustomerHeader />
      <CustomerOrdersList />
    </MainTag>
  );
};

export default CustomerOrders;
