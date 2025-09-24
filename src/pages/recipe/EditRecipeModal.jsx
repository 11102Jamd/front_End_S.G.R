import { useState, useEffect } from "react";
import { getRecipeDetails, updateRecipe } from "../../utils/enpoints/recipe";
import { errorUpdateRecipe, successUpdateRecipe } from "../../utils/alerts/recipeAlert";
import IngredientSelector from "./IngredientSelector";
import RecipeItemsTable from "./RecipeItemsTable";
import LoadingModal from "../../components/Loading";

/**
 * Componente EditRecipeModal
 *
 * Modal para editar una receta base existente.
 * Permite:
 *  - Cargar los datos actuales de la receta desde el backend
 *  - Modificar nombre, cantidad producida, unidad de medida e ingredientes
 *  - Guardar los cambios en el backend
 */
function EditRecipeModal({ recipeId, onClose, onRecipeUpdated }) {
    // Estado para almacenar los datos actuales de la receta a editar
    const [recipe, setRecipe] = useState({
        recipe_name: '',
        yield_quantity: '',
        ingredient: []
    });

    // Estado para el ingrediente que se está agregando actualmente
    const [currentItem, setCurrentItem] = useState({
        input_id: '',
        quantity_required: '',
        unit_used: ''
    });

    const [loading, setLoading] = useState(true); // Indica si se están cargando los datos
    const [saving, setSaving] = useState(false);  // Indica si se está guardando la receta
    const [inputs, setInputs] = useState([]);// Lista de insumos disponibles

    useEffect(() => {
        const fetchRecipeData = async () => {
            try {
                setLoading(true);
                const recipeData = await getRecipeDetails(recipeId);

                // Transformar los datos para que coincidan con la estructura del estado
                const transformedIngredients = recipeData.recipe_ingredients.map(ingredient => ({
                    input_id: ingredient.input_id,
                    quantity_required: parseFloat(ingredient.quantity_required),
                    input_name: ingredient.input?.name || 'N/A',
                    unit_used: ingredient.unit_used
                }));

                setRecipe({
                    recipe_name: recipeData.recipe_name,
                    yield_quantity: parseFloat(recipeData.yield_quantity),
                    ingredient: transformedIngredients
                });

            } catch (error) {
                console.error("Error al cargar la receta:", error);
            } finally {
                setLoading(false);
            }
        };

        if (recipeId) {
            fetchRecipeData();
        }
    }, [recipeId]);

    /**
    * Agrega un nuevo ingrediente a la receta
    */
    const addItem = () => {
        if (!currentItem.input_id || !currentItem.quantity_required || !currentItem.unit_used) {
            return;// Validación: campos vacíos
        }

        // Obtener el nombre del insumo desde la lista de inputs
        const selectedInput = inputs.find(input => input.id === parseInt(currentItem.input_id));
        const inputName = selectedInput ? selectedInput.name : '';

        const newItem = {
            input_id: parseInt(currentItem.input_id),
            quantity_required: parseFloat(currentItem.quantity_required),
            input_name: inputName,
            unit_used: currentItem.unit_used
        };

        // Agregar ingrediente al estado
        setRecipe(prev => ({
            ...prev,
            ingredient: [...prev.ingredient, newItem]
        }));

        // Resetear el formulario del ingrediente actual
        setCurrentItem({
            input_id: '',
            quantity_required: '',
            unit_used: ''
        });
    };

    /**
    * Elimina un ingrediente de la receta por su índice
    */
    const removeItem = (index) => {
        const updatedItems = [...recipe.ingredient];
        updatedItems.splice(index, 1);
        setRecipe({ ...recipe, ingredient: updatedItems });
    };

    /**
     * Maneja los cambios en los campos principales de la receta
     */
    const handleRecipeChange = (e) => {
        setRecipe({ ...recipe, [e.target.name]: e.target.value });
    };

    /**
     * Maneja los cambios en el formulario del ingrediente actual
     */
    const handleItemChange = (e) => {
        setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
    };

    /**
     * Envía la receta actualizada al backend
     */
    const handleSubmit = async () => {
        if (!recipe.recipe_name || !recipe.yield_quantity || recipe.ingredient.length === 0) {
            return;// Validación: no enviar si hay campos vacíos
        }

        setSaving(true);
        try {
            // Preparar datos para enviar
            const recipeData = {
                recipe_name: recipe.recipe_name,
                yield_quantity: recipe.yield_quantity,
                ingredient: recipe.ingredient.map(ingredient => ({
                    input_id: ingredient.input_id,
                    quantity_required: ingredient.quantity_required,
                    unit_used: ingredient.unit_used
                }))
            };

            await updateRecipe(recipeId, recipeData);
            await successUpdateRecipe();
            onRecipeUpdated();
            onClose();
        } catch (error) {
            console.error("Error al actualizar receta:", error);
            await errorUpdateRecipe();
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <LoadingModal message="Cargando Receta" />
    }

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{ backgroundColor: ' #176FA6' }}>
                        <h5 className="modal-title">Editar Receta Base</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {/* Campos principales de la receta */}
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <label htmlFor="name" className="form-label">Nombre de la Receta</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="recipe_name"
                                    name="recipe_name"
                                    value={recipe.recipe_name}
                                    onChange={handleRecipeChange}
                                    required
                                />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="yield_quantity" className="form-label">Cantidad de Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="yield_quantity"
                                    name="yield_quantity"
                                    value={recipe.yield_quantity}
                                    onChange={handleRecipeChange}
                                    min="0.001"
                                    step="0.001"
                                    required
                                />
                            </div>
                        </div>

                        {/* Selector de ingredientes */}
                        <IngredientSelector
                            currentItem={currentItem}
                            onItemChange={handleItemChange}
                            onAddItem={addItem}
                        />

                        {/* Tabla de ingredientes de la receta */}
                        <RecipeItemsTable
                            items={recipe.ingredient}
                            onRemoveItem={removeItem}
                        />
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-primary"
                            style={{ backgroundColor: ' #176FA6' }}
                            onClick={handleSubmit}
                            disabled={recipe.ingredient.length === 0 || !recipe.recipe_name || !recipe.yield_quantity || saving}
                        >
                            Actualizar Receta
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={onClose} disabled={saving}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditRecipeModal;