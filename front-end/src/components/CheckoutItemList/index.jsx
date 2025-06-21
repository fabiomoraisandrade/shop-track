import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { FaTrashAlt } from "react-icons/fa";
import {
  CheckoutItensContainer,
  H1,
  TotalContainer,
  PaperDiv,
  Div,
} from "./styles";
import { getPrice } from "../../utils/formatManipulation";
import { useCheckoutTable } from "../../hooks";

const CheckoutItemList = () => {
  const {
    totalPrice,
    removeFromCart,
    tableHeaderItens,
    cartState,
    clearStorageCart,
    getDataTestId,
  } = useCheckoutTable();

  return (
    <CheckoutItensContainer>
      <Div>
        <H1>Finalizar Pedido</H1>
        <Button
          variant="outlined"
          endIcon={<FaTrashAlt />}
          onClick={() => clearStorageCart()}
          color="secondary"
        >
          Apagar carrinho
        </Button>
      </Div>
      <PaperDiv>
        <Table size="medium">
          <TableHead>
            <TableRow>
              {tableHeaderItens.map((e) => (
                <TableCell key={e}>{e}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {cartState
              ? cartState.map((e, index) => (
                  <TableRow key={e.id}>
                    <TableCell data-testid={getDataTestId("number", index)}>
                      {index + 1}
                    </TableCell>
                    <TableCell data-testid={getDataTestId("name", index)}>
                      {e.name}
                    </TableCell>
                    <TableCell data-testid={getDataTestId("sellerName", index)}>
                      {e.seller.name}
                    </TableCell>
                    <TableCell data-testid={getDataTestId("quantity", index)}>
                      {e.quantity}
                    </TableCell>
                    <TableCell data-testid={getDataTestId("unitPrice", index)}>
                      {getPrice(e.price)}
                    </TableCell>
                    <TableCell data-testid={getDataTestId("subTotal", index)}>
                      {getPrice(e.price * e.quantity)}
                    </TableCell>
                    <TableCell data-testid={getDataTestId("remove", index)}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => removeFromCart(e.id)}
                      >
                        Remover
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </PaperDiv>
      <TotalContainer>
        <h1 data-testid={getDataTestId("totalPrice")}>
          {" "}
          {`Total: ${totalPrice}`}{" "}
        </h1>
      </TotalContainer>
    </CheckoutItensContainer>
  );
};

export default CheckoutItemList;
