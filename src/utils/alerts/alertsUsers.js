import Swal from "sweetalert2";

/**
 * Alertas de eliminacion
 */
export const showConfirmDeleteUser = () => {
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

export const errorDeleteUser = () => {
    return Swal.fire({
        title:"Error",
        text:"No se pudo eliminar al usuario",
        icon:"error",
        background:"#1a1616",
        color:"#ffffff"
    });
};


export const successDeleteUser = () => {
    return Swal.fire({
        title:"Exito",
        text:"Usuario eliminado con exito",
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
 * Alertas de creacion de Usuario
 */

export const successCreateUser = () => {
    return Swal.fire({
        title:"Exito",
        text:"Usuario creado con Exito",
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


export const errorCreateUser = () => {
    return Swal.fire({
        title:"Error",
        text:"No se pudo crear el usuario",
        icon:"error",
        background:"#1a1616",
        color:"#ffffff"
    });
};

/**
 * Alertas de edicicion de Usuario
 */

export const successEditUser = () => {
    return Swal.fire({
        title:"Exito",
        text:"Usuario actualizado con exito",
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

export const errorEditUser = () => {
    return Swal.fire({
        title:"Error",
        text:"No se pudo editar el proveedor",
        icon:"error",
        background:"#1a1616",
        color:"#ffffff"
    });
};

/**
 * Alerta de error de Formulario
 */

export const errorFormUser = () => {
    return Swal.fire({
        title:"Error",
        text:"Por favor, corrige los errores del formulario",
        icon:"error",
        background:"#1a1616",
        color:"#ffffff"
    });
};