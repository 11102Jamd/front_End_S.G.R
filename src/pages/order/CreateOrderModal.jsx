import { useState } from 'react';
import { createOrder } from "../../utils/enpoints/purchase";
import { successCreateOrder, errorCreateOrder } from '../../utils/alerts/alertsOrder';
import InputSelector from './InputsSelector';
import OrderItemsTable from './OrderItems';
import { validateSupplierName, validateQuantity, validateUnitPrice } from '../../utils/validations/orderValidations';
import Swal from "sweetalert2";

function CreateOrderModal({ onClose, onOrderCreated }) {

    //Estado para guardar la información de la compra
    const [order, setOrder] = useState({
        supplier_name: '',
        order_date: new Date().toISOString().split('T')[0],
        items: []
    });

    //Estado para los detalles del item que se agrega
    const [currentItem, setCurrentItem] = useState({
        input_id: '',
        quantity_total: '',
        unit_price: '',
        unit_measure: 'g'
    });

    //Estado para controlar el estado de carga durante la creación de la compra
    const [loading, setLoading] = useState(false);

    //Función para agregar un nuevo item a la orden
    const addItem = () => {
        //Validación que asegura la seleccion de un insumo
        if (!currentItem.input_id) {
            Swal.fire("Error", "Debes seleccionar un insumo.", "error");
            return;
        }

        //Validaciones de cantidad y precio unitario
        if (!validateQuantity(currentItem.quantity_total)) return;
        if (!validateUnitPrice(currentItem.unit_price)) return;

        //Crear nuevo item a partir del estado actual
        const newItem = {
            input_id: parseInt(currentItem.input_id),
            quantity_total: parseFloat(currentItem.quantity_total),
            unit_price: parseFloat(currentItem.unit_price),
            unit_measure: currentItem.unit_measure
        };

        //Actualizar el estado de la orden con el nuevo item
        setOrder(prev => ({
            ...prev,
            items: [...prev.items, newItem]
        }));

        //Reiniciar el estado del item actual
        setCurrentItem({
            input_id: '',
            quantity_total: '',
            unit_price: '',
            unit_measure: 'g'
        });
    };

    // Función para eliminar un item de la compra
    const removeItem = (index) => {
        const updatedItems = [...order.items];
        updatedItems.splice(index, 1); // Eliminar el item en la posición especificada
        setOrder({ ...order, items: updatedItems });
    };

    // Manejar cambios en el formulario de la compra
    const handleOrderChange = (e) => {
        setOrder({ ...order, [e.target.name]: e.target.value });
    };

    //Maneja los cambios en el item actual
    const handleItemChange = (e) => {
        setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
    };

    //Función para manejar el envío del formulario y guardar la compra
    const handleSubmit = async () => {
        //Validación del nombre del proveedor
        if (!validateSupplierName(order.supplier_name)) return;

        //Validación de que al menos haya un item en la compra
        if (order.items.length === 0) {
            Swal.fire("Error", "La orden debe contener al menos un item.", "error");
            return;
        }

        setLoading(true);//Activa el estado de carga
        try {
            await createOrder(order);//Llamar la función para crear la compra
            await successCreateOrder();
            onOrderCreated?.();//Callback para notificar que se ha creado la compra
            onClose(); //Cerrar el modal
        } catch (error) {
            console.error("Error al crear orden:", error);
            await errorCreateOrder(error.response?.data?.message || error.message);//Muestra el mensaje de error
        } finally {
            setLoading(false);//Desactiva el estado de carga
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

                        {/* Tabla de items */}
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





