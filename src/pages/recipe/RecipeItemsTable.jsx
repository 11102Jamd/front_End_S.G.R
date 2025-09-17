import React, { useEffect, useState } from "react";
import { getInputs } from "../../utils/enpoints/input";
/**
 * Componente RecipeItemsTable
 *
 * Muestra en forma de tabla los ingredientes agregados a la receta,
 * incluyendo su ID, nombre y cantidad requerida.
 */
function RecipeItemsTable({ items, onRemoveItem }) {
    const [inputs, setInputs] = useState([]); // Lista de insumos disponibles
    const [loading, setLoading] = useState(true);// Estado de carga de los insumos


    /**
     * useEffect que carga los insumos desde el backend cuando se monta el componente
     */
    useEffect(() => {
        const fetchInput = async () => {
            try {
                const data = await getInputs();// Obtener lista de insumos
                setInputs(data);
            } catch (error) {
                console.error("Error al cargar insumos", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInput();
    }, []);

    /**
     * Si no hay ingredientes en la lista, muestra un mensaje de advertencia
     */
    if (items.length === 0) {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="alert alert-warning mb-0">
                        No hay ingredientes agregados a la receta
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Renderiza la tabla con los ingredientes agregados
     */
    return (
        <div className="card">
            <div className="card-header bg-light">
                <h6 className="mb-0">Detalle de la Receta</h6>
            </div>
            <div className="card-body p-0">
                {loading ? (
                    <div className="p-3 text-center">Cargando insumos...</div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>ID Ingrediente</th>
                                    <th>Nombre</th>
                                    <th>Cantidad Requerida</th>
                                    <th style={{ width: "70px" }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => {
                                    const input = inputs.find(
                                        (input) => input.id === item.input_id
                                    );
                                    return (
                                        <tr key={index}>
                                            <td>{item.input_id}</td>
                                            <td>{input ? input.name : "N/A"}</td>
                                            <td>{item.quantity_required}</td>
                                            <td>
                                                <button
                                                    onClick={() => onRemoveItem(index)}
                                                    className="btn btn-danger btn-sm"
                                                    title="Eliminar"
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RecipeItemsTable;
