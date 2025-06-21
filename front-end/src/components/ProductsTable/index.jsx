import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { getPrice } from "../../utils/formatManipulation";

const { arrayOf, shape, string, number } = PropTypes;

const getDataTestId = (key, index) => {
  const order = index + 1;

  const dataTestIds = {
    number: `order_details__element-order-table-item-number-${order}`,
    name: `order_details__element-order-table-name-${order}`,
    quantity: `order_details__element-order-table-quantity-${order}`,
    unitPrice: `order_details__element-order-table-unit-price-${order}`,
    subTotal: `order_details__element-order-table-sub-total-${order}`,
  };

  return dataTestIds[key];
};

const ProductsTable = ({ products }) => (
  <Table size="medium">
    <TableHead>
      <TableRow>
        <TableCell>Item</TableCell>
        <TableCell>Descrição</TableCell>
        <TableCell>Quantidade</TableCell>
        <TableCell>Valor Unitário</TableCell>
        <TableCell>Sub-total</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {products.map(({ name, orderInfo: { quantity }, price }, index) => (
        <TableRow key={`product-${index}`}>
          <TableCell data-testid={getDataTestId("number", index)}>
            {index + 1}
          </TableCell>
          <TableCell data-testid={getDataTestId("name", index)}>
            {name}
          </TableCell>
          <TableCell data-testid={getDataTestId("quantity", index)}>
            {quantity}
          </TableCell>
          <TableCell data-testid={getDataTestId("unitPrice", index)}>
            {getPrice(price)}
          </TableCell>
          <TableCell data-testid={getDataTestId("subTotal", index)}>
            {getPrice(price * quantity)}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

ProductsTable.propTypes = {
  products: arrayOf(
    shape({
      name: string.isRequired,
      orderInfo: shape({ quantity: number.isRequired }).isRequired,
      price: string.isRequired,
    }),
  ).isRequired,
};

export default ProductsTable;
