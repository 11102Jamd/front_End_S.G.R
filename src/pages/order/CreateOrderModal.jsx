import { useState } from 'react';
import { createOrder } from "../../utils/enpoints/purchase";
import { successCreateOrder, errorCreateOrder } from '../../utils/alerts/alertsOrder';
import InputSelector from './InputsSelector';
import OrderItemsTable from './OrderItems';
import { validateSupplierName, validateQuantity, validateUnitPrice } from '../../utils/validations/orderValidations';
import Swal from "sweetalert2";

function CreateOrderModal({ onClose, onOrderCreated }) {
    const [order, setOrder] = useState({
        supplier_name: '',
        order_date: new Date().toISOString().split('T')[0],
        items: []
    });

    const [currentItem, setCurrentItem] = useState({
        input_id: '',
        quantity_total: '',
        unit_price: '',
        unit_measure: 'g'
    });

    const [loading, setLoading] = useState(false);

    //Manejamos la validacion con los items al menos seleccionar uno
    const addItem = () => {
        if (!currentItem.input_id) {
            Swal.fire("Error", "Debes seleccionar un insumo.", "error");
            return;
        }

        if (!validateQuantity(currentItem.quantity_total)) return;
        if (!validateUnitPrice(currentItem.unit_price)) return;

        const newItem = {
            input_id: parseInt(currentItem.input_id),
            quantity_total: parseFloat(currentItem.quantity_total),
            unit_price: parseFloat(currentItem.unit_price),
            unit_measure: currentItem.unit_measure
        };

        setOrder(prev => ({
            ...prev,
            items: [...prev.items, newItem]
        }));

        setCurrentItem({
            input_id: '',
            quantity_total: '',
            unit_price: '',
            unit_measure: 'g'
        });
    };

    const removeItem = (index) => {
        const updatedItems = [...order.items];
        updatedItems.splice(index, 1);
        setOrder({ ...order, items: updatedItems });
    };

    const handleOrderChange = (e) => {
        setOrder({ ...order, [e.target.name]: e.target.value });
    };

    const handleItemChange = (e) => {
        setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
    };

    //se guardan las ordenes de compra con las validaciones respectivas
    const handleSubmit = async () => {
        if (!validateSupplierName(order.supplier_name)) return;

        if (order.items.length === 0) {
            Swal.fire("Error", "La orden debe contener al menos un item.", "error");
            return;
        }

        setLoading(true);
        try {
            await createOrder(order);
            await successCreateOrder();
            onOrderCreated?.();
            onClose();
        } catch (error) {
            console.error("Error al crear orden:", error);
            await errorCreateOrder(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{ backgroundColor: '#176FA6' }}>
                        <h5 className="modal-title">Crear Orden de Compra</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {/* Proveedor */}
                        <div className="row mb-4">
                            <div className="col-12">
                                <label htmlFor="supplier_name" className="form-label">Proveedor *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="supplier_name"
                                    name="supplier_name"
                                    value={order.supplier_name}
                                    onChange={handleOrderChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Selector de insumos */}
                        <InputSelector
                            currentItem={currentItem}
                            onItemChange={handleItemChange}
                            onAddItem={addItem}
                        />

                        {/* Tabla */}
                        <OrderItemsTable
                            items={order.items}
                            onRemoveItem={removeItem}
                        />
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-primary"
                            style={{ backgroundColor: '#176FA6' }}
                            onClick={handleSubmit}
                            disabled={order.items.length === 0 || !order.supplier_name || loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                    Guardando...
                                </>
                            ) : 'Guardar Orden'}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateOrderModal;





