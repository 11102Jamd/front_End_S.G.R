import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import RoleBasedControl from './components/RoleBasedControl';
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import MainContent from './layout/MainContent';
import Footer from './layout/Footer';
import Login from './pages/auth/Login';
import Welcome from './pages/welcome/Welcome';
import User from './pages/user/UserList';
import Input from './pages/inputs/InputList';
import Order from './pages/order/Order';
import Product from './pages/product/ProductList';
import Production from './pages/Production/Production';
import Recipe from './pages/recipe/Recipe';
import Sale from './pages/sale/Sale';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

// Layout para rutas privadas
const PrivateLayout = () => (
  <div className="app-container">
    <Sidebar />
    <div className="main-content-wrapper">
      <Header />
      <MainContent>
        <Outlet /> {/* Aquí se renderizan las rutas hijas */}
      </MainContent>
      <Footer />
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Ruta pública */}
          <Route path="/login" element={<Login />} />

          {/* Rutas privadas con layout */}
          <Route element={<PrivateRoute><PrivateLayout /></PrivateRoute>}>
            <Route index element={<Navigate to="/welcome" replace />} />
            <Route path="/welcome" element={<Welcome />} />

            <Route
              path="/usuarios"
              element={
                <RoleBasedControl allowedRoles={['Administrador','Panadero']}>
                  <User />
                </RoleBasedControl>
              }
            />

            <Route
              path="/insumos"
              element={
                <RoleBasedControl allowedRoles={['Administrador','Panadero']}>
                  <Input />
                </RoleBasedControl>
              }
            />

            <Route
              path="/production"
              element={
                <RoleBasedControl allowedRoles={['Administrador','Panadero']}>
                  <Production />
                </RoleBasedControl>
              }
            />

            <Route
              path="/recetas"
              element={
                <RoleBasedControl allowedRoles={['Administrador','Panadero']}>
                  <Recipe />
                </RoleBasedControl>
              }
            />

            <Route
              path="/compras"
              element={
                <RoleBasedControl allowedRoles={['Administrador']}>
                  <Order />
                </RoleBasedControl>
              }
            />

            <Route
              path="/productos"
              element={
                <RoleBasedControl allowedRoles={['Administrador','Panadero','Cajero']}>
                  <Product />
                </RoleBasedControl>
              }
            />

            <Route
              path="/ventas"
              element={
                <RoleBasedControl allowedRoles={['Administrador','Cajero']}>
                  <Sale />
                </RoleBasedControl>
              }
            />
          </Route>

          {/* Ruta fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
