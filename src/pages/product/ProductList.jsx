import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import paginationOptions from "../../utils/styles/paginationOptions";
import customStyles from "../../utils/styles/customStyles";
import { getProducts } from "../../utils/enpoints/product";
import EditProductModal from "./EditProductModal";
import CreateProductModal from "./CreateProductModal";
import DeleteButton from "../../components/DeleteButton"; 
import CreateButton from "../../components/CreateButton"; 

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
            const data = await getProducts();
            console.log("Datos recibidos:", data);
            setProduct(data);
            setPending(false);
        } catch (error) {
            console.error('Error al mostrar todos los Productos: ', error);
            setPending(false);
        }
    };

    const formatCOP = (value) => {
    return `$ ${new Intl.NumberFormat('es-CO', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value)} Col`;
    };

    const columns = [
        {
            name: 'Productos',
            selector: row => row.product_name,
            sortable: true,
        },
        {
            name: 'Precios por unidad',
            selector: row => formatCOP(row.unit_price),
            sortable: true,
        },
        {
            name: 'Acciones',
            cell: row => (
                <div className="d-flex gap-2"> {/*  Agregamos espacio entre botones */}
                    <DeleteButton productId={row.id} onDeleted={fetchProduct} />
                    <button
                        onClick={() => setProductSelected(row)}
                        className='btn btn-primary btn-sm rounded-2 p-2'
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
                    {/* Botón Crear Producto usando CreateButton */}
                    <div className='d-flex justify-content-start mb-3'>
                        <CreateButton 
                            text="Crear Producto" 
                            onClick={() => setShowModal(true)} 
                        />
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
                        progressComponent={
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                        }
                        noDataComponent={
                            <div className="alert alert-info">No hay Productos Registrados</div>
                        }
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
