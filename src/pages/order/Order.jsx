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
    const [order, setOrder] = useState([]);//Estado para almacenar la lista de compras
    const [showModal, setShowModal] = useState(false);//Estado que controla la visibilidad del modal de creación de la compra
    const [orderSelected, setOrderSelected] = useState(null);//Estado que selecciona la compra y muestra sus detalles
    const [pending, setPending] = useState(true);//Estado para controlar el estado de carga

    //Efecto que se ejecuta al mostrar el componente para obtener la lista de compras
    useEffect(() => {
        fetchOrder();
    }, []);

    //Fución para obtener la lista de compras
    const fetchOrder = async () => {
        try {
            setPending(true);
            const data = await getOrder();//Llama a la API para obtener las compras
            console.log('Fila', data);//Imprime los datos por consola
            setOrder(data);//Actualiza el estado con la lista de órdenes
            setPending(false);
        } catch (error) {
            console.error("error al obtener la lista de compras", error);
            setPending(false);
        };
    };

    //Función para manejar la eliminación de una compra
    const handleDeleteOrder = async (id) => {
        const result = await showConfirmDeleteOrder();//Muestra una confirmacion antes de eliminar 
        if (result.isConfirmed) {
            try {
                await deleteOrder(id);//Llama a la API para eliminar la compra
                await successDeleteOrder();//Mensaje de eliminacion exitosa de la compra
                await fetchOrder();//Vuelve a cargar la lista de compras
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
                            onClick={() => setShowModal(true)}//Abre el modal al hacer clic
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
                    onClose={() => setShowModal(false)}//Cierra el modal
                    onOrderCreated={fetchOrder}//Vuelve a cargar las compras al crear una nueva
                />
            )}

            {/* Modal de Detalles de Orden - MANTIENE TU ESTRUCTURA */}
            {orderSelected && (
                <ShowOrder
                    show={true}//Muestra el modal
                    onHide={() => setOrderSelected(null)}//Cierra el modal
                    orderId={orderSelected.id}//Pasa el ID de la compra seleccionada
                />
            )}
        </div>
    );
}
export default Order;
