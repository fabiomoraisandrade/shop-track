import { useAdmin } from "../../hooks";
import { H1 } from "../FormLogin/style";
import { AdmSection, Form, Input, Button, Label } from "./styles";

const AdmInputs = () => {
  const { handleChange, checkAdmin, submitUser, info } = useAdmin();

  return (
    <AdmSection>
      <H1>Cadastrar novo usuário</H1>
      <Form>
        <Label htmlFor="adminName">
          Nome
          <Input
            id="adminName"
            name="name"
            value={info.name}
            type="text"
            placeholder="Nome e sobrenome"
            data-testid="admin_manage__input-name"
            onChange={({ target }) => handleChange(target)}
          />
        </Label>
        <Label htmlFor="admEmail">
          Email
          <Input
            id="admEmail"
            name="email"
            value={info.email}
            type="email"
            placeholder="seu-email@site.com.br"
            data-testid="admin_manage__input-email"
            onChange={({ target }) => handleChange(target)}
          />
        </Label>
        <Label htmlFor="admPassword">
          Senha
          <Input
            id="admPassword"
            name="password"
            value={info.password}
            type="password"
            placeholder="******"
            data-testid="admin_manage__input-password"
            onChange={({ target }) => handleChange(target)}
          />
        </Label>
        <Label>
          Administrador?
          <Input
            id="isAdminCheckbox"
            name="isAdmin"
            type="checkbox"
            checked={info.isAdmin}
            data-testid="admin_manage__checkbox-role"
            onChange={({ target }) => handleChange(target)}
          />
        </Label>
        <Button
          type="button"
          data-testid="admin_manage__button-register"
          onClick={() => submitUser(info)}
          disabled={checkAdmin(info)}
        >
          Cadastrar
        </Button>
      </Form>
    </AdmSection>
  );
};

export default AdmInputs;
