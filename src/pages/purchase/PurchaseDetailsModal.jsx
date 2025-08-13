import { useEffect } from "react";
import DataTable from "react-data-table-component";

function PurchaseDetailsModal({ purchase, onClose }) {

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const columns = [
        {
            name: 'Nombre del Insumo',
            selector: row => row.input?.InputName || 'Sin nombre',
            sortable: true,
            center: true
        },
        {
            name: 'Cantidad Inicial',
            selector: row => row.InitialQuantity,
            sortable: true,
            center: true
        },
        {
            name: 'Unidad de Medida',
            selector: row => row.UnitMeasurement,
            sortable: true,
            center: true
        },
        {
            name: 'Precio Unitario',
            selector: row => `$${row.UnityPrice}`,
            sortable: true,
            center: true
        }
    ];

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{ backgroundColor: '#176FA6' }}>
                        <h5 className="modal-title">Detalle de la Compra</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Proveedor</label>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                value={purchase?.name || []}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Fecha</label>
                            <input
                                type="mb-3"
                                className="form-control form-control-sm"
                                value={purchase?.PurchaseOrderDate || []}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="table-responsive">
                        <DataTable
                            title="Items"
                            columns={columns}
                            data={purchase.input_orders || []}
                            highlightOnHover
                            striped
                            dense
                        />
                    </div>
                    <div className="modal-body">
                        {/* Total de Orden de Compra */}
                        <div className="mb-3">
                            <label className="form-label">Total Orden de Compra</label>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                value={`$${purchase?.PurchaseTotal ?? 0}`}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>Cerrar</button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default PurchaseDetailsModal;

