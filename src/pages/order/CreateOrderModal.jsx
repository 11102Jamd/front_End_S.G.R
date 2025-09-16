import { useState } from 'react';
import { createOrder } from "../../utils/enpoints/purchase";
import { successCreateOrder, errorCreateOrder } from '../../utils/alerts/alertsOrder';
import InputSelector from './InputsSelector';
import OrderItemsTable from './OrderItems';
import { validateSupplierName, validateQuantity, validateUnitPrice } from '../../utils/validations/orderValidations';
import Swal from "sweetalert2";

/**
 * Componente modal para la creación de órdenes de compra.
 *
 * @param {function} onClose - Callback para cerrar el modal.
 * @param {function} onOrderCreated - Callback que se ejecuta cuando una orden es creada exitosamente.
 */
function CreateOrderModal({ onClose, onOrderCreated }) {

    /**
     * Estado principal que contiene la información de la orden.
     * - supplier_name: Nombre del proveedor
     * - order_date: Fecha de creación de la orden
     * - items: Lista de ítems agregados a la orden
     */
    const [order, setOrder] = useState({
        supplier_name: '',
        order_date: new Date().toISOString().split('T')[0],
        items: []
    });

    /**
     * Estado para manejar el ítem actual que se está agregando.
     * - input_id: Identificador del insumo
     * - quantity_total: Cantidad total
     * - unit_price: Precio unitario
     * - unit_measure: Unidad de medida
     */
    const [currentItem, setCurrentItem] = useState({
        input_id: '',
        quantity_total: '',
        unit_price: '',
        unit_measure: 'g'
    });

    /** Estado booleano para mostrar indicador de carga */
    const [loading, setLoading] = useState(false);

    /**
     * Agrega un nuevo ítem a la orden.
     * @returns {void}
     */
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

        // Reiniciar estado del ítem actual
        setCurrentItem({
            input_id: '',
            quantity_total: '',
            unit_price: '',
            unit_measure: 'g'
        });
    };

    /**
     * Elimina un ítem existente en la orden por índice.
     *
     * @param {number} index - Índice del ítem en la lista.
     * @returns {void}
     */
    const removeItem = (index) => {
        const updatedItems = [...order.items];
        updatedItems.splice(index, 1);
        setOrder({ ...order, items: updatedItems });
    };

    /**
     * Maneja cambios en los campos principales de la orden.
     *
     * @param {object} e - Evento del input.
     * @returns {void}
     */
    const handleOrderChange = (e) => {
        setOrder({ ...order, [e.target.name]: e.target.value });
    };

    /**
     * Maneja cambios en los campos del ítem actual.
     *
     * @param {object} e - Evento del input.
     * @returns {void}
     */
    const handleItemChange = (e) => {
        setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
    };

    /**
     * Envía la orden al backend para crearla.
     *
     * @returns {Promise<void>}
     */
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

                        {/* Campo proveedor */}
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

                        {/* Tabla de ítems */}
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
