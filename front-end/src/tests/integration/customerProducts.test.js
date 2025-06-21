import userEvent from "@testing-library/user-event";
import axios from "axios";
import { screen } from "@testing-library/dom";
import { act } from "react-dom/test-utils";
import renderWithReduxAndRouter from "./renderWithReduxAndRouter";
import usersAPI from "./mocks/usersMock";
import productMock from "./mocks/productMock";
import { customerUserInfoMock } from "./mocks/localStorageMock";
import CustomerPage from "../../pages/CustomerPage";

jest.mock("axios", () => ({
  create: jest.fn().mockReturnThis(),
  interceptors: {
    request: { eject: jest.fn(), use: jest.fn() },
    response: { eject: jest.fn(), use: jest.fn() },
  },
  get: jest.fn(() => Promise.resolve()),
}));

describe("Testa pagina de produtos do consumidor:", () => {
  beforeEach(() => {
    jest
      .spyOn(Object.getPrototypeOf(window.localStorage), "getItem")
      .mockImplementation(customerUserInfoMock);
    axios.get.mockImplementation((path) =>
      Promise.resolve(
        path === "/users" ? { data: usersAPI } : { data: productMock },
      ),
    );
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("Header do consumidor", () => {
    beforeEach(async () => {
      await act(async () => renderWithReduxAndRouter(<CustomerPage />));
    });

    it("Nome do consumidor esta no Header", () => {
      const userName = screen.getByTestId(
        "customer_products__element-navbar-user-full-name",
      );
      expect(userName).toBeDefined();
      expect(userName.innerHTML).toBe("Usuario teste 1");
    });

    it('Existe um botão "sair" que faz logout', () => {
      const exitButton = screen.getByRole("button", { name: /sair/i });
      expect(exitButton).toBeDefined();
    });
  });

  describe("O card dos produtos contém as informações:", () => {
    beforeEach(async () => {
      await act(async () => renderWithReduxAndRouter(<CustomerPage />));
    });

    it("imagem do produto", () => {
      const productImg = screen.getByTestId(
        "customer_products__img-card-bg-image-1",
      );
      expect(productImg).toBeDefined();
    });

    it("Nome do produto", () => {
      const productName = screen.getByTestId(
        "customer_products__element-card-title-1",
      );
      expect(productName).toBeDefined();
    });

    it("Preço do produto", () => {
      const productPrice = screen.getByTestId(
        "customer_products__element-card-price-1",
      );
      expect(productPrice).toBeDefined();
    });
  });

  describe("Adiciona produtos ao carrinho", () => {
    beforeEach(async () => {
      await act(async () => renderWithReduxAndRouter(<CustomerPage />));
    });

    it("existem botões para mudar a quantidade de produto no carrinho", async () => {
      const addButton = screen.getByTestId(
        "customer_products__button-card-add-item-1",
      );
      const subButton = screen.getByTestId(
        "customer_products__button-card-rm-item-1",
      );
      expect(addButton).toBeDefined();
      expect(subButton).toBeDefined();
    });

    it("Ao clicar no botão de adicionar, adiciona uma unidade ao carrinho", () => {
      const addButton = screen.getByTestId(
        "customer_products__button-card-add-item-1",
      );
      const quantityInput = screen.getByTestId(
        "customer_products__input-card-quantity-1",
      );
      userEvent.click(addButton);
      expect(quantityInput).toHaveValue(1);
    });

    it("Ao clicar no botão de subtrair, remove uma unidade ao carrinho", () => {
      const addButton = screen.getByTestId(
        "customer_products__button-card-add-item-1",
      );
      userEvent.click(addButton);
      const subButton = screen.getByTestId(
        "customer_products__button-card-rm-item-1",
      );
      const quantityInput = screen.getByTestId(
        "customer_products__input-card-quantity-1",
      );
      userEvent.click(subButton);
      expect(quantityInput).toHaveValue(0);
    });

    it("A quantidade não aceita números negativos", () => {
      const subButton = screen.getByTestId(
        "customer_products__button-card-rm-item-1",
      );
      const quantityInput = screen.getByTestId(
        "customer_products__input-card-quantity-1",
      );
      userEvent.click(subButton);
      expect(quantityInput).toHaveValue(0);
    });

    it("É possível adicionar quantidades manualmente pelo input", async () => {
      const quantityInput = screen.getByTestId(
        "customer_products__input-card-quantity-1",
      );
      userEvent.type(quantityInput, "25");
      const addButton = screen.getByTestId(
        "customer_products__button-card-add-item-1",
      );
      userEvent.click(addButton);
      expect(quantityInput).toHaveValue(26);
    });
  });

  describe("Botão para redirecionar ao carrinho", () => {
    beforeEach(async () => {
      await act(async () => renderWithReduxAndRouter(<CustomerPage />));
    });

    it("Está presente na tela de produtos", () => {
      const cartButton = screen.getByTestId("customer_products__button-cart");
      expect(cartButton).toBeVisible();
    });

    it('Contém o texto "Ver carrinho"', () => {
      const cartButton = screen.getByTestId("customer_products__button-cart");
      expect(cartButton).toHaveTextContent(/ver carrinho/i);
    });

    it("Contém o valor do carrinho atualizado", () => {
      const cartButton = screen.getByTestId("customer_products__button-cart");
      expect(cartButton).toHaveTextContent(/ 0,00/i);
      const quantityInput = screen.getByTestId(
        "customer_products__input-card-quantity-1",
      );
      userEvent.type(quantityInput, "25");
      const addButton = screen.getByTestId(
        "customer_products__button-card-add-item-1",
      );
      userEvent.click(addButton);
      expect(
        screen.getByTestId("customer_products__button-cart"),
      ).toHaveTextContent(/ 57,20/i);
    });
  });
});
