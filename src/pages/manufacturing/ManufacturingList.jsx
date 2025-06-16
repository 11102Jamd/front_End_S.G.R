import { useEffect, useState } from "react";
import api from "../../utils/axiosConfig";
import DataTable from "react-data-table-component";
import CreateManufacturingModal from "./CreateManufacturingModal";


function ManufacturingList() {
    const [manufacturing, setManufacturing] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        getManufacturing();
    }, []);

    const getManufacturing = async () => {
        try {
            setPending(true);
            const response = await api.get('/manufacturing');
            setManufacturing(response.data);
            setPending(false);
        } catch (error) {
            console.error("Error al obtener la lista de fabricación: ", error);
            setPending(false);
        }
    };

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#343a40',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
                textAlign: 'center'
            },
        },
        cells: {
            style: {
                fontSize: '18px',
                padding: '12px 10px',
                textAlign: 'center'
            },
        },
        rows: {
            style: {
                minHeight: '60px',
                '&:nth-child(even)': {
                    backgroundColor: '#f8f9fa',
                },
                '&:hover': {
                    backgroundColor: '#e9ecef !important',
                },
                textAlign: 'center',
            },
        },
        pagination: {
            style: {
                backgroundColor: '#f8f9fa',
                borderTop: '1px solid #dee2e6',
            },
        },
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
            selector: row => row.product_name,
            sortable: true,
            center: true,
        },
        {
            name: 'Cantidad',
            selector: row => row.quantity,
            sortable: true,
            center: true,
        },
        {
            name: 'Fecha',
            selector: row => row.date,
            sortable: true,
            center: true,
        },
        {
            name: 'Acción',
            cell: row => (
                <div className="btn-group" role="group">
                    <button className="btn btn-danger btn-sm rounded-2 p-2" title="eliminar">
                        <i className="bi bi-trash fs-6"></i>
                    </button>
                    <button className="btn btn-primary btn-sm ms-2 rounded-2 p-2" title="editar">
                        <i className="bi bi-pencil-square fs-6"></i>
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            center: true,
        }
    ];

    const paginationOptions = {
        rowsPerPageText: 'Registros por página:',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
        noRowsPerPage: false,
    };

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
                    onCreated={getManufacturing}
                />
            )}
        </div>
    );
}

export default ManufacturingList;
