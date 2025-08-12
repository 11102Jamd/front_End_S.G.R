import React, { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../../utils/enpoints/product";
import DataTable from "react-data-table-component";
import customStyles from "../../utils/styles/customStyles";
import paginationOptions from "../../utils/styles/paginationOptions";
import { errorDeleteProduct, showConfirmDeleteProducts, successDeleteProduct } from "../../utils/alerts/alertsProducts";
import CreateProductModal from "./CreateProductModal";
import EditProductModal from "./EditProductModal";


function Product(){
    const [product, setProduct] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [productSelected, setProductSelected] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        fetchProducts()
    }, []);

    const fetchProducts = async () => {
        try {
            setPending(true);
            const data = await getProducts();
            setProduct(data);
            setPending(false);
        } catch (error) {
            console.error("Error: ", error);
        } finally {
            setPending(false);
        };
    };

    const handleDeleteProduct = async (id) => {
        const result = await showConfirmDeleteProducts();
        if (result.isConfirmed) {
            try {
                await deleteProduct(id);
                await successDeleteProduct();
                await fetchProducts();
            } catch (error) {
                console.error("Error al eliminar al Producto", error);
                await errorDeleteProduct();
            };
        };
    };

    const columns = [
        {
            name: 'Producto',
            selector: row => row.ProductName,
            sortable: true,
            center: true,
        },
        {
            name: 'Cantidad Inicial',
            selector: row => row.InitialQuantity,
            sortable: true,
            center: true,
        },
        {
            name: 'Stock Actual',
            selector: row => row.CurrentStock,
            sortable: true,
            center: true,
        },
        {
            name: 'Precio Unidad',
            selector: row => row.UnityPrice,
            sortable: true,
            center: true,
        },
        {
            name: 'Accion',
            cell: row => (
                <div className="btn-group" role="group">
                    <button
                        onClick={()=> {
                            handleDeleteProduct(row.id);
                        }}
                        className="btn btn-danger btn-sm rounded-2 p-2"
                        title="eliminar"
                    >
                        <i className="bi bi-trash fs-6"></i>
                    </button>
                    <button

                        onClick={()=> {
                            console.log('Editando Proveedor',row);
                            setProductSelected(row);
                        }}

                        className="btn btn-primary btn-sm ms-2 rounded-2 p-2"
                        title="editar"
                    >
                        <i className="bi bi-pencil-square fs-6"></i>
                    </button>
                </div>
            ),
            ignoreRowClick: true,
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
                        <button
                            onClick={() => setShowModal(true)}
                            className='btn btn-success'
                        >
                            <i className='bi bi-plus-circle'></i> Crear Producto
                        </button>
                    </div>

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
            {showModal && (
                <CreateProductModal
                        onClose={() => setShowModal(false)}
                        onProductCreated={fetchProducts}
                    />
                )}

            {productSelected && (
                <EditProductModal
                    product={productSelected}
                    onClose={() => setProductSelected(null)}
                    onProductUpdate={fetchProducts}
                />
            )}
        </div>
    );
} 
export default Product;