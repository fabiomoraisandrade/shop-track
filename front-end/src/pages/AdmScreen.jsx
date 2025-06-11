import { useCheckLogin } from "../hooks";
import { AdmHeader } from "../components";
import { MainTag } from "../global-styles/globalComponents";

const AdmScreen = () => {
    useCheckLogin();

    return (
        <MainTag>
            <AdmHeader />
        </MainTag>
    );
}

export default AdmScreen;