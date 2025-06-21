import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import postUser from "../services/postUser";
import { addNewUser } from "../redux/actions/users";

const useAdmin = () => {
  const [bool, setBool] = useState(true);
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  });
  const dispatch = useDispatch();

  const handleChange = (target) => {
    const { name, type, value, checked } = target;
    setInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitUser = async (admInfo) => {
    try {
      const result = await postUser(admInfo);
      if (!result) return setBool(false);
      if (!result.id) return setBool(false);

      setInfo({
        name: "",
        email: "",
        password: "",
        isAdmin: false,
      });

      dispatch(addNewUser(result));

      return setBool(true);
    } catch (err) {
      const status = err.response?.status;
      const apiErrorMessage = err.response?.data?.message;

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

  const checkAdmin = (admInfo) => {
    const { name, email, password } = admInfo;
    const maxName = 12;
    const minPass = 6;
    const regex = /^[a-z0-9_.-]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;

    if (!email || !regex.test(email)) return true;
    if (!password || password.length < minPass) return true;
    if (!name || name.length < maxName) return true;
  };

  return { handleChange, checkAdmin, submitUser, info, bool };
};

export default useAdmin;
