import { FaStore } from 'react-icons/fa';
import { useLogin } from '../../hooks';
import checkForm from '../../utils';
import { Button, Section, Input,
  Label, Main, H1, P, ButtonsContainer, Typography } from './style';
import RegisterButton from '../RegisterButton';

const FormLogin = () => {
    const { handleChange, email, password, userLogin, bool, generateCopyright } = useLogin();
    
    return (
        <Main>
            <Section>
                <FaStore size={70} color="#4B39FF" style={{ marginBottom: '1rem' }} />
                <H1>Login</H1>
                <Label htmlFor="inputEmail">
                    Email
                    <Input 
                        name="email"
                        value={ email }
                        type="text"
                        placeholder="email@email.com.br"
                        data-testid="common_login__input-email"
                        onChange={ ({ target }) => handleChange(target) }
                    />
                </Label>
                <Label htmlFor="inputPassword">
                    Senha
                    <Input 
                        name="password"
                        value={ password }
                        type="password"
                        placeholder="******"
                        data-testid="common_login__input-password"
                        onChange={ ({ target }) => handleChange(target) }
                    />
                </Label>
                <ButtonsContainer>
                    <Button
                        disabled={ checkForm(email, password) }
                        type="button"
                        data-testid="common_login__button-login"
                        onClick={ () => userLogin(email, password) }
                    >
                        LOGIN
                    </Button>
                    <RegisterButton />
                    <P 
                        data-testid="common_login__element-invalid-email"
                        hidden={ bool }
                    >
                        Email ou senha inválido
                    </P>
                </ButtonsContainer>
                <Typography>{generateCopyright()}</Typography>
            </Section>
        </Main>
    );
}

export default FormLogin;