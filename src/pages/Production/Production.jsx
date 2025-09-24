import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import customStyles from "../../utils/styles/customStyles";
import paginationOptions from "../../utils/styles/paginationOptions";
import { deleteProduction, getProduction } from "../../utils/enpoints/production";
import CreateProductionModal from "./CreateProductionModal";
import ShowProductionDetails from "./ShowProductionDetails";
import { errorDeleteProduction, showConfirmDeleteProduction, successDeleteProduction } from "../../utils/alerts/productionAlerts";
import { formatCurrency } from "../../utils/formatters/currency";
import { useAuth } from "../../context/AuthContext";

/**
 * Componente Production
 *
 * Este componente maneja la gestión de producciones:
 * - Lista todas las producciones en un DataTable.
 * - Permite crear nuevas producciones.
 * - Permite eliminar producciones existentes.
 * - Permite ver detalles de cada producción.
 *
 */
function Production() {
    const {user} = useAuth();
    const [production, setProduction] = useState([]); // Lista de producciones
    const [showModal, setShowModal] = useState(false); // Estado del modal de creación
    const [productionSelected, setProductionSelected] = useState(null);  // Producción seleccionada para ver detalles
    const [pending, setPending] = useState(true); // Estado de carga del DataTable

    // Ejecuta fetchProduction al montar el componente
    useEffect(() => {
        fetchProduction();
    }, []);

    /**
     * Obtiene todas las producciones desde el backend
     */
    const fetchProduction = async () => {
        try {
            setPending(true);
            const data = await getProduction();
            setProduction(data);
            setPending(false);
        } catch (error) {
            console.error("Error", error);
        } finally {
            setPending(false);
        };
    };

    /**
     * Maneja la eliminación de una producción
     * @param {number} id - ID de la producción a eliminar
     */
    const handleDeleteProduction = async (id) => {
        const result = await showConfirmDeleteProduction();
        if (result.isConfirmed) {
            try {
                await deleteProduction(id);
                await successDeleteProduction();
                await fetchProduction();
            } catch (error) {
                console.error("error al eliminar la produccion", error);
                await errorDeleteProduction();
            };
        };
    };

    // Configuración de columnas para el DataTable
    const columns = [
        {
            name: 'Production',
            selector: row => `${row.id} ${row.recipe?.recipe_name}` || 'N/A',
            sortable: true,
            center: true,
        },
        {
            name: 'Precio por Producto',
            selector: row => row.price_for_product ? formatCurrency(row.price_for_product) : 'N/A',
            sortable: true,
            center: "true"
        },
        {
            name: 'Costo de Produccion',
            selector: row => row.total_cost ? formatCurrency(row.total_cost) : 'N/A',
            sortable: true,
            center: "true"
        },
        {
            name: 'Fecha de Produccion',
            selector: row => row.production_date ?? 'N/A',
            sortable: true,
            center: "true"
        },
        {
            name: 'Accion',
            cell: row => (
                <div className="btn-group" role="group">
                    {user.rol === 'Administrador' && (
                        <button
                            onClick={() => handleDeleteProduction(row.id)}
                            className='btn btn-danger btn-sm rounded-2 p-2'
                            style={{ background: '#D6482D' }}
                            title="Eliminar"
                        >
                            <i className="bi bi-trash fs-6"></i>
                        </button>
                    )}
                    <button
                        onClick={() => setProductionSelected(row)}
                        className='btn btn-info btn-sm ms-2 rounded-2 p-2'
                        style={{ background: '#2DACD6' }}
                        title="Ver Detalles"
                    >
                        <i className="bi bi-eye fs-6"></i>
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            center: "true"
        }
    ];

    return (
        <div className='container-fluid mt-4'>
            {/* Card principal */}
            <div className='card'>
                <div className='card-header text-white' style={{ background: '#176FA6' }}>
                    <h1 className='h4'>Gestion de Produccion</h1>
                </div>

                <div className='card-body p-4'>
                    {/* Botón para crear producción */}
                    <div className='d-flex justify-content-between mb-3'>
                        <button
                            onClick={() => setShowModal(true)}
                            className='btn btn-success'
                        >
                            <i className='bi bi-plus-circle'></i> Crear Produccion
                        </button>
                    </div>

                    {/* DataTable de producciones */}
                    <DataTable
                        title="Lista de Producciones"
                        columns={columns}
                        data={production}
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
                        noDataComponent={<div className="alert alert-info">No hay producciones registradas</div>}
                    />
                </div>
            </div>
            {/* Modal de creación de producción */}
            {showModal && (
                <CreateProductionModal
                    onClose={() => setShowModal(false)}
                    onProductionCreated={fetchProduction}
                />
            )}

            {/* Modal de detalles de producción */}
            {productionSelected && (
                <ShowProductionDetails
                    show={true}
                    onHide={() => setProductionSelected(null)}
                    productionId={productionSelected.id}
                />
            )}

        </div>
    );
}

export default Production;