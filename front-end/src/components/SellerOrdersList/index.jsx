import SellerOrderCard from "../SellerOrderCard";
import { OrderListContainer } from "../../global-styles/globalComponents";
import { useSellerOrdersList } from "../../hooks";

const SellerOrdersList = () => {
  const { orders } = useSellerOrdersList();

  return (
    <OrderListContainer>
      {orders.map((order, index) => {
        const {
          totalPrice,
          deliveryAddress,
          deliveryNumber,
          saleDate,
          status,
          id,
        } = order;

        return (
          <SellerOrderCard
            key={`order-${index}`}
            orderId={id}
            id={id}
            status={status}
            address={`${deliveryAddress}, ${deliveryNumber}`}
            totalPrice={totalPrice}
            date={saleDate}
          />
        );
      })}
    </OrderListContainer>
  );
};

export default SellerOrdersList;
