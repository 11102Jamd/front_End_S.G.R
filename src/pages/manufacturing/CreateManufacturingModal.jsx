import { useState, useEffect } from "react";
import api from "../../utils/axiosConfig";

function CreateManufacturingModal({ onClose, onManufacturingCreated }) {
    const [products, setProducts] = useState([]);
    const [inputs, setInputs] = useState([]);

    const [ID_product, setIDProduct] = useState("");
    const [ManufacturingTime, setManufacturingTime] = useState("");
    const [recipes, setRecipes] = useState([]);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProducts();
        getInputs();
    }, []);

    const getProducts = async () => {
        const res = await api.get("/product");
        setProducts(res.data);
    };

    const getInputs = async () => {
        const res = await api.get("/inputs");
        setInputs(res.data);
    };

    const addRecipe = () => {
        setRecipes([...recipes, { ID_inputs: "", AmountSpent: "", UnitMeasurement: "g" }]);
    };

    const updateRecipe = (index, field, value) => {
        const updated = [...recipes];
        updated[index][field] = value;
        setRecipes(updated);
    };

    const removeRecipe = (index) => {
        const updated = [...recipes];
        updated.splice(index, 1);
        setRecipes(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await api.post("/manufacturing", {
                ID_product,
                ManufacturingTime,
                recipes,
            });

            onManufacturingCreated();
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || "Error al guardar");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal show fade d-block" tabIndex="-1">
            <div className="modal-dialog modal-lg">
                <div className="modal-content border-0 shadow-lg">
                    <div className="modal-header text-white" style={{ backgroundColor: '#176FA6' }}>
                        <h5 className="modal-title">Registrar Fabricación</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">

                            {/* Producto */}
                            <div className="mb-3">
                                <label className="form-label fw-bold">Producto</label>
                                <select className="form-select" value={ID_product} onChange={e => setIDProduct(e.target.value)} required>
                                    <option value="">Seleccione un producto</option>
                                    {products.map(p => (
                                        <option key={p.id} value={p.id}>{p.ProductName}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Tiempo */}
                            <div className="mb-3">
                                <label className="form-label fw-bold">Tiempo de fabricación (minutos)</label>
                                <input type="number" className="form-control" value={ManufacturingTime} onChange={e => setManufacturingTime(e.target.value)} required />
                            </div>

                            {/* Insumos */}
                            <div className="mb-3">
                                <label className="form-label fw-bold">Ingredientes (insumos)</label>
                                {recipes.map((r, index) => (
                                    <div key={index} className="row mb-2 align-items-center">
                                        <div className="col-md-4">
                                            <select className="form-select" value={r.ID_inputs} onChange={e => updateRecipe(index, "ID_inputs", e.target.value)} required>
                                                <option value="">Insumo</option>
                                                {inputs.map(i => (
                                                    <option key={i.id} value={i.id}>{i.InputName}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-3">
                                            <input type="number" className="form-control" placeholder="Cantidad" value={r.AmountSpent} onChange={e => updateRecipe(index, "AmountSpent", e.target.value)} required />
                                        </div>
                                        <div className="col-md-3">
                                            <select className="form-select" value={r.UnitMeasurement} onChange={e => updateRecipe(index, "UnitMeasurement", e.target.value)} required>
                                                <option value="g">g</option>
                                                <option value="kg">kg</option>
                                                <option value="lb">lb</option>
                                            </select>
                                        </div>
                                        <div className="col-md-2 text-end">
                                            <button type="button" className="btn btn-outline-danger" onClick={() => removeRecipe(index)}>
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button type="button" className="btn btn-outline-success mt-2" onClick={addRecipe}>
                                    <i className="bi bi-plus-circle"></i> Agregar Insumo
                                </button>
                            </div>

                            {error && <div className="alert alert-danger">{error}</div>}
                        </div>

                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Guardando...
                                    </>
                                ) : (
                                    "Guardar Fabricación"
                                )}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateManufacturingModal;
