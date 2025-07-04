import { useEffect, useState } from "react";
import { getSuppliers } from "../../utils/api/supplier";
import DataTable, { Alignment } from "react-data-table-component";
import CreateSupplierModal from "./CreateSupplierModal";
import EditSupplierModal from "./EditSupplierModal";
import customStyles from "../../utils/styles/customStyles";
import paginationOptions from "../../utils/styles/paginationOptions";


function Supplier(){

    const [supplier, setSupplier] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [supplierSelected, setSupplierSelected] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        fetchSupplier();
    }, []);

    const fetchSupplier = async () => {
        try {
            setPending(true);
            const data = await getSuppliers();
            setSupplier(data);
            setPending(false);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setPending(false);
        }
    };

    const columns = [
        {
            name: 'Proveedor',
            selector: row => `${row.id} ${row.name}`,
            sortable: true,
            center: true,
        },
        {
            name: 'Correo',
            selector: row => row.email,
            sortable: true,
            center: true,
        },
        {
            name: 'Direccion',
            selector: row => row.Addres,
            sortable: true,
            center: true,
        },
        {
            name: 'Telefono',
            selector: row => row.Phone,
            sortable: true,
            center: true,
        },
        {
            name: 'Accion',
            cell: row => (
                <div className="btn-group" role="group">
                    <button
                    
                    className="btn btn-danger btn-sm rounded-2 p-2"
                    title="eliminar"
                    >
                        <i className="bi bi-trash fs-6"></i>
                    </button>
                    <button

                        onClick={()=> {
                            console.log('Editando Proveedor',row);
                            setSupplierSelected(row);
                        }}

                        className="btn btn-primary btn-sm ms-2 rounded-2 p-2"
                        title="editar"
                    >
                        <i className="bi bi-pencil-square fs-6"></i>
                    </button>
                </div>
            ),
            ignoreRowClick: true,
        }
    ];

    return(
        <div className='container-fluid mt-4'>
            <div className='card'>
                <div className='card-header text-white' style={{background:'#176FA6'}}>
                    <h1 className='h4'>Gestión de Proveedores</h1>
                </div>

                <div className='card-body p-4'>
                    <div className='d-flex justify-content-between mb-3'>
                        <button 
                            onClick={() => setShowModal(true)} 
                            className='btn btn-success'
                        >
                            <i className="bi bi-plus-circle"></i> Crear Proveedor
                        </button>
                    </div>

                    <DataTable
                        title="Lista de Proveedores"
                        columns={columns}
                        data={supplier}
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
                        noDataComponent={<div className="alert alert-info">No hay usuarios registrados</div>}
                    />
                </div>
            </div>
            
            {showModal && (
                <CreateSupplierModal
                onClose={() => setShowModal(false)}
                onSupplierCreated={fetchSupplier}
                />
            )}

            {supplierSelected && (
                <EditSupplierModal
                    supplier={supplierSelected}
                    onClose={() => setSupplierSelected(null)}
                    onSupplierUpdated={fetchSupplier}
                />
            )}
        </div>
    );
}
export default Supplier;