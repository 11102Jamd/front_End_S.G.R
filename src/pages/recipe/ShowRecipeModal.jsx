import { useEffect, useRef, useState } from "react";
import { getRecipeDetails } from "../../utils/enpoints/recipe";
import { errorShowDetailsRecipe } from "../../utils/alerts/recipeAlert";
import NumberFormatter from "../../components/NumberFormatter";
function ShowRecipeModal({ show, onHide, recipeId }) {
    const [recipe, setRecipe] = useState(null); // Estado para guardar los datos de la receta obtenida desde el backend
    const [loading, setLoading] = useState(false); // Estado para controlar si los datos aún se están cargando
    const abortControllerRef = useRef(null); // Referencia para guardar el AbortController y cancelar la petición si el componente se desmonta

    //si el componente se desmonta, aborta cualquier petición en curso
    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    // Efecto que se dispara cada vez que se muestra el modal y existe un ID de receta
    useEffect(() => {
        if (!show || !recipeId) return;

        // Crear un nuevo AbortController para esta solicitud
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;

        // Función para obtener los detalles de la receta desde el backend
        const fetchRecipeDetails = async () => {
            setLoading(true);
            try {
                const data = await getRecipeDetails(recipeId, { signal });
                setRecipe(data);// Guardamos los datos de la receta en el estado
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error("Error al cargar los datos de la Receta", error);
                    await errorShowDetailsRecipe();
                    onHide();
                }
            } finally {
                if (!signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchRecipeDetails();

        // aborta la petición si el efecto se limpia antes de terminar
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [show, recipeId, onHide]);

    if (!show) return null;

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    {/* Encabezado del modal */}
                    <div className="modal-header text-white" style={{ backgroundColor: '#176FA6' }}>
                        <h5 className="modal-title">Detalles de la Receta</h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={onHide}
                            disabled={loading}
                        ></button>
                    </div>

                    {/* Contenido del modal */}
                    <div className="modal-body">
                        {loading ? (
                            <div className="text-center py-4">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                </div>
                                <p className="mt-2">Cargando detalles de la receta...</p>
                            </div>
                        ) : recipe ? (
                            <>
                                {/* Información general de la receta */}
                                <div className="mb-4">
                                    <h5>Información General</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p><strong>Nombre de la Receta:</strong> {recipe.recipe_name || 'N/A'}</p>
                                            <p><strong>Cantidad del Producto:</strong> {recipe.yield_quantity}</p>
                                            <p><strong>Unidad:</strong> {recipe.unit}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Tabla con los ingredientes de la receta */}
                                <h5 className="mb-3">Ingredientes de la Receta</h5>
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>Insumo</th>
                                                <th>Cantidad Requerida</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recipe.recipe_ingredients?.length > 0 ? (
                                                recipe.recipe_ingredients.map((ingredient, index) => (
                                                    <tr key={index}>
                                                        <td>{ingredient.input?.name || `Insumo ID: ${ingredient.input_id}`}</td>
                                                        <td><NumberFormatter value={ingredient.quantity_required}></NumberFormatter> {ingredient.unit_used}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="2" className="text-center">No hay ingredientes en esta receta</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        ) : (
                            <div className="alert alert-warning">
                                No se encontraron datos de la Receta
                            </div>
                        )}
                    </div>

                    {/* Pie del modal con botón para cerrar */}
                    <div className="modal-footer">
                        <button
                            className="btn btn-secondary"
                            onClick={onHide}
                            disabled={loading}
                        >
                            {loading ? 'Cerrar (cargando...)' : 'Cerrar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowRecipeModal;