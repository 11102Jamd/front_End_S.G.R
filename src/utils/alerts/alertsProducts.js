import Swal from "sweetalert2";

/**
 * Alertas de Eliminar Producto
 */
export const showConfirmDeleteProducts = () => {
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


export const errorDeleteProduct = () => {
    return Swal.fire({
        title:"Error",
        text:"No se pudo eliminar el Producto",
        icon:"error",
        background:"#1a1616",
        color:"#ffffff"
    });
};

export const successDeleteProduct = () => {
    return Swal.fire({
        title:"Exito",
        text:"Producto eliminado con exito",
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
 * Alertas de crear Producto
 */

export const successCreateProduct = () => {
    return Swal.fire({
        title:"Exito",
        text:"Producto creado con Exito",
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


export const errorCreateProduct = () => {
    return Swal.fire({
        title:"Error",
        text:"No se pudo crear el Producto",
        icon:"error",
        background:"#1a1616",
        color:"#ffffff"
    });
};
/**
 * Alertas de actualizar Producto
 */

export const successEditProduct = () => {
    return Swal.fire({
        title:"Exito",
        text:"Producto actualizado con exito",
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


export const errorEditProduct = () => {
    return Swal.fire({
        title:"Error",
        text:"No se pudo editar el producto",
        icon:"error",
        background:"#1a1616",
        color:"#ffffff"
    });
};
/**
 * Alertas de error de formulario
 */
export const errorFormProduct = () => {
    return Swal.fire({
        title:"Error",
        text:"Por favor, corrige los errores del formulario",
        icon:"error",
        background:"#1a1616",
        color:"#ffffff"
    });
};


