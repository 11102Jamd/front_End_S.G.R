import { useEffect, useState } from "react";
import { getInputs } from "../../utils/enpoints/input";
import { LoadingSpinner } from "../../components/Loading";

/**
 * Componente IngredientSelector
 *
 * Permite seleccionar un insumo (ingrediente) de una lista
 * y especificar la cantidad requerida para agregarlo a la receta.
 */
function IngredientSelector({ currentItem, onItemChange, onAddItem }) {
    const [inputs, setInputs] = useState([]); // Lista de insumos disponibles
    const [loading, setLoading] = useState(true);// Indica si se están cargando los insumos

    /**
     * useEffect que carga los insumos disponibles desde el backend al montar el componente
     */
    useEffect(() => {
        const fetchInput = async () => {
            try {
                const data = await getInputs();// Obtener insumos desde la API
                setInputs(data);
            } catch (error) {
                console.error("error al cargar insumos", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInput();
    }, []);

    const selectedInput = inputs.find(input => input.id === parseInt(currentItem?.input_id || ''));
    /**
     * Muestra un spinner de carga mientras se obtienen los insumos
     */
    if (loading) {
        return (
            <div className="card mb-4">
                <div className="card-body">
                    <LoadingSpinner message="cargando insumos" />
                </div>
            </div>
        );
    }

    /**
 * Renderiza el formulario para seleccionar un ingrediente y su cantidad
 */
    return (
        <div className="card mb-4">
            <div className="card-header bg-light">
                <h6 className="mb-0">Agregar Ingredientes</h6>
            </div>
            <div className="card-body">
                <div className="row g-3">
                    {/* Selector de ingrediente */}
                    <div className="col-md-5">
                        <label htmlFor="input_id" className="form-label">Ingrediente</label>
                        <select
                            className="form-select"
                            id="input_id"
                            name="input_id"
                            value={currentItem.input_id}
                            onChange={onItemChange}
                            required
                        >
                            <option value="">Seleccione un ingrediente</option>
                            {inputs.map(input => (
                                <option key={input.id} value={input.id}>
                                    {input.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Campo para la cantidad requerida */}
                    <div className="col-md-3">
                        <label htmlFor="quantity_required" className="form-label">Cantidad Requerida</label>
                        <input
                            type="number"
                            className="form-control"
                            id="quantity_required"
                            name="quantity_required"
                            value={currentItem.quantity_required}
                            onChange={onItemChange}
                            min="0.001"
                            step="0.001"
                            required
                        />
                    </div>

                    <div className="col-md-2">
                        <label htmlFor="unit_used" className="form-label">Unidad</label>
                        <select
                            className="form-select"
                            id="unit_used"
                            name="unit_used"
                            value={currentItem?.unit_used || ''}
                            onChange={onItemChange}
                            required
                            disabled={!currentItem?.input_id}
                        >
                            <option value="">Seleccione unidad</option>
                            {selectedInput && (
                                <>
                                    {selectedInput.category === 'liquido' && (
                                        <>
                                            <option value="ml">ml</option>
                                        </>
                                    )}
                                    {selectedInput.category === 'solido_no_con' && (
                                        <>
                                            <option value="g">g</option>
                                        </>
                                    )}
                                    {selectedInput.category === 'solido_con' && (
                                        <option value="un">un</option>
                                    )}
                                </>
                            )}
                        </select>
                    </div>

                    {/* Botón para agregar el ingrediente seleccionado */}
                    <div className="col-md-2 d-flex align-items-end">
                        <button
                            onClick={onAddItem}
                            className="btn btn-primary w-100"
                            disabled={!currentItem.input_id || !currentItem.quantity_required}
                        >
                            <i className="bi bi-plus-lg me-2"></i>Agregar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default IngredientSelector;