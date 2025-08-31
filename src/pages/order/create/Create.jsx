//  const createOrder = async () => {
//         if (!newOrder.ID_supplier || items.length === 0) {
//             return Swal.fire('Error', 'Debe ingresar proveedor y al menos un insumo', 'warning');
//         }
//         const orderData = {
//             ID_supplier: parseInt(newOrder.ID_supplier),
//             PurchaseOrderDate: today,
//             inputs: items
//         };
//         try {
//             await api.post('/order', orderData);
//             await Swal.fire('Éxito', 'Orden de Compra creada', 'success');
//             onOrderCreated();
//             onClose();
//             setItems([]);
//             setNewOrder({
//                 ID_supplier: '',
//                 ID_input: '',
//                 InitialQuantity: '',
//                 UnitMeasurement: '',
//                 UnityPrice: ''
//             });
//         } catch (error) {
//             console.error('Error al crear Orden de Compra', error);
//             Swal.fire('Error', 'Hubo un error al crear la orden de compra', 'error');
//         }
//     };
