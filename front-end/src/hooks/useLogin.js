import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import postLogin from '../services/postLogin';
import getUserInfo from '../utils/getUserInfo';

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
            style={ { fontSize: '12px' } }
        >
            {"Copyright ©"}
            <Link to="/" color="inherit" href="https://mui.com/material-ui/" style={ { fontSize: "14px" } } >
                Fast Delivery
            </Link>
            {" "}
            {new Date().getFullYear()}
            .
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
    }

    const userLogin = async (emailUser, passwordUser) => {
        const result = await postLogin(emailUser, passwordUser);
        if (!result.token) return setBool(false);

        const userInfo = JSON.stringify(result);
        localStorage.setItem("user", userInfo);

        if (result.isAdmin) {
            return navigate("/admin/manage");
        }

        return navigate("/products");
    };

    return { handleChange, email, password, userLogin, bool, generateCopyright };
}

export default useLogin;