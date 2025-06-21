import { useNavigate } from "react-router-dom";
import {
  Main,
  Section,
  H1,
  Input,
  Label,
  BtnRegister,
  HeaderContainer,
  BackButton,
  PreviewImage,
} from "./style";
import { FaArrowLeft } from "react-icons/fa";
import useProductForm from "../../hooks/useProductForm";

const ProductForm = () => {
  const { info, previewImage, handleChange, handleSubmit, isFormInvalid } =
    useProductForm();

  const navigate = useNavigate();

  return (
    <Main>
      <Section>
        <HeaderContainer>
          <BackButton
            onClick={() => navigate("/products")}
            aria-label="Voltar para produtos"
          >
            <FaArrowLeft size={20} />
          </BackButton>
          <H1>Cadastrar Produto</H1>
        </HeaderContainer>

        <Label htmlFor="name">
          Nome do Produto
          <Input
            id="name"
            name="name"
            value={info.name}
            onChange={({ target }) => handleChange(target)}
            type="text"
          />
        </Label>

        <Label htmlFor="price">
          Preço (R$)
          <Input
            id="price"
            name="price"
            value={info.price}
            onChange={({ target }) => handleChange(target)}
            type="text"
          />
        </Label>

        <Label htmlFor="image">
          Imagem do Produto
          <Input
            id="image"
            name="image"
            type="file"
            accept="image/png, image/jpeg"
            onChange={({ target }) => handleChange(target)}
          />
        </Label>

        {previewImage && (
          <PreviewImage src={previewImage} alt="Pré-visualização do produto" />
        )}

        <BtnRegister
          type="button"
          onClick={handleSubmit}
          disabled={isFormInvalid()}
        >
          Cadastrar Produto
        </BtnRegister>
      </Section>
    </Main>
  );
};

export default ProductForm;
