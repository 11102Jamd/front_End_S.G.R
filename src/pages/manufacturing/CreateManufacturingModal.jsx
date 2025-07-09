import React, { useState, useEffect } from 'react';
import api from '../../utils/axiosConfig';
import Swal from 'sweetalert2';
import datatableConfig from '../../utils/styles/datatableconfing';

function CreateManufacturingModal({ onClose, onCreated }) {
    const [products, setProducts] = useState([]);
    const [inputs, setInputs] = useState([]);
    const [formData, setFormData] = useState({
        ID_product: '',
        ManufacturingTime: '',
        recipes: [],
    });

    const [currentInput, setCurrentInput] = useState({
        ID_inputs: '',
        AmountSpent: '',
        UnitMeasurement: 'g',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, inputsRes] = await Promise.all([
                    api.get('/products'),
                    api.get('/inputs'),
                ]);
                setProducts(productsRes.data);
                setInputs(inputsRes.data);
            } catch (error) {
                console.error('Error al cargar productos o insumos', error);
            }
        };
        fetchData();
    }, []);

    const handleAddInput = () => {
        if (currentInput.ID_inputs && currentInput.AmountSpent) {
            setFormData({
                ...formData,
                recipes: [...formData.recipes, currentInput],
            });
            setCurrentInput({ ID_inputs: '', AmountSpent: '', UnitMeasurement: 'g' });
        }
    };

    const handleRemoveInput = (index) => {
        const updated = [...formData.recipes];
        updated.splice(index, 1);
        setFormData({ ...formData, recipes: updated });
    };

    const handleCreate = async () => {
        try {
            await api.post('/manufacturing', formData);
            await Swal.fire('Éxito', 'Fabricación creada correctamente', 'success');
            onCreated();
            onClose();
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Error al crear fabricación', 'error');
        }
    };

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{ backgroundColor: '#176FA6' }}>
                        <h5 className="modal-title">Crear Fabricación</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row mb-3">
                            <div className="col">
                                <label className="form-label">Producto</label>
                                <select
                                    className="form-select"
                                    value={formData.ID_product}
                                    onChange={(e) => setFormData({ ...formData, ID_product: e.target.value })}>
                                    <option value="">Selecciona un producto</option>
                                    {Array.isArray(products) && products.map((p) => (
                                        <option key={p.id} value={p.id}>{p.ProductName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col">
                                <label className="form-label">Tiempo de Fabricación (min)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={formData.ManufacturingTime}
                                    onChange={(e) => setFormData({ ...formData, ManufacturingTime: e.target.value })}
                                />
                            </div>
                        </div>

                        <hr />
                        <h5>Detalle de Fabricación</h5>

                        <div className="row align-items-end mb-3">
                            <div className="col">
                                <label>Seleccionar Insumo</label>
                                <select
                                    className="form-select"
                                    value={currentInput.ID_inputs}
                                    onChange={(e) => setCurrentInput({ ...currentInput, ID_inputs: e.target.value })}>
                                    <option value="">Selecciona un insumo</option>
                                    {Array.isArray(inputs) && inputs.map((input) => (
                                        <option key={input.id} value={input.id}>{input.InputName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col">
                                <label>Cantidad</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={currentInput.AmountSpent}
                                    onChange={(e) => setCurrentInput({ ...currentInput, AmountSpent: e.target.value })}
                                />
                            </div>
                            <div className="col">
                                <label>Unidad</label>
                                <select
                                    className="form-select"
                                    value={currentInput.UnitMeasurement}
                                    onChange={(e) => setCurrentInput({ ...currentInput, UnitMeasurement: e.target.value })}>
                                    <option value="g">g</option>
                                    <option value="kg">kg</option>
                                    <option value="lb">lb</option>
                                </select>
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-success" onClick={handleAddInput}>Agregar Insumo</button>
                            </div>
                        </div>
                        {Array.isArray(formData.recipes) && formData.recipes.length > 0 && (
                            <table className="table table-bordered">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Insumo</th>
                                        <th>Cantidad</th>
                                        <th>Unidad</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formData.recipes.map((item, idx) => {
                                        const insumo = inputs.find((i) => i.id === parseInt(item.ID_inputs));
                                        return (
                                            <tr key={idx}>
                                                <td>{insumo?.InputName || 'Insumo no encontrado'}</td>
                                                <td>{item.AmountSpent}</td>
                                                <td>{item.UnitMeasurement}</td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={() => handleRemoveInput(idx)}>Eliminar</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" onClick={handleCreate}>Crear Fabricación</button>
                        <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateManufacturingModal;
