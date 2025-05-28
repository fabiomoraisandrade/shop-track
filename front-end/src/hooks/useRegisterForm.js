import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    }

    const handleClick = async (registerInfo) => {
        const { name, email, password } = registerInfo;

        const response = await postUser(name, email, password);
        if (!response.token) return setBool(false);

        const userInfo = JSON.stringify(response);
        localStorage.setItem("user", userInfo);

        if (response.token) return navigate("/products");
    }

    const checkLogin = (registerInfo) => {
    const { name, email, password } = registerInfo;
    const minName = 3;
    const minPass = 6;
    const regex = /^[a-z0-9_.-]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;

    if (!email || !regex.test(email)) return true;
    if (!password || password.length < minPass) return true;
    if (!name || name.length < minName) return true;

    return false;
}

    return { info, bool, handleChange, checkLogin, handleClick };
}

export default useRegisterForm;