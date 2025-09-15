import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import paginationOptions from "../../utils/styles/paginationOptions";
import customStyles from "../../utils/styles/customStyles";
import { getProduct } from "../../utils/enpoints/product";
import EditProductModal from "./EditProductModal";
import CreateProductModal from "./CreateProductModal";




function Product() {
    const [product, setProduct] = useState([]);
    const [productSelected, setProductSelected] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [pending, setPending] = useState(true);


    useEffect(() => {
        fetchProduct();
    }, []);


    const fetchProduct = async () => {
        try {
            setPending(true);
            const data = await getProduct();
            console.log("Datos recibidos:", data);
            await 
            setProduct(data);
            setPending(false);
        } catch (error) {
            console.error('Error al mostrar todos los Prodcutos: ', error);
            setPending(false);
        };
    };

    const columns = [
        {
            name: 'Productos',
            selector: row => row.product_name,
            sortable: true,
        },
        {
            name: 'Precios por unidad',
            selector: row => `${row.unit_price}`,
            sortable: true,
        },
        {
            name: 'Acciones',
            cell: row => (
                <div className="btn-group" role="group">
                    <button
                        className='btn btn-danger btn-sm rounded-2 p-2'
                        title="Eliminar"
                    >
                        <i className="bi bi-trash fs-6"></i>
                    </button>
                    <button
                        onClick={() => {
                            console.log('Editando Producto:', row);
                            setProductSelected(row);
                        }}
                        className='btn btn-primary btn-sm ms-2 rounded-2 p-2'
                        title="Editar"
                    >
                        <i className="bi bi-pencil-square fs-6"></i>
                    </button>
                </div>
            ),
            ignoreRowClick: true,
        }
    ];


    return (
        <div className='container-fluid mt-4'>
            <div className='card'>
                <div className='card-header text-white' style={{ background: '#176FA6' }}>
                    <h1 className='h3'>Gestión de Productos</h1>
                </div>

                <div className='card-body p-4'>
                    <div className='d-flex justify-content-between mb-3'>
                        <button
                            onClick={() => setShowModal(true)}
                            className='btn btn-success'
                        >
                            <i className="bi bi-plus-circle"></i> Crear Producto
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
                        noDataComponent={<div className="alert alert-info">No hay Productos Registrados</div>}
                    />
                </div>
            </div>

            {showModal && (
                <CreateProductModal
                    onClose={() => setShowModal(false)}
                    onProductCreated={fetchProduct}
                />
            )}

            
            {productSelected && (
                <EditProductModal
                    product={productSelected}
                    onClose={() => setProductSelected(null)}
                    onProductUpdate={fetchProduct}
                />
            )}
        </div>
    );
}
export default Product;