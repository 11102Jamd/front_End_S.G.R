import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getRecipe } from "../../utils/enpoints/recipe";
import paginationOptions from "../../utils/styles/paginationOptions";
import customStyles from "../../utils/styles/customStyles";
import CreateRecipeModal from "./CreateRecipeModal";
import ShowRecipeModal from "./ShowRecipeModal";
import EditRecipeModal from "./EditRecipeModal";
import { deleteRecipe } from "../../utils/enpoints/recipe";
import { successDeleteRecipe, errorDeleteRecipe, showConfirmDeleteRecipe } from "../../utils/alerts/recipeAlert";
import { useAuth } from "../../context/AuthContext";



/**
 * Componente Recipe
 *
 * Este componente maneja la gestión de recetas:
 * - Lista todas las recetas en un DataTable.
 * - Permite crear nuevas recetas.
 * - Permite eliminar recetas existentes.
 * - Permite ver detalles de cada receta.
 * - Permite editar recetas existentes.
 *
 */
function Recipe() {
    const {user} = useAuth();
    const [recipe, setRecipe] = useState([]); // Lista de recetas
    const [showModal, setShowModal] = useState(false); // Estado del modal de creación/edición
    const [recipeSelected, setRecipeSelected] = useState(null); // Receta seleccionada para ver o editar
    const [pending, setPending] = useState(true); // Estado de carga del DataTable

    // Ejecuta fetchRecipe al montar el componente
    useEffect(() => {
        fetchRecipe();
    }, []);

    /**
     * Obtiene todas las recetas desde el backend
     */
    const fetchRecipe = async () => {
        try {
            setPending(true);
            const data = await getRecipe();
            setRecipe(data);
            setPending(false);
        } catch (error) {
            console.error("error al obtener la lista de Recetas", error);
            setPending(false);
        };
    };

    /**
     * Maneja la eliminación de una receta
     * @param {number} id - ID de la receta a eliminar
     */
    const handleDeleteRecipe = async (id) => {
        const result = await showConfirmDeleteRecipe();
        if (result.isConfirmed) {
            try {
                await deleteRecipe(id);
                await successDeleteRecipe();
                await fetchRecipe();
            } catch (error) {
                console.error("Error al eliminar la receta", error);
                await errorDeleteRecipe();
            }
        }
    };
    // Configuración de columnas para el DataTable
    const columns = [
        {
            name: 'Receta',
            selector: row => `${row.id} ${row.recipe_name}`,
            sortable: true,
            center: "true"
        },
        {
            name: 'Cantidad',
            selector: row => `${parseInt(row.yield_quantity)} unidades`,
            sortable: true,
            center: "true"
        },
        {
            name: 'Acciones',
            cell: row => (
                <div className="btn-group" role="group">
                    {user.rol === 'Administrador' && (
                        <button
                            onClick={() => handleDeleteRecipe(row.id)}
                            className='btn btn-warning btn-sm rounded-2 p-2'
                            title="Inhabilitar"
                        >
                            <i className="bi bi-lock-fill"></i> 
                        </button>
                    )}

                    <button
                        onClick={() => setRecipeSelected(row)}
                        className='btn btn-info btn-sm ms-2 rounded-2 p-2'
                        title="Ver Detalles"
                    >
                        <i className="bi bi-eye fs-6"></i>
                    </button>
                    
                    <button

                        onClick={() => {
                            setRecipeSelected(row);
                            setShowModal(true);
                        }}

                        className="btn btn-primary btn-sm ms-2 rounded-2 p-2"
                        style={{ background: '#2DACD6' }}
                        title="editar"
                    >
                        <i className="bi bi-pencil-square fs-6"></i>
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            center: "true"
        }
    ];

    return (
        <div className='container-fluid mt-4'>
            {/* Card principal */}
            <div className='card'>
                <div className='card-header text-white' style={{ background: '#176FA6' }}>
                    <h1 className='h4'>Gestión de Recetas</h1>
                </div>

                <div className='card-body p-4'>
                    {/* Botón para crear receta */}
                    <div className='d-flex justify-content-between mb-3'>
                        <button
                            onClick={() => setShowModal(true)}
                            className='btn btn-success'
                        >
                            <i className="bi bi-plus-circle"></i> Crear Receta
                        </button>
                    </div>

                    {/* DataTable de recetas */}
                    <DataTable
                        title="Lista de Recetas"
                        columns={columns}
                        data={recipe}
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
                        noDataComponent={<div className="alert alert-info">No hay recetas Registradas</div>}
                    />
                </div>
            </div>

            {/* Modal de creación de receta */}
            {showModal && (
                <CreateRecipeModal
                    onClose={() => setShowModal(false)}
                    onRecipeCreated={fetchRecipe}
                />
            )}

             {/* Modal de detalles de receta */}
            {recipeSelected && (
                <ShowRecipeModal
                    show={true}
                    onHide={() => setRecipeSelected(null)}
                    recipeId={recipeSelected.id}
                />
            )}

             {/* Modal de edición de receta */}
            {showModal && recipeSelected && (
                <EditRecipeModal
                    recipeId={recipeSelected.id}
                    onClose={() => {
                        setShowModal(false);
                        setRecipeSelected(null);
                    }}
                    onRecipeUpdated={() => {
                        setShowModal(false);
                        setRecipeSelected(null);
                        fetchRecipe();
                    }}
                />
            )}
        </div>
    );
}

export default Recipe;