import { useState, useEffect } from "react";
import io from "socket.io-client";
import getSalesFromCustomer from "../services/getSalesFromCustomer";
import getUserInfo from "../utils/getUserInfo";

const API_BASE_URL = process.env.REACT_APP_API_URL;
const socket = io(API_BASE_URL);

const useCustomerOrdersList = () => {
    const [orders, setOrders] = useState([]);
    const userId = getUserInfo("id");

    useEffect(() => {
        const controller = new AbortController();

        const updateOrder = async () => {
            try {
                const response = await getSalesFromCustomer(userId, { signal: controller.signal });
                setOrders(response);
            } catch (err) {
                if (err.name !== "AbortError") console.error(err);
            }
        };

        updateOrder();

        socket.on("statusUpdated", updateOrder);

        return () => {
            controller.abort();
            socket.off("statusUpdated", updateOrder);
        };
    }, [userId]);

    return { orders };
}

export default useCustomerOrdersList;