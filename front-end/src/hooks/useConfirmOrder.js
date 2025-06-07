import io from "socket.io-client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/actions/cart";
import getUserInfo from "../utils/getUserInfo";
import getSalesFromCustomer from "../services/getSalesFromCustomer";
import postSale from "../services/postSale";

const API_BASE_URL = process.env.REACT_APP_API_URL;
const socket = io(API_BASE_URL);

const INITIAL_BODY = {
    deliveryAddress: '',
    deliveryNumber: '',
}

const useConfirmOrder = () => {
    const [bodyInfo, setBodyInfo] = useState(INITIAL_BODY);
    const [disableBtn, setDisabledBtn] = useState(true);

    const userId = getUserInfo("id");
    const cartState = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitSale = async () => {
        const sale = await postSale({
            status: "Pendente",
            products: cartState.cart
        });

        socket.emit("statusUpdated");
        dispatch(clearCart());

        const userOrders = await getSalesFromCustomer(userId);
        const currentOrder = userOrders.findIndex((e) => e.id === sale.data.id);

        // retornar página de pedidos feitos depois
        return navigate(`/products`);
    }

    const handleChange = (target) => {
        setBodyInfo((prevState) => ({ ...prevState, [target.name]: target.value }));
    }

    useEffect(() => {
        const { deliveryAddress, deliveryNumber } = bodyInfo;
        if (!deliveryAddress || !deliveryNumber || (cartState.cart.length < 1)) {
            return setDisabledBtn(true);
        }

        return setDisabledBtn(false);

    }, [bodyInfo, cartState.cart]);

    return { handleChange, disableBtn, submitSale, bodyInfo };
}

export default useConfirmOrder;