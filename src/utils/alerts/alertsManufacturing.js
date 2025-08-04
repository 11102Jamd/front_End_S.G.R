import Swal from "sweetalert2";

export const showConfirmDeleteManufacturing = () => {
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

/**
 * Error al Cargar Detalles
 */
export const errorLoadManufacturing = () => {
    return Swal.fire({
        title:"Error",
        text:"No se pudo cargar los datos de la fabricacion",
        icon:"error",
        background:"#1a1616",
        color:"#ffffff"
    });
};
/**
 * Error al cargar el modal de fabricacion
 */
export const errorLoadModalDetails = () => {
    return Swal.fire({
        title:"Error",
        text:"No se pudo cargar el modal de vista de fabricacion",
        icon:"error",
        background:"#1a1616",
        color:"#ffffff"
    });
};