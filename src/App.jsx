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
import Supplier from './pages/supplier/SupplierList';
import Input from './pages/inputs/InputList';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Production from './pages/Production/Production';
// import Usuarios from './components/usuarios/UserList';
// import Supplier from './components/proveedores/SupplierList';
// import Products from './components/productos/ProductsList';
// import Pedidos from './components/pedidos/OrderList';
// import Compras from './components/compras/PurchaseList';
import './App.css';
import Recipe from './pages/recipe/Recipe';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

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

            {/* <Route path='/usuarios' element={
              <RoleBasedControl allowedRoles={['Administrador']}>
                <Usuarios/>
              </RoleBasedControl>
            }/> */}

            <Route path='/proveedores' element={
              <RoleBasedControl allowedRoles={['Administrador']}>
                <Supplier />
              </RoleBasedControl>
            } />

            <Route path='/insumos' element={
              <RoleBasedControl allowedRoles={['Administrador', 'Panadero']}>
                <Input />
              </RoleBasedControl>
            } />

            {/* {/* <Route path='/produccion' element={<Production/>}/>
            
            <Route path='/pedidos' element={
              <RoleBasedControl allowedRoles={['Administrador', 'Cajero']}>
                <Pedidos/>
              </RoleBasedControl>
        
            
            <Route path='/compras' element={
              <RoleBasedControl allowedRoles={['Administrador']}>
                <Compras/>
              </RoleBasedControl>
            }/>*/

              <Route path='/production' element={
                <RoleBasedControl allowedRoles={['Administrador', 'Panadero']}>
                  <Production />
                </RoleBasedControl>
              } />}
            <Route path='/recipe' element={
              <RoleBasedControl allowedRoles={['Administrador', 'Panadero']}>
                <Recipe />
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