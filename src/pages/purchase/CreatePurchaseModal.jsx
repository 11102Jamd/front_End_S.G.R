import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../utils/axiosConfig";
import DataTable from "react-data-table-component";
import customStyles from "../../utils/styles/customStyles";
import { getInputs } from "../../utils/api/inputs";
import { getSuppliers } from "../../utils/api/supplier";


function CreatePurchaseModal({ onClose, onPurchaseCreated }) {
    const today = new Date().toISOString().split('T')[0];

    const [items, setItems] = useState([]);
    const [newPurchase, setNewPurchase] = useState({
        ID_supplier: '',
        ID_input: '',
        InitialQuantity: '',
        UnitMeasurement: '',
        UnityPrice: ''
    });

    const [loadingSuppliers, setLoadingSuppliers] = useState(true);
    const [loadingItems, setLoadingItems] = useState(true);
    const [suppliers, setSuppliers] = useState([]);
    const [inputs, setInputs] = useState([]);

    //Evento para cerrar con la key ESC
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // Llamadas a la API para obtener proveedores e insumos
    useEffect(() => {
        const fetchInput = async () => {
            try {
                const data = await getInputs();
                setInputs(data); // Renombrado a inputs para que coincida con el valor en el formulario
            } catch (error) {
                console.error("Error al obtener los insumos:", error);
            } finally {
                setLoadingItems(false);
            }
        };
        fetchInput();
    }, []);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await getSuppliers();
                setSuppliers(response);
            } catch (error) {
                console.error("Error al cargar los proveedores:", error);
            } finally {
                setLoadingSuppliers(false);
            }
        };
        fetchSuppliers();
    }, []);

    const handleAddItem = () => {
        const { ID_input, InitialQuantity, UnitMeasurement, UnityPrice } = newPurchase;
        // Validar que todos los campos estén completos antes de agregar el item
        if (!ID_input || !InitialQuantity || !UnitMeasurement || !UnityPrice) {
            return Swal.fire('Error', 'Completa todos los campos del insumo', 'warning');
        }
        setItems([
            ...items,
            {
                ID_input: parseInt(ID_input),
                InitialQuantity: parseFloat(InitialQuantity),
                UnitMeasurement: UnitMeasurement.toLowerCase(),
                UnityPrice: parseFloat(UnityPrice)
            }
        ]);
        setNewPurchase({
            ID_supplier: newPurchase.ID_supplier,
            ID_input: '',
            InitialQuantity: '',
            UnitMeasurement: '',
            UnityPrice: ''
        });
    };

    const handleDeleteItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const createPurchase = async () => {
        if (!newPurchase.ID_supplier || items.length === 0) {
            return Swal.fire('Error', 'Debe ingresar proveedor y al menos un insumo', 'warning');
        }
        const purchaseData = {
            ID_supplier: parseInt(newPurchase.ID_supplier),
            PurchaseOrderDate: today,
            inputs: items
        };
        try {
            await api.post('/purchaseorder', purchaseData);
            await Swal.fire('Éxito', 'Orden de Compra creada', 'success');
            onPurchaseCreated();
            onClose();
            setItems([]);
            setNewPurchase({
                ID_supplier: '',
                ID_input: '',
                InitialQuantity: '',
                UnitMeasurement: '',
                UnityPrice: ''
            });
        } catch (error) {
            console.error('Error al crear Orden de Compra', error);
            Swal.fire('Error', 'Hubo un error al crear la orden de compra', 'error');
        }
    };

    const columns = [
        { name: 'ID insumo', selector: row => row.ID_input, center: true },
        { name: 'Cantidad', selector: row => row.InitialQuantity, center: true },
        { name: 'UNI.Medida', selector: row => row.UnitMeasurement, center: true },
        { name: 'Precio UNIT', selector: row => row.UnityPrice.toFixed(2), center: true },
        { name: 'Total', selector: row => (row.InitialQuantity * row.UnityPrice).toFixed(2), center: true },
        {
            name: 'Acción',
            cell: (_, index) => (
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteItem(index)}>
                    <i className="bi bi-trash"></i> Eliminar Insumo
                </button>
            ),
            center: true
        }
    ];

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{ backgroundColor: '#176FA6' }}>
                        <h5 className="modal-title">Crear Orden de Compra</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            {/* Columna izquierda: formulario */}
                            <div className="col-md-5">
                                <div className="col-md-50">
                                    <label className="from-label">Proveedor</label>
                                    <select
                                        className="form-select form-select-sm"
                                        value={newPurchase.ID_supplier}
                                        onChange={(e) => setNewPurchase({ ...newPurchase, ID_supplier: e.target.value })}
                                    >
                                        <option value="">Seleccione...</option>
                                        {loadingSuppliers ? (<option>Cargando proveedores...</option>
                                        ) : (
                                            suppliers.map((supplier) => (
                                                <option key={supplier.id} value={supplier.id}>
                                                    {supplier.name}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Insumo</label>
                                    <select
                                        type="text"
                                        className="form-control form-control-sm"
                                        value={newPurchase.ID_input}
                                        onChange={(e) => setNewPurchase({ ...newPurchase, ID_input: e.target.value })}><option value=''>Seleccione...</option>
                                        {loadingItems ? (<option>Cargando insumos...</option>
                                        ) : (
                                            inputs.map((input) => (
                                                <option key={input.id} value={input.id}>
                                                    {input.InputName}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Cantidad Inicial</label>
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        value={newPurchase.InitialQuantity}
                                        onChange={(e) => setNewPurchase({ ...newPurchase, InitialQuantity: e.target.value })}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Unidad de Medida</label>
                                    <select
                                        className="form-select form-select-sm"
                                        value={newPurchase.UnitMeasurement}
                                        onChange={(e) => setNewPurchase({ ...newPurchase, UnitMeasurement: e.target.value })}
                                    >
                                        <option value="">Seleccione...</option>
                                        <option value="kg">Kg</option>
                                        <option value="g">Gramo</option>
                                        <option value="lb">Libra</option>
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Precio por Unidad</label>
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        value={newPurchase.UnityPrice}
                                        onChange={(e) => setNewPurchase({ ...newPurchase, UnityPrice: e.target.value })}
                                    />
                                </div>
                                <button onClick={handleAddItem} className="btn btn-success btn-sm mt-2">
                                    <i className="bi bi-plus-circle"></i> Agregar Insumo
                                </button>
                            </div>
                            <div className="col-md-7">
                                <DataTable
                                    title="Detalle de la Orden de Compra"
                                    columns={columns}
                                    data={items}
                                    customStyles={customStyles}
                                    highlightOnHover
                                    pointerOnHover
                                    striped
                                    dense
                                    noDataComponent={<div className='alert alert-info'>Aún no hay insumos</div>}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" onClick={createPurchase}>
                            Guardar
                        </button>
                        <button className="btn btn-danger" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePurchaseModal;
