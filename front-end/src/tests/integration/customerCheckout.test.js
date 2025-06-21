import axios from "axios";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/dom";
import { act } from "react-dom/test-utils";
import renderWithReduxAndRouter from "./renderWithReduxAndRouter";
import usersAPI from "./mocks/usersMock";
import customerOrdersMock from "./mocks/ordersMock";
import { customerUserInfoMock } from "./mocks/localStorageMock";
import cartItems from "./mocks/checkoutMocks";
import { CustomerCheckout } from "../../pages";

jest.mock("socket.io-client", () =>
  jest.fn(() => ({
    emit: jest.fn(),
    on: jest.fn(),
  })),
);

jest.mock("axios", () => ({
  create: jest.fn().mockReturnThis(),
  interceptors: {
    request: { eject: jest.fn(), use: jest.fn() },
    response: { eject: jest.fn(), use: jest.fn() },
  },
  get: jest.fn(() => Promise.resolve()),
  post: jest.fn(() => Promise.resolve()),
}));

describe("Testa pagina de checkout do consumidor:", () => {
  beforeEach(() => {
    jest
      .spyOn(Object.getPrototypeOf(window.localStorage), "getItem")
      .mockImplementation(customerUserInfoMock);

    axios.get.mockImplementation((path) =>
      Promise.resolve(
        path === "/users" ? { data: usersAPI } : { data: customerOrdersMock },
      ),
    );
    axios.post.mockResolvedValue({ data: customerOrdersMock[0] });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("Tabela dos itens presentes do carrinho de compras", () => {
    beforeEach(async () => {
      await act(async () =>
        renderWithReduxAndRouter(<CustomerCheckout />, {
          initialState: cartItems,
        }),
      );
    });

    it("Os itens do estado são renderizados no carrinho de compras", () => {
      const item1Name = screen.getByTestId(
        "customer_checkout__element-order-table-name-0",
      );
      const item1Quantity = screen.getByTestId(
        "customer_checkout__element-order-table-quantity-0",
      );
      const item2Name = screen.getByTestId(
        "customer_checkout__element-order-table-name-1",
      );
      const item2Quantity = screen.getByTestId(
        "customer_checkout__element-order-table-quantity-1",
      );
      expect(item1Name).toBeDefined();
      expect(item1Name.innerHTML).toBe("Skol Lata 250ml");
      expect(item1Quantity.innerHTML).toBe("7");
      expect(item2Name).toBeDefined();
      expect(item2Name.innerHTML).toBe("Heineken 600ml");
      expect(item2Quantity.innerHTML).toBe("6");
    });

    it("O carrinho contém um elemento informando o valor total da compra", () => {
      const totalPrice = screen.getByTestId(
        "customer_checkout__element-order-total-price",
      );
      expect(totalPrice).toBeDefined();
      expect(totalPrice).toHaveTextContent("Total: R$ 123,39");
    });

    it("O botão de exclusão de um item exclui-o com todas suas quantidades do carrinho", () => {
      const item1Name = screen.getByTestId(
        "customer_checkout__element-order-table-name-0",
      );
      expect(item1Name).toBeDefined();
      const rmButton = screen.getAllByRole("button", { name: "Remover" });
      userEvent.click(rmButton[0]);
      expect(rmButton[0]).not.toBeInTheDocument();
      expect(item1Name).not.toBeInTheDocument();
    });

    it("Após excluir um item o valor total é atualizado", async () => {
      const item1Name = screen.getByTestId(
        "customer_checkout__element-order-table-name-0",
      );
      expect(item1Name).toBeDefined();
      const rmButton = screen.getAllByRole("button", { name: "Remover" });
      const totalPrice = screen.getByTestId(
        "customer_checkout__element-order-total-price",
      );
      expect(totalPrice).toBeDefined();
      expect(totalPrice.innerHTML.trim()).toBe("Total: R$ 123,39");
      userEvent.click(rmButton[0]);
      expect(rmButton[0]).not.toBeInTheDocument();
      expect(item1Name).not.toBeInTheDocument();
      await waitFor(() =>
        expect(totalPrice.innerHTML.trim()).toBe("Total: R$ 107,99"),
      );
    });
  });

  describe("Confirmação de compra no formulário", () => {
    beforeEach(async () => {
      await act(async () =>
        renderWithReduxAndRouter(<CustomerCheckout />, {
          initialState: cartItems,
        }),
      );
    });

    it("O botão de confirmar compra está desativado", () => {
      const confirmButton = screen.getByRole("button", {
        name: /finalizar pedido/i,
      });
      expect(confirmButton).toBeInTheDocument();
      expect(confirmButton).toHaveProperty("disabled", true);
    });

    it("Após preencher o formulário de endereço o botão de confirmar fica ativo", () => {
      const confirmButton = screen.getByRole("button", {
        name: /finalizar pedido/i,
      });
      expect(confirmButton).toBeInTheDocument();
      expect(confirmButton).toHaveProperty("disabled", true);
      const inputAddress = screen.getByRole("textbox", {
        name: /endereço/i,
      });
      const inputNumber = screen.getByRole("spinbutton", {
        name: /número/i,
      });
      userEvent.type(inputAddress, "Av Aurellion Mid");
      userEvent.type(inputNumber, "911");
      expect(confirmButton).toHaveProperty("disabled", false);
    });

    it('Finalizando a compra o usuário é redirecionado para "/customer/orders/1"', async () => {
      const confirmButton = screen.getByRole("button", {
        name: /finalizar pedido/i,
      });
      const inputAddress = screen.getByRole("textbox", {
        name: /endereço/i,
      });
      const inputNumber = screen.getByRole("spinbutton", {
        name: /número/i,
      });
      userEvent.type(inputAddress, "Av Aurellion Mid");
      userEvent.type(inputNumber, "911");
      userEvent.click(confirmButton);
      const products = screen.getByRole("button", {
        name: /produtos/i,
      });
      userEvent.click(products);
    });
  });
});
