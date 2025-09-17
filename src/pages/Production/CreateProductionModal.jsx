import { useState, useEffect } from "react";
import { createProduction } from "../../utils/enpoints/production";
import { getRecipe } from "../../utils/enpoints/recipe";
import { errorProduction, errorProductionStock, successCreateProduction } from "../../utils/alerts/productionAlerts"; // Importar la alerta
import LoadingModal from "../../components/Loading";

/**
 * Componente CreateProductionModal
 *
 * Este componente renderiza un modal que permite:
 * - Seleccionar una receta existente.
 * - Ingresar la cantidad a producir.
 * - Crear una nueva producción y manejar errores.
 */
function CreateProductionModal({ onClose, onProductionCreated }) {
    // Estado para almacenar los datos del formulario de producción
    const [newProduction, setNewProduction] = useState({
        recipe_id: '',
        quantity_to_produce: ''
    });

    const [recipes, setRecipes] = useState([]); // Lista de recetas disponibles
    const [loading, setLoading] = useState(true); // Estado de carga inicial 
    const [error, setError] = useState(null); // Estado para manejar errores

    /**
     * useEffect para cargar las recetas disponibles al montar el componente
     */
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const recipesData = await getRecipe();
                setRecipes(recipesData);
            } catch (error) {
                console.error("Error al cargar recetas", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    /**
     * Maneja el cambio en los campos del formulario
     * @param {Event} e - Evento de cambio
     */
    const handleChange = (e) => {
        const { id, value } = e.target;
        setNewProduction(prev => ({ ...prev, [id]: value }));
        setError(null); // Limpiar error cuando el usuario cambie los valores
    };

    /**
     * Envía los datos para crear una nueva producción
     */
    const createProductionHandler = async () => {
        try {
            setError(null); // Resetear error antes de intentar
            await createProduction(newProduction);
            successCreateProduction();// Mostrar alerta de éxito
            onProductionCreated();// Actualizar lista en el componente padre
            onClose();
            setNewProduction({
                recipe_id: '',
                quantity_to_produce: ''
            });
        } catch (error) {
            console.error("Error al crear la producción", error);

            // Verificar si es el error específico de stock insuficiente
            if (error.response?.data?.error?.includes("Stock insuficiente")) {
                const errorMessage = error.response.data.error;
                setError(errorMessage);

                // Mostrar alerta específica para stock insuficiente
                await errorProductionStock(errorMessage);
            } else {
                // Manejar otros errores
                const genericError = error.response?.data?.message || "Error al crear la producción";
                setError(genericError);
                await errorProduction(genericError);
            }
        }
    };

    // Si está cargando las recetas, mostrar un modal de carga
    if (loading) {
        return (
            <LoadingModal message="Cargado Recetas para la Produccion" />
        );
    }

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-sm">
                <div className="modal-content">

                    {/* Encabezado del modal */}
                    <div className="modal-header text-white" style={{ backgroundColor: ' #176FA6' }}>
                        <h5 className="modal-title">Crear Nueva Producción</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    {/* Cuerpo del modal */}
                    <div className="modal-body">
                        {/* Mostrar mensaje de error si existe */}
                        {error && (
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>Error:</strong> {error}
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setError(null)}
                                ></button>
                            </div>
                        )}

                        {/* Selector de receta */}
                        <div className="mb-3">
                            <label htmlFor="recipe_id" className="form-label">Receta</label>
                            <select
                                className="form-select form-select-sm"
                                id="recipe_id"
                                value={newProduction.recipe_id}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccione una receta</option>
                                {recipes.map(recipe => (
                                    <option key={recipe.id} value={recipe.id}>
                                        {recipe.recipe_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Input de cantidad */}
                        <div className="mb-3">
                            <label htmlFor="quantity_to_produce" className="form-label">Cantidad a Producir</label>
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                id="quantity_to_produce"
                                value={newProduction.quantity_to_produce}
                                onChange={handleChange}
                                min="1"
                                step="1"
                                required
                            />
                        </div>
                    </div>

                    {/* Pie de modal */}
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={createProductionHandler}
                            disabled={!newProduction.recipe_id || !newProduction.quantity_to_produce}
                            style={{ backgroundColor: ' #176FA6' }}
                        >
                            Crear Producción
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateProductionModal;