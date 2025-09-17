import { useEffect, useState } from "react";
import { deleteOrder, getOrder } from "../../utils/enpoints/purchase";
import customStyles from "../../utils/styles/customStyles";
import paginationOptions from "../../utils/styles/paginationOptions";
import DataTable from "react-data-table-component";
import CreateOrderModal from "./CreateOrderModal";
import ShowOrder from "./ShowOrder";
import orderColumns from "./OrderColumns";
import {
    errorDeleteOrder,
    showConfirmDeleteOrder,
    successDeleteOrder
} from "../../utils/alerts/alertsOrder";

/**
 * Componente Order
 *
 * Gestiona la visualización, creación y eliminación de órdenes de compra.
 * Incluye:
 *  - Tabla de órdenes con paginación y carga dinámica desde la API
 *  - Modal de creación de órdenes
 *  - Modal de visualización de detalles de una orden
 *
 * @component
 */
function Order() {
    /**
     * Estado que almacena la lista de órdenes
     * @type {Array}
     */
    const [order, setOrder] = useState([]);

    /**
     * Estado para controlar la visibilidad del modal de creación
     * @type {boolean}
     */
    const [showModal, setShowModal] = useState(false);

    /**
     * Estado para almacenar la orden seleccionada y mostrar sus detalles
     * @type {Object|null}
     */
    const [orderSelected, setOrderSelected] = useState(null);

    /**
     * Estado para controlar el estado de carga (spinner)
     * @type {boolean}
     */
    const [pending, setPending] = useState(true);

    /**
     * Efecto inicial para cargar la lista de órdenes
     * @returns {void}
     */
    useEffect(() => {
        fetchOrder();
    }, []);

    /**
     * Obtiene la lista de órdenes desde la API
     *
     * @async
     * @returns {Promise<void>}
     */
    const fetchOrder = async () => {
        try {
            setPending(true);

            const data = await getOrder();
            console.log("Fila", data);

            setOrder(data);
            setPending(false);
        } catch (error) {
            console.error("Error al obtener la lista de compras", error);
            setPending(false);
        }
    };

    /**
     * Maneja la eliminación de una orden
     *
     * @async
     * @param {number} id - ID de la orden a eliminar
     * @returns {Promise<void>}
     */
    const handleDeleteOrder = async (id) => {
        const result = await showConfirmDeleteOrder();

        if (result.isConfirmed) {
            try {
                await deleteOrder(id);
                await successDeleteOrder();
                await fetchOrder(); // Recarga la lista después de eliminar
            } catch (error) {
                console.error("Error al eliminar la orden de compra", error);
                await errorDeleteOrder();
            }
        }
    };

    return (
        <div className="container mt-4">
            <div className="card">
                {/* Encabezado */}
                <div className="card-header text-white" style={{ background: "#176FA6" }}>
                    <h1 className="h4">Gestión de Órdenes de Compra</h1>
                </div>

                {/* Cuerpo */}
                <div className="card-body p-2 p-md-4">
                    {/* Botón de creación */}
                    <div className="d-flex justify-content-between flex-wrap mb-3">
                        <button
                            onClick={() => setShowModal(true)}
                            className="btn btn-success"
                        >
                            <i className="bi bi-plus-circle"></i> Crear Orden
                        </button>
                    </div>

                    {/* Tabla de órdenes */}
                    <div className="table-responsive">
                        <DataTable
                            title="Lista de Órdenes de Compra"
                            columns={orderColumns(setOrderSelected, handleDeleteOrder)}
                            data={order}
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
                                <div className="alert alert-info">
                                    No hay órdenes registradas
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>

            {/* Modal de creación de Orden */}
            {showModal && (
                <CreateOrderModal
                    onClose={() => setShowModal(false)}
                    onOrderCreated={fetchOrder}
                />
            )}

            {/* Modal de Detalles de Orden */}
            {orderSelected && (
                <ShowOrder
                    show={true}
                    onHide={() => setOrderSelected(null)}
                    orderId={orderSelected.id}
                />
            )}
        </div>
    );
}

export default Order;
