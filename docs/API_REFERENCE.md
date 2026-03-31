# API Reference - TMDB Endpoints

Este documento detalla todos los endpoints de The Movie Database (TMDB) utilizados en la aplicación Ar Movie.

## Configuración Base

```
Base URL: https://api.themoviedb.org/3/
API Key:  ecbcdcf9044928d12b179d9153f5a269
Idioma:   es-VE / es-ES
Imágenes: https://image.tmdb.org/t/p/{size}/
```

## Tamaños de Imagen

| Tamaño | Uso |
|---|---|
| `w500` | Posters de películas, fotos de actores |
| `original` | Backdrops, imágenes de alta resolución |

---

## Endpoints Utilizados

### 1. Tendencias de Cine

```
GET /trending/movie/day
```

**Usado en**: `Tendencias.jsx` (tipo: `tendenciasCine`)

**Parámetros**:
| Parámetro | Tipo | Requerido | Descripción |
|---|---|---|---|
| `api_key` | string | Sí | API Key de TMDB |
| `language` | string | No | Idioma de la respuesta (es-VE) |
| `page` | integer | No | Número de página |

**Respuesta**:
```json
{
  "page": 1,
  "results": [
    {
      "id": 123,
      "title": "Nombre de la película",
      "poster_path": "/ruta_poster.jpg",
      "backdrop_path": "/ruta_backdrop.jpg",
      "overview": "Sinopsis...",
      "release_date": "2024-01-01",
      "vote_average": 7.5,
      "popularity": 150.5,
      "genre_ids": [28, 12]
    }
  ],
  "total_pages": 500,
  "total_results": 10000
}
```

---

### 2. Tendencias de TV

```
GET /tv/on_the_air
```

**Usado en**: `Tendencias.jsx` (tipo: `tendenciasTv`)

**Parámetros**:
| Parámetro | Tipo | Requerido | Descripción |
|---|---|---|---|
| `api_key` | string | Sí | API Key |
| `language` | string | No | Idioma (es-VE) |
| `page` | integer | No | Página |

---

### 3. Próximos Estrenos

```
GET /movie/upcoming
```

**Usado en**: `Tendencias.jsx` (tipo: `proximamente`)

---

### 4. Películas en Cartelera

```
GET /movie/now_playing
```

**Usado en**: `Tendencias.jsx` (tipo: `recientes`)

---

### 5. Top Películas

```
GET /movie/top_rated
```

**Usado en**: `Tendencias.jsx` (tipo: `mejorvaloradasCine`)

---

### 6. Top Series TV

```
GET /tv/top_rated
```

**Usado en**: `Tendencias.jsx` (tipo: `mejorvaloradasTv`)

---

### 7. Géneros de Cine

```
GET /genre/movie/list
```

**Usado en**: `FiltroGenerosCine.jsx`

**Parámetros**:
| Parámetro | Tipo | Requerido | Descripción |
|---|---|---|---|
| `api_key` | string | Sí | API Key |
| `language` | string | No | Idioma (es-VE) |

**Respuesta**:
```json
{
  "genres": [
    { "id": 28, "name": "Acción" },
    { "id": 12, "name": "Aventura" },
    { "id": 16, "name": "Animación" }
  ]
}
```

---

### 8. Géneros de TV

```
GET /genre/tv/list
```

**Usado en**: `FiltroGenerosTv.jsx`

---

### 9. Descubrir por Género

```
GET /discover/{tipo}
```

**Usado en**: `Generos.jsx`

**Parámetros**:
| Parámetro | Tipo | Requerido | Descripción |
|---|---|---|---|
| `api_key` | string | Sí | API Key |
| `language` | string | No | Idioma (es-VE) |
| `with_genres` | integer | Sí | ID del género |
| `page` | integer | No | Página |

**`{tipo}`**: `movie` para cine, `tv` para televisión

---

### 10. Actores Populares

```
GET /person/popular
```

**Usado en**: `Actores.jsx`

**Parámetros**:
| Parámetro | Tipo | Requerido | Descripción |
|---|---|---|---|
| `api_key` | string | Sí | API Key |
| `language` | string | No | Idioma (es-ES) |
| `page` | integer | No | Página |

**Respuesta**:
```json
{
  "page": 1,
  "results": [
    {
      "id": 123,
      "name": "Nombre del Actor",
      "profile_path": "/ruta_foto.jpg",
      "popularity": 50.5,
      "known_for_department": "Acting"
    }
  ],
  "total_pages": 500
}
```

---

### 11. Detalle de Película

```
GET /movie/{movie_id}
```

**Usado en**: `Detalle.jsx` (tipo: cine)

**Parámetros**:
| Parámetro | Tipo | Requerido | Descripción |
|---|---|---|---|
| `api_key` | string | Sí | API Key |
| `language` | string | No | Idioma (es-ES) |

---

### 12. Detalle de Serie TV

```
GET /tv/{tv_id}
```

**Usado en**: `Detalle.jsx` (tipo: tv)

---

### 13. Videos/Trailers

```
GET /{tipo}/{id}/videos
```

**Usado en**: `Detalle.jsx`

**Parámetros**:
| Parámetro | Tipo | Requerido | Descripción |
|---|---|---|---|
| `api_key` | string | Sí | API Key |
| `language` | string | No | Idioma (es-ES / en-US) |

**Lógica de la app**:
1. Primero busca trailers en español (`es-ES`)
2. Luego busca trailers en inglés (`en-US`)
3. Combina resultados y elimina duplicados
4. Prioriza trailers en español en el orden

**Respuesta**:
```json
{
  "results": [
    {
      "key": "dQw4w9WgXcQ",
      "name": "Official Trailer",
      "site": "YouTube",
      "type": "Trailer",
      "iso_639_1": "en",
      "official": true
    }
  ]
}
```

---

### 14. Créditos (Reparto y Producción)

```
GET /movie/{movie_id}/credits
```

**Usado en**: `Detalle.jsx`

**Parámetros**:
| Parámetro | Tipo | Requerido | Descripción |
|---|---|---|---|
| `api_key` | string | Sí | API Key |
| `language` | string | No | Idioma (es-ES) |

**Respuesta**:
```json
{
  "cast": [
    {
      "id": 123,
      "name": "Actor Name",
      "character": "Character Name",
      "profile_path": "/photo.jpg",
      "popularity": 30.5
    }
  ],
  "crew": [
    {
      "id": 456,
      "name": "Director Name",
      "job": "Director",
      "department": "Directing",
      "profile_path": "/photo.jpg"
    }
  ]
}
```

---

### 15. Créditos de Actor (Filmografía)

```
GET /person/{person_id}/credits
```

**Usado en**: `Peliculas.jsx`

**Parámetros**:
| Parámetro | Tipo | Requerido | Descripción |
|---|---|---|---|
| `api_key` | string | Sí | API Key |
| `language` | string | No | Idioma (es-ES) |

---

### 16. Detalle de Persona

```
GET /person/{person_id}
```

**Usado en**: `Peliculas.jsx`

**Respuesta**:
```json
{
  "id": 123,
  "name": "Actor Name",
  "profile_path": "/photo.jpg",
  "popularity": 50.5,
  "birthday": "1980-01-01",
  "biography": "Biografía del actor..."
}
```

---

### 17. Búsqueda Multi

```
GET /search/multi
```

**Usado en**: `Busquedas.jsx`

**Parámetros**:
| Parámetro | Tipo | Requerido | Descripción |
|---|---|---|---|
| `api_key` | string | Sí | API Key |
| `query` | string | Sí | Término de búsqueda |
| `language` | string | No | Idioma (es-VE) |

**Respuesta**: Contiene `media_type` para diferenciar:
- `"movie"` → Película
- `"tv"` → Serie de TV
- `"person"` → Persona/Actor

---

## Resumen de Endpoints

| # | Endpoint | Componente | Método |
|---|---|---|---|
| 1 | `/trending/movie/day` | Tendencias | GET |
| 2 | `/tv/on_the_air` | Tendencias | GET |
| 3 | `/movie/upcoming` | Tendencias | GET |
| 4 | `/movie/now_playing` | Tendencias | GET |
| 5 | `/movie/top_rated` | Tendencias | GET |
| 6 | `/tv/top_rated` | Tendencias | GET |
| 7 | `/genre/movie/list` | FiltroGenerosCine | GET |
| 8 | `/genre/tv/list` | FiltroGenerosTv | GET |
| 9 | `/discover/{tipo}` | Generos | GET |
| 10 | `/person/popular` | Actores | GET |
| 11 | `/movie/{id}` | Detalle | GET |
| 12 | `/tv/{id}` | Detalle | GET |
| 13 | `/{tipo}/{id}/videos` | Detalle | GET |
| 14 | `/movie/{id}/credits` | Detalle | GET |
| 15 | `/person/{id}/credits` | Peliculas | GET |
| 16 | `/person/{id}` | Peliculas | GET |
| 17 | `/search/multi` | Busquedas | GET |

## Códigos de Estado HTTP

| Código | Significado | Manejo en la App |
|---|---|---|
| 200 | OK | Datos procesados correctamente |
| 401 | Unauthorized | API Key inválida |
| 404 | Not Found | Recurso no encontrado |
| 429 | Too Many Requests | Límite de rate excedido |
| 500 | Server Error | Error del servidor TMDB |

## Rate Limits

TMDB aplica límites de velocidad. Para la API key gratuita:
- ~40 requests por segundo
- Si se excede, la API devuelve `429 Too Many Requests`
