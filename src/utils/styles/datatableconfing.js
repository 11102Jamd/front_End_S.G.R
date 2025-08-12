
const datatableConfig = {
    customStyles: {
        headCells: {
            style: {
                backgroundColor: '#343a40',
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
                textAlign: 'center',
            },
        },
        cells: {
            style: {
                fontSize: '15px',
                padding: '10px',
                textAlign: 'center',
            },
        },
        rows: {
            style: {
                minHeight: '50px',
                '&:nth-child(even)': {
                    backgroundColor: '#f8f9fa',
                },
                '&:hover': {
                    backgroundColor: '#e9ecef !important',
                },
            },
        },
        pagination: {
            style: {
                backgroundColor: '#f8f9fa',
                borderTop: '1px solid #dee2e6',
            },
        },
    },
    paginationOptions: {
        rowsPerPageText: 'Registros por página:',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
        noRowsPerPage: false,
    }
};

export default datatableConfig;
