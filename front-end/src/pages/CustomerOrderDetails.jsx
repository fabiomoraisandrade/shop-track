import { useCheckLogin } from "../hooks";
import { CustomerHeader, CustomerOrderDetailsField } from "../components";

const CustomerOrderDetails = () => {
  useCheckLogin();

  return (
    <>
      <CustomerHeader />
      <CustomerOrderDetailsField />
    </>
  );
};

export default CustomerOrderDetails;
