import React, { useState, useEffect } from 'react';
import { getInputs } from '../../utils/enpoints/input';
// import { LoadingSpinner } from '../../Loading';

function InputSelector({ currentItem, onItemChange, onAddItem }) {
    // Estado para almacenar los insumos obtenidos y el estado de carga.
    const [inputs, setInputs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Efecto para obtener insumos al montar el componente.
    useEffect(() => {
        const fetchInput = async () => {
            try {
                const data = await getInputs();//Obtiene los insumos desde la API
                setInputs(data);//Actualiza el estado con los insumos obtenidos
            } catch (error) {
                console.error("Error cargando insumos:", error);
            } finally {
                setLoading(false);//Cambia el estado de carga a falso
            }
        };
        fetchInput();//Llama a la funcion para obtener insumos 
    }, []);

    //Si los insumos están cargando muestra un snipper de carga
    if (loading) {
        return (
            <div className="card mb-4">
                <div className="card-body text-center py-4">
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
                    <div className="col-12 col-md-5">
                        <label htmlFor="input_id" className="form-label">Insumo</label>
                        <select
                            className="form-select"
                            id="input_id"
                            name="input_id"
                            value={currentItem.input_id}//Valor del insumo seleccionado
                            onChange={onItemChange}//Maneja el cambio del insumo seleccionado
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
                    <div className="col-12 col-md-2">
                        <label htmlFor="quantity_total" className="form-label">Cantidad</label>
                        <input
                            type="number"
                            className="form-control"
                            id="quantity_total"
                            name="quantity_total"
                            value={currentItem.quantity_total}//Valor de la cantidad
                            onChange={onItemChange}//Maneja el cambio en la cantidad
                            min="0.01"
                            step="0.01"
                            required
                        />
                    </div>
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
                    <div className="col-12 col-md-3">
                        <label htmlFor='unit_measure' className='form-label'>Unidad</label>
                        <select
                            id='unit_measure'
                            name='unit_measure'
                            className='form-select'
                        >
                            <option value="g">gramos</option>
                            <option value="kg">kilo gramos</option>
                            <option value="lb">libras</option>
                            <option value="l">litros</option>
                            <option value="un">Unidades</option>
                        </select>
                    </div>
                    <div className="col-12 col-md-3 d-flex align-items-end">
                        <button
                            onClick={onAddItem}//Ejecuta la función onAddItem al hacer clic
                            className="btn btn-primary w-100"
                            disabled={!currentItem.input_id || !currentItem.quantity_total || !currentItem.unit_price}//Desactiva ek botón si falta información
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
