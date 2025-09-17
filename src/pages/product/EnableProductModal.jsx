import React, { useEffect, useState } from "react";
import { getDisabledProducts, enableProduct } from "../../utils/enpoints/product";
import Swal from "sweetalert2";

function EnableProductModal({ onClose, onProductEnabled }) {
    const [disabledProducts, setDisabledProducts] = useState([]);

    useEffect(() => {
        fetchDisabledProducts();
    }, []);

    const fetchDisabledProducts = async () => {
        try {
            const data = await getDisabledProducts();
            setDisabledProducts(data);
        } catch (error) {
            console.error("Error al cargar productos inhabilitados:", error);
        }
    };

    const handleEnable = async (id) => {
        try {
            await enableProduct(id);
            Swal.fire("Habilitado", "El producto fue habilitado con éxito", "success");
            fetchDisabledProducts();
            onProductEnabled();
        } catch (error) {
            Swal.fire("Error", "No se pudo habilitar el producto", "error");
        }
    };

    return (
        <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Habilitar Productos</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {disabledProducts.length === 0 ? (
                            <div className="alert alert-info">No hay productos inhabilitados</div>
                        ) : (
                            <ul className="list-group">
                                {disabledProducts.map((prod) => (
                                    <li key={prod.id} className="list-group-item d-flex justify-content-between">
                                        {prod.product_name}
                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() => handleEnable(prod.id)}
                                        >
                                            Habilitar
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EnableProductModal;
