import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import CardActores from "../components/CardActores";

const Detalle = () => {
    const [datos, setDatos] = useState([]);
    const [datareparto, setDatareparto] = useState({});
    const [dataproduccion, setdProduccion] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [trailers, setTrailers] = useState([]);
    const [selectedTrailer, setSelectedTrailer] = useState(null);
    const playerRef = useRef(null);

    const navigate = useNavigate();
    const params = useParams();
    let tipo = params.tipo;
    let id = params.id;
    let API = "";
    let APIVideos = "";

    if (tipo === "cine") {
        API = `https://api.themoviedb.org/3/movie/${id}?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-ES`;
        APIVideos = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-ES`;
    } else {
        API = `https://api.themoviedb.org/3/tv/${id}?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-ES`;
        APIVideos = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-ES`;
    }

    const getDatos = async () => {
        try {
            const response = await fetch(API);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDatos(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const getVideo = async () => {
        try {
            // Primero obtenemos los trailers en español
            const responseES = await fetch(APIVideos);
            const dataES = await responseES.json();
            
            // Luego obtenemos los trailers en inglés
            const APIVideosEN = APIVideos.replace('language=es-ES', 'language=en-US');
            const responseEN = await fetch(APIVideosEN);
            const dataEN = await responseEN.json();

            // Combinamos y filtramos los trailers
            const allTrailers = [...(dataES.results || []), ...(dataEN.results || [])];
            
            const ytTrailers = allTrailers.filter(
                (v) => v.type === "Trailer" && v.site === "YouTube"
            );

            // Eliminamos duplicados (mismo key)
            const uniqueTrailers = ytTrailers.reduce((acc, current) => {
                const x = acc.find(item => item.key === current.key);
                if (!x) {
                    return acc.concat([current]);
                } else {
                    return acc;
                }
            }, []);

            // Ordenamos: primero trailers en español, luego en inglés
            const sortedTrailers = uniqueTrailers.sort((a, b) => {
                if ((a.iso_639_1 === 'es' || a.iso_639_1 === 'es-ES') && 
                    (b.iso_639_1 !== 'es' && b.iso_639_1 !== 'es-ES')) {
                    return -1;
                }
                if ((b.iso_639_1 === 'es' || b.iso_639_1 === 'es-ES') && 
                    (a.iso_639_1 !== 'es' && a.iso_639_1 !== 'es-ES')) {
                    return 1;
                }
                return 0;
            });

            // Si no hay trailers en español, agregamos uno genérico basado en el inglés
            if (!sortedTrailers.some(t => t.iso_639_1 === 'es' || t.iso_639_1 === 'es-ES') && 
                sortedTrailers.length > 0) {
                const englishTrailer = sortedTrailers.find(t => t.iso_639_1 === 'en');
                if (englishTrailer) {
                    sortedTrailers.unshift({
                        ...englishTrailer,
                        name: `Tráiler en Español - ${englishTrailer.name}`,
                        iso_639_1: 'es'
                    });
                }
            }

            setTrailers(sortedTrailers);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const APICredits = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-ES&sort_by=popularity.desc`;
    const getReparto = async () => {
        try {
            const response = await fetch(APICredits);
            const data = await response.json();
            const sortedCast = [...data.cast].sort((a, b) => b.popularity - a.popularity);
            setDatareparto(sortedCast);
            setdProduccion(data.crew);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const onPlayerReady = (event) => {
        playerRef.current = event.target;
    };

    useEffect(() => {
        getDatos();
        getReparto();
        getVideo();

        const modalEl = document.getElementById("modalTrailers");
        if (modalEl) {
            modalEl.addEventListener("hidden.bs.modal", () => {
                setSelectedTrailer(null);
                if (playerRef.current) {
                    playerRef.current.stopVideo();
                    playerRef.current = null;
                }
            });
        }

        return () => {
            if (modalEl) {
                modalEl.removeEventListener("hidden.bs.modal", () => { });
            }
        };
    }, []);

    const ruta = "https://image.tmdb.org/t/p/original/";

    function formatDateToLocal(dateString) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', options);
    }

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Cargando Personajes...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-5 text-danger">
                <h4>Error al cargar los Personajes</h4>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-dark text-white">
            <div className="banner" style={{ backgroundImage: "url(" + ruta + datos.backdrop_path + ")" }}>
                <div className="sombra">
                    <h1 className="pt-5 display-1 banner_titulo">{datos.title || datos.name}</h1>
                    <h5 className="pt-5 display-4 banner_titulo">{datos.tagline}</h5>

                    {datos.genres && datos.genres.length > 0 && (
                        <h5 className="display-5 banner_titulo">Genero: {datos.genres[0].name}</h5>
                    )}

                    <h5 className="display-5">Titulo Original: {datos.original_title} </h5>
                    <h5 className="display-5">Lenguaje Original: {datos.original_language} </h5>

                    {datos.vote_average && datos.vote_average > 0 && (
                        <h2 className="my-4">Average: <span className=" badge lg-ba bg-warning p-2">{datos.vote_average.toFixed(1)}%</span></h2>
                    )}

                    <p className="banner_descripcion">{datos.overview}</p>

                    <div className="my-3">
                        {trailers.length > 0 && (
                            <button
                                className="btn btn-danger me-2"
                                data-bs-toggle="modal"
                                data-bs-target="#modalTrailers"
                                onClick={() => {
                                    if (trailers.length > 0) {
                                        // Priorizar trailer en español
                                        const esTrailer = trailers.find(t => t.iso_639_1 === 'es' || t.iso_639_1 === 'es-ES');
                                        setSelectedTrailer(esTrailer || trailers[0]);
                                    }
                                }}
                            >
                                Ver Trailers
                            </button>
                        )}
                        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                            Regresar
                        </button>
                    </div>
                    {datos.release_date && (
                        <h5 className="py-3">Fecha de Lanzamiento:  {formatDateToLocal(datos.release_date || datos.first_air_date)}</h5>
                    )}
                </div>
            </div>

            {Array.isArray(datareparto) && (
                <section className="container py-5">
                    <h3 className="text-center text-white py-4">Reparto de la pelicula ({Array.isArray(datareparto) && datareparto.length}) actores</h3>
                    <div className="row row-cols-lg-6 m-2 justify-content-center">
                        {datareparto.map((item, index) => (
                            item.profile_path && item.profile_path !== "" ? (
                                <CardActores key={index} item={item} />
                            ) : null
                        ))}
                    </div>
                </section>
            )}

            <hr className="py-1" />

            {Array.isArray(dataproduccion) && (
                <section className="container py-5 ">
                    <h3 className="text-center text-white py-4">Producción</h3>
                    <div className="row">
                        {Array.isArray(dataproduccion) && dataproduccion.map((item, index) => (
                            item.profile_path && item.profile_path !== "" ? (
                                <div className="col-6 col-sm-6 col-md-4 col-ls-3 mb-4" key={index}>
                                    <div className="card mb-3 bg-secondary">
                                        <div className="row g-0">
                                            <div className="col-md-4 m-0">
                                                <img src={ruta + item.profile_path} className="card-img-top" alt="..." />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <p className="text-dark">
                                                        <b>{item.name}</b><br /><br />
                                                        <b>Departamento: </b>
                                                        {item.department}<br /><br />
                                                        <b>Cargo:</b> {item.job}<br /><br />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        ))}
                    </div>
                </section>
            )}

            {trailers.length > 0 && (
                <div className="modal fade" id="modalTrailers" tabIndex="-1" aria-labelledby="trailerModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content bg-dark text-white border border-warning">
                            <div className="modal-header border-bottom border-info">
                                <h2 className="modal-title fw-bold text-white">
                                    <i className="bi bi-play-circle-fill me-2 text-info"></i>Trailers Disponibles
                                </h2>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => {
                                        if (playerRef.current) {
                                            playerRef.current.stopVideo();
                                        }
                                    }}
                                ></button>
                            </div>
                            <div className="modal-body p-0">
                                {selectedTrailer && (
                                    <div className="ratio ratio-16x9 bg-black">
                                        <YouTube
                                            videoId={selectedTrailer.key}
                                            opts={{
                                                width: "100%",
                                                height: "100%",
                                                playerVars: {
                                                    autoplay: 1,
                                                    modestbranding: 1,
                                                    rel: 0,
                                                    controls: 1,
                                                    fs: 1
                                                },
                                            }}
                                            onReady={onPlayerReady}
                                            className="youtube-iframe"
                                        />
                                    </div>
                                )}

                                <div className="p-3 bg-dark-gradient">
                                    <h5 className="mb-3 text-center text-white">
                                        <i className="bi bi-collection-play me-2"></i>Selecciona otro trailer:
                                    </h5>
                                    <div className="d-flex flex-wrap justify-content-center gap-2">
                                        {trailers.map((t, index) => (
                                            <button
                                                key={t.key + index}
                                                className={`btn ${selectedTrailer?.key === t.key
                                                    ? "btn-warning"
                                                    : "btn-outline-warning"}`}
                                                onClick={() => setSelectedTrailer(t)}
                                            >
                                                <i className="bi bi-play-fill me-1"></i>
                                                {t.name}
                                                {t.iso_639_1 === "en" && " 🇬🇧"}
                                                {(t.iso_639_1 === "es" || t.iso_639_1 === "es-ES") && " 🇪🇸"}
                                                {t.official && " ✔️"}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer border-top border-danger">
                                <button
                                    type="button"
                                    className="btn btn-outline-light"
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                        if (playerRef.current) {
                                            playerRef.current.stopVideo();
                                        }
                                    }}
                                >
                                    <i className="bi bi-x-circle me-1"></i> Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Detalle;