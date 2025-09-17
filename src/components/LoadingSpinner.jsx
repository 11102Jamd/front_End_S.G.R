import React from "react";

function LoadingSpinner({ message = "Cargando..." }) {
  return (
    <>
      {/* Inyectamos el CSS de la animación en el propio componente */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={styles.container}>
        <div style={styles.spinner}></div>
        <p style={styles.message}>{message}</p>
      </div>
    </>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
  },
  spinner: {
    width: "30px",
    height: "30px",
    border: "4px solid #ccc",
    borderTop: "4px solid #000",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "10px",
  },
  message: {
    margin: 0,
    fontSize: "14px",
    color: "#333",
  },
};

export default LoadingSpinner;
