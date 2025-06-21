import io from "socket.io-client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { clearCart } from "../redux/actions/cart";
import postSale from "../services/postSale";

const API_BASE_URL = process.env.REACT_APP_API_URL;
const socket = io(API_BASE_URL);

const INITIAL_BODY = {
  deliveryAddress: "",
  deliveryNumber: "",
};

const useConfirmOrder = () => {
  const [bodyInfo, setBodyInfo] = useState(INITIAL_BODY);
  const [disabledBtn, setDisabledBtn] = useState(true);

  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitSale = async () => {
    try {
      const sale = await postSale({
        ...bodyInfo,
        status: "Pendente",
        products: cartState.cart,
      });

      if (!sale) {
        toast.error("Erro inesperado ao criar a venda.");
        console.error("Erro: Resposta inesperada da API ao criar a venda");
        return;
      }

      socket.emit("statusUpdated");
      dispatch(clearCart());

      const salesArray = Array.isArray(sale) ? sale : [sale];

      if (salesArray.length === 1) {
        return navigate(`/customer/orders/${salesArray[0].id}`);
      }

      return navigate(`/customer/orders`);
    } catch (err) {
      const status = err.response?.status;
      const apiErrorMessage = err.response?.data?.message;

      if (status === 400) {
        toast.error(
          apiErrorMessage || "Dados inválidos para concluir a venda.",
        );
      } else if (status === 404) {
        toast.error(
          apiErrorMessage ||
            "Produto(s) não encontrado(s). Verifique seu carrinho.",
        );
      } else if (status === 500) {
        toast.error(
          apiErrorMessage ||
            "Erro interno do servidor. Tente novamente mais tarde.",
        );
      } else {
        toast.error(
          "Erro ao realizar a venda. Verifique sua conexão e tente novamente.",
        );
      }

      console.error("Erro ao criar venda:", err);
    }
  };

  const handleChange = (target) => {
    setBodyInfo((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  useEffect(() => {
    const { deliveryAddress, deliveryNumber } = bodyInfo;
    if (!deliveryAddress || !deliveryNumber || cartState.cart.length < 1) {
      return setDisabledBtn(true);
    }

    return setDisabledBtn(false);
  }, [bodyInfo, cartState.cart]);

  return { handleChange, disabledBtn, submitSale, bodyInfo };
};

export default useConfirmOrder;
