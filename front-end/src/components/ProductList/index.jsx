import ProductCard from "../ProductCard";
import { useProductList } from "../../hooks";
import { ProductListContainer, ProductSection, FloatButtonCart } from './styles';

const ProductList = () => {
    const { products, navigate, manipulatePrice, cartProducts } = useProductList();

    return (
        <ProductListContainer>
            <ProductSection>
                {products.length > 0
                    ? products.map((e) => (
                    <ProductCard 
                        product={ e }
                        key={ e.id }
                    />
                )) : null}
            </ProductSection>
            <FloatButtonCart 
                type="button"
                onClick={ () => navigate("/customer/checkout") }
                data-testid="customer_products__button-cart"
                disabled={ cartProducts.length < 1 }
            >
                <h3 data-testid="customer_products__checkout-bottom-value">
                    { `Ver Carrinho: ${manipulatePrice()}` }
                </h3>
            </FloatButtonCart>
        </ProductListContainer>
    );
}

export default ProductList;