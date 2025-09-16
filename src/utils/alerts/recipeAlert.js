import Swal from "sweetalert2";
export const showConfirmDeleteRecipe = () => {
    return Swal.fire({
        title: "¿Estás Seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#176FA6",
        cancelButtonColor: "#f60606",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        showClass: {
            popup: `
        animate__animated
        animate__fadeInUp
        animate__faster`
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutDown animate__faster'
        },
        width: '350px',
        background: "#e6fff5",
        color: "#220900",
    });
};

/**
 * 
 * @returns Alertas de creacion de producto
 */
export const successCreateRecipe = () => {
    return Swal.fire({
        title: "Exito",
        text: "Receta creada con exito",
        icon: "success",
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
        width: '350px',
        background: "#e6fff5",
        color: "#220900",
        iconColor: '#77EE74',  // color del círculo del ícono
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

export const errorCreateRecipe = () => {
    return Swal.fire({
        title: "Error",
        text: "No se pudo crear la Receta",
        icon: "error",
        background: "#Afffff",
        color: "#220900",
        width: '350px',
        customClass: {
            popup: "my-swal-popup",
            title: "my-swal-title",
            htmlContainer: "my-swal-text",
            confirmButton: "my-swal-button",
        }
    });
};

/**
 * 
 * @returns Alerta de error al obtener los dealles
 */
export const errorShowDetailsRecipe = () => {
    return Swal.fire({
        title: "Error",
        text: "No se puedo traer la receta con detalles",
        icon: "error",
        background: "#Afffff",
        color: "#220900",
        width: '350px',
        customClass: {
            popup: "my-swal-popup",
            title: "my-swal-title",
            htmlContainer: "my-swal-text",
            confirmButton: "my-swal-button",
        }
    });
};


/**
 * 
 * @returns Alertas de edicion de Receta
 */
export const successUpdateRecipe = () => {
    return Swal.fire({
        title: "Exito",
        text: "Receta editada con exito",
        icon: "success",
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
        width: '350px',
        background: "#e6fff5",
        color: "#220900",
        iconColor: '#77EE74',  // color del círculo del ícono
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

export const errorUpdateRecipe = () => {
    return Swal.fire({
        title: "Error",
        text: "No se pudo editar la Receta",
        icon: "error",
        background: "#Afffff",
        color: "#220900",
        width: '350px',
        customClass: {
            popup: "my-swal-popup",
            title: "my-swal-title",
            htmlContainer: "my-swal-text",
            confirmButton: "my-swal-button",
        }
    });
};
export const errorDeleteRecipe = () => {
    return Swal.fire({
        title: "Error",
        text: "No se pudo eliminar la receta",
        icon: "error",
        background: "#Afffff",
        color: "#220900",
        width: '350px',
        customClass: {
            popup: "my-swal-popup",
            title: "my-swal-title",
            htmlContainer: "my-swal-text",
            confirmButton: "my-swal-button",
        }
    });
};
export const successDeleteRecipe = () => {
    return Swal.fire({
        title: "Eliminado",
        text: "La receta se eliminó con éxito",
        icon: "success",
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
        width: '350px',
        background: "#ffe6e6",
        color: "#220900",
        iconColor: '#EE7474',
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