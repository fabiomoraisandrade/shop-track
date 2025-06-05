import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import getProducts from '../services/getProducts';
import { getPrice } from '../utils/formatManipulation';

const useProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const cartProducts = useSelector((state) => state.cart.cart);

    useEffect(() => {
        let isMounted = true;

        const fetchProducts = async () => {
            try {
                const result = await getProducts();

                const user = JSON.parse(localStorage.getItem('user'));
                const userId = user?.id;

                const filteredProducts = result.filter((product) => product.sellerId !== userId);

                if (isMounted) setProducts(filteredProducts);
            } catch (err) {
                console.error('Erro ao buscar produtos:', err);
            }
        };

        fetchProducts();

        return () => {
            isMounted = false;
        };
    }, []);

    const manipulatePrice = () => {
        const total = cartProducts.reduce(
            (acc, cur) => acc + Number(cur.price) * Number(cur.quantity),
            0
        );
        return getPrice(total);
    };

    return { products, navigate, manipulatePrice, cartProducts };
};

export default useProductList;
