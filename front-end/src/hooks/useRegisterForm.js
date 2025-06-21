import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import postUser from "../services/postUser";

const useRegisterForm = () => {
  const [info, setinfo] = useState({ name: "", email: "", password: "" });
  const [bool, setBool] = useState(true);

  const navigate = useNavigate();

  const handleChange = (target) => {
    const { name, value } = target;
    setinfo({
      ...info,
      [name]: value,
    });
  };

  const handleClick = async (registerInfo) => {
    const { name, email, password } = registerInfo;
    const userBody = {
      name: name,
      email: email,
      password: password,
      isAdmin: false,
    };

    try {
      const response = await postUser(userBody);
      if (!response.token) return setBool(false);

      const userInfo = JSON.stringify(response);
      localStorage.setItem("user", userInfo);

      if (response.token) return navigate("/products");
    } catch (err) {
      const apiErrorMessage = err.response?.data?.message;
      const status = err.response?.status;

      if (status === 400) {
        toast.error(
          apiErrorMessage || "Dados inválidos. Verifique e tente novamente.",
        );
      } else if (status === 409) {
        toast.error("Email já cadastrado!");
      } else if (status === 500) {
        toast.error("Erro no servidor. Tente novamente mais tarde.");
      } else {
        toast.error(
          "Erro ao tentar fazer cadastro. Tente novamente mais tarde.",
        );
      }

      console.error("Erro no cadastro:", err);
      setBool(false);
    }
  };

  const checkLogin = (registerInfo) => {
    const { name, email, password } = registerInfo;
    const maxName = 12;
    const minPass = 6;
    const regex = /^[a-z0-9_.-]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;

    if (!email || !regex.test(email)) return true;
    if (!password || password.length < minPass) return true;
    if (!name || name.length < maxName) return true;

    return false;
  };

  return { info, bool, handleChange, checkLogin, handleClick };
};

export default useRegisterForm;
