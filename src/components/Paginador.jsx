const Paginador = ({ page, setPage, totalPages }) => {
    // Generar números de página visibles (máximo 5)
    const getVisiblePages = () => {
        const visiblePages = [];
        let startPage = Math.max(1, page - 2);
        let endPage = Math.min(totalPages, startPage + 4);
        
        // Ajustar si estamos cerca del final
        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            visiblePages.push(i);
        }
        
        return visiblePages;
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="d-flex justify-content-center align-items-center py-3">
            <nav aria-label="Page navigation">
                <ul className="pagination pagination-lg mb-0 py-4">
                    {/* Botón Anterior */}
                    <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                        <button 
                            className="page-link bg-gray-800 text-gray-300 border-gray-700 hover:bg-red-700 hover:text-white" 
                            aria-label="Previous"
                            onClick={() => setPage(Math.max(1, page - 1))}
                            disabled={page === 1}
                        >
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>

                    {/* Primera página + elipsis si es necesario */}
                    {visiblePages[0] > 1 && (
                        <>
                            <li className="page-item">
                                <button 
                                    className="page-link bg-gray-800 text-gray-300 border-gray-700 hover:bg-red-700 hover:text-white" 
                                    onClick={() => setPage(1)}
                                >
                                    1
                                </button>
                            </li>
                            {visiblePages[0] > 2 && (
                                <li className="page-item disabled">
                                    <span className="page-link bg-gray-800 border-gray-700 text-gray-500">...</span>
                                </li>
                            )}
                        </>
                    )}

                    {/* Páginas visibles */}
                    {visiblePages.map((pageNum) => (
                        <li 
                            key={pageNum} 
                            className={`page-item ${pageNum === page ? 'active' : ''}`}
                        >
                            <button 
                                className={`page-link ${pageNum === page 
                                    ? 'bg-red-600 border-red-600 hover:bg-red-700' 
                                    : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:text-white'}`}
                                onClick={() => setPage(pageNum)}
                            >
                                {pageNum}
                            </button>
                        </li>
                    ))}

                    {/* Última página + elipsis si es necesario */}
                    {visiblePages[visiblePages.length - 1] < totalPages && (
                        <>
                            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                                <li className="page-item disabled">
                                    <span className="page-link bg-gray-800 border-gray-700 text-gray-500">...</span>
                                </li>
                            )}
                            <li className="page-item">
                                <button 
                                    className="page-link bg-gray-800 text-gray-300 border-gray-700 hover:bg-red-700 hover:text-white" 
                                    onClick={() => setPage(totalPages)}
                                >
                                    {totalPages}
                                </button>
                            </li>
                        </>
                    )}

                    {/* Botón Siguiente */}
                    <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                        <button 
                            className="page-link bg-gray-800 text-gray-300 border-gray-700 hover:bg-red-700 hover:text-white" 
                            aria-label="Next"
                            onClick={() => setPage(Math.min(totalPages, page + 1))}
                            disabled={page === totalPages}
                        >
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>
            </nav>

            {/* Contador de páginas (opcional) */}
            <div className="ms-3 d-none d-md-block">
                <span className="text-gray-300 font-medium">
                    Página {page} de {totalPages}
                </span>
            </div>
        </div>
    );
};

export default Paginador;