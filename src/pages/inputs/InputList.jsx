import React, { useEffect, useState } from "react";
import { deleteInputs, getInputs } from "../../utils/enpoints/input";
import DataTable from "react-data-table-component";
import CreateInputModal from "./CreateInputModal";
import EditInputModal from "./EditInputModal";
import paginationOptions from "../../utils/styles/paginationOptions";
import customStyles from "../../utils/styles/customStyles";
import { errorDeleteInput, showConfirmDeleteInputs, successDeleteInput } from "../../utils/alerts/alertsInputs";

function Input() {
    const [input, setInput] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [inputSelected, setInputSelected] = useState(null);
    const [pending, setPending] = useState(true);


    useEffect(() => {
        fetchInputs();
    }, []);


    const fetchInputs = async () => {
        try {
            setPending(true);
            const data = await getInputs();
            setInput(data);
            setPending(false);
        } catch (error) {
            console.error('Error al mostrar todos los Insumos: ', error);
            setPending(false);
        };
    };

    const handleDeleteInput = async (id) => {
        const result = await showConfirmDeleteInputs();
        if (result.isConfirmed) {
            try {
                await deleteInputs(id);
                await successDeleteInput();
                await fetchInputs();
            } catch (error) {
                console.error("Error al eliminar el insumo", error);
                await errorDeleteInput();
            };
        };
    };


    const columns = [
        {
            name: 'Insumo',
            selector: row => row.InputName,
            sortable: true,
        },
        {
            name: 'Precio Unidad',
            selector: row => {
                const lastOrder = row.input_orders?.[0];
                return lastOrder ? `${lastOrder.UnityPrice}` : 'N/A'
            },
            sortable: true,
        },
        {
            name: 'Cantidad Inicial',
            selector: row => {
                const lastOrder = row.input_orders?.[0];
                return lastOrder ? `${lastOrder.InitialQuantity} ${lastOrder.UnitMeasurement}` : 'N/A'
            },
            sortable: true,
        },
        {
            name: 'Precio Cantidad',
            selector: row => {
                const lastOrder = row.input_orders?.[0];
                return lastOrder ? `${lastOrder.PriceQuantity}` : 'N/A'
            },
            sortable: true,
        },
        {
            name: 'Stock',
            selector: row => `${row.CurrentStock} ${row.UnitMeasurementGrams}`,
            sortable: true,
        },
        {
            name: 'Acciones',
            cell: row => (
                <div className="btn-group" role="group">
                    <button
                        onClick={() => handleDeleteInput(row.id)}
                        className='btn btn-danger btn-sm rounded-2 p-2'
                        title="Eliminar"
                    >
                        <i className="bi bi-trash fs-6"></i>
                    </button>
                    <button
                        onClick={() => {
                            console.log('Editando insumo:', row);
                            setInputSelected(row);
                        }}
                        className='btn btn-primary btn-sm ms-2 rounded-2 p-2'
                        title="Editar"
                    >
                        <i className="bi bi-pencil-square fs-6"></i>
                    </button>
                </div>
            ),
            ignoreRowClick: true,
        }
    ];


    return (
        <div className='container-fluid mt-4'>
            <div className='card'>
                <div className='card-header text-white' style={{ background: '#176FA6' }}>
                    <h1 className='h3'>Gestión de Insumos</h1>
                </div>

                <div className='card-body p-4'>
                    <div className='d-flex justify-content-between mb-3'>
                        <button
                            onClick={() => setShowModal(true)}
                            className='btn btn-success'
                        >
                            <i className="bi bi-plus-circle"></i> Crear Insumo
                        </button>
                    </div>

                    <DataTable
                        title="Lista de Insumos"
                        columns={columns}
                        data={input}
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
                        noDataComponent={<div className="alert alert-info">No hay insumos registrados</div>}
                    />
                </div>
            </div>

            {showModal && (
                <CreateInputModal
                    onClose={() => setShowModal(false)}
                    onInputCreated={fetchInputs}
                />
            )}

            {inputSelected && (
                <EditInputModal
                    input={inputSelected}
                    onClose={() => setInputSelected(null)}
                    onInputUpdated={fetchInputs}
                />
            )}
        </div>
    );
}
export default Input;