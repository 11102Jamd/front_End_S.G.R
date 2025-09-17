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
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Product from './pages/product/ProductList';
import Production from './pages/Production/Production';
import Recipe from './pages/recipe/Recipe';
import ResetPassword from './pages/auth/ResetPassword';
import './App.css';
import ReportDownloader from './pages/reports/ReportDownloader';
// import Usuarios from './components/usuarios/UserList';
// import Supplier from './components/proveedores/SupplierList';
// import Products from './components/productos/ProductsList';
// import Pedidos from './components/pedidos/OrderList';
// import Compras from './components/compras/PurchaseList';
import Sale from './pages/sale/SaleList';




function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/reset-password' element={<ResetPassword/>}/>
          <Route element={
            <PrivateRoute>
              <div className="app-container">
                <Sidebar />
                <div className="main-content-wrapper">
                  <Header />
                  <MainContent>
                    <Outlet />
                  </MainContent>
                  <Footer />
                </div>
              </div>
            </PrivateRoute>
          }>
            <Route index element={<Navigate to="/welcome" replace />} />
            <Route path="/welcome" element={<Welcome />} />

            <Route path='/usuarios' element={
              <RoleBasedControl allowedRoles={['Administrador','Panadero']}>
                <User/>
              </RoleBasedControl>
            }/>

            <Route path='/insumos' element={
              <RoleBasedControl allowedRoles={['Administrador', 'Panadero']}>
                <Input />
              </RoleBasedControl>
            } />

            <Route path='/production' element={
              <RoleBasedControl allowedRoles={['Administrador', 'Panadero']}>
                <Production />
              </RoleBasedControl>
            } />
              
            <Route path='/recetas' element={
              <RoleBasedControl allowedRoles={['Administrador', 'Panadero']}>
                <Recipe />
              </RoleBasedControl>
            } />


            <Route path='/compras' element={
              <RoleBasedControl allowedRoles={['Administrador']}>
                <Order />
              </RoleBasedControl>
            } />

            <Route path='/ventas' element={
              <RoleBasedControl allowedRoles={['Administrador']}>
                <Sale/>
              </RoleBasedControl>
            } />

            <Route path='/productos' element={
              <RoleBasedControl allowedRoles={['Administrador', 'Panadero' , 'Cajero' ]}>
                <Product />
              </RoleBasedControl>
            } />

            <Route path='/reportes' element={
              <RoleBasedControl allowedRoles={['Administrador']}>
                <ReportDownloader/>
              </RoleBasedControl>
            } />

          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;