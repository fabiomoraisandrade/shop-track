import { useCheckLogin } from "../hooks";
import { CustomerHeader, SellerOrderDetailsField } from "../components";

const SellerOrderDetails = () => {
    useCheckLogin();

    return (
        <>
            <CustomerHeader />
            <SellerOrderDetailsField />
        </>
    );
};

export default SellerOrderDetails;