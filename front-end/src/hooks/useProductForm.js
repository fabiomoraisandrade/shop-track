import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postProduct from "../services/postProduct";
import { toast } from "sonner";

const useProductForm = () => {
  const [info, setInfo] = useState({ name: "", price: "", image: null });
  const [previewImage, setPreviewImage] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ name, value, files }) => {
    if (name === "price") {
      const onlyNumbers = value.replace(/\D/g, "");

      const numericValue = (Number(onlyNumbers) / 100).toFixed(2);

      setInfo((prev) => ({ ...prev, [name]: numericValue.replace(".", ",") }));
      return;
    }

    if (files && files[0]) {
      const file = files[0];

      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        console.log("Arquivo nao permitido");
        toast.warning("Apenas arquivos JPEG ou PNG são permitidos.");
        return;
      }

      setInfo((prev) => ({ ...prev, [name]: file }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const isFormInvalid = () => {
    return !info.name.trim() || !info.price || !info.image;
  };

  const handleSubmit = async () => {
    if (isFormInvalid()) {
      toast.warning("Preencha todos os campos obrigatórios.");
      return;
    }

    const seller = JSON.parse(localStorage.getItem("user"));
    if (!seller || !seller.id) {
      toast.error("Usuário não autenticado.");
    }

    const response = await postProduct(
      info.name,
      info.price,
      info.image,
      seller.id,
    );

    if (response && response.id) {
      toast.success("Produto cadastrado com sucesso!");
      navigate("/products");
    } else {
      toast.error("Erro ao cadastrar produto.");
    }
  };

  return {
    info,
    previewImage,
    handleChange,
    handleSubmit,
    isFormInvalid,
  };
};

export default useProductForm;
