import ProductsTable from "../ProductsTable";
import { useCustomerOrderDetails } from "../../hooks";
import { getDate, getPrice, padNumber } from "../../utils/formatManipulation";
import {
  ProductListContainer,
  DetailsTitle,
  StatusField,
  DetailsContainer,
  TotalPrice,
  ConfirmButton,
  PaperDiv,
} from "./styles";

const dataTestIds = {
  id: "customer_order_details__element-order-details-label-order-id",
  seller: "customer_order_details__element-order-details-label-seller-name",
  date: "customer_order_details__element-order-details-label-order-date",
  status: "customer_order_details__element-order-details-label-delivery-status",
  price: "customer_order_details__element-order-total-price",
  delivery: "customer_order_details__button-delivery-check",
};

const PAD = 4;

const CustomerOrderDetailsField = () => {
  const { orderId, order, deliveredDisplay, receiveOrder } =
    useCustomerOrderDetails();

  if (!order.products) return <p>loading</p>;

  const {
    totalPrice,
    saleDate,
    status,
    products,
    seller: { name },
  } = order;

  return (
    <ProductListContainer>
      <DetailsTitle>Detalhes do pedido</DetailsTitle>
      <DetailsContainer>
        <StatusField>
          <span data-testid={dataTestIds.id}>
            {`Pedido ${padNumber(orderId, PAD)}`}
          </span>
          <span data-testid={dataTestIds.seller}>{`Vendedor: ${name}`}</span>
          <span data-testid={dataTestIds.date}>{getDate(saleDate)}</span>
          <span data-testid={dataTestIds.status}>{status}</span>
          <ConfirmButton
            trype="button"
            data-testid={dataTestIds.delivery}
            disabled={deliveredDisplay}
            onClick={receiveOrder}
          >
            MARCAR COMO ENTREGUE
          </ConfirmButton>
        </StatusField>
        <PaperDiv elevation={3}>
          {products ? <ProductsTable products={products} /> : null}
        </PaperDiv>
        <TotalPrice>{`Total: ${getPrice(totalPrice)}`}</TotalPrice>
      </DetailsContainer>
    </ProductListContainer>
  );
};

export default CustomerOrderDetailsField;
