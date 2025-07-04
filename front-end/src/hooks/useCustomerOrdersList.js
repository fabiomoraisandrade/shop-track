import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import getSalesFromCustomer from "../services/getSalesFromCustomer";
import getUserInfo from "../utils/getUserInfo";

const API_BASE_URL = process.env.REACT_APP_API_URL;
const socket = io(API_BASE_URL);

const useCustomerOrdersList = () => {
  const mounted = useRef(false);
  const [orders, setOrders] = useState([]);
  const userId = getUserInfo("id");

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    const updateOrder = () => {
      if (mounted.current) {
        getSalesFromCustomer(userId).then((response) => setOrders(response));
      }
    };

    updateOrder();

    socket.on("statusUpdated", () => updateOrder());
  }, [userId]);

  return { orders };
};

export default useCustomerOrdersList;
