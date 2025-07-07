const ModalPeliculas = ({item}) => {
    function formatDateToLocal(dateString) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', options);
    }
    
    return (
        <div className="modal fade" id={item.id} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content bg-dark border border-danger">
                    <div className="modal-header border-bottom border-danger">
                        <h2 className="modal-title text-white fw-bold" id="exampleModalLabel">
                            <i className="bi bi-film me-2"></i>Detalles de la Película
                        </h2>
                        <button 
                            type="button" 
                            className="btn-close btn-close-white" 
                            data-bs-dismiss="modal" 
                            aria-label="Close" 
                        />
                    </div>
                    <div className="modal-body">
                        <div className="row g-4">
                            <div className="col-md-5">
                                <img 
                                    src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} 
                                    className="img-fluid rounded shadow-lg" 
                                    alt={item.title || item.name}
                                />
                            </div>
                            <div className="col-md-7 text-white">
                                <h3 className="fw-bold mb-3 text-danger">{item.title || item.name}</h3>
                                
                                <div className="mb-3">
                                    <span className="badge bg-warning text-dark me-2 p-2">
                                        <i className="bi bi-star-fill me-1"></i> {item.vote_average}
                                    </span>
                                    <span className="badge bg-info text-dark p-2">
                                        <i className="bi bi-people-fill me-1"></i> {item.popularity}
                                    </span>
                                </div>
                                
                                <div className="mb-3">
                                    <h5 className="text-primary">
                                        <i className="bi bi-calendar-date me-2"></i>
                                        Fecha de Estreno: {formatDateToLocal(item.release_date || item.first_air_date)}
                                    </h5>
                                </div>
                                
                                <div className="card bg-dark border-secondary mb-3">
                                    <div className="card-body">
                                        <h5 className="card-title text-white">Sinopsis</h5>
                                        <p className="card-text">{item.overview}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer border-top border-danger">
                        <button 
                            type="button" 
                            className="btn btn-outline-light" 
                            data-bs-dismiss="modal"
                        >
                            <i className="bi bi-x-circle me-1"></i> Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalPeliculas;