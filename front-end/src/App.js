import { Route, Routes, Navigate } from 'react-router-dom';
import {
  LoginPage,
  Register,
} from './pages';
import './App.css';

const App = () => (
  <Routes>
    <Route exact path="/login" element={ <LoginPage /> } />
    <Route exact path="/register" element={ <Register /> } />
    <Route exact path="/" element={ <Navigate to="/login" /> } />
  </Routes>
);

export default App;
