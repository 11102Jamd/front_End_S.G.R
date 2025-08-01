import React from "react";
import { exportPdfReportPurchase } from "../../utils/enpoints/reportPdfPurchase";
import DatePicker from "react-datepicker";
import { useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';


const ReportDownloader = () => {
    const [showModal, setShowModal] = useState(false);
    const [reportType, setReportType] = useState('purchases');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDownload = async () => {
        if (!startDate || !endDate) {
        setError('Debe seleccionar ambas fechas');
        return;
        }

        if (startDate > endDate) {
        setError('La fecha de inicio no puede ser mayor a la fecha final');
        return;
        }

        setIsLoading(true);
        setError(null);

        try {
        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];

        const response = await exportPdfReportPurchase({
            start_date: formattedStartDate,
            end_date: formattedEndDate
        });

        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `reporte-compras-${formattedStartDate}-a-${formattedEndDate}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);

        setShowModal(false);
        } catch (err) {
        console.error('Error al descargar el reporte:', err);
        setError(err.response?.data?.error || 'Error al generar el reporte');
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <div className="report-downloader">
        <button 
            className="btn btn-primary" 
            onClick={() => setShowModal(true)}
        >
            Generar Reporte
        </button>

        {showModal && (
            <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Generar Reporte PDF</h5>
                    <button 
                    type="button" 
                    className="close" 
                    onClick={() => setShowModal(false)}
                    >
                    <span>&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                    <label>Tipo de Reporte</label>
                    <select 
                        className="form-control"
                        value={reportType} 
                        onChange={(e) => setReportType(e.target.value)}
                        disabled
                    >
                        <option value="purchases">Reporte de Compras</option>
                    </select>
                    </div>

                    <div className="form-group">
                    <label>Fecha de Inicio</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                        placeholderText="Seleccione fecha de inicio"
                    />
                    </div>

                    <div className="form-group">
                    <label>Fecha de Fin</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                        placeholderText="Seleccione fecha de fin"
                    />
                    </div>

                    {error && (
                    <div className="alert alert-danger">{error}</div>
                    )}
                </div>
                <div className="modal-footer">
                    <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowModal(false)}
                    >
                    Cancelar
                    </button>
                    <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={handleDownload} 
                    disabled={isLoading}
                    >
                    {isLoading ? (
                        <>
                        <span 
                            className="spinner-border spinner-border-sm" 
                            role="status" 
                            aria-hidden="true"
                        />
                        <span className="sr-only">Generando...</span>
                        </>
                    ) : (
                        'Descargar Reporte'
                    )}
                    </button>
                </div>
                </div>
            </div>
            </div>
        )}
        </div>
    );
}
export default ReportDownloader;