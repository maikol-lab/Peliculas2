# Ar Movie - Aplicación de Películas y Series

Aplicación web de consulta de películas, series TV y actores que consume la API de **The Movie Database (TMDB)**. Construida con **React 19**, **Vite 7** y **React Router DOM 7**.

API REST para la gestión de películas, desarrollada con Node.js.

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.x-7952B3?style=for-the-badge&logo=bootstrap)
![JX](https://img.shields.io/badge/JX-Backend-000000?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBvbHlsaW5lIHBvaW50cz0iMTIgMiAyIDcgMTIgMTIgMjIgNyAxMiAyIi8+PHBvbHlsaW5lIHBvaW50cz0iMiAxNyAxMiAyMiAyMiAxNyIvPjwvc3ZnPg==)
[React Router](https://img.shields.io/badge/React_Router-7.x-CA4245?style=for-the-badge&logo=react-router)
![React Icons](https://img.shields.io/badge/React_Icons-5.x-E10098?style=for-the-badge&logo=react)
![Animate.css](https://img.shields.io/badge/Animate.css-4.x-F552B8?style=for-the-badge)
![WOW.js](https://img.shields.io/badge/WOW.js-1.x-FF6B6B?style=for-the-badge)
![ESLint](https://img.shields.io/badge/ESLint-9.x-4B32C3?style=for-the-badge&logo=eslint)
![gh-pages](https://img.shields.io/badge/gh--pages-6.x-222222?style=for-the-badge&logo=github-pages)

## Demo

> [Vercel / Netlify / tu URL aquí]

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Troubleshooting](./docs/TROUBLESHOOTING.md)
- [API Reference](./docs/API_REFERENCE.md)
- [Arquitectura](./docs/ARCHITECTURE.md)
- [Características del Proyecto](./docs/FEATURES.md)
- [Documentación Adicional](#documentación-adicional)
- [Licencia](#licencia)

---

## Características

- **Tendencias**: Películas y series en tendencia (cine y TV)
- **Filtrado por Género**: Explorar contenido por género para cine y TV
- **Actores Populares**: Listado de actores ordenados por popularidad
- **Detalle Completo**: Información detallada de películas/series con trailers de YouTube
- **Búsqueda**: Búsqueda multi-entidad (películas, series, personas)
- **Películas por Actor**: Filmografía completa de cada actor
- **Paginación**: Navegación paginada en todas las vistas
- **Diseño Responsivo**: Interfaz adaptada con Bootstrap 5
- **Trailers**: Reproducción de trailers embebidos con react-youtube

## Tecnologías

| Tecnología | Versión |
|---|---|
| React | ^19.1.0 |
| React DOM | ^19.1.0 |
| React Router DOM | ^7.6.3 |
| React YouTube | ^10.1.0 |
| Vite | ^7.0.0 |
| ESLint | ^9.29.0 |
| Bootstrap | 5 (CSS público) |

## Requisitos Previos

- **Node.js** >= 20
- **npm** >= 9

## Instalación

```bash
# Clonar el repositorio
git clone <tu-repo-url>
cd Peliculas2

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

## Estructura del Proyecto

```
Peliculas2/
├── docs/
│   ├── architecture.md          # Documentación de arquitectura
│   ├── api-reference.md         # Referencia de la API TMDB
│   └── troubleshooting.md       # Guía de solución de problemas
├── public/
│   ├── css/                     # Estilos Bootstrap y personalizados
│   ├── css2/                    # Estilos adicionales
│   ├── css3/                    # Estilos adicionales
│   ├── img/                     # Imágenes estáticas
│   └── js/                      # JavaScript vanilla (Bootstrap)
├── src/
│   ├── assets/                  # Recursos (logo, etc.)
│   ├── components/
│   │   ├── card/
│   │   │   ├── CardActores.jsx      # Tarjeta de actor
│   │   │   └── Cardpeliculas.jsx    # Tarjeta de película/serie
│   │   ├── filtro/
│   │   │   ├── FiltroGenerosCine.jsx # Géneros de cine
│   │   │   └── FiltroGenerosTv.jsx   # Géneros de TV
│   │   ├── Footer.jsx               # Pie de página
│   │   ├── Header.jsx               # Cabecera + búsqueda
│   │   ├── ModalPeliculas.jsx       # Modal de detalles rápidos
│   │   └── Paginador.jsx            # Componente de paginación
│   ├── pages/
│   │   ├── productos/
│   │   │   ├── Actores.jsx          # Actores populares
│   │   │   ├── Detalle.jsx          # Detalle película/serie
│   │   │   ├── Generos.jsx          # Películas por género
│   │   │   ├── Peliculas.jsx        # Filmografía de actor
│   │   │   └── Tendencias.jsx       # Tendencias cine/TV
│   │   ├── Busquedas.jsx            # Resultados de búsqueda
│   │   └── Home.jsx                 # Página de inicio
│   ├── App.jsx                  # Configuración de rutas
│   ├── main.jsx                 # Punto de entrada
│   ├── index.css                # Estilos globales
│   └── App.css                  # Estilos de la app
├── index.html                   # HTML principal
├── vite.config.js               # Configuración de Vite
├── eslint.config.js             # Configuración de ESLint
├── package.json
└── README.md
```

## Rutas de la Aplicación

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | Tendencias | Tendencias de cine (por defecto) |
| `/tendencias/:tipo` | Tendencias | Tendencias filtradas por tipo |
| `/generos/:tipo/:genero/:id` | Generos | Películas por género |
| `/actores` | Actores | Actores populares |
| `/detalle/:tipo/:id` | Detalle | Detalle de película/serie |
| `/peliculas/:id/:actor` | Peliculas | Filmografía de un actor |
| `/busquedas` | Busquedas | Resultados de búsqueda |

### Tipos de Tendencias

| `:tipo` | Descripción |
|---|---|
| `tendenciasCine` | Películas en tendencia |
| `tendenciasTv` | Series en emisión |
| `proximamente` | Próximos estrenos |
| `recientes` | Películas en cartelera |
| `mejorvaloradasCine` | Top películas mejor valoradas |
| `mejorvaloradasTv` | Top series mejor valoradas |

## Variables de Entorno

La API Key de TMDB está configurada directamente en el código. Para producción, se recomienda usar variables de entorno:

```env
VITE_TMDB_API_KEY=tu_api_key_aqui
```

## Scripts Disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia servidor de desarrollo con HMR |
| `npm run build` | Compila para producción |
| `npm run preview` | Previsualiza el build de producción |
| `npm run lint` | Ejecuta ESLint |

## Documentación Adicional

- [Arquitectura del Proyecto](docs/ARCHITECTURE.md)
- [API Reference](docs/API_REFERENCE.md)
- [Guía de Troubleshooting](docs/TROUBLESHOOTING.md)

## Licencia

Diseñado por [HTML Codex](https://htmlcodex.com). Distribuido por [ThemeWagon](https://themewagon.com).
