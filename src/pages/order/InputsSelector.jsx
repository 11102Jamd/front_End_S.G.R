import React, { useState, useEffect } from 'react';
import { getInputs } from '../../utils/enpoints/input';

/**
 * Componente para seleccionar insumos y agregarlos a una orden de compra.
 *
 * @param {object} currentItem - Objeto con los datos del insumo actual.
 * @param {function} onItemChange - Callback para manejar cambios en el insumo actual.
 * @param {function} onAddItem - Callback para agregar un nuevo insumo a la orden.
 */
function InputSelector({ currentItem, onItemChange, onAddItem }) {

    /**
     * Estado que almacena:
     * - inputs: lista de insumos disponibles obtenidos de la API.
     * - loading: indicador de carga mientras se obtienen los insumos.
     */
    const [inputs, setInputs] = useState([]);
    const [loading, setLoading] = useState(true);

    /**
     * Efecto que obtiene los insumos desde la API al montar el componente.
     *
     * @returns {Promise<void>}
     */
    useEffect(() => {
        const fetchInput = async () => {
            try {
                const data = await getInputs(); // Llama a la API de insumos
                setInputs(data); // Actualiza estado con los insumos obtenidos
            } catch (error) {
                console.error("Error cargando insumos:", error);
            } finally {
                setLoading(false); // Desactiva el estado de carga
            }
        };

        fetchInput(); // Ejecuta la función de carga
    }, []);

    /**
     * Renderiza un spinner (o card vacía) mientras se cargan los insumos.
     */
    if (loading) {
        return (
            <div className="card mb-4">
                <div className="card-body text-center py-4">
                    {/* Aquí se puede mostrar un LoadingSpinner si está implementado */}
                </div>
            </div>
        );
    }

    return (
        <div className="card mb-4">
            <div className="card-header bg-light">
                <h6 className="mb-0">Agregar Insumos</h6>
            </div>
            <div className="card-body">
                <div className="row g-3">

                    {/* Selector de insumo */}
                    <div className="col-12 col-md-5">
                        <label htmlFor="input_id" className="form-label">Insumo</label>
                        <select
                            className="form-select"
                            id="input_id"
                            name="input_id"
                            value={currentItem.input_id} // Valor del insumo seleccionado
                            onChange={onItemChange} // Maneja el cambio
                            required
                        >
                            <option value="">Seleccione un insumo</option>
                            {inputs.map(input => (
                                <option key={input.id} value={input.id}>
                                    {input.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Campo Cantidad */}
                    <div className="col-12 col-md-2">
                        <label htmlFor="quantity_total" className="form-label">Cantidad</label>
                        <input
                            type="number"
                            className="form-control"
                            id="quantity_total"
                            name="quantity_total"
                            value={currentItem.quantity_total} // Valor de cantidad
                            onChange={onItemChange} // Maneja cambios
                            min="0.01"
                            step="0.01"
                            required
                        />
                    </div>

                    {/* Campo Precio Unitario */}
                    <div className="col-12 col-md-2">
                        <label htmlFor="unit_price" className="form-label">Precio Unitario</label>
                        <input
                            type="number"
                            className="form-control"
                            id="unit_price"
                            name="unit_price"
                            value={currentItem.unit_price}
                            onChange={onItemChange}
                            min="0.01"
                            step="0.01"
                            required
                        />
                    </div>

                    {/* Selector de Unidad de medida */}
                    <div className="col-12 col-md-3">
                        <label htmlFor='unit_measure' className='form-label'>Unidad</label>
                        <select
                            id='unit_measure'
                            name='unit_measure'
                            className='form-select'
                            value={currentItem.unit_measure} // Asegura que se refleje el estado actual
                            onChange={onItemChange} // Maneja el cambio de unidad
                        >
                            <option value="g">gramos</option>
                            <option value="kg">kilo gramos</option>
                            <option value="lb">libras</option>
                            <option value="l">litros</option>
                            <option value="un">Unidades</option>
                        </select>
                    </div>

                    {/* Botón para agregar insumo */}
                    <div className="col-12 col-md-3 d-flex align-items-end">
                        <button
                            onClick={onAddItem} // Ejecuta la función externa
                            className="btn btn-primary w-100"
                            disabled={
                                !currentItem.input_id ||
                                !currentItem.quantity_total ||
                                !currentItem.unit_price
                            } // Deshabilita si faltan datos
                        >
                            <i className="bi bi-plus-lg me-2"></i>Agregar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default InputSelector;
