// import { useState, useEffect } from 'react';
// import { getOrder, deleteOrder } from '../../utils/enpoints/order';
// import CreateOrderModal from './CreateOrderModal';
// import DataTable from "react-data-table-component";
// import OrderDetailsModal from './OrderDetailsModal';
// import customStyles from '../../utils/styles/customStyles';
// import paginationOptions from '../../utils/styles/paginationOptions';
// import Swal from "sweetalert2";

// function Order() {


//     const [order, setOrder] = useState([]);
//     const [showModal, setShowModal] = useState([]);
//     const [pending, setPending] = useState([]);
//     const [selectedOrder, setSelectedOrder] = useState(null);

//     const handleViewDetails = (order) => {
//         setSelectedOrder(order);
//     };

//     const handleCloseDetails = () => {
//         setSelectedOrder(null);
//     };

//     const fetchOrder = async () => {
//         try {
//             setPending(true);
//             const data = await getOrder();
//             setOrder(data);
//             setPending(false);
//         } catch (error) {
//             console.error("Error al obtener lista de Compras", error);
//         } finally {
//             setPending(false);
//         }
//     };


//     useEffect(() => {
//         fetchOrder();
//     }, []);

//     const handleDelete = async (id) => {
//         try {
//             const confirmation = await
//                 Swal.fire({
//                     title: '¿Estás seguro?',
//                     text: "¡Esta acción eliminará la orden de compra!",
//                     icon: 'warning',
//                     showCancelButton: true,
//                     confirmButtonText: 'Eliminar',
//                     cancelButtonText: 'Cancelar'
//                 });

//             if (confirmation.isConfirmed === true) {
//                 await deleteOrder(id);

//                 // Actualizar el estado local para reflejar la eliminación
//                 setOrder(order.filter(p => p.id !== id));

//                 Swal.fire('¡Eliminado!', 'La orden de compra fue eliminada.', 'success');
//             }

//         } catch (error) {
//             console.error("Error al eliminar la compra", error);
//             Swal.fire('Error', 'Hubo un problema al eliminar la orden', 'error');
//         }
//     };

//     //     const handleDelete = async (id) => {
//     //     try {
//     //         if(alertConfirmation.isConfirmed===true){
//     //             deleteOrder(id);

//     //             setOrder(order.filter(p=>p.id !==id));
//     //             return "Eliminado"
//     //         }
            
//     //     } catch (error) {
//     //         console.error("Error al eliminar la compra", error);
//     //         Swal.fire('Error', 'Hubo un problema al eliminar la orden', 'error');
//     //     }
//     // };

//     const columns = [
//         {
//             name: 'Numero de Compra',
//             selector: row => row.id,
//             sortable: true,
//             center: true
//         },
//         {
//             name: 'Nombre Proveedor',
//             selector: row => row.supplier_name,
//             sortable: true,
//             center: true
//         },
//         {
//             name: 'Fecha de Compra',
//             selector: row => row.order_date,
//             sortable: true,
//             center: true
//         },
//         {
//             name: "Total Compra",
//             selector: row => `$${row.order_total}`,
//             sortable: true,
//             center: true
//         },
//         {
//             name: 'Acciones',
//             cell: row => (
//                 <div className="btn-group" role="group">
//                     <button
//                         className="btn btn-primary btn-sm me-3 w-30 rounded-2 p-2"
//                         title="ver"
//                         onClick={() => handleViewDetails(row)}
//                     >
//                         <i className="bi bi-eye fs-6"></i>
//                     </button>
//                     <button
//                         className="btn btn-danger btn-sm w-30 me-3 rounded-2 p-2"
//                         title="eliminar"
//                         onClick={() => {
//                             Swal.fire({
//                                 title: "¿Está seguro?",
//                                 text: "Esta acción no se puede deshacer",
//                                 icon: "warning",
//                                 showCancelButton: true,
//                                 confirmButtonColor: "#d33",
//                                 cancelButtonColor: "#1ce74bff",
//                                 background: "#e9f0f9ff",
//                                 confirmButtonText: "Sí, eliminar",
//                                 cancelButtonText: "Cancelar"
//                             }).then((result) => {
//                                 if (result.isConfirmed) {
//                                     handleDelete(row.id);
//                                     Swal.fire("Eliminado", "El registro ha sido eliminado.", "success");
//                                 }
//                             });
//                         }}
//                     >
//                         <i className="bi bi-trash fs-6"></i>
//                     </button>
//                 </div >
//             ),
//             ignoreRowClick: true,
//             center: true
//         }
//     ];

//     return (
//         <div className="container-fluid mt-4">
//             <div className='card'>
//                 <div className='card-header text-white' style={{ background: '#176FA6' }}>
//                     <h1 className='h4'>Gestión de Compras</h1>
//                 </div>

//                 <div className='card-body p-4'>
//                     <div className='d-inline-flex'>
//                         <button
//                             onClick={() => setShowModal(true)}
//                             className='btn btn-success'
//                         >
//                             <i className="bi bi-plus-circle"> Nueva orden de compra</i>
//                         </button>
//                     </div>
//                     <DataTable
//                         title="Lista de Ordenes de Compra"
//                         columns={columns}
//                         order={handleViewDetails}
//                         onClose={handleCloseDetails}
//                         pagination
//                         paginationPerPage={5}
//                         paginationRowsPerPageOptions={[5, 10, 15, 20]}
//                         paginationComponentOptions={paginationOptions}
//                         highlightOnHover
//                         pointerOnHover
//                         responsive
//                         striped
//                         progressPending={pending}
//                         customStyles={customStyles}
//                         progressComponent={
//                             <div className='spinner-border text-primary' role='status'>
//                                 <span className='visually-hidden'></span>
//                             </div>
//                         }
//                         noDataComponent={
//                             <div className='alert alert-info'>No se registran compras</div>
//                         }
//                     />
//                 </div>
//             </div>
//             {showModal && (
//                 <CreateOrderModal
//                     onClose={() => setShowModal(false)}
//                     onOrderCreated={fetchOrder}
//                 />
//             )}
//             {selectedOrder && (
//                 <OrderDetailsModal
//                     purchase={setSelectedOrder}
//                     onClose={handleCloseDetails}
//                 />
//             )}
//         </div>
//     );
// }


// export default Order;

