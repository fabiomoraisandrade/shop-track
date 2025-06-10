import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import getSalesFromCustomer from "../services/getSalesFromCustomer";
import putSale from "../services/putSale";
import getUserInfo from "../utils/getUserInfo";

const API_BASE_URL = process.env.REACT_APP_API_URL;
const socket = io(API_BASE_URL);

const useCustomerOrderDetails = () => {
    const navigate = useNavigate();
    const mounted = useRef(false);
    const { id: orderId } = useParams();
    const [order, setOrder] = useState({});
    const [deliveredDisplay, setDeliveredDisplay] = useState(true);

    const userId = getUserInfo("id");

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        }
    }, []);

    useEffect(() => {
        const updateOrder = async () => {
            if (mounted.current) {
                const sales = await getSalesFromCustomer(userId);
                if (sales.error) return navigate("/customer/orders");

                const sale = sales.find((s) => s.id === Number(orderId));
                if(!sale) return navigate("/customer/orders");

                setOrder(sale);
            }
        }

        updateOrder();
        socket.on("statusUpdated", () => updateOrder());
    }, [orderId, userId, navigate]);

    useEffect(() => {
        if (mounted.current && order.status && order.status === "Em Trânsito") {
            setDeliveredDisplay(false);
        }
        if (mounted.current && order.products && order.products.length === 0) {
            getSalesFromCustomer(userId).then((response) => setOrder(response[orderId - 1]));
        }
    }, [order, orderId, userId]);

    const receiveOrder = async () => {
        await putSale({ ...order, status: "Entregue" });
        setDeliveredDisplay(true);

        socket.emit("statusUpdated");
    };

    return { orderId, order, deliveredDisplay, receiveOrder };
};

export default useCustomerOrderDetails;