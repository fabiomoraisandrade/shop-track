import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { editQuantityCart } from "../redux/actions/cart";

const useCartQuantity = (product) => {
    const [quantity, setQuantity] = useState(0);
    const dispatch = useDispatch();
    const cartState = useSelector((state) => state.cart.cart);

    useEffect(() => {
        const targetProduct = cartState.find((e) => e.id === product.id);
        if (targetProduct) {
            setQuantity(targetProduct.quantity);
        } else {
            setQuantity(0);
        }
    }, [cartState, product.id]);

    const updateCart = (newQuantity) => {
        const updatedProduct = { ...product, quantity: newQuantity };
        const filteredCart = cartState.filter((e) => e.id !== product.id);

        if (newQuantity > 0) {
            dispatch(editQuantityCart([...filteredCart, updatedProduct]));
        } else {
            dispatch(editQuantityCart(filteredCart));
        }

        setQuantity(newQuantity);
    };

    const addCartProduct = () => {
        updateCart(quantity + 1);
    };

    const subtractCartProduct = () => {
        updateCart(Math.max(quantity - 1, 0));
    };

    const handleQuantityChange = (target) => {
        const value = Number(target.value);
        if (!isNaN(value) && value >= 0) {
            updateCart(value);
        }
    };

    const changeProductQuantity = (operator) => {
        if (operator === "-") {
            if (quantity > 0) subtractCartProduct();
        } else {
            addCartProduct();
        }
    };

    return { changeProductQuantity, quantity, handleQuantityChange };
};

export default useCartQuantity;
