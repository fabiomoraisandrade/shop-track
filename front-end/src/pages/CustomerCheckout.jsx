import { useCheckLogin } from '../hooks';
import { CustomerHeader, CheckoutItemList } from "../components";
import { MainTag } from '../global-styles/globalComponents';

const CustomerCheckout = () => {
    useCheckLogin();

    return (
        <MainTag>
            <CustomerHeader />
            <CheckoutItemList />
        </MainTag>
    );
}

export default CustomerCheckout;