import { useState } from "react";
import { validateName, validatePrice } from "../../utils/validations/validationFields";
import { errorUpdateProduct, succesUpdateProduct } from "../../utils/alerts/productAlerts";
import { updateProduct } from "../../utils/enpoints/product";

// 1️⃣ Mostrar bonito (con $ y COL al final)
const formatCOP = (value) =>
  `${new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(value)} COL`;

//  Limpiar para enviar al backend
const parseCOP = (formattedValue) => parseInt(formattedValue.replace(/\D/g, ""), 10) || 0;


function EditProductModal({ product, onClose, onProductUpdate }) {
  const [productUpdate, setProductUpdate] = useState({
    ...product,
    unit_price: formatCOP(product.unit_price), // 👈 Mostramos ya formateado
  });
  const [errors, setErrors] = useState({});

  const validateEditProductForm = () => {
    const newErrors = {
      product_name: validateName(productUpdate.product_name, "Nombre del Producto"),
      unit_price: validatePrice(parseCOP(productUpdate.unit_price), "Precio del Producto"),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== null);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    setProductUpdate((prev) => ({
      ...prev,
      [id]: id === "unit_price" ? value : value,
    }));

    let error = null;

    switch (id) {
      case "product_name":
        error = validateName(value, "Nombre del Producto");
        break;
      case "unit_price":
        error = validatePrice(parseCOP(value), "Precio del Producto");
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [id]: error }));
  };

  const updateProductHandler = async () => {
    if (!validateEditProductForm()) return;

    try {
      await updateProduct(product.id, {
        product_name: productUpdate.product_name,
        unit_price: parseCOP(productUpdate.unit_price), // 👈 Enviamos valor numérico
      });

      await succesUpdateProduct();
      onProductUpdate();
      onClose();
    } catch (error) {
      console.error("Error al actualizar el producto", error);
      await errorUpdateProduct();
    }
  };

  return (
    <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-sm">
        <div className="modal-content">
          <div className="modal-header text-white" style={{ backgroundColor: "#176FA6" }}>
            <h5 className="modal-title">Editar Producto</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="product_name" className="form-label">
                Producto
              </label>
              <input
                type="text"
                className={`form-control form-control-sm ${errors.product_name ? "is-invalid" : ""}`}
                id="product_name"
                value={productUpdate.product_name}
                onChange={handleChange}
                required
              />
              {errors.product_name && <div className="invalid-feedback">{errors.product_name}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="unit_price" className="form-label">
                Precio Unitario
              </label>
              <input
                type="text" // 👈 OJO: ahora es texto para poder mostrar $ y puntos
                className={`form-control form-control-sm ${errors.unit_price ? "is-invalid" : ""}`}
                id="unit_price"
                value={productUpdate.unit_price}
                onChange={handleChange}
                required
              />
              {errors.unit_price && <div className="invalid-feedback">{errors.unit_price}</div>}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={updateProductHandler}
              style={{ backgroundColor: "#176FA6" }}
            >
              Actualizar Producto
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProductModal;
