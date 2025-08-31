// const columns = [
//         { name: 'ID insumo', selector: row => row.ID_input, center: true },
//         { name: 'Cantidad', selector: row => row.InitialQuantity, center: true },
//         { name: 'UNI.Medida', selector: row => row.UnitMeasurement, center: true },
//         { name: 'Precio UNIT', selector: row => row.UnityPrice.toFixed(2), center: true },
//         { name: 'Total', selector: row => (row.InitialQuantity * row.UnityPrice).toFixed(2), center: true },
//         {
//             name: 'Acción',
//             cell: (_, index) => (
//                 <button className="btn btn-sm btn-danger" onClick={() => handleDeleteItem(index)}>
//                     <i className="bi bi-trash"></i> Eliminar Insumo
//                 </button>
//             ),
//             center: true
//         }
//     ];
