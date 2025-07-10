import Swal from "sweetalert2";

/**
 * Alerta de eliminar insumo
 */
export const showConfirmDeleteInputs = () => {
    return Swal.fire({
        title:"¿Estas Seguro?",
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton:true,
        confirmButtonColor:'#176FA6',
        cancelButtonColor: '#f60606',
        confirmButtonText: 'Si, Eliminar',
        cancelButtonText: 'Cancelar',
        showClass: {
            popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
            `
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutDown animate__faster'
        },
        background:"#3E608C",
        color:"#f6f2f2"
    });
};

export const errorDeleteInput = () => {
    return Swal.fire({
        title:"Error",
        text:"No se pudo eliminar el insumo",
        icon:"error",
        background:"#1a1616",
        color:"#ffffff"
    });
};

export const successDeleteInput = () => {
    return Swal.fire({
        title:"Exito",
        text:"Insumo eliminado con exito",
        icon:"success",
        showClass: {
            popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
            `
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutDown animate__faster'
        },
        background:"#3E608C",
        color:"#f6f2f2"
    });
};

/**
 * Alertas de creacion de insumo
 */

export const successCreateInput = () => {
    return Swal.fire({
        title:"Exito",
        text:"Proveedor creado con exito",
        icon:"success",
        showClass: {
            popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
            `
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutDown animate__faster'
        },
        background:"#3E608C",
        color:"#f6f2f2"
    });
};

export const errorCreateInput = () => {
    return Swal.fire({
        title:"Error",
        text:"No se pudo crear el proveedor",
        icon:"error",
        background:"#1a1616",
        color:"#ffffff"
    });
};

/**
 * Alertas de Edicion de Insumos
 */
export const successEditInput = () => {
    return Swal.fire({
        title:"Exito",
        text:"Insumo Actualizado exitosamente",
        icon:"success",
        showClass: {
            popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
            `
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutDown animate__faster'
        },
        background:"#3E608C",
        color:"#f6f2f2"
    });
};

export const errorEditInput = () => {
    return Swal.fire({
        title:"Error",
        text:"No se pudo actualizar el Insumo",
        icon:"error",
        background:"#1a1616",
        color:"#ffffff"
    });
};
/**
 * Alerta error de formulario: 
 */

export const errorFormInput = () => {
    return Swal.fire({
        title:"Error",
        text:"Por favor, corrige los errores del formulario",
        icon:"error",
        background:"#1a1616",
        color:"#ffffff"
    });
};