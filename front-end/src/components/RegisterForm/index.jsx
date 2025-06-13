import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import useRegisterForm from "../../hooks/useRegisterForm";
import {
  Main, Section, H1, Input, Label, BtnRegister,
  PasswordContainer, TogglePasswordButton, HeaderContainer, BackButton
} from "./style";

const RegisterForm = () => {
    const { info, handleChange, checkLogin, handleClick } = useRegisterForm();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <Main>
            <Section>
                <HeaderContainer>
                    <BackButton onClick={() => navigate("/login")} aria-label="Voltar para login">
                        <FaArrowLeft size={20} />
                    </BackButton>
                    <H1>Cadastro</H1>
                </HeaderContainer>


                <Label htmlFor="name">
                    Nome
                    <Input
                        id="name"
                        name="name"
                        onChange={ ({ target }) => handleChange(target) }
                        value={ info.name }
                        type="text"
                        data-testid="common_register__input-name"
                    />
                </Label>
                <Label htmlFor="email">
                    Email
                    <Input
                        id="email"
                        name="email"
                        onChange={ ({ target }) => handleChange(target) }
                        value={ info.email }
                        type="text"
                        data-testid="common_register__input-email"
                    />
                </Label>
                <Label htmlFor="password">
                    Senha
                    <PasswordContainer>
                        <Input
                            id="password"
                            name="password"
                            onChange={ ({ target }) => handleChange(target) }
                            value={ info.password }
                            type={ showPassword ? "text" : "password" }
                            data-testid="common_register__input-password"
                        />
                        <TogglePasswordButton
                            type="button"
                            onClick={togglePasswordVisibility}
                            aria-label="Toggle password visibility"
                        >
                            { showPassword ? <FaEyeSlash /> : <FaEye /> }
                        </TogglePasswordButton>
                    </PasswordContainer>
                </Label>
                <BtnRegister
                    data-testid="common_register__button-register"
                    type="button"
                    disabled={ checkLogin(info) }
                    onClick={ () => handleClick(info) }
                >
                    CADASTRAR
                </BtnRegister>
            </Section>
        </Main>
    );
}

export default RegisterForm;
