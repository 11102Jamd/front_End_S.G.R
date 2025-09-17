import React from "react";
import '../App.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <p className="text-center mb-0">
                    © {new Date().getFullYear()} S.G.R - Todos los derechos reservados
                </p>
            </div>
        </footer>
    );
}

export default Footer;