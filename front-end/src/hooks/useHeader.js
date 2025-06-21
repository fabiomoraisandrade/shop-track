import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/actions/cart";
import { persistor } from "../redux";
import getUserInfo from "../utils/getUserInfo";

const useHeader = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const userName = getUserInfo("name");
    setUser(userName);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    dispatch(clearCart());
    persistor.purge();
    navigate("/login");
  };

  return { user, logout, navigate };
};

export default useHeader;
