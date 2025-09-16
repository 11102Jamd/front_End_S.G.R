import Swal from "sweetalert2";

/**
 * 
 * @returns Alertas de Inhabilit6ar Usuario
 */
export const showConfirmDisableUser = () => {
    return Swal.fire({
        title:"¿Estas Seguro?",
        text: "El usuario que inhabilites no accedera despues",
        icon: 'warning',
        showCancelButton:true,
        confirmButtonColor:'#176FA6',
        cancelButtonColor: '#f60606',
        confirmButtonText: 'Si, Inhabilitar',
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
        width :'350px',
        background:"#Afffff",
        color:"#220900",
    });
}

export const errorDisableUser = () => {
    return Swal.fire({
        title:"Error",
        text:"No se pudo deshabilitar el Usuario",
        icon:"error",
        background:"#fff",
        color:"#220900",
        width :'350px',
        customClass: {
            popup: "my-swal-popup",
            title: "my-swal-title",
            htmlContainer: "my-swal-text",
            confirmButton: "my-swal-button",
        }
    });
};

export const successDisableUser = () => {
    return Swal.fire({
        title:"Exito",
        text:"Usuario Deshabilitado con exito",
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
        width :'350px',
        background:"#e6fff5",
        color:"#220900",
        iconColor: '#77EE74',  
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#04A1FF",
        customClass: {
            popup: "my-swal-popup",
            title: "my-swal-title",
            htmlContainer: "my-swal-text",
            confirmButton: "my-swal-button",
        }
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


export const errorLogin = () => {
    return Swal.fire({
        title:"Error",
        text:"Usuario no identificado en el sistema",
        icon:"error",
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