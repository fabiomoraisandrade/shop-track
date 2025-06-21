import { useConfirmOrder } from "../../hooks";
import CheckoutAddressForm from "../CheckoutAddressForm";
import {
  ConfirmContainer,
  PaperDiv,
  ConfirmButton,
  H1,
  MapIcon,
  IconWrapper,
} from "./styles";

const CheckoutConfirm = () => {
  const { handleChange, disabledBtn, submitSale, bodyInfo } = useConfirmOrder();

  return (
    <ConfirmContainer>
      <H1>Detalhes e endereço para entrega</H1>
      <PaperDiv elevation={3}>
        <IconWrapper>
          <MapIcon />
        </IconWrapper>
        <CheckoutAddressForm handleChange={handleChange} bodyInfo={bodyInfo} />
        <ConfirmButton
          data-testid="customer_checkout__button-submit-order"
          type="button"
          onClick={() => submitSale()}
          disabled={disabledBtn}
        >
          FINALIZAR PEDIDO
        </ConfirmButton>
      </PaperDiv>
    </ConfirmContainer>
  );
};

export default CheckoutConfirm;
