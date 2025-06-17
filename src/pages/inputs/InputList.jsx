import React, { use, useEffect, useState } from "react";
import api from "../../utils/axiosConfig";

function Input(){
    const [input, setInput] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [inputSelected, setInputSelected] = useState(null);
    const [pending, setPending] = useState(true);


    useEffect(()=>{
        getInputs();
    }, []);


    const getInputs = async () => {
        try {
            setPending(true);
            const response = await api.get('/inputs');
            setInput(response.data);
            setPending(false);
        } catch (error) {
            console.error('Error al mostrar todos los Insumos: ', error);
            setPending(false);
        }
    }
    return(
        <div>

        </div>
    );
}
export default Input;