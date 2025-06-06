// src/layout/Sidebar.jsx
import React from "react";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';

function Sidebar() {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <div className="sidebar">
            <Link className="sidebar-brand" to="/">
                <div className="sidebar-brand-icon">
                    <i className="bi bi-shop"></i>
                </div>
                <div className="sidebar-brand-text">Pan de Yuca</div>
            </Link>
            
            <div className="sidebar-menu">
                <Link to="/welcome" className="sidebar-link">
                    <i className="bi bi-house-door"></i>
                    <span>Inicio</span>
                </Link>
                
                {/* Solo visible para Administrador */}
                {user.rol === 'Administrador' && (
                    <Link to="/usuarios" className="sidebar-link">
                        <i className="bi bi-people-fill"></i>
                        <span>Usuarios</span>
                    </Link>
                )}
                
                <Link to="/productos" className="sidebar-link">
                    <i className="bi bi-box-seam"></i>
                    <span>Productos</span>
                </Link>
                
                {/* Solo visible para Administrador y Cajero */}
                {(user.rol === 'Administrador' || user.rol === 'Cajero') && (
                    <Link to="/pedidos" className="sidebar-link">
                        <i className="bi bi-receipt"></i>
                        <span>Pedidos</span>
                    </Link>
                )}
                
                {/* Solo visible para Administrador */}
                {user.rol === 'Administrador' && (
                    <>
                        <Link to="/proveedores" className="sidebar-link">
                            <i className="bi bi-truck"></i>
                            <span>Proveedores</span>
                        </Link>
                        <Link to="/compras" className="sidebar-link">
                            <i className="bi bi-cart-check"></i>
                            <span>Compras</span>
                        </Link>
                    </>
                )}
                
                {/* Visible para Administrador y Panadero */}
                {(user.rol === 'Administrador' || user.rol === 'Panadero') && (
                    <Link to="/insumos" className="sidebar-link">
                        <i className="bi bi-clipboard-data"></i>
                        <span>Insumos</span>
                    </Link>
                )}
                
                {/* Visible para Administrador y Panadero */}
                {(user.rol === 'Administrador' || user.rol === 'Panadero') && (
                    <Link to="/fabricacion" className="sidebar-link">
                        <i className="bi bi-gear"></i>
                        <span>Fabricación</span>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Sidebar;