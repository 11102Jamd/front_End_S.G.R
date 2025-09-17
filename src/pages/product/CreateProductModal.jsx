import { useState } from "react";
import { errorCreateProduct, succesCreateProduct } from "../../utils/alerts/productAlerts";
import { createProduct } from "../../utils/enpoints/product";

function CreateProductModal({ onClose, onProductCreated }) {
  const [product, setProduct] = useState({
    product_name: "",
    unit_price: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!product.product_name || !product.unit_price) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Nos aseguramos de enviar el precio como número
      const payload = {
        product_name: product.product_name.trim(),
        unit_price: Number(product.unit_price)
      };

      console.log("Payload a enviar:", payload); // 👀 Debug: mira en consola lo que se envía
      await createProduct(payload);
      await succesCreateProduct();
      onProductCreated?.();
      onClose();
    } catch (err) {
      console.error("Error al crear producto:", err);
      await errorCreateProduct(err.response?.data?.message || err.message);
      setError("Error al crear el producto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-sm">
        <div className="modal-content">
          <div className="modal-header text-white" style={{ backgroundColor: "#176FA6" }}>
            <h5 className="modal-title">Registrar Producto</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Nombre del producto */}
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="product_name"
                value={product.product_name}
                onChange={handleChange}
              />
            </div>

            {/* Precio del producto */}
            <div className="mb-3">
              <label className="form-label">Precio</label>
              <input
                type="number"
                className="form-control"
                name="unit_price"
                value={product.unit_price}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={loading}
              style={{ background: "#176FA6" }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Guardando...
                </>
              ) : (
                "Registrar Producto"
              )}
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

export default CreateProductModal;
