import { useRegisterButton } from "../../hooks";
import Button from "./style";

const RegisterButton = () => {
  const { redirectRegister } = useRegisterButton();

  return (
    <Button
      data-testid="common_login__button-register"
      type="button"
      onClick={() => redirectRegister()}
    >
      Ainda não possuo conta
    </Button>
  );
};

export default RegisterButton;
