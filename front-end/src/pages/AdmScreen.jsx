import { useCheckLogin } from "../hooks";
import { AdmHeader, AdmInputs } from "../components";
import { MainTag } from "../global-styles/globalComponents";

const AdmScreen = () => {
    useCheckLogin();

    return (
        <MainTag>
            <AdmHeader />
            <AdmInputs />
        </MainTag>
    );
}

export default AdmScreen;