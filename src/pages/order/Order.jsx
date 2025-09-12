import { useEffect, useState } from "react";
import { deleteOrder, getOrder } from "../../utils/enpoints/purchase";
import customStyles from "../../utils/styles/customStyles";
import paginationOptions from "../../utils/styles/paginationOptions";
import DataTable from "react-data-table-component";
import CreateOrderModal from "./CreateOrderModal";
import ShowOrder from "./ShowOrder";
import orderColumns from './OrderColumns';
import { errorDeleteOrder, showConfirmDeleteOrder, successDeleteOrder } from "../../utils/alerts/alertsOrder";

function Order() {
    const [order, setOrder] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [orderSelected, setOrderSelected] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = async () => {
        try {
            setPending(true);
            const data = await getOrder();
            console.log('Fila', data);
            setOrder(data);
            setPending(false);
        } catch (error) {
            console.error("error al obtener la lista de compras", error);
            setPending(false);
        };
    };

    const handleDeleteOrder = async (id) => {
        const result = await showConfirmDeleteOrder();
        if (result.isConfirmed) {
            try {
                await deleteOrder(id);
                await successDeleteOrder();
                await fetchOrder();
            } catch (error) {
                console.error("error al eliminar la orden de compra", error);
                await errorDeleteOrder();
            };
        };
    };
    
    return (

        //<div className='container-fluid mt-4'>
        <div className="container mt-4">
            <div className='card'>
                <div className='card-header text-white' style={{ background: '#176FA6' }}>
                    <h1 className='h4'>Gestión de Órdenes de Compra</h1>
                </div>

                {/* <div className='card-body p-4'> */}
                <div className="card-body p-2 p-md-4">
                    {/* <div className='d-flex justify-content-between mb-3'> */}
                    <div className="d-flex justify-content-between flex-wrap mb-3">
                        <button
                            onClick={() => setShowModal(true)}
                            className='btn btn-success'
                        >
                            <i className="bi bi-plus-circle"></i> Crear Orden
                        </button>
                    </div>
                    <div className="table-responsive">
                        <DataTable
                            title="Lista de Órdenes de Compra"
                            columns={orderColumns(setOrderSelected,handleDeleteOrder)}
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
                            progressComponent={<div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>}
                            noDataComponent={<div className="alert alert-info">No hay órdenes registradas</div>}
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

            {/* Modal de Detalles de Orden - MANTIENE TU ESTRUCTURA */}
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
