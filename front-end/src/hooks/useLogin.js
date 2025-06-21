import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import Typography from "@mui/material/Typography";
import postLogin from "../services/postLogin";
import getUserInfo from "../utils/getUserInfo";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bool, setBool] = useState(true);

  const navigate = useNavigate();

  const generateCopyright = () => (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      style={{ fontSize: "12px" }}
    >
      {"Copyright ©"}
      <Link
        to="https://github.com/fabiomoraisandrade/shop-track"
        color="inherit"
        href="https://mui.com/material-ui/"
        style={{ fontSize: "14px" }}
      >
        Shop Track
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      userInfo.isAdmin ? navigate("/admin/manage") : navigate("/products");
    }
  }, [navigate]);

  const handleChange = (target) => {
    if (target.name === "email") {
      return setEmail(target.value);
    }

    return setPassword(target.value);
  };

  const userLogin = async (emailUser, passwordUser) => {
    try {
      const result = await postLogin(emailUser, passwordUser);

      if (!result.token) {
        toast.error("Usuário ou senha inválido.");
        return setBool(false);
      }

      localStorage.setItem("user", JSON.stringify(result));

      if (result.isAdmin) {
        return navigate("/admin/manage");
      }

      return navigate("/products");
    } catch (err) {
      const apiErrorMessage = err.response?.data?.message;
      const status = err.response?.status;

      if (status === 401) {
        toast.error(apiErrorMessage || "Email ou senha inválido!");
      } else {
        toast.error("Erro ao tentar fazer login. Tente novamente mais tarde.");
      }

      console.error("Erro no login:", err);
      setBool(false);
    }
  };

  return { handleChange, email, password, userLogin, bool, generateCopyright };
};

export default useLogin;
