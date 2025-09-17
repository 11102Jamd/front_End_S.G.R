import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { disableProduct } from '../utils/enpoints/product'; // tu función para inhabilitar

const MySwal = withReactContent(Swal);

const DeleteButton = ({ productId, onDeleted }) => {

  const handleDisable = async () => {
    const result = await MySwal.fire({
      title: '¿Estás seguro?',
      text: "Esto inhabilitará el producto temporalmente",
      icon: 'question',
      iconColor: 'orange',
      showCancelButton: true,
      confirmButtonText: 'Inhabilitar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      // Añade estas propiedades para cambiar los colores:
      confirmButtonColor: '#d33',  // Rojo para el botón de inhabilitar
      cancelButtonColor: '#6c757d' // Gris para el botón de cancelar
    });

    if (result.isConfirmed) {
      try {
        await disableProduct(productId);
        MySwal.fire({
          icon: 'success',
          title: 'Producto inhabilitado',
          timer: 2000,
          showConfirmButton: false,
        });
        if (onDeleted) onDeleted(); // refresca lista
      } catch (error) {
        MySwal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo inhabilitar el producto ',
        });
      }
    }
  };

  return (
    <button
      className='btn btn-danger btn-sm rounded-2 p-2 d-flex align-items-center justify-content-center'
      title="Inhabilitar"
      onClick={handleDisable}
      style={{ width: '40px', height: '40px' }}
    >
      {/* Ojo normal blanco */}
      <i className="bi bi-eye-fill" style={{ color: 'white', fontSize: '1.2rem' }}></i>
    </button>
  );
};

export default DeleteButton;