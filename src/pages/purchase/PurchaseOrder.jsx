import { useState, useEffect } from 'react';
import { getPurchase, deletePurchase } from '../../utils/api/Purchase';
import CreatePurchaseModal from './CreatePurchaseModal';
import DataTable from "react-data-table-component";
import PurchaseDetailsModal from './PurchaseDetailsModal';
import { getSuppliers } from '../../utils/api/supplier';
import customStyles from '../../utils/styles/customStyles';
import paginationOptions from '../../utils/styles/paginationOptions';
import Swal from "sweetalert2";


function Purchase() {
    const [purchase, setPurchase] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [pending, setPending] = useState(true);

    const [selectedPurchase, setSelectedPurchase] = useState(null);

    const handleViewDetails = (purchase) => {
        setSelectedPurchase(purchase);
    };

    const handleCloseDetails = () => {
        setSelectedPurchase(null);
    };

    const fetchPurchase = async () => {
        try {
            setPending(true);
            const data = await getPurchase();
            setPurchase(data);
            setPending(false);
        } catch (error) {
            console.error("Error al obtener lista de Compras", error);
        } finally {
            setPending(false);
        }
    };

    const fetchSuppliers = async () => {
        try {
            const data = await getSuppliers();
            setSuppliers(data);
        } catch (error) {
            console.error("No se encontró proveedor", error);
        }
    };

    useEffect(() => {
        fetchPurchase();
        fetchSuppliers();
    }, []);

    const handleDelete = async (id) => {
        try {
            const confirmation = await
                Swal.fire({
                    title: '¿Estás seguro?',
                    text: "¡Esta acción eliminará la orden de compra!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Eliminar',
                    cancelButtonText: 'Cancelar'
                });

            if (confirmation.isConfirmed === true) {
                await deletePurchase(id);

                // Actualizar el estado local para reflejar la eliminación
                setPurchase(purchase.filter(p => p.id !== id));

                Swal.fire('¡Eliminado!', 'La orden de compra fue eliminada.', 'success');
            }

        } catch (error) {
            console.error("Error al eliminar la compra", error);
            Swal.fire('Error', 'Hubo un problema al eliminar la orden', 'error');
        }
    };

    // Combina las compras con el nombre del proveedor
    const purchaseWithSupplierName = purchase.map(p => {
        const supplier = suppliers.find(s => s.id === p.ID_supplier);
        return {
            ...p,
            name: supplier ? supplier.name : 'Desconocido'
        };
    });

    const columns = [
        {
            name: 'Numero de Compra',
            selector: row => row.id,
            sortable: true,
            center:true
        },
        {
            name: 'Nombre Proveedor',
            selector: row => `${row.ID_supplier} ${row.name}`,
            sortable: true,
            center:true
        },
        {
            name: 'Fecha de Compra',
            selector: row => row.PurchaseOrderDate,
            sortable: true,
            center:true
        },
        {
            name: "Total Compra",
            selector: row => `$${row.PurchaseTotal}`,
            sortable: true,
            center:true
        },
        {
            name: 'Acciones',
            cell: row => (
                <div className="btn-group" role="group">
                    <button
                        className="btn btn-primary btn-sm me-3 w-30 rounded-2 p-2"
                        title="ver"
                        onClick={() => handleViewDetails(row)}
                    >
                        <i className="bi bi-eye fs-6"></i>
                    </button>
                    <button
                        className="btn btn-danger btn-sm w-30 me-3 rounded-2 p-2"
                        title="eliminar"
                        onClick={() => handleDelete(row.id)}
                    >
                        <i className="bi bi-trash fs-6"></i>
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            center:true
        }
    ];

    return (
        <div className="container-fluid mt-4">
            <div className='card'>
                <div className='card-header text-white' style={{ background: '#176FA6' }}>
                    <h1 className='h4'>Gestión de Compras</h1>
                </div>

                <div className='card-body p-4'>
                    <div className='d-inline-flex'>
                        <button
                            onClick={() => setShowModal(true)}
                            className='btn btn-success'
                        >
                            <i className="bi bi-plus-circle"> Nueva orden de compra</i>
                        </button>
                    </div>
                    <DataTable
                        title="Lista de Ordenes de Compra"
                        columns={columns}
                        data={purchaseWithSupplierName}
                        purchase={handleViewDetails}
                        onClose={handleCloseDetails}
                        pagination
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5, 10, 15, 20]}
                        paginationComponentOptions={paginationOptions}
                        highlightOnHover
                        pointerOnHover
                        responsive
                        striped
                        progressPending={pending}
                        customStyles={customStyles}
                        progressComponent={
                            <div className='spinner-border text-primary' role='status'>
                                <span className='visually-hidden'></span>
                            </div>
                        }
                        noDataComponent={
                            <div className='alert alert-info'>No se registran compras</div>
                        }
                    />
                </div>
            </div>
            {showModal && (
                <CreatePurchaseModal
                    onClose={() => setShowModal(false)}
                    onPurchaseCreated={fetchPurchase}
                />
            )}
            {selectedPurchase && (
                <PurchaseDetailsModal
                    purchase={selectedPurchase}
                    onClose={handleCloseDetails}
                />
            )}
        </div>
    );
}

export default Purchase;

