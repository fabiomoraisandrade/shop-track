import { useCheckLogin } from "../hooks";
import { CustomerHeader, SellerOrdersList } from "../components";

const SellerOrders = () => {
  useCheckLogin();

  return (
    <>
      <CustomerHeader />
      <SellerOrdersList />
    </>
  );
};

export default SellerOrders;
