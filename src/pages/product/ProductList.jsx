import React from "react";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import customStyles from "../../utils/styles/customStyles";
import paginationOptions from "../../utils/styles/paginationOptions";
import CreateProductModal from "./CreateProductModal";
import EditProductModal from "./EditProductModal";
import SupplyProductModal from "./SupplyModalProduct";
import { disableProduct, getProduct } from "../../utils/enpoints/product";
import { useAuth } from "../../context/AuthContext";
import NumberFormatter from "../../components/NumberFormatter";
import { errorDisableProduct, showConfirmDisableProduct, successDisableProduct } from "../../utils/alerts/productAlerts";

/**
 * 
 * @returns Product
 */
function Product(){
    // Contexto uilizaremos para validar el rol del usuario
    const {user} = useAuth();

    if (!user) return null;

    //Estados
    const [product, setProduct] = useState([]); // almacena la lista de productos
    const [showModal, setShowModal] = useState(false); // control del modal de creacion
    const [showSupplyModal, setShowSupplyModal] = useState(false); // control del modal de abastecimiento
    const [productSelected, setProductSelected] = useState(null); // control del modal de Edicion
    const [pending, setPending] = useState(true); // control del estado de carga

    //Efecto que se utiliza para obtener la lista de productos
    useEffect(() => {
        fetchProduct();
    }, []);

    /**
     * Obtener la lista de productos desde la api
     * actualiza el estado de product y controla la carga
     */
    const fetchProduct = async () => {
        try {
            setPending(true);
            const data = await getProduct();
            setProduct(data);
            setPending(false);
        } catch (error) {
            console.error("Error", error);
        } finally {
            setPending(false);
        };
    };

    /**
     * Inhabuilitar un producto utilizando una confirmacion
     * @param {number|string} id  - Id del producto a Inhabilitar
     */
    const handleDisableProduct = async (id) => {
        const result = await showConfirmDisableProduct();
        if (result.isConfirmed) {
            try {
                await disableProduct(id); // llamamos al api que ejecuta disable
                await successDisableProduct(); // llamamos a la alerta
                await fetchProduct(); //Actualiza la tabña
            } catch (error) {
                console.error("error al inhabilitar un producto", error);
                await errorDisableProduct(); // si algo sal mal se ejecuta la alerta
            };
        };
    };

    //definimos las columnas de  product
    const columns = [
        {
            name: 'Producto',
            selector: row => `${row.id} ${row.product_name}`?? 'N/A',
            sortable: true,
            center: "true",
        },
        {
            name: 'Precio Unidad',
            sortable: true,
            center: "true",
            cell: row => {
                return(
                    <NumberFormatter value={row.unit_price} prefix="$" suffix="COP"/>
                );
            }
        },
        {
            name: 'Stock Actual',
            selector: row => {
                if (!row.product_productions || row.product_productions.length === 0) {
                    return 'N/A';
                }
                
                // Encontrar el último lote con stock disponible
                const latestWithStock = [...row.product_productions]
                    .reverse()
                    .find(p => parseFloat(p.quantity_produced) > 0);
                
                return latestWithStock ? parseFloat(latestWithStock.quantity_produced)+' unidades' : '0';
            },
            sortable: true,
            center: "true",
        },
        {
            name: 'Porcentaje de Ganancia',
            selector: row => {
                if (!row.product_productions || row.product_productions.length === 0) {
                    return 'N/A';
                }
                
                // Encontrar el último lote con stock disponible
                const latestWithStock = [...row.product_productions]
                    .reverse()
                    .find(production => parseFloat(production.profit_margin_porcentage) > 0);
                
                return latestWithStock ? (`${latestWithStock.profit_margin_porcentage} %`) : '0';
            },
            sortable: true,
            center: "true",
        },
        {
            name: 'Accion',
            cell: row => (
                <div className="btn-group" role="group">
                    {user.rol === 'Administrador' && (
                        <button
                            onClick={() => { handleDisableProduct(row.id)}}
                            className="btn btn-warning btn-sm rounded-2 p-2"
                            title="eliminar"
                        >
                            <i className="bi bi-lock-fill"></i> 
                        </button>
                    )}

                    <button
                        onClick={()=> { setProductSelected(row);}}
                        className="btn btn-primary btn-sm ms-2 rounded-2 p-2"
                        style={{background:'#2DACD6'}}
                        title="editar"
                    >
                        <i className="bi bi-pencil-square fs-6"></i>
                    </button>
                    
                    {(user.rol === 'Administrador' || user.rol === 'Panadero') && (
                        <button
                            onClick={()=> {
                                setProductSelected(row);
                                setShowSupplyModal(true);
                            }}
                            className="btn btn-success btn-sm ms-2 rounded-2 p-2"
                            style={{background:'#2DEACD'}}
                            title="Abastecer"
                        >
                            <i className="bi bi-plus"></i>    
                        </button>
                    )}
                </div>
            ),
            ignoreRowClick: true,
            center: "true"
        }
    ];

    return(
        <div className='container-fluid mt-4'>
            <div className='card'>
                <div className='card-header text-white' style={{background:'#176FA6'}}>
                    <h1 className='h4'>Gestion de Productos</h1>
                </div>
                
                <div className='card-body p-4'>
                    <div className='d-flex justify-content-between mb-3'>
                        {(user.rol === 'Administrador' || user.rol === 'Panadero') && (
                            <button
                                onClick={() => setShowModal(true)}
                                className='btn btn-success'
                            >
                                <i className='bi bi-plus-circle'></i> Crear Producto
                            </button>
                        )}
                    </div>

                    {/**Tabla de Productos */}
                    <DataTable
                        title="Lista de Productos"
                        columns={columns}
                        data={product}
                        pagination
                        paginationPerPage={5} 
                        paginationRowsPerPageOptions={[5, 10, 15, 20]} 
                        paginationComponentOptions={paginationOptions}
                        highlightOnHover
                        pointerOnHover
                        responsive
                        striped
                        customStyles={customStyles}
                        progressPending={pending}
                        progressComponent={<div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>}
                        noDataComponent={<div className="alert alert-info">No hay productos registrados</div>}
                    />
                </div>
            </div>

            {/**Modal de creacion de productos */}
            {showModal && (
                <CreateProductModal
                        onClose={() => setShowModal(false)}
                        onProductCreated={fetchProduct}
                    />
                )}

            {/**Modal de edicion de productos */}
            {productSelected && (
                <EditProductModal
                    product={productSelected}
                    onClose={() => setProductSelected(null)}
                    onProductUpdate={fetchProduct}
                />
            )}

            {/**Modal de Abastecimiento de Producto */}
            {showSupplyModal && productSelected && (
                <SupplyProductModal
                    product={productSelected}
                    onClose={() => {
                        setShowSupplyModal(false);
                        setProductSelected(null);
                    }}
                    onProductSupplied={fetchProduct}
                />
            )}
        </div>
    );
}

export default Product;