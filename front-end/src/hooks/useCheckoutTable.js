import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  addTotalPrice,
  clearCart,
  editQuantityCart,
} from "../redux/actions/cart";
import { getPrice } from "../utils/formatManipulation";

const useCheckoutTable = () => {
  const [totalPrice, setTotal] = useState("");
  const cartState = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const tableHeaderItens = [
    "Item",
    "Descrição",
    "Vendedor",
    "Quantidade",
    "Valor unitário",
    "Sub-total",
    "Remover item",
  ];

  const calculateTotal = useCallback(() => {
    if (!cartState?.length) {
      dispatch(addTotalPrice(0));
      setTotal(getPrice(0));
      return;
    }

    const total = cartState.reduce(
      (acc, { price, quantity }) => acc + Number(price * quantity),
      0,
    );

    dispatch(addTotalPrice(total));
    setTotal(getPrice(total));
  }, [cartState, dispatch]);

  useEffect(() => {
    calculateTotal();
  }, [calculateTotal, cartState]);

  const removeFromCart = (productId) => {
    const removedItem = cartState.filter((e) => e.id !== productId);
    return dispatch(editQuantityCart(removedItem));
  };

  const clearStorageCart = () => {
    Swal.fire({
      icon: "warning",
      title: "Deseja apagar todos os itens do carrinho?",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCart());
        Swal.fire("Carrinho limpo.", "", "success");
      }
    });
  };

  const getDataTestId = (key, productId) => {
    const dataTestIds = {
      number: `customer_checkout__element-order-table-item-number-${productId}`,
      name: `customer_checkout__element-order-table-name-${productId}`,
      sellerName: `customer_checkout__element-order-table-seller-name-${productId}`,
      quantity: `customer_checkout__element-order-table-quantity-${productId}`,
      unitPrice: `customer_checkout__element-order-table-unit-price-${productId}`,
      subTotal: `customer_checkout__element-order-table-sub-total-${productId}`,
      remove: `customer_checkout__element-order-table-remove-${productId}`,
      totalPrice: "customer_checkout__element-order-total-price",
    };

    return dataTestIds[key];
  };

  return {
    removeFromCart,
    totalPrice,
    tableHeaderItens,
    cartState,
    clearStorageCart,
    getDataTestId,
  };
};

export default useCheckoutTable;
