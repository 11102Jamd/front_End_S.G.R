// Importaciones necesarias
import React, { useEffect, useState } from "react"; 
import customStyles from "../../utils/styles/customStyles"; 
import paginationOptions from "../../utils/styles/paginationOptions"; 
import { useAuth } from "../../context/AuthContext";
import { deleteSale, getSale } from "../../utils/enpoints/sale.js";
import { showConfirmDeleteSale, successDeleteSale, errorDeleteSale } from "../../utils/alerts/alertsSale.js";
import CreateSaleModal from "./CreateSaleModal.jsx";
import ShowSale from "./ShowSaleModal.jsx";
import DataTable from "react-data-table-component"; 
import NumberFormatter from "../../components/NumberFormatter.jsx";

// Componente principal de Gestión de Ventas, incluyendo tabla y modales
function Sale() {

    
    const { user } = useAuth();

    if (!user) return null;

    // Estados principales
    const [sale, setSale] = useState([]); 
    const [showModal, setShowModal] = useState(false); 
    const [saleSelected, setSaleSelected] = useState(null); 
    const [pending, setPending] = useState(true); 

    // useEffect para cargar las ventas al montar el componente
    useEffect(() => {
        fetchSale(); 
    }, []);

    // Función para obtener las ventas desde el backend y actualizar el estado
    const fetchSale = async () => {
        try {
            setPending(true); 
            const data = await getSale(); 
            setSale(data); 
            setPending(false); 
        } catch (error) {
            console.error("error al obtener la lista de ventas", error);
            setPending(false); 
        }
    };

    // Función para eliminar una venta, mostrando confirmación y manejando errores
    const handleDeleteSale = async (id) => {
        const result = await showConfirmDeleteSale(); 
        if (result.isConfirmed) {
            try {
                await deleteSale(id); 
                await successDeleteSale(); 
                await fetchSale(); 
            } catch (error) {
                console.error("error al eliminar la orden de compra", error);
                await errorDeleteSale(); 
            }
        }
    };

    // Configuración de columnas para la tabla de ventas
    const columns = [
        {
            name:'Venta N°',
            selector: row => row.id,
            center: "true"
        },
        {
            name: 'Vendedor',
            selector: row => row.user?.name1 ?? 'N/A',
            sortable: true,
            center: "true"
        },
        {
            name: 'Fecha de Venta',
            selector: row => row.sale_date ?? 'N/A',
            sortable: true,
            center: "true"
        },
        {
            name: 'Total',
            sortable: true,
            center: "true",
            selector: row => (
                <NumberFormatter prefix="$" suffix="COP" value={row.sale_total}/>
            )
        },
        {
            name: 'Cant. Productos',
            selector: row => row.sale_products ? row.sale_products.length : 0,
            sortable: true,
            center: "true"
        },
        {
            // Columna de acciones (Eliminar y Ver Detalles)
            name: 'Acciones',
            cell: row => (
                <div className="btn-group" role="group">
                    {user.rol === 'Administrador' && (
                        <button 
                            onClick={() => handleDeleteSale(row.id)}
                            className='btn btn-danger btn-sm rounded-2 p-2'
                            style={{background:'#D6482D'}}
                            title="Eliminar"
                        >
                            <i className="bi bi-trash fs-6"></i>
                        </button>
                    )}
                    
                    <button 
                        onClick={() => setSaleSelected(row)} 
                        className='btn btn-info btn-sm ms-2 rounded-2 p-2'
                        title="Ver Detalles"
                    >
                        <i className="bi bi-eye fs-6"></i>
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            center: "true"
        },
    ];

    // Renderizado del componente
    return(
        <div className='container-fluid mt-4'>

            {/* Card principal */}
            <div className='card'>

                {/* Header del card */}
                <div className='card-header text-white' style={{background:' #176FA6'}}>
                    <h1 className='h4'>Gestión de Ventas</h1>
                </div>

                {/* Body del card */}
                <div className='card-body p-4'>

                    {/* Botón para abrir modal de creación de venta */}
                    <div className='d-flex justify-content-between mb-3'>
                        <button 
                            onClick={() => setShowModal(true)} 
                            className='btn btn-success'
                        >
                            <i className="bi bi-plus-circle"></i> Registrar Venta
                        </button>
                    </div>

                    {/* Tabla de ventas */}
                    <DataTable
                        title="Lista de Ventas"
                        columns={columns}
                        data={sale}
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
                            <div className="spinner-border text-success" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                        }
                        noDataComponent={
                            <div className="alert alert-info">No hay ventas registradas</div>
                        }
                    />
                </div>
            </div>

            {/* Modal de creación de Venta */}
            {showModal && (
                <CreateSaleModal
                    onClose={() => setShowModal(false)}
                    onSaleCreated={fetchSale} // Refresca lista de ventas tras crear nueva
                />
            )}

            {/* Modal de Detalles de Venta */}
            {saleSelected && (
                <ShowSale
                    show={true}
                    onHide={() => setSaleSelected(null)}
                    saleId={saleSelected.id} // Pasa ID de la venta seleccionada
                />
            )}
        </div>
    );

}

// Exportar componente para usar en otras partes de la app
export default Sale;
