import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import {
  LoginPage,
  Register,
  AdmScreen,
  CustomerPage,
  RegisterProduct,
  CustomerCheckout,
  CustomerOrders,
  CustomerOrderDetails,
  SellerOrders,
  SellerOrderDetails,
} from "./pages";
import "./App.css";

const App = () => (
  <>
    <Routes>
      <Route exact path="/login" element={<LoginPage />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/admin/manage" element={<AdmScreen />} />
      <Route exact path="/products" element={<CustomerPage />} />
      <Route exact path="/products/register" element={<RegisterProduct />} />
      <Route exact path="/customer/checkout" element={<CustomerCheckout />} />
      <Route exact path="/customer/orders" element={<CustomerOrders />} />
      <Route
        exact
        path="/customer/orders/:id"
        element={<CustomerOrderDetails />}
      />
      <Route exact path="/seller/orders" element={<SellerOrders />} />
      <Route exact path="/seller/orders/:id" element={<SellerOrderDetails />} />
      <Route exact path="/" element={<Navigate to="/login" />} />
    </Routes>
    <Toaster richColors position="top-center" />
  </>
);

export default App;
