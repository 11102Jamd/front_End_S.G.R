
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import datatableConfig from "./datatableconfing";
import api from "../axiosConfig";

function InputsTable() {
    const [inputs, setInputs] = useState([]);

    useEffect(() => {
        const fetchInputs = async () => {
            try {
                const response = await api.get("/inputs");
                setInputs(response.data);
            } catch (error) {
                console.error("Error al cargar insumos:", error);
            }
        };

        fetchInputs();
    }, []);

    const columns = [
        { name: "Insumo", selector: row => row.InputName, sortable: true },
        { name: "Cantidad Inicial", selector: row => row.InitialQuantity, sortable: true },
        { name: "Stock Actual", selector: row => row.CurrentStock, sortable: true },
        { name: "Unidad", selector: row => row.UnitMeasurement, sortable: true },
        { name: "Precio Unidad", selector: row => row.UnityPrice, sortable: true },
    ];

    return (
        <div className="mt-3">
            <h5>Insumos Disponibles</h5>
            <DataTable
                columns={columns}
                data={inputs}
                pagination
                customStyles={datatableConfig.customStyles}
                paginationComponentOptions={datatableConfig.paginationOptions}
            />
        </div>
    );
}

export default InputsTable;
