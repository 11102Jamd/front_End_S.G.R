import React, { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../../utils/enpoints/users";
import DataTable from "react-data-table-component";
import customStyles from "../../utils/styles/customStyles";
import paginationOptions from "../../utils/styles/paginationOptions";
import CreateUserModal from "./CreateUserModal";
import EditUserModal from "./EditUserModal";
import { errorDeleteUser, showConfirmDeleteUser, successDeleteUser } from "../../utils/alerts/alertsUsers";


function User(){
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [userSelected, setUserSelected] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setPending(true);
            const data = await getUsers();
            setUsers(data);
            setPending(false);
        } catch (error) {
            console.error("Error al obtner los uausrios", error);
            setPending(false);
        };
    };

    const handleDeleteUser = async (id) => {
        const result = await showConfirmDeleteUser();
        if (result.isConfirmed) {
            try {
                await deleteUser(id);
                await successDeleteUser();
                await fetchUsers();
            } catch (error) {
                console.error("Error al eliminar el usuario: ",error);
                await errorDeleteUser();
            }
        }
    }

    const columns = [
        {
            name: 'Nombres',
            selector: row => `${row.id} ${row.name1} ${row.name2}`,
            sortable: true,
        },
        {
            name: 'Apellidos',
            selector: row => `${row.surname1} ${row.surname2}`,
            sortable: true,
        },
        {
            name: 'Correo',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Rol',
            selector: row => row.rol,
            sortable: true,
        },
        {
            name: 'Acciones',
            cell: row => (
                <div className="btn-group" role="group">
                    <button 
                        onClick={() => handleDeleteUser(row.id)}
                        className='btn btn-danger btn-sm rounded-2 p-2'
                        title="Eliminar"
                    >
                        <i className="bi bi-trash fs-6"></i>
                    </button>
                    <button 
                        onClick={() => {
                            setUserSelected(row);
                        }} 
                        className='btn btn-primary btn-sm ms-2 rounded-2 p-2'
                        title="Editar"
                    >
                        <i className="bi bi-pencil-square fs-6"></i>
                    </button>
                </div>
            ),
            ignoreRowClick: true,
        },
    ];
    return(

        <div className='container-fluid mt-4'>
            <div className='card'>
                <div className='card-header text-white' style={{background:'#176FA6'}}>
                    <h1 className='h4'>Gestión de Usuarios</h1>
                </div>

                <div className='card-body p-4'>
                    <div className='d-flex justify-content-between mb-3'>
                        <button 
                            onClick={() => setShowModal(true)} 
                            className='btn btn-success'
                        >
                            <i className="bi bi-plus-circle"></i> Crear Usuario
                        </button>
                    </div>

                    <DataTable
                        title="Lista de Usuarios"
                        columns={columns}
                        data={users}
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
                <CreateUserModal
                    onClose={() => setShowModal(false)}
                    onUserCreated={fetchUsers}
                />
            )}

            {userSelected && (
                <EditUserModal
                    user={userSelected}
                    onClose={() => setUserSelected(null)}
                    onUserUpdated={fetchUsers}
                />
            )}
        </div>
    );
}
export default User;