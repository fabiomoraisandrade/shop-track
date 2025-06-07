import { useCheckLogin } from '../hooks';
import { CustomerHeader, CheckoutItemList, CheckoutConfirm } from "../components";
import { MainTag } from '../global-styles/globalComponents';

const CustomerCheckout = () => {
    useCheckLogin();

    return (
        <MainTag>
            <CustomerHeader />
            <CheckoutItemList />
            <CheckoutConfirm />
        </MainTag>
    );
}

export default CustomerCheckout;