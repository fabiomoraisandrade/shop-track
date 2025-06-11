import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import getSalesFromSeller from "../services/getSalesFromSeller";
import putSale from "../services/putSale";
import getUserInfo from "../utils/getUserInfo";

const API_BASE_URL = process.env.REACT_APP_API_URL;
const socket = io(API_BASE_URL);

const useSellerOrderDetails = () => {
    const navigate = useNavigate();
    const mounted = useRef(false);
    const { id: orderId } = useParams();
    const [order, setOrder] = useState({});
    const [preparingDisplay, setPreparingDisplay] = useState(true);
    const [dispatchDisplay, setDispatchDisplay] = useState(true);

    const userId = getUserInfo("id");

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    useEffect(() => {
        const updateOrder = async () => {
            if (mounted.current) {
                const sales = await getSalesFromSeller(userId);
                if (sales.error) return navigate("/seller/orders");

                const sale = sales.find((s) => s.id === Number(orderId));
                if(!sale) return navigate("/seller/orders");

                setOrder(sale);
            }
        };

        updateOrder();

        socket.on("statusUpdated", () => updateOrder());
    }, [orderId, userId, navigate]);

    useEffect(() => {
        if (order.status && order.status === "Pendente") {
            setPreparingDisplay(false);
        } else {
            setPreparingDisplay(true);
        }

        if (order.status && order.status === "Preparando") {
            setDispatchDisplay(false);
        } else {
            setDispatchDisplay(true);
        }
    }, [order]);

    const prepareOrder = async () => {
        await putSale({ ...order, status: "Preparando" });
        setOrder({ ...order, status: "Preparando" });

        socket.emit("statusUpdated");
    };

    const dispatchOrder = async () => {
        await putSale({ ...order, status: "Em Trânsito" });
        setOrder({ ...order, status: "Em Trânsito" });

        socket.emit("statusUpdated");
    };

    return { orderId, order, preparingDisplay, dispatchDisplay, prepareOrder, dispatchOrder };
};

export default useSellerOrderDetails;