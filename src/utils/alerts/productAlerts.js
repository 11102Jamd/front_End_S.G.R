import Swal from "sweetalert2";

// ✅ Éxito al crear producto
export const succesCreateProduct = () => {
    return Swal.fire({
        title: "Éxito",
        text: "Producto creado con éxito",
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

// ❌ Error al crear producto
export const errorCreateProduct = () => {
    return Swal.fire({
        title: "Error",
        text: "No se pudo crear el producto",
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

// ✅ Éxito al actualizar producto
export const succesUpdateProduct = () => {
    return Swal.fire({
        title: "Éxito",
        text: "Producto actualizado con éxito",
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

// ❌ Error al actualizar producto
export const errorUpdateProduct = () => {
    return Swal.fire({
        title: "Error",
        text: "No se pudo actualizar el producto",
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
