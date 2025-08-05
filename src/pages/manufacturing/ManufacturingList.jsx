import { useEffect, useState } from "react";
import api from "../../utils/axiosConfig";
import DataTable from "react-data-table-component";
import CreateManufacturingModal from "./CreateManufacturingModal";
import customStyles from "../../utils/styles/customStyles";
import ShowManufacturing from "./ShowManufacturing";
import { deleteManufacturing, getManufacturing } from "../../utils/enpoints/manufacturing";
import { errorLoadModalDetails } from "../../utils/alerts/alertsManufacturing";
import paginationOptions from "../../utils/styles/paginationOptions";




function ManufacturingList() {
    const [manufacturing, setManufacturing] = useState([]);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedManufacturingId, setSelectedManufacturingId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        fetchManufacturing();
    }, []);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await deleteManufacturing(id);
                Swal.fire('Eliminado', 'La fabricación fue eliminada correctamente.', 'success');
                fetchManufacturing();
            } catch (error) {
                Swal.fire('Error', 'No se pudo eliminar la fabricación.', 'error');
            }
        }
    };


    const fetchManufacturing = async () => {
        try {
            setPending(true);
            const data = await getManufacturing();
            setManufacturing(data);
            setPending(false);
        } catch (error) {
            console.error("Error al obtener la lista de fabricación: ", error);
            setPending(false);
        }
    };

    const handleShowDetails = async (id) => {
        setSelectedManufacturingId(id);
        setShowDetailsModal(true);
    };



    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
            center: true,
        },
        {
            name: 'Producto',
            selector: row => row.product?.ProductName || 'N/A',
            sortable: true,
            center: true,
        },
        {
            name: 'Fecha de Fabricacion',
            selector: row => row.manufacturingDate,
            sortable: true,
            center: true,
        },
        {
            name: 'Tiempo de fabricacion',
            selector: row => row.ManufacturingTime,
            sortable: true,
            center: true,
        },
        {
            name: 'Mano de obra',
            selector: row => row.Labour,
            sortable: true,
            center: true,
        },
        {
            name: 'Producto toltal G',
            selector: row => row.ManufactureProductG,
            sortable: true,
            center: true,
        },
        {
            name: 'Total costo de produccion',
            selector: row => row.TotalCostProduction,
            sortable: true,
            center: true,
        },
        {
            name: 'Acción',
            cell: row => (
                <div className="btn-group" role="group">
                    <button
                        className="btn btn-danger btn-sm rounded-2 p-2"
                        title="eliminar"
                        onClick={() => handleDelete(row.id)}
                    >
                        <i className="bi bi-trash fs-6"></i>
                    </button>

                    <button
                        className="btn btn-primary btn-sm ms-2 rounded-2 p-2"
                        onClick={() => handleShowDetails(row.id)}
                        title="Ver detalles"
                    >
                        <i className="bi bi-eye"></i>
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            center: true,
        }
    ];

    return (
        <div className='container-fluid mt-4'>
            <div className='card'>
                <div className='card-header text-white' style={{ background: '#176FA6' }}>
                    <h1 className='h4'>Gestión de Fabricación</h1>
                </div>

                <div className='card-body p-4'>
                    <div className='d-flex justify-content-between mb-3'>
                        <button
                            onClick={() => setShowModal(true)}
                            className='btn btn-success'
                        >
                            <i className="bi bi-plus-circle"></i> Crear Fabricación
                        </button>
                    </div>

                    <DataTable
                        title="Lista de Producción"
                        columns={columns}
                        data={manufacturing}
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
                        noDataComponent={<div className="alert alert-info">No hay registros de fabricación</div>}
                    />
                </div>
            </div>

            {showModal && (
                <CreateManufacturingModal
                    onClose={() => setShowModal(false)}
                    onCreated={fetchManufacturing}
                />
            )}

            <ShowManufacturing
                show={showDetailsModal}
                onHide={()=> setShowDetailsModal(false)}
                manufacturingId={selectedManufacturingId}
            />
        </div>
    );
}

export default ManufacturingList;
