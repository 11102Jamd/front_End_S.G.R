import Swal from "sweetalert2";


/**
 * Alertas de Eliminar Proveedor
 */
export const showConfirmDeleteSupplier = () => {
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


export const errorDeleteSupplier = () => {
    return Swal.fire({
        title:"Error",
        text:"No se pudo eliminar al proveedor",
        icon:"error",
        background:"#1a1616",
        color:"#ffffff"
    });
};


export const successDeleteSupplier = () => {
    return Swal.fire({
        title:"Exito",
        text:"Proveedor eliminado con exito",
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
 * Alertas de Creacion Proveedor
 */
export const successCreateSupplier = () => {
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


export const errorCreateSupplier = () => {
    return Swal.fire({
        title:"Error",
        text:"No se pudo crear el proveedor",
        icon:"error",
        background:"#1a1616",
        color:"#ffffff"
    });
};

/**
 * Alertas edicion Proveedor
 */
export const successEditSupplier = () => {
    return Swal.fire({
        title:"Exito",
        text:"Proveedor actualizado con exito",
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


export const errorEditSupplier = () => {
    return Swal.fire({
        title:"Error",
        text:"No se pudo editar el proveedor",
        icon:"error",
        background:"#1a1616",
        color:"#ffffff"
    });
};

/**
 * Alerta de Error de formulario
 */

export const errorFormSupplier = () => {
    return Swal.fire({
        title:"Error",
        text:"Por favor, corrige los errores del formulario",
        icon:"error",
        background:"#1a1616",
        color:"#ffffff"
    });
};